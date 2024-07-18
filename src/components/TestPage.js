import React, { useState, useEffect } from "react";
import axios from "axios";
import Progress from "./Progress";
import Results from "./Result";
import "../App.css";

const TestPage = ({ onSubmit }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [step, setStep] = useState(1);
  const [excludedPhotoIds, setExcludedPhotoIds] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const totalSteps = 10;

  // 서버에서 랜덤 사진 가져오기
  const fetchPhotos = async (excludedIds) => {
    try {
      const response = await axios.post('http://localhost:5001/api/random-photos', { excluded_ids: excludedIds });
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos([]);
  }, []);

  // 사진 선택 핸들러
  const toggleSelection = (photoId) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  // 다음 단계로 이동 핸들러
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      const newExcludedIds = [...excludedPhotoIds, ...photos.map(photo => photo.id)];
      setExcludedPhotoIds(newExcludedIds);
      fetchPhotos(newExcludedIds);
    } else {
      setShowResults(true);
      onSubmit(selectedPhotos);
    }
  };

  return (
    <div className="App">
      {!showResults ? (
        <>
          <Progress step={step} totalSteps={totalSteps} />
          <div>
            <h1>Select Your Preferred Photos</h1>
            <div className="photo-grid">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`photo ${selectedPhotos.includes(photo.id) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(photo.id)}
                >
                  <img src={photo.url} alt="Photo" width="200" />
                </div>
              ))}
            </div>
            <button onClick={handleNextStep}>Next</button>
          </div>
        </>
      ) : (
        <Results selectedPhotos={selectedPhotos} />
      )}
    </div>
  );
};

export default TestPage;
