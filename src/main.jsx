import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { AddUserContext } from "./context/AddUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <AddUserContext>
        <React.StrictMode>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </React.StrictMode>
      </AddUserContext>
    </ChatContextProvider>
  </AuthContextProvider>
);
