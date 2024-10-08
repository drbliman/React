import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../public/css/index.css";
import ErrorBoundary from "./errorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
