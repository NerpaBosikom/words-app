
import React from "react";
import './WordList.css'; 
const WordList = ({ words, onSelectWord }) => {
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
        {words.map((word) => (
          <tr key={word.id} className="word-row">
            <td className="word-cell">{word.english}</td>
            <td className="word-cell">{word.transcription}</td>
            <td className="word-cell">{word.russian}</td>
            <td className="word-cell">
              <button onClick={() => onSelectWord(word)}>📄</button>
              <button>✏️</button>
              <button>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordList;
