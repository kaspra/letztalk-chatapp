import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { auth, storage, db } from "../../firebase";
import { images } from "../../constants";
import "./Register.scss";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const showprofile = (e) => {
    if (e.target.files[0]) {
      document.getElementById(
        "picture"
      ).innerHTML = `<img class='reg-userimg' src=${URL.createObjectURL(
        e.target.files[0]
      )} alt="" /> <span>${e.target.files[0].name} </span>`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      let photoURL = null;

      if (file) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `profile/${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(async () => {
          photoURL = await getDownloadURL(storageRef);
        });
      }

      await updateProfile(res.user, {
        displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        password,
        photoURL,
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
        <img src={images.white_logo} alt="Logo" />
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
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => showprofile(e)}
            />
            <label id="picture" htmlFor="file">
              <img className="reg-defaultimg" src={images.addprofile} />
              <span>Add an Profile Picture</span>
            </label>
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
