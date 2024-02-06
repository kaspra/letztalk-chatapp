import React, { useContext } from "react";

import SenderInfo from "./SenderInfo/SenderInfo";
import Messages from "./Messages/Messages";
import InputBox from "./InputBox/InputBox";
import Divider from "./Divider/Divider";
import { ChatContext } from "../../context/ChatContext";
import "./ChatPanel.scss";

const ChatPanel = ({ showPanel, setShowPanel }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatpanel">
      {showPanel && (
        <div className="chatpanel_con">
          <SenderInfo />
          <Divider />
          <Messages />
          <Divider />
          <InputBox />
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
