import React, { useState } from "react";
import WordCard from "../card";
import "./index.css";
;

const WordSlider = ({ words = [], initialIndex = 0, onCloseCard }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fade, setFade] = useState(false);

  const handleSwitch = (newIndex) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 300); // должна совпадать с CSS
  };

  const handleNext = () => {
    const nextIndex = currentIndex < words.length - 1 ? currentIndex + 1 : 0;
    handleSwitch(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : words.length - 1;
    handleSwitch(prevIndex);
  };

  if (!words.length) {
    return <p className="message">Слов пока нет 🫤</p>;
  }

  return (
    <div className="slider-container">
      <button className="arrow-btn" onClick={handlePrev}>&larr;</button>

      <div className="card-wrapper-with-counter">
        <div className={`card-fade-wrapper ${fade ? "fade" : ""}`}>
          <WordCard word={words[currentIndex]} onClose={onCloseCard} />
        </div>
        <div className="counter">
          {currentIndex + 1} / {words.length}
        </div>
      </div>

      <button className="arrow-btn" onClick={handleNext}>&rarr;</button>
    </div>
  );
};

export default WordSlider;
