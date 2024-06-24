import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MainContextProvider from "./context/MainContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </BrowserRouter>
);
