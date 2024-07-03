import React, { useContext } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

import { AuthContext } from "../../../context/AuthContext";
import { images } from "../../../constants";
import { Link } from "react-router-dom";
import "./NavInfo.scss";
import { AppContext } from "../../../context/AddUserContext";

const NavInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const { openAddUser } = useContext(AppContext);

  return (
    <div className="navinfo">
      <div className="navinfo_con">
        <img src={images.logo} />
        <div className="navinfo_con-box">
          <IoPersonAddSharp
            color={`#eeeeee`}
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => openAddUser()}
          />
          <div className="navinfo_con-user">
            <Link to={"/user"}>
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              ) : (
                <img src={images.default_profile} />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavInfo;
