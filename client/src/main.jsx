import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContex.jsx";
import { ChatProvider } from "../context/ChatContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);
