import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { ChatContext } from "../../../context/ChatContext";
import { db } from "../../../firebase";
import Message from "./Message";
import "./Messages.scss";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
  }, [data.chatId]);

  return (
    <div className="messages">
      <div className="messages_con">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
