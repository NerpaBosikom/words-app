import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WordCard from "../card";
import "./index.css";
;

const WordSlider = ({ words = [], initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const total = words.length;
  const word = words[currentIndex];

  const handleSwitch = (newIndex) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 300);
  };

  const handleNext = () => handleSwitch((currentIndex + 1) % total);
  const handlePrev = () => handleSwitch((currentIndex - 1 + total) % total);

  const handleClose = () => navigate("/");

  if (!total) {
    return <p className="message">Слов пока нет 🫤</p>;
  }

  return (
    <div className="slider-container">
      <button className="arrow-btn" onClick={handlePrev}>&larr;</button>

      <div className="card-wrapper-with-counter">
        <div className={`card-fade-wrapper ${fade ? "fade" : ""}`}>
          <WordCard word={word} onClose={handleClose} />
        </div>
        <div className="counter">
          {currentIndex + 1} / {total}
        </div>
      </div>

      <button className="arrow-btn" onClick={handleNext}>&rarr;</button>
    </div>
  );
};


export default WordSlider;
