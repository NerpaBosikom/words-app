import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WordList from "../components/word/list";
import WordCard from "../components/word/card";
import wordsData from "../data/words";

const Home = () => {
  const [words] = useState(wordsData);
  const [selectedWord, setSelectedWord] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Когда заходим на главную — сбрасываем выбранное слово
    setSelectedWord(null);
  }, [location]);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleCloseCard = () => {
    setSelectedWord(null);
  };

  return (
    <div>
      {selectedWord ? (
        <WordCard word={selectedWord} onClose={handleCloseCard} />
      ) : (
        <WordList words={words} onSelectWord={handleSelectWord} />
      )}
    </div>
  );
};

export default Home;
