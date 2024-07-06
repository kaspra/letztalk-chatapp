import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../../firebase";
import { images } from "../../constants";
import "./Login.scss";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      setInterval(() => {
        setErr(false);
      }, 5000);
    }
  };

  return (
    <div className="login">
      <div className="login_card">
        <img src={images.logo} alt="Logo" />
        <h4>Login</h4>
        <div className="login_card-con">
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input
              type="password"
              placeholder="Password"
              autoComplete="on"
              required
            />
            <button>Sign In</button>
            <Link to={"/reset-password"}>Forgot Password?</Link>
            {err && <span className="error">Check Details Correctly!</span>}
          </form>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
