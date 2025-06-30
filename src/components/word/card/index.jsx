import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";

const CloseButton = ({ onClick }) => (
  <button className="close-icon-btn" onClick={onClick} aria-label="Закрыть карточку">
    &times;
  </button>
);

const WordCard = ({
  word: { english, transcription, russian },
  onClose,
  onFirstFlip,
  resetTrigger
}) => {
  const [flipped, setFlipped] = useState(false);
  const showBtnRef = useRef(null);

  useEffect(() => {
    showBtnRef.current?.focus(); // Фокус на кнопке при загрузке
  }, []);

  useEffect(() => {
    setFlipped(false); // Сброс при смене карточки
  }, [resetTrigger]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const handleShowTranslation = (event) => {
    event.stopPropagation();
    if (!flipped) onFirstFlip?.(); // Учёт первого переворота
    setFlipped(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose?.();
  };

  return (
    <div className="card-wrapper">
      <div className={`card-container ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
        <div className="card">
          <div className="front">
            <CloseButton onClick={handleClose} />
            <h2 className="word">{english}</h2>
            <p className="transcription">{transcription}</p>
            <button className="show-btn" ref={showBtnRef} onClick={handleShowTranslation}>
              Показать перевод
            </button>
          </div>
          <div className="back">
            <CloseButton onClick={handleClose} />
            <p className="translation">{russian}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
