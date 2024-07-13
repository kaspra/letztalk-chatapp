import React, { useState, useEffect, useContext, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { images } from "../../constants";
import { SidebarContext } from "../../context/SidebarContext";
import NavInfo from "./NavInfo/NavInfo";
import Search from "./Search/Search";
import ChatList from "./ChatList/ChatList";
import "./Sidebar.scss";

const Sidebar = ({ showPanel, setShowPanel }) => {
  const [chats, setChats] = useState([]);
  const originalChatsRef = useRef([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { closeSidebar, isMobile, sidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const chatsData = doc.data();
        setChats(chatsData);
        originalChatsRef.current = chatsData;
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    if (isMobile) {
      closeSidebar();
    }
    dispatch({
      type: "CHANGE_USER",
      payload: u,
    });
  };

  return (
    <div
      className={`${
        isMobile ? (sidebarOpen ? "sidebar_mobile" : "sidebar-hide") : "sidebar"
      }`}
    >
      <NavInfo />
      <Search
        originalChats={originalChatsRef.current}
        chats={chats}
        setChats={setChats}
      />
      <ChatList
        setShowPanel={setShowPanel}
        handleSelect={handleSelect}
        chats={chats}
      />
    </div>
  );
};

export default Sidebar;
