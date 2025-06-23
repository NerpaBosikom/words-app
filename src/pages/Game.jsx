// src/pages/Game.jsx
import { useState } from "react";
import WordSlider from "../components/word/slider";
import wordsData from "../data/words";

const Game = () => {
  const [words] = useState(wordsData);

  return <WordSlider words={words} initialIndex={0} />;
};

export default Game;
