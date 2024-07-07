import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { auth, storage, db } from "../../firebase";
import { images } from "../../constants";
import "./Register.scss";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const listRef = ref(storage, "profile");
        const listResponse = await listAll(listRef);

        if (listResponse.items.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * listResponse.items.length
          );
          const randomImage = listResponse.items[randomIndex];
          const picURL = await getDownloadURL(randomImage);
          setProfilePic(picURL);
        } else {
          console.log("No profile Pic found");
        }
      } catch (error) {
        console.log("Error on Pic fetch: ", error.message);
      }
    };
    fetchProfilePic();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
        photoURL: profilePic,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        password,
        photoURL: profilePic,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setErr(true);
      setLoading(false);
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };
  return (
    <div className="register">
      <div className="register_card">
        <img src={images.logo} alt="Logo" />
        <h4>Register</h4>
        <div className="register_card-con">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input
              type="password"
              placeholder="Password"
              autoComplete="on"
              required
            />
            {/* <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => showprofile(e)}
            />
            <label id="picture" htmlFor="file">
              <img className="reg-defaultimg" src={images.addprofile} />
              <span>Add an Profile Picture</span>
            </label> */}
            <button>{!loading ? "Sign up" : "Loading..."}</button>
            {err && <span className="error">Check Details Correctly!</span>}
          </form>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
