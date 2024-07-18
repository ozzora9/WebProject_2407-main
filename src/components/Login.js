import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"; // React Router 사용

function LoginPage({ setLoginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoginStatus(true);
      console.log("로그인 성공:", userCredential.user);
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-float-container">
        <h1>Sleek</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            <span>email</span>
            <input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>password</span>
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <div className="additional-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/SignupPage">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
