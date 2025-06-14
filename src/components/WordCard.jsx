// src/components/WordCard.jsx
import React, { useState } from "react";
import "./WordCard.css";

const WordCard = ({ word, onClose }) => {
  const { english, transcription, russian } = word;
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(prev => !prev);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <div className="card-wrapper">
      <div
        className={`card-container ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="card">
          <div className="front">
            <button
              className="close-icon-btn"
              onClick={handleClose}
              aria-label="Закрыть карточку"
            >
              &times;
            </button>
            <h2 className="word">{english}</h2>
            <p className="transcription">{transcription}</p>
            <button
              className="show-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
            >
              Показать перевод
            </button>
          </div>

          <div className="back">
            <button
              className="close-icon-btn"
              onClick={handleClose}
              aria-label="Закрыть карточку"
            >
              &times;
            </button>
            <p className="translation">{russian}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
