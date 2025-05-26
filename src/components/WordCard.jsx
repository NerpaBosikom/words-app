const WordCard = ({ word }) => {
  return (
    <div className="word-card">
      <h3>{word.english}</h3>
      <p>{word.transcription}</p>
      <p>{word.russian}</p>
      <p><em>{word.tags}</em></p>
    </div>
  );
};

export default WordCard;