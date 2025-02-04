import {
  Await,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import type { Route } from "./+types/root";
import { MantineProvider } from "@mantine/core";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import React, { useEffect } from "react";
import Cookies from 'js-cookie';

import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css"

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: "/assets/css/custom.css" },
  { rel: "stylesheet", href: "/assets/css/style.css" },
  { rel: "stylesheet", href: "/assets/css/skins/theme-green.css" }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const lng = i18n.language || "en";

  useEffect(() => {
    i18n.changeLanguage(lng);
    i18n.on('initialized', () => {
        const lng = Cookies.get('locale');
        if (lng) {
            i18n.changeLanguage(lng);
        }
    });
  }, [lng]);

  return (
    <html lang={lng}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider>
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}