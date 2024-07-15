import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../public/css/index.css";
import ErrorBoundary from "./errorBoundary.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
