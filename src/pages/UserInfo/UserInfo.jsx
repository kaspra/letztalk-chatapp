import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { images } from "../../constants";
import "./UserInfo.scss";

const UserProfile = ({ currentUser }) => {
  return (
    <div className="userinfo-profile">
      <div className="userinfo-profileImg">
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt={currentUser.displayName} />
        ) : (
          <img src={images.default_profile} />
        )}
      </div>
      <div className="userinfo-col">
        <div className="userinfo-con">
          <FaUser size={24} />
          <span>{currentUser.displayName}</span>
        </div>
        <div className="userinfo-con">
          <MdEmail size={24} />
          <span>{currentUser.email}</span>
        </div>
        <div className="userinfo-btn">
          <a href="/reset-password" className="reset_btn">
            Password Reset
          </a>
        </div>
      </div>
    </div>
  );
};

const Logout = () => {
  return (
    <div className="userinfo-logout">
      <button onClick={() => signOut(auth)}>
        <a href="/login" className="btn-logout">
          Logout
        </a>
      </button>
    </div>
  );
};

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="userinfo">
      <div className="userinfo_redirect">
        <a href="/">
          <IoMdArrowRoundBack size={24} color="white" />
        </a>
        <Logout />
      </div>
      <div className="userinfo_con">
        <UserProfile currentUser={currentUser} />
      </div>
    </div>
  );
};

export default UserInfo;
