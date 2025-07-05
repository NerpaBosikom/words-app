import React, { createContext, useEffect, useState } from "react";

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение слов с API
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch("https://itgirlschool.justmakeit.ru/api/words/");
        if (!res.ok) throw new Error("Ошибка при получении данных");
        const data = await res.json();
        setWords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  // Методы управления словами
  const addWord = (newWord) => {
    setWords((prev) => [...prev, newWord]);
  };

  const updateWord = (updatedWord) => {
    setWords((prev) =>
      prev.map((word) => (word.id === updatedWord.id ? updatedWord : word))
    );
  };

  const deleteWord = (id) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  return (
    <WordsContext.Provider
      value={{ words, loading, error, addWord, updateWord, deleteWord }}
    >
      {children}
    </WordsContext.Provider>
  );
};


