import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { AppProvider } from "./context/SidebarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <AppProvider>
          <App />
        </AppProvider>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
