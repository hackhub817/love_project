import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <Toaster
      richColors
      position="bottom-right"
      toastOptions={{ duration: 1700 }}
    />
  </BrowserRouter>
);
