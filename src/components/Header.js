import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

function Header({ loginStatus }) {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/">Sleek</Link>
      </div>
      <div className="menuBar">
        <Link to="/home">Home</Link>
        <Link to="/select">Select</Link>
        <span>|</span>
        <Link to="/mypage">MyPage</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Header;
