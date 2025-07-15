import React, { useState } from "react";
import Loader from "../../Loader";
import Error from "../../Error";
import "./index.css";
import { observer } from "mobx-react-lite";
import wordStore from "../../../store/WordStore";
import WordCard from "../card";

const WordList = ({ onSelectWord }) => {
  const { words, loading, error, updateWord, deleteWord } = wordStore;

  const [editingWordId, setEditingWordId] = useState(null);
  const [editedWord, setEditedWord] = useState({});

  const [selectedWord, setSelectedWord] = useState(null);
  const [cardResetTrigger, setCardResetTrigger] = useState(0);

  const isFieldEmpty = (value) => value.trim() === "";
  const hasErrors = Object.values(editedWord).some(isFieldEmpty);

  const handleEdit = (word) => {
    setEditingWordId(word.id);
    setEditedWord({ ...word });
  };

  const handleCancel = () => {
    setEditingWordId(null);
    setEditedWord({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setEditedWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (hasErrors) return;
    updateWord(editedWord.id, editedWord);
    setEditingWordId(null);
    setEditedWord({});
  };

  const handleDelete = (id) => {
    deleteWord(id);
  };

  // Открыть карточку выбранного слова
  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setCardResetTrigger((prev) => prev + 1);
  };

  // Закрыть карточку
  const handleCloseCard = () => {
    setSelectedWord(null);
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <>
      <table className="word-table">
        <thead>
          <tr>
            <th>Слово</th>
            <th>Транскрипция</th>
            <th>Перевод</th>
            <th>Опции</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => {
            const { id, english, transcription, russian } = word;
            const isEditing = editingWordId === id;

            return (
              <React.Fragment key={id}>
                <tr className="word-row">
                  {isEditing ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="english"
                          value={editedWord.english}
                          onChange={handleChange}
                          className={isFieldEmpty(editedWord.english) ? "input-error" : ""}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="transcription"
                          value={editedWord.transcription}
                          onChange={handleChange}
                          className={isFieldEmpty(editedWord.transcription) ? "input-error" : ""}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="russian"
                          value={editedWord.russian}
                          onChange={handleChange}
                          className={isFieldEmpty(editedWord.russian) ? "input-error" : ""}
                        />
                      </td>
                      <td>
                        <button onClick={handleSave} disabled={hasErrors}>💾</button>
                        <button onClick={handleCancel}>❌</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="word-cell">{english}</td>
                      <td className="word-cell">{transcription}</td>
                      <td className="word-cell">{russian}</td>
                      <td className="word-cell">
                        <button onClick={() => handleSelectWord(word)}>📄</button>
                        <button onClick={() => handleEdit(word)}>✏️</button>
                        <button onClick={() => handleDelete(id)}>❌</button>
                      </td>
                    </>
                  )}
                </tr>
                {isEditing && hasErrors && (
                  <tr>
                    <td colSpan="4" className="error-message">
                      Все поля должны быть заполнены
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {selectedWord && (
        <WordCard
          word={selectedWord}
          onClose={handleCloseCard}
          resetTrigger={cardResetTrigger}
          onFirstFlip={() => console.log("Переворот карточки")}
        />
      )}
    </>
  );
};

export default observer(WordList);
