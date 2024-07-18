import React from "react";
import { Link } from "react-router-dom";

function Home({ value, onChange }) {
  return (
    <div className="main-search">
      <div className="video-banner">
        <video autoPlay muted loop className="background-video">
          <source
            src="/assets/video/background.mp4"
            type="video/mp4"
            alt="hi"
          />
          Your browser does not support the video tag.
        </video>
        <form className="search-box" action="" method="get">
          <input
            className="search-txt"
            type="text"
            placeholder="Search for any trend or style"
            value={value}
            onChange={onChange}
            // 왜잇는지몰겟다
          />
          <button className="search-btn" type="submit">
            <img src="/assets/img/search-icon.svg" alt="search-icon" />
          </button>
        </form>
      </div>
      <div className="home-button-area">
        <Link to="/select" className="home-button">
          <button className="home-button-style">Make your Style</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
