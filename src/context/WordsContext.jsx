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
  const addWord = async (newWord) => {
    try {
      const res = await fetch("https://itgirlschool.justmakeit.ru/api/words/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWord),
      });
      if (!res.ok) throw new Error("Ошибка при добавлении");
  
      const createdWord = await res.json();
      setWords((prev) => [...prev, createdWord]);
    } catch (err) {
      console.error("Ошибка добавления:", err);
      setError("Не удалось добавить слово");
    }
  };
  

  const updateWord = async (updatedWord) => {
    try {
      const res = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWord),
      });
      if (!res.ok) throw new Error("Ошибка при обновлении слова");
  
      const savedWord = await res.json(); // получаем слово с сервера
      setWords((prev) =>
        prev.map((word) => (word.id === savedWord.id ? savedWord : word))
      );
    } catch (err) {
      console.error("Ошибка обновления:", err);
      setError("Не удалось обновить слово");
    }
  };
  

  const deleteWord = async (id) => {
    try {
      const res = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка при удалении");
  
      setWords((prev) => prev.filter((word) => word.id !== id));
    } catch (err) {
      console.error("Ошибка удаления:", err);
      setError("Не удалось удалить слово");
    }
  };
  

  return (
    <WordsContext.Provider
      value={{ words, loading, error, addWord, updateWord, deleteWord }}
    >
      {children}
    </WordsContext.Provider>
  );
};


