import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { images } from "../../constants";
import "./AddUser.scss";
import { AppContext } from "../../context/AddUserContext";

const AddUser = () => {
  const { closeAddUser } = useContext(AppContext);
  const [username, setUsername] = useState("Praveen");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [typing, setTyping] = useState(false);

  let typingTimeout;

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setUser(null);
    setErr(false);

    if (username.trim() === "") {
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      console.log(
        "Query Snapshot:",
        querySnapshot.docs.map((doc) => doc.data())
      );

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser(userDoc.data());

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setUser(null);
        }, 10000);
      } else {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 5000);
      }
    } catch (err) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };

  useEffect(() => {
    setTyping(true);

    const delaySearch = setTimeout(() => {
      if (username.trim() !== "") {
        handleSearch();
        setTyping(false);
      }
    }, 500);

    return () => {
      clearTimeout(delaySearch);
      setTyping(false);
    };
  }, [username]);

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
    closeAddUser();
  };

  return (
    <div className="search">
      <div className="search_con">
        <div className="search_con-icon">
          <RxCross2
            onClick={() => closeAddUser()}
            color={"#222831"}
            size={20}
            fontWeight={"bold"}
            cursor={"pointer"}
          />
        </div>
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            style={{ background: "#222831", color: "#eeeeee" }}
          />
        </form>
        {err && <span className="err">User Not Found!</span>}
        {user && (
          <div className="chatbox" onClick={handleSelect}>
            {user.photoURL ? (
              <img src={user.photoURL} />
            ) : (
              <img src={images.default_profile} />
            )}
            <span>{user.displayName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
