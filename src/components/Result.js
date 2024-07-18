import React from "react";
import "../styles/Result.css";

const Result = ({ style }) => {
  if (!style) {
    return <div>No style selected.</div>;
  }

  return (
    <div className="result-container">
      <div className="image-section">
        <img src={style.image} alt={style.name} />
      </div>
      <div className="content-section">
        <h1 className="title">Your Type is</h1>
        <h2 className="subtitle">{style.name}</h2>
        <p className="description">{style.description}</p>
        <button className="trend-button">MORE ABOUT {style.name.toUpperCase()} STYLE</button>
      </div>
    </div>
  );
};

export default Result;
