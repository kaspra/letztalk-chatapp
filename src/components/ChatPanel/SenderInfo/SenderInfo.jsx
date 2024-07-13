import React, { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { SidebarContext } from "../../../context/SidebarContext";
import { ChatContext } from "../../../context/ChatContext";
import { images } from "../../../constants";
import "./SenderInfo.scss";

const SenderInfo = () => {
  const { data } = useContext(ChatContext);
  const { isMobile, openSidebar } = useContext(SidebarContext);

  return (
    <div className="senderinfo">
      {data && (
        <div className="senderinfo_con">
          {isMobile && (
            <div className="senderinfo_con-back" onClick={openSidebar}>
              <IoIosArrowBack />
            </div>
          )}
          <div className="senderinfo_con-detail">
            {data.user.photoURL ? (
              <img src={data.user?.photoURL} />
            ) : (
              <img src={images.default_profile} />
            )}
            <span>{data.user?.displayName}</span>
          </div>
          {isMobile && (
            <div
              className="senderinfo_con-back"
              style={{ visibility: "hidden" }}
            >
              <IoIosArrowBack />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SenderInfo;
