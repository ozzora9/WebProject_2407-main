import React from "react";
import { useParams } from "react-router-dom";
import styles from "../data/styles";

const Result = () => {
  const { styleName } = useParams();
  console.log(styleName);
  const style = styles.find((s) => s.name === styleName);

  if (!style) {
    return <div>Style not found</div>;
  }

  return (
    <div className="result-container">
      <div className="type-image">
        <img src={style.image} alt={style.name} />
      </div>
      <div className="content-section">
        <h1 className="title">Your Type is</h1>
        <h2 className="subtitle">{style.name}</h2>
        <p className="description">{style.description}</p>
      </div>
    </div>
  );
};

export default Result;
