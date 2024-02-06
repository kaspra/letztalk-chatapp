import React, { useContext } from "react";

import { ChatContext } from "../../../context/ChatContext";
import { images } from "../../../constants";
import "./SenderInfo.scss";

const SenderInfo = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="senderinfo">
      {data && (
        <div className="senderinfo_con">
          {data.user.photoURL ? (
            <img src={data.user?.photoURL} />
          ) : (
            <img src={images.default_profile} />
          )}{" "}
          <span>{data.user?.displayName}</span>{" "}
        </div>
      )}
    </div>
  );
};

export default SenderInfo;
