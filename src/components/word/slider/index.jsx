import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WordCard from "../card";
import "./index.css";

const WordSlider = ({ words = [], initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fade, setFade] = useState(false);
  const [learned, setLearned] = useState(new Set());
  const [resetTrigger, setResetTrigger] = useState(0);

  const navigate = useNavigate();
  const total = words.length;

  if (!total) return <p className="message">Слов пока нет 🫤</p>;

  const { id, ...word } = words[currentIndex];

  const handleFirstFlip = () => {
    if (!learned.has(id)) {
      setLearned((prev) => new Set(prev).add(id));
    }
  };

  const handleSwitch = (newIndex) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setResetTrigger((prev) => prev + 1);
      setFade(false);
    }, 300);
  };

  const handleNext = () => handleSwitch((currentIndex + 1) % total);
  const handlePrev = () => handleSwitch((currentIndex - 1 + total) % total);
  const handleClose = () => navigate("/");

  return (
    <div className="slider-container">
      <button className="arrow-btn" onClick={handlePrev}>&larr;</button>

      <div className="card-wrapper-with-counter">
        <div className={`card-fade-wrapper ${fade ? "fade" : ""}`}>
          <WordCard
            key={id}
            word={{ id, ...word }}
            onClose={handleClose}
            onFirstFlip={handleFirstFlip}
            resetTrigger={resetTrigger}
          />
        </div>
        <div className="counter">
          {currentIndex + 1} / {total} | Изучено: {learned.size}
        </div>
      </div>

      <button className="arrow-btn" onClick={handleNext}>&rarr;</button>
    </div>
  );
};

export default WordSlider;
