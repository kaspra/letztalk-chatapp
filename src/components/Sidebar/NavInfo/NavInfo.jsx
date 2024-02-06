import React, { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { images } from "../../../constants";
import { Link } from "react-router-dom";
import "./NavInfo.scss";

const NavInfo = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navinfo">
      <div className="navinfo_con">
        <img src={images.logo} />
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
  );
};

export default NavInfo;
