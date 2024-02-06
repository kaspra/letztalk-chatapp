import React, { useState } from "react";

import { Sidebar, ChatPanel } from "../../components";
import "./Home.scss";

const Home = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="home">
      <div className="home_con">
        <Sidebar showPanel={showPanel} setShowPanel={setShowPanel} />
        <ChatPanel showPanel={showPanel} setShowPanel={setShowPanel} />
      </div>
    </div>
  );
};

export default Home;
