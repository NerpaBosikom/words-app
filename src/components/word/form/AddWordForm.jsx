import { useState } from "react";
import wordStore from "../../../store/WordStore";
import "./AddWordForm.css"

const AddWordForm = () => {
  const [english, setEnglish] = useState("");
  const [russian, setRussian] = useState("");
  const [transcription, setTranscription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!english.trim() || !russian.trim() || !transcription.trim()) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }
    setError("");

    const newWord = {
      english,
      russian,
      transcription,
      tags,
      tags_json: tags,
      id: 0, // id сервер сам назначит
    };

    await wordStore.addWord(newWord);

    // Очистить форму после добавления
    setEnglish("");
    setRussian("");
    setTranscription("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-word-form">
  <input
    type="text"
    placeholder="English"
    value={english}
    onChange={(e) => setEnglish(e.target.value)}
    className="add-word-form__input"
  />
  <input
    type="text"
    placeholder="Russian"
    value={russian}
    onChange={(e) => setRussian(e.target.value)}
    className="add-word-form__input"
  />
  <input
    type="text"
    placeholder="Transcription"
    value={transcription}
    onChange={(e) => setTranscription(e.target.value)}
    className="add-word-form__input"
  />
  <input
    type="text"
    placeholder="Tags (через запятую)"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    className="add-word-form__input"
  />
  <button type="submit" className="add-word-form__button">
    Сохранить
  </button>
  {error && <p className="add-word-form__error">{error}</p>}
</form>

  );
};

export default AddWordForm;
