import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import Home from "./components/Home";
import Select from "./components/SelectPage";
import MyPage from "./components/MyPage";
import Result from "./components/Result";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login";
import Header from "./components/Header";
import Progress from "./components/Progress"; // 프로그레스 바 컴포넌트 import
import PhotoGrid from "./components/PhotoGrid"; // 사진 그리드 컴포넌트 import
import TestPage from "./components/TestPage"; // TestPage 컴포넌트 import

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [step, setStep] = useState(1);
  const [excludedPhotoIds, setExcludedPhotoIds] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  const totalSteps = 10;

  // 사진 데이터 가져오기
  const fetchPhotos = async (excludedIds) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/random-photos",
        { excluded_ids: excludedIds }
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos([]);
  }, []);

  // 사용자 선택 처리
  const handlePhotoClick = (photoId) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  // 가장 많이 선택된 스타일을 찾는 함수
  const getMostSelectedStyle = () => {
    if (selectedPhotos.length === 0) return null;

    // 선택된 사진의 스타일들을 모음
    const styleCount = {};
    selectedPhotos.forEach((photoId) => {
      const photo = photos.find((p) => p.id === photoId);
      if (photo && photo.style) {
        if (!styleCount[photo.style]) {
          styleCount[photo.style] = 1;
        } else {
          styleCount[photo.style]++;
        }
      }
    });

    // 가장 많이 선택된 스타일을 찾음
    const mostSelectedStyle = Object.keys(styleCount).reduce((a, b) =>
      styleCount[a] > styleCount[b] ? a : b
    );

    return photos.find((p) => p.style === mostSelectedStyle);
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      // 이전에 선택된 사진들의 ID를 제외하고 다시 사진을 불러옴
      const newExcludedIds = [
        ...excludedPhotoIds,
        ...photos.map((photo) => photo.id),
      ];
      setExcludedPhotoIds(newExcludedIds);
      fetchPhotos(newExcludedIds);
    } else {
      setShowResults(true);
    }
  };

  // TestPage에서의 onSubmit 함수
  const handleSubmitTest = (selectedPhotos) => {
    setSelectedPhotos(selectedPhotos);
    setShowResults(true);
  };

  return (
    <Router>
      <Header loginStatus={loginStatus} />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Select" element={<Select />} />
        <Route
          path="/Result"
          element={<Result style={getMostSelectedStyle()} />}
        />
        <Route path="/MyPage" element={<MyPage />} />
        <Route
          path="/SignupPage"
          element={<SignupPage setLoginStatus={setLoginStatus} />}
        />
        <Route
          path="/LoginPage"
          element={<LoginPage setLoginStatus={setLoginStatus} />}
        />
        <Route
          path="/Test"
          element={<TestPage photos={photos} onSubmit={handleSubmitTest} />}
        />
      </Routes>
      <div className="App">
        {!showResults && step <= totalSteps ? (
          <>
            <Progress step={step} totalSteps={totalSteps} />
            <PhotoGrid
              photos={photos}
              selectedPhotos={selectedPhotos}
              onPhotoClick={handlePhotoClick}
            />
            <button onClick={handleNextStep}>다음</button>
          </>
        ) : (
          <Result style={getMostSelectedStyle()} />
        )}
      </div>
    </Router>
  );
};

export default App;
