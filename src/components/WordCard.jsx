// src/components/WordCard.jsx
import './WordCard.css';

const WordCard = ({ word: { english, transcription, russian, tags } }) => {
  return (
    <div className="word-card">
      <h2 className="word-title">{english}</h2>
      <p><strong>Транскрипция:</strong> {transcription}</p>
      <p><strong>Перевод:</strong> {russian}</p>
      {tags && <p className="word-tags"><em>{tags}</em></p>}
    </div>
  );
};


export default WordCard;
