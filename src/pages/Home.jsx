// src/pages/Home.jsx
import { useState } from "react";
import WordList from "../components/WordList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WordCard from "../components/WordCard";
import wordsData from "../data/words";

const Home = () => {
  const [words, setWords] = useState(wordsData);
  const [selectedWord, setSelectedWord] = useState(null);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleCloseCard = () => {
    setSelectedWord(null);
  };

  return (
    <>
      <Header />
      <main>
        {selectedWord ? (
          <>
            <WordCard word={selectedWord} />
            <button onClick={handleCloseCard}>Закрыть карточку</button>
          </>
        ) : (
          <WordList words={words} onSelectWord={handleSelectWord} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
