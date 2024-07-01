import React, { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/SidebarContext";
import NavInfo from "./NavInfo/NavInfo";
import Search from "./Search/Search";
import ChatList from "./ChatList/ChatList";
import "./Sidebar.scss";

const Sidebar = ({ showPanel, setShowPanel }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { closeSidebar } = useGlobalContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    closeSidebar();
    dispatch({
      type: "CHANGE_USER",
      payload: u,
    });
  };

  console.log(chats);

  return (
    <div className="sidebar">
      <NavInfo />
      <Search chats={chats} setChats={setChats} />
      <ChatList
        setShowPanel={setShowPanel}
        handleSelect={handleSelect}
        chats={chats}
        setChats={setChats}
      />
    </div>
  );
};

export default Sidebar;
