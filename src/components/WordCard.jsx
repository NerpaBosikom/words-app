// src/components/WordCard.jsx
import './WordCard.css';

const WordCard = ({ word }) => {
  return (
    <div className="word-card">
      <h2 className="word-title">{word.english}</h2>
      <p><strong>Транскрипция:</strong> {word.transcription}</p>
      <p><strong>Перевод:</strong> {word.russian}</p>
      {word.tags && <p className="word-tags"><em>{word.tags}</em></p>}
    </div>
  );
};

export default WordCard;
