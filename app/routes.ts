import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("register-company", "routes/auth/registerCompany.tsx"),
    route("forgot-password", "routes/auth/forgotPassword.tsx"),
] satisfies RouteConfig;
