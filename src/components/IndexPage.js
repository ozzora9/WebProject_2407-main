import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to the Fashion Style Test</h1>
      <Link to="/test">Start Test</Link>
    </div>
  );
};

export default IndexPage;
