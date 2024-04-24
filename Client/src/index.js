import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./context/searchContext";
import { AuthContextProvider } from "./context/AuthContext";
import Notification from "./notification/Notification";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <App />
      <Notification/>
    </SearchContextProvider>
  </AuthContextProvider>
);
