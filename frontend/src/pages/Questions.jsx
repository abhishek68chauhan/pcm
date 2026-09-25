import { useEffect, useState } from "react";
import axios from "axios";

import QuestionCard from "../components/QuestionCard";

function Questions() {
  const [questions, setQuestions] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const fetchQuestions = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/questions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data);
    } catch (error) {
      console.error(
        "QUESTION FETCH ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions =
    filter === "All"
      ? questions
      : questions.filter(
        (question) =>
          question.subject === filter
      );

  const solvedCount =
    questions.filter(
      (question) => question.solved
    ).length;

  if (loading) {
    return (
      <div className="questions-page">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="questions-page">

      <div className="questions-header">

        <div>
          <h1>Question Bank</h1>

          <p>
            {solvedCount} /{" "}
            {questions.length} solved
          </p>
        </div>

        <div className="question-filters">

          <button
            className={
              filter === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("All")
            }
          >
            All
          </button>

          <button
            className={
              filter === "Physics"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Physics")
            }
          >
            Physics
          </button>

          <button
            className={
              filter === "Chemistry"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Chemistry")
            }
          >
            Chemistry
          </button>

          <button
            className={
              filter === "Mathematics"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Mathematics")
            }
          >
            Mathematics
          </button>

        </div>
      </div>

      <div className="questions-list">

        {filteredQuestions.length === 0 ? (
          <div className="empty-questions">
            <h3>No questions yet</h3>

            <p>
              Add questions to start
              practicing.
            </p>
          </div>
        ) : (
          filteredQuestions.map(
            (question) => (
              <QuestionCard
                key={question._id}
                question={question}
                onSolved={fetchQuestions}
              />
            )
          )
        )}

      </div>

    </div>
  );
}

export default Questions;