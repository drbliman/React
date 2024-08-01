import React from "react";
import ErrorBoundary from "./components/errorBoundary";
import { ThemeProvider } from "./components/themeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Star wars</title>
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <div id="root">{children}</div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
