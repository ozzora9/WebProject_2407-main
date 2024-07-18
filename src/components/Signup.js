import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "../styles/Login.css";
import "./Home.css";

function SignupPage({ setLoginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore에 사용자 정보 저장
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: email,
        password: password, // 실제 프로젝트에서는 비밀번호를 암호화하여 저장해야 합니다.
      });

      setLoginStatus(true);
      console.log("회원가입 성공:", user);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-float-container">
        <h1>Sleek</h1>
        <form className="login-form" onSubmit={handleSignup}>
          <label>
            <span>email</span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>password</span>
            <input
              placeholder="PW"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
