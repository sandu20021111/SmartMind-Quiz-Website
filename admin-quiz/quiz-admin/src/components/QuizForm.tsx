import React, { useState } from "react";
import api from "../services/api";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  moduleId: string;
  title: string;
  description: string;
  difficulty: string;
  totalQuestions: number;
  questions: Question[];
}

const QuizForm: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    moduleId: "", // now manual input
    title: "",
    description: "",
    difficulty: "",
    totalQuestions: 1,
    questions: [
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ],
  });

  // General input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  // Handle total questions input
  const handleTotalQuestionsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const total = parseInt(e.target.value) || 1;
    const newQuestions = [...quiz.questions];

    while (newQuestions.length < total) {
      newQuestions.push({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    }
    while (newQuestions.length > total) {
      newQuestions.pop();
    }

    setQuiz({ ...quiz, totalQuestions: total, questions: newQuestions });
  };

  // Handle question text or correct answer
  const handleQuestionChange = (
    index: number,
    field: "questionText" | "correctAnswer",
    value: string
  ) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle options change
  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Submit quiz
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/quizzes", quiz);
      alert("Quiz added successfully!");
      // Reset form
      setQuiz({
        moduleId: "",
        title: "",
        description: "",
        difficulty: "",
        totalQuestions: 1,
        questions: [
          { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
        ],
      });
    } catch (error) {
      console.error(error);
      alert("Error adding quiz");
    }
  };

  return (
    <div style={formCardStyle}>
      <h2 style={headingStyle}>Add Quiz</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        {/* Module ID input */}
        <input
          type="text"
          name="moduleId"
          placeholder="Module ID (e.g., OOP)"
          value={quiz.moduleId}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Quiz Title */}
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Quiz Description */}
        <textarea
          name="description"
          placeholder="Quiz Description"
          value={quiz.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: "60px" }}
        />

        {/* Difficulty */}
        <select
          name="difficulty"
          value={quiz.difficulty}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Total Questions */}
        <input
          type="number"
          placeholder="Total Questions"
          value={quiz.totalQuestions}
          min={1}
          onChange={handleTotalQuestionsChange}
          style={inputStyle}
        />

        {/* Questions */}
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} style={questionCardStyle}>
            <h4>Question {qIndex + 1}</h4>
            <input
              type="text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionText", e.target.value)
              }
              style={inputStyle}
            />

            {q.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, optIndex, e.target.value)
                }
                style={inputStyle}
              />
            ))}

            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(qIndex, "correctAnswer", e.target.value)
              }
              style={inputStyle}
            />
          </div>
        ))}

        <button type="submit" style={submitButtonStyle}>
          Save Quiz
        </button>
      </form>
    </div>
  );
};

// Styles
const formCardStyle: React.CSSProperties = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const headingStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#e1b12c",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const submitButtonStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#e1b12c",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const questionCardStyle: React.CSSProperties = {
  marginBottom: "20px",
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

export default QuizForm;
