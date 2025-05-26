import WordCard from "./WordCard";


const WordList = ({ words }) => {
  return (
    <div className="word-list">
      {words.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
};

export default WordList;
