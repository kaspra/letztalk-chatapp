import React, { useContext, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { IoIosSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";

import Emoji from "./Emoji";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db, storage } from "../../../firebase";
import "./InputBox.scss";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const [attachmentLabel, setAttachmentLabel] = useState(
    <CgAttachment size={18} />
  );
  const inputRef = useRef();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSelectEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
    inputRef.current.focus();
  };

  const handleImageUpload = async () => {
    if (!img) return null;

    const fileName = `sharedFiles/${currentUser.displayName}/${
      img.name
    }.${uuid()}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);

    try {
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      return null;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);

    if (selectedFile) {
      setAttachmentLabel(<span>{selectedFile.name.slice(0, 10)}</span>);
    }
  };

  const resetAttachedImage = () => {
    setAttachmentLabel(<CgAttachment size={18} />);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("");
    setImg(null);
    resetAttachedImage();

    const imageUrl = await handleImageUpload();

    if (!message && !imageUrl) {
      return;
    }

    const messageData = {
      id: uuid(),
      senderId: currentUser.uid,
      from: currentUser.displayName,
      to: data.user?.displayName,
      message,
      img: imageUrl,
      date: Timestamp.now(),
    };

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(
        imageUrl ? messageData : { ...messageData, img: null }
      ),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [`${data.chatId}.lastMessage`]: { message },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [`${data.chatId}.lastMessage`]: { message },
      [`${data.chatId}.date`]: serverTimestamp(),
    });
  };
  return (
    <div className="inputbox">
      <div className="inputbox_con">
        <form onSubmit={handleSend}>
          <input
            className="input_msg-box"
            type="text"
            placeholder="Write Something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            ref={inputRef}
          />
          <div className="input_btn">
            {/* Attachment Icon */}
            <div className="input_attach">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file" id="picture">
                {attachmentLabel}
              </label>
            </div>

            {/* Emoji Picker */}
            <Emoji onSelectEmoji={handleSelectEmoji} />

            {/* Send Button */}
            <div className="input_send">
              <button type="submit" style={{ display: "none" }} id="button">
                Send
              </button>
              <label htmlFor="button">
                <IoIosSend size={18} />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputBox;
