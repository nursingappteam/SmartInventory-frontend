import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./interceptors/axios";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);
