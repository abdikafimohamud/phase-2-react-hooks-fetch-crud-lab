// src/App.js
import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import App from "../App.jsx";


function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateCorrectAnswer(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQ) => {
        const updatedList = questions.map((q) =>
          q.id === updatedQ.id ? updatedQ : q
        );
        setQuestions(updatedList);
      });
  }

  return (
    <main>
      <h1>Quiz Admin App</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <button onClick={() => setShowQuestions(!showQuestions)}>
        {showQuestions ? "Hide Questions" : "View Questions"}
      </button>
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
