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
} from "firebase/firestore";

import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { images } from "../../../constants";
import "./Search.scss";

const Search = ({ chats, setChats }) => {
  // --- Search for users in database ---

  const [username, setUsername] = useState("");
  // const [user, setUser] = useState(null);
  // const [err, setErr] = useState(false);
  // const [typing, setTyping] = useState(false);

  // let typingTimeout;

  // const { currentUser } = useContext(AuthContext);

  // const handleSearch = async () => {
  //   setUser(null);
  //   setErr(false);

  //   if (username.trim() === "") {
  //     return;
  //   }

  //   const q = query(
  //     collection(db, "users"),
  //     where("displayName", "==", username)
  //   );
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     console.log(
  //       "Query Snapshot:",
  //       querySnapshot.docs.map((doc) => doc.data())
  //     );

  //     if (!querySnapshot.empty) {
  //       const userDoc = querySnapshot.docs[0];
  //       setUser(userDoc.data());

  //       clearTimeout(typingTimeout);
  //       typingTimeout = setTimeout(() => {
  //         setUser(null);
  //       }, 10000);
  //     } else {
  //       setErr(true);
  //       setTimeout(() => {
  //         setErr(false);
  //       }, 5000);
  //     }
  //   } catch (err) {
  //     setErr(true);
  //     setTimeout(() => {
  //       setErr(false);
  //     }, 5000);
  //   }
  // };

  // useEffect(() => {
  //   setTyping(true);

  //   const delaySearch = setTimeout(() => {
  //     if (username.trim() !== "") {
  //       handleSearch();
  //       setTyping(false);
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(delaySearch);
  //     setTyping(false);
  //   };
  // }, [username]);

  // const handleSelect = async () => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) {}

  //   setUser(null);
  //   setUsername("");
  // };

  // write a program to search the users in the chats array and filter it for the setChats
  const handleSearch = () => {
    const filteredChats = chats.filter((chat) =>
      chat.userInfo.displayName.toLowerCase().includes(username.toLowerCase())
    );
    setChats(filteredChats);
  };

  return (
    <div className="search">
      <div className="search_con">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </form>
        {/* {err && <span className="err">User not found!</span>}
        {user && (
          <div className="chatbox" onClick={handleSelect}>
            {user.photoURL ? (
              <img src={user.photoURL} />
            ) : (
              <img src={images.default_profile} />
            )}
            <span>{user.displayName}</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Search;
