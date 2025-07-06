import { useContext } from "react";
import WordSlider from "../components/word/slider";
import { WordsContext } from "../context/WordsContext";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Game = () => {
  const { words, loading, error } = useContext(WordsContext);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return <WordSlider words={words} initialIndex={0} />;
};

export default Game;
