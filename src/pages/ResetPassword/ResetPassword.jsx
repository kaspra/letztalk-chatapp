import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../firebase";
import { images } from "../../constants";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus("success");
    } catch (error) {
      setResetStatus("error");
    }
  };

  return (
    <div className="reset_pass">
      <div className="reset_pass-box">
        <div className="reset_pass-top">
          <a href="/">
            <img src={images.backarrow} alt="" />
          </a>
          {/* <span>LetzTalk</span> */}
          <img className="reset_pass-logo" src={images.logo} />
          <img src={images.attach} style={{ visibility: "hidden" }} />
        </div>
        <div className="reset_pass-con">
          <span>Reset Password</span>
          <div className="reset_pass-mail">
            <p>Email</p>
            <input
              type="email"
              required
              placeholder="john@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="reset_pass-btn">
            <button type="button" onClick={handlePasswordReset}>
              Continue
            </button>
            {resetStatus === "success" && (
              <p>Password reset email sent. Check your inbox.</p>
            )}
            {resetStatus === "error" && (
              <p>Error! Sending password reset email</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
