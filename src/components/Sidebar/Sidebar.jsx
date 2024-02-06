import React from "react";

import { useGlobalContext } from "../../context/SidebarContext";
import NavInfo from "./NavInfo/NavInfo";
import Search from "./Search/Search";
import ChatList from "./ChatList/ChatList";
import "./Sidebar.scss";

const Sidebar = ({ showPanel, setShowPanel }) => {
  return (
    <div className="sidebar">
      <NavInfo />
      <Search />
      <ChatList setShowPanel={setShowPanel} />
    </div>
  );
};

export default Sidebar;
