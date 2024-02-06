import React, { useContext, useEffect, useRef } from "react";
import { format } from "date-fns";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { images } from "../../../constants";
import "./Messages.scss";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const messageDate = message.date.toDate();

  let formattedTime = format(messageDate, "hh:mm a");

  const profile_img =
    message.senderId === currentUser.uid
      ? currentUser.photoURL || images.default_profile
      : (data.user && data.user.photoURL) || images.default_profile;

  const extractImageName = (img) => {
    if (!img) return "";

    if (img.includes(".")) {
      const parts = img.split(".");
      const urlname = parts.slice(0, -1).join(".");

      const backslash = urlname.split("/");
      const fileName = backslash[backslash.length - 1];

      return fileName;
    }

    return img;
  };
  const imageName = extractImageName(message.img);

  const isImage = (imageName) => {
    const imgExt = ["jpg", "jpeg", "png", "gif"];
    const ext = imageName.split(".").pop().toLowerCase();

    return imgExt.includes(ext);
  };

  const Image = () => {
    if (message.img) {
      if (message.img && isImage(imageName)) {
        return (
          <a href={message.img} target="_blank" rel="noopener noreferrer">
            <img src={message.img} />
          </a>
        );
      } else {
        return (
          <a href={message.img} target="_blank">
            <img src={images.fileimage} alt="File" />
          </a>
        );
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message_info">
        <img src={profile_img} />
      </div>
      <div className="message_con">
        {Image()}
        <div className="message_text">
          <p>{message.btext}</p>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
