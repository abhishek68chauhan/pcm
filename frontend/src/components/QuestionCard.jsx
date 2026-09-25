import { useState } from "react";
import axios from "axios";

function QuestionCard({ question, onSolved }) {
  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [correct, setCorrect] =
    useState(question.solved);

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/questions/${question._id}/answer`,
        {
          answer: selectedAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitted(true);

      if (response.data.correct) {
        setCorrect(true);

        if (onSolved) {
          onSolved();
        }
      }
    } catch (error) {
      console.error(
        "ANSWER ERROR:",
        error
      );
    }
  };

  return (
    <div
      className={`question-card ${
        correct ? "solved-question" : ""
      }`}
    >
      <div className="question-top">
        <span className="subject">
          {question.subject}
        </span>

        <span className="difficulty">
          {question.difficulty}
        </span>
      </div>

      <h3>{question.question}</h3>

      <div className="question-options">
        {question.options.map(
          (option, index) => (
            <label
              key={index}
              className="question-option"
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={
                  selectedAnswer === option
                }
                onChange={(e) =>
                  setSelectedAnswer(
                    e.target.value
                  )
                }
                disabled={correct}
              />

              <span>{option}</span>
            </label>
          )
        )}
      </div>

      {!correct && (
        <button
          className="answer-btn"
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      )}

      {correct && (
        <div className="github-solved">
          <span className="green-dot"></span>
          Solved
        </div>
      )}

      {/* Wrong answer par kuch red nahi */}
      {submitted && !correct && (
        <p className="try-again">
          Try again
        </p>
      )}
    </div>
  );
}

export default QuestionCard;