import React, { useState, useContext } from "react";
import { WordsContext } from "../../../context/WordsContext";
import Loader from "../../Loader";
import Error from "../../Error";
import "./index.css";

const WordList = ({ onSelectWord }) => {
  const { words, loading, error, updateWord, deleteWord } = useContext(WordsContext);

  const [editingWordId, setEditingWordId] = useState(null);
  const [editedWord, setEditedWord] = useState({});

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
    updateWord(editedWord);
    setEditingWordId(null);
    setEditedWord({});
  };

  const handleDelete = (id) => {
    deleteWord(id);
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
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
                      <button onClick={() => onSelectWord(word)}>📄</button> {/* Кнопка карточки */}
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
  );
};

export default WordList;
