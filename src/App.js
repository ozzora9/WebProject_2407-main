import React, { useState } from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PhotoGallery from "./components/PhotoGallery";
import FirstPage from "./components/FirstPage";
import Home from "./components/Home";
import Select from "./components/SelectPage";
import MyPage from "./components/MyPage";
import Result from "./components/Result";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
// import Progress from "./components/Progress"; // 프로그레스 바 컴포넌트 import
// import PhotoGrid from "./components/PhotoGrid"; // 사진 그리드 컴포넌트 import
// import TestPage from "./components/TestPage"; // TestPage 컴포넌트 import

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Router>
      <Header loginStatus={loginStatus} />
      <Routes>
        {/* <Route path="/PhotoGallery" element={<PhotoGallery />} /> */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/Result/:styleName" element={<Result />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route
          path="/Signup"
          element={<Signup setLoginStatus={setLoginStatus} />}
        />
        <Route
          path="/Login"
          element={<Login setLoginStatus={setLoginStatus} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
