import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../public/css/index.scss";
import ErrorBoundary from "./errorBoundary.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./component/ThemeContext";
import { Provider } from "react-redux";
import store from "./component/store/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
