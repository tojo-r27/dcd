import { createCookieSessionStorage, redirect, type LoaderFunction, type Session } from "react-router";
import { Urls } from "./urls";

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session", // use any name you want here
        sameSite: "lax", // this helps with CSRF
        path: "/", // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: [`${process.env.SESSION_SECRET}`], // replace this with an actual secret
        secure: process.env.NODE_ENV === "production", // enable this in prod only
    },
});

/**
 * Retrieves the user session from the given request.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Session>} A promise that resolves to the user session, or null if the session is not found.
 */
export async function getSession(request: Request): Promise<Session | null> {
    const cookie = request.headers.get("Cookie");
    return sessionStorage.getSession(cookie);
}

/**
 * Creates a user session with the given user and returns a redirect response with
 * the session cookie set.
 *
 * @param {Object} params - The parameters for creating the user session.
 * @param {Request} params.request - The incoming request object.
 * @param {any} params.user - The data of the user.
 * @returns {Promise<Response>} A redirect response with the session cookie set.
 */
export async function createUserSession({
    request,
    user,
    remember,
}: {
    request: Request;
    user: string;
    remember: boolean;
}) {
    const session = await getSession(request);
    session.set("user", user);
    const maxAgeDuration = 60 * 60 * 24 * 3; // 3 days

    return redirect(Urls.user.profile, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session, {
                maxAge: remember ? maxAgeDuration : undefined,
            }),
        },
    });
}

/**
 * Retrieves the user session from the given request.
 *
 * @param request - The incoming request object.
 * @returns A promise that resolves to the user session, or null if the session is not found.
 */
export async function getUserSession(request: Request) {
    const cookie = request.headers.get("Cookie");
    return sessionStorage.getSession(cookie);
}

export const requireNoUserSession: LoaderFunction = async ({ request }) => {
    const session = await getUserSession(request);

    if (session.has("user")) return redirect(Urls.user.profile);
    return {};
}

/**
 * Logout function that removes the session cookie and redirects to the homepage.
 * @param req - The incoming request object.
 * @returns A redirect response with the session cookie destroyed.
 */
export async function logout(request: Request): Promise<Response> {
    // Get the current session from the request.
    const session = await getSession(request);

    // Destroy the session and get the cookie header for the response.
    const cookieHeader = await sessionStorage.destroySession(session);

    // Return a redirect response with the session cookie destroyed.
    return redirect("/", {
        headers: {
            "Set-Cookie": cookieHeader,
        },
    });
}
