import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { images } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db, storage } from "../../../firebase";
import "./InputBox.scss";

const InputBox = () => {
  const [btext, setBText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleImageUpload = async () => {
    if (!img) return null;

    const fileName = `shared/${currentUser.displayName}/${img.name}.${uuid()}`;
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
      document.getElementById(
        "picture"
      ).innerHTML = `<span>${selectedFile.name.slice(0, 10)}</span>`;
    }
  };

  const resetAttachedImage = () => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 499;
    const imageElement = document.getElementById("picture");

    if (isMobile) {
      imageElement.innerHTML = `<img src=${images.attach} className="mobile-attach" />`;
    } else {
      imageElement.innerHTML = `<img src=${images.attach} className='attach' />`;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setBText("");
    setImg(null);
    resetAttachedImage();

    const imageUrl = await handleImageUpload();

    if (!btext) {
      return;
    }

    const messageData = {
      id: uuid(),
      btext,
      bFrom: currentUser.displayName,
      bTo: data.user?.displayName,
      senderId: currentUser.uid,
      date: Timestamp.now(),
      img: imageUrl,
    };

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(
        imageUrl ? messageData : { ...messageData, img: null }
      ),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [`${data.chatId}.lastMessage`]: { btext },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [`${data.chatId}.lastMessage`]: { btext },
      [`${data.chatId}.date`]: serverTimestamp(),
    });
  };
  return (
    <div className="inputbox">
      <div className="inputbox_con">
        <form onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Write Something"
            value={btext}
            onChange={(e) => setBText(e.target.value)}
            className="input_msg-box"
          />
          <div className="input_btn">
            <div className="input_attach">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file" id="picture">
                <img src={images.attach} />
              </label>
            </div>
            <div className="input_send">
              <button type="submit" style={{ display: "none" }} id="button">
                Send
              </button>
              <label htmlFor="button">
                <img src={images.sendbtn} />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputBox;
