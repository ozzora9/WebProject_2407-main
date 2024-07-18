import React, { useState } from "react";

const data = {
  casual: [
    "https://via.placeholder.com/200?text=Casual+1",
    "https://via.placeholder.com/200?text=Casual+2",
    "https://via.placeholder.com/200?text=Casual+3",
    "https://via.placeholder.com/200?text=Casual+4",
    "https://via.placeholder.com/200?text=Casual+5",
    "https://via.placeholder.com/200?text=Casual+6",
    "https://via.placeholder.com/200?text=Casual+7",
    "https://via.placeholder.com/200?text=Casual+8",
    "https://via.placeholder.com/200?text=Casual+9",
    "https://via.placeholder.com/200?text=Casual+10",
  ],
  formal: [
    "https://via.placeholder.com/200?text=Formal+1",
    "https://via.placeholder.com/200?text=Formal+2",
    "https://via.placeholder.com/200?text=Formal+3",
    "https://via.placeholder.com/200?text=Formal+4",
    "https://via.placeholder.com/200?text=Formal+5",
    "https://via.placeholder.com/200?text=Formal+6",
    "https://via.placeholder.com/200?text=Formal+7",
    "https://via.placeholder.com/200?text=Formal+8",
    "https://via.placeholder.com/200?text=Formal+9",
    "https://via.placeholder.com/200?text=Formal+10",
  ],
  sport: [
    "https://via.placeholder.com/200?text=Sport+1",
    "https://via.placeholder.com/200?text=Sport+2",
    "https://via.placeholder.com/200?text=Sport+3",
    "https://via.placeholder.com/200?text=Sport+4",
    "https://via.placeholder.com/200?text=Sport+5",
    "https://via.placeholder.com/200?text=Sport+6",
    "https://via.placeholder.com/200?text=Sport+7",
    "https://via.placeholder.com/200?text=Sport+8",
    "https://via.placeholder.com/200?text=Sport+9",
    "https://via.placeholder.com/200?text=Sport+10",
  ],
};

function Category() {
  const [category, setCategory] = useState("casual");
  return (
    <div className="Category">
      <div className="Ctg-buttons">
        <button onClick={() => setCategory("casual")}>Casual</button>
        <button onClick={() => setCategory("formal")}>Formal</button>
        <button onClick={() => setCategory("sport")}>Sport</button>
      </div>
      <div className="Ctg-grid-container">
        {data[category].map((image, index) => (
          <div key={index} className="grid-item">
            <img src={image} alt={`${category} ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
