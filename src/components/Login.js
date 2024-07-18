import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setLoginStatus }) {
  const [email, setEmail] = useState(""); // username -> email
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // username -> email
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setLoginStatus(true);
        console.log("로그인 성공:", data.user);
      } else {
        alert(data.message);
      }
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
            <span>Email</span> {/* Username -> Email */}
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              placeholder="Password"
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
          <Link to="/Signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
