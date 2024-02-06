import React, { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { useGlobalContext } from "../../../context/SidebarContext";
import { db } from "../../../firebase";
import { images } from "../../../constants";
import "./ChatList.scss";

const ChatList = ({ setShowPanel }) => {
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

  return (
    <div className="chatlist">
      <div className="chatlist_con" onClick={() => setShowPanel(true)}>
        {chats &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <div
                  className={"chatbox"}
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1].userInfo)}
                >
                  {chat[1].userInfo.photoURL ? (
                    <img src={chat[1].userInfo.photoURL} />
                  ) : (
                    <img src={images.default_profile} />
                  )}
                  <div className="chatbox-info">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.btext.slice(0, 20)}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ChatList;
