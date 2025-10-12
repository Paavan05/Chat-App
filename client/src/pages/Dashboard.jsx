import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSideBar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const Dashboard = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className='border w-full h-screen sm:px-[10%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid relative
    ${
      selectedUser
        ? "grid-cols-1 md:grid-cols-[1fr_2fr_1fr]" // when user selected
        : "grid-cols-1 md:grid-cols-[1fr_2fr]" // when no user selected
    }`}
      >
        <div className={`${selectedUser ? "hidden md:flex" : ""}`}>
          <Sidebar />
        </div>

        <ChatContainer />

        <div
          className={`${
            selectedUser
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
