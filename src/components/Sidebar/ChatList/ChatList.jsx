import React, { useState, useEffect, useContext } from "react";

import { images } from "../../../constants";
import "./ChatList.scss";

const ChatList = ({ setShowPanel, handleSelect, chats }) => {
  return (
    <div className="chatlist">
      <div
        className="chatlist_con"
        onClick={(e) => {
          setShowPanel(true);
        }}
      >
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
                    <p>{chat[1].lastMessage?.message.slice(0, 20)}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ChatList;
