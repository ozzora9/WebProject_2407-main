import React, { useState, useEffect } from "react";
import "../styles/MyPage.css";

const MyPage = () => {
  const [user, setUser] = useState({
    gender: "",
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    job_title: "",
  });

  useEffect(() => {
    // 사용자 정보 로드 (예: 사용자 ID가 1이라고 가정)
    fetch("http://localhost:5000/api/user/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("서버와의 통신 오류가 발생했습니다.");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User updated successfully", data);
        alert("변경 사항이 저장되었습니다.");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("변경 사항 저장에 실패했습니다.");
      });
  };

  return (
    <div className="my-page">
      <header>
        <h1>TAGWALK</h1>
        <nav>
          <ul>
            <li>COLLECTIONS</li>
            <li>MODELS</li>
            <li>TRENDS</li>
            <li>DATA PRODUCTS</li>
            <li>NEWSLETTER</li>
            <li>ABOUT US</li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>MY ACCOUNT</h2>
        <div className="content">
          <div className="image-section">
            <img src="fashion-model.jpg" alt="Fashion model" />
            <button type="button">MOODBOARDS</button>
            <button type="button" onClick={handleSubmit}>
              SAVE CHANGES
            </button>
            <button type="button" className="delete">
              DELETE ACCOUNT
            </button>
            <a href="#">Read the conditions</a>
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>GENDER *</label>
                <input
                  type="text"
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>FIRSTNAME</label>
                <input
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>LASTNAME</label>
                <input
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>EMAIL *</label>
                <input type="email" value={user.email} readOnly />
              </div>
              <div className="form-group">
                <label>COUNTRY *</label>
                <input
                  type="text"
                  name="country"
                  value={user.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>JOB TITLE *</label>
                <input
                  type="text"
                  name="job_title"
                  value={user.job_title}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
