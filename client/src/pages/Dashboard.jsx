import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSideBar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Dashboard = () => {
  const { selectedUser } = useContext(ChatContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='relative w-full h-[100dvh] sm:px-[10%] sm:py-[5%]'>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="cursor-pointer absolute left-3 top-3 sm:left-6 sm:top-6 hidden z-50 md:inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow hover:bg-slate-100 dark:hover:bg-slate-800 transition-[colors,transform] active:scale-95">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        <span className="hidden sm:inline">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      </button>

      <div className={`backdrop-blur-xl border-2 shadow-2xl border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden h-full grid relative
          ${selectedUser
            ? "grid-cols-1 md:grid-cols-[1fr_2fr_1fr]" // when user selected
            : "grid-cols-1 md:grid-cols-[1fr_2fr]" // when no user selected
          }`}>
        <div className={`${selectedUser ? "hidden md:flex" : ""}`}>
          <Sidebar />
        </div>

        <ChatContainer />

        <div
          className={`${selectedUser
            ? "hidden md:flex" // hide on mobile when chatting
            : "hidden" // also hidden when no user selected
            }`}
        >
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
