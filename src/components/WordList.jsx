import React, { useState } from "react";
import './WordList.css';

const WordList = ({ words, onSelectWord }) => {
  const [editingWordId, setEditingWordId] = useState(null);
  const [editedWord, setEditedWord] = useState({});
  const [localWords, setLocalWords] = useState(words); // локальное хранилище слов

  const handleEdit = (word) => {
    setEditingWordId(word.id);
    setEditedWord({ ...word });
  };

  const handleCancel = () => {
    setEditingWordId(null);
    setEditedWord({});
  };

  const handleChange = (e) => {
    setEditedWord({
      ...editedWord,
      [e.target.name]: e.target.value,
    });
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
        {localWords.map((word) => (
          <tr key={word.id} className="word-row">
            {editingWordId === word.id ? (
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
                <td className="word-cell">{word.english}</td>
                <td className="word-cell">{word.transcription}</td>
                <td className="word-cell">{word.russian}</td>
                <td className="word-cell">
                  <button onClick={() => onSelectWord(word)}>📄</button>
                  <button onClick={() => handleEdit(word)}>✏️</button>
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
