// src/QuestionItem.js
import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleSelectChange(e) {
    const newIndex = parseInt(e.target.value);
    onUpdate(id, newIndex);
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleSelectChange}>
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {`Answer ${index + 1}`}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
