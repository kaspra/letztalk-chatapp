import React, { useContext } from "react";

import SenderInfo from "./SenderInfo/SenderInfo";
import Messages from "./Messages/Messages";
import InputBox from "./InputBox/InputBox";
import Divider from "./Divider/Divider";

import { SidebarContext } from "../../context/SidebarContext";
import { ChatContext } from "../../context/ChatContext";
import "./ChatPanel.scss";

const ChatPanel = ({ showPanel, setShowPanel }) => {
  const { data } = useContext(ChatContext);
  const { isMobile, sidebarOpen } = useContext(SidebarContext);
  return (
    <div
      className={`${
        isMobile
          ? !sidebarOpen
            ? "chatpanel_mobile"
            : "chatpanel-hide"
          : "chatpanel"
      }`}
    >
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
