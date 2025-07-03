// src/components/WordList.jsx
import React, { useState } from "react";
import "./index.css";

const WordList = ({ words, onSelectWord }) => {
  const [editingWordId, setEditingWordId] = useState(null);
  const [editedWord, setEditedWord] = useState({});
  const [localWords, setLocalWords] = useState(words);

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
    // 1. Если есть хотя бы одно пустое поле — ничего не сохраняем
    if (hasErrors) {
      return;
    }
  
    // 2. ✅ Если все поля заполнены — логируем в консоль
    console.log("Сохранено слово:", editedWord);
  
    // 3. Сохраняем слово в локальный массив
    const updatedWords = localWords.map((word) =>
      word.id === editedWord.id ? editedWord : word
    );
    setLocalWords(updatedWords);
  
    // 4. Сброс состояния редактирования
    setEditingWordId(null);
    setEditedWord({});
  };
  

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
        {localWords.map((word) => {
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
                      <button onClick={() => onSelectWord(word)}>📄</button>
                      <button onClick={() => handleEdit(word)}>✏️</button>
                      <button>❌</button>
                    </td>
                  </>
                )}
              </tr>

              {/* Подсказка, если есть ошибка при редактировании */}
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
