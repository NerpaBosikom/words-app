// src/pages/Home.jsx
import { useState } from "react";
import WordList from "../components/WordList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WordCard from "../components/WordCard";
import WordSlider from "../components/WordSlider"; // ✅ добавили импорт
import wordsData from "../data/words";

const Home = () => {
  const [words, setWords] = useState(wordsData);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isTrainingMode, setIsTrainingMode] = useState(false); // ✅ новое состояние

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleCloseCard = () => {
    setSelectedWord(null);
  };

  const toggleTrainingMode = () => {
    setIsTrainingMode((prev) => !prev);
    setSelectedWord(null); // сбрасываем выбор
  };

  return (
    <div className="layout">
      <Header />
      <main>
        <div className="mode-toggle">
          <button onClick={toggleTrainingMode}>
            {isTrainingMode ? "Выйти из тренировки" : "Начать тренировку"}
          </button>
        </div>

        {isTrainingMode ? (
          <WordSlider
            words={words}
            initialIndex={0}
            onCloseCard={() => setIsTrainingMode(false)} // выход из режима
          />
        ) : selectedWord ? (
          <WordCard word={selectedWord} onClose={handleCloseCard} />
        ) : (
          <WordList words={words} onSelectWord={handleSelectWord} />
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Home;
