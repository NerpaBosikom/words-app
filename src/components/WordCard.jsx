// src/components/WordCard.jsx
import React, { useState } from "react";
import "./WordCard.css";

const WordCard = ({ word: { english, transcription, russian }, onClose }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev); // теперь переключается туда-сюда
  };

  return (
    <div className="card-wrapper">
      <div className={`card-container ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
        <div className="card">
          <div className="front">
            <h2 className="word">{english}</h2>
            <p className="transcription">{transcription}</p>
            {!flipped && (
              <button className="show-btn" onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
                Показать перевод
              </button>
            )}
          </div>
          <div className="back">
            <p className="translation">{russian}</p>
          </div>
        </div>
      </div>
      {onClose && (
        <button className="close-btn" onClick={onClose}>Закрыть карточку</button>
      )}
    </div>
  );
};

export default WordCard;
