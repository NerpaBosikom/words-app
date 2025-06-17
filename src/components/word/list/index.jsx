// src/components/WordList.jsx
import React, { useState } from "react";
import "./index.css";

const WordList = ({ words, onSelectWord }) => {
  const [editingWordId, setEditingWordId] = useState(null);
  const [editedWord, setEditedWord] = useState({});
  const [localWords, setLocalWords] = useState(words);

  const handleEdit = (word) => {
    setEditingWordId(word.id);
    setEditedWord({ ...word });
  };

  const handleCancel = () => {
    setEditingWordId(null);
    setEditedWord({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setEditedWord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedWords = localWords.map((word) =>
      word.id === editedWord.id ? editedWord : word
    );
    setLocalWords(updatedWords);
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
        {localWords.map(({ id, english, transcription, russian }) => (
          <tr key={id} className="word-row">
            {editingWordId === id ? (
              <>
                <td>
                  <input
                    type="text"
                    name="english"
                    value={editedWord.english}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="transcription"
                    value={editedWord.transcription}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="russian"
                    value={editedWord.russian}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={handleSave}>💾</button>
                  <button onClick={handleCancel}>❌</button>
                </td>
              </>
            ) : (
              <>
                <td className="word-cell">{english}</td>
                <td className="word-cell">{transcription}</td>
                <td className="word-cell">{russian}</td>
                <td className="word-cell">
                  <button onClick={() => onSelectWord({ id, english, transcription, russian })}>📄</button>
                  <button onClick={() => handleEdit({ id, english, transcription, russian })}>✏️</button>
                  <button>❌</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordList;
