import React, { useState } from "react";
import "./index.css";

const WordCard = ({ word: { english, transcription, russian }, onClose }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleClose = (event) => {
    event.stopPropagation();
    onClose?.();
  };

  const CloseButton = () => (
    <button
      className="close-icon-btn"
      onClick={handleClose}
      aria-label="Закрыть карточку"
    >
      &times;
    </button>
  );

  return (
    <div className="card-wrapper">
      <div
        className={`card-container ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="card">
          <div className="front">
            <CloseButton />
            <h2 className="word">{english}</h2>
            <p className="transcription">{transcription}</p>
            <button
              className="show-btn"
              onClick={(event) => {
                event.stopPropagation();
                handleFlip();
              }}
            >
              Показать перевод
            </button>
          </div>

          <div className="back">
            <CloseButton />
            <p className="translation">{russian}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
