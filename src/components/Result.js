import React from "react";

const Result = () => {
  return (
    <div className="result-container">
      <div className="type-image">
        <img src="/assets/img/classic1.jpg" alt="Hippie Look" />
      </div>
      <div className="content-section">
        <h1 className="title">Your Type is</h1>
        <h2 className="subtitle">Hippie Look</h2>
        <p className="description">
          히피 패션은 1960년대와 1970년대 미국에서 발생한 서브컬처에서 영향을
          받은 스타일입니다. 자연 친화적이고 평화로운 가치를 중시하는 이
          스타일은 자유롭고 편안한 착용감이 특징입니다.
        </p>
        <p className="description">
          넓고 편안한 플로럴 패턴의 드레스, 루즈한 티셔츠, 허밍버드 팬츠 등이
          대표적입니다. 자연적이고 따뜻한 색상과 유기농 면, 린넨 등의 소재가
          주로 사용됩니다.
        </p>
      </div>
      <div className="result-image">result, image </div>
    </div>
  );
};

export default Result;
