import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import wordStore from "../store/WordStore"; // импорт стора
import WordList from "../components/word/list";
import WordCard from "../components/word/card";
import AddWordForm from "../components/word/form/AddWordForm";

const Home = observer(() => {
  const [selectedWord, setSelectedWord] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setSelectedWord(null);
  }, [location]);

  // Загружаем слова при монтировании компонента
  useEffect(() => {
    wordStore.fetchWords();
  }, []);

  const handleSelectWord = (word) => setSelectedWord(word);
  const handleCloseCard = () => setSelectedWord(null);

  return (
    <div>
      {selectedWord ? (
        <WordCard word={selectedWord} onClose={handleCloseCard} />
      ) : (
        <>
          <AddWordForm />
          <WordList words={wordStore.words} onSelectWord={handleSelectWord} />
        </>
      )}
    </div>
  );
});

export default Home;
