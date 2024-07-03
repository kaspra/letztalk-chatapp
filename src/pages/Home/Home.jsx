import React, { useContext, useState } from "react";

import { AddUser } from "../../components";
import { Sidebar, ChatPanel } from "../../components";
import { AppContext } from "../../context/AddUserContext";
import "./Home.scss";

const Home = () => {
  const [showPanel, setShowPanel] = useState(false);
  const { addUser } = useContext(AppContext);
  return (
    <div className="home">
      <div className="home_con">
        <Sidebar showPanel={showPanel} setShowPanel={setShowPanel} />
        <ChatPanel showPanel={showPanel} setShowPanel={setShowPanel} />
        {addUser && <AddUser />}
      </div>
    </div>
  );
};

export default Home;
