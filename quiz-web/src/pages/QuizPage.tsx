import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../services/api";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// 🔀 Shuffle helper
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0); // Track attempts
  const maxAttempts = 3;

  const loadQuiz = async () => {
    if (quizId) {
      const data = await fetchQuizById(quizId);

      // Shuffle questions & options
      const shuffledQuestions = shuffleArray(
        data.questions.map((q: Question) => ({
          ...q,
          options: shuffleArray(q.options),
        }))
      );

      setQuiz({ ...data, questions: shuffledQuestions });
      setAnswers({});
      setSubmitted(false);
      setScore(null);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  if (!quiz)
    return <div className="text-center py-10 text-lg">Loading quiz...</div>;

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
    setAttempts((prev) => prev + 1); // Increase attempt count
  };

  // Calculate percentage
  const percentage =
    score !== null ? Math.round((score / quiz.questions.length) * 100) : 0;

  // Determine performance
  let performanceText = "";
  let performanceColor = "";
  if (percentage >= 80) {
    performanceText = "🟢 Excellent";
    performanceColor = "bg-green-100 text-green-800";
  } else if (percentage >= 50) {
    performanceText = "🟡 Good";
    performanceColor = "bg-yellow-100 text-yellow-800";
  } else {
    performanceText = "🔴 Needs Improvement";
    performanceColor = "bg-red-100 text-red-800";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
          {quiz.title}
        </h1>
        <p className="mb-8 text-gray-600 text-lg">{quiz.description}</p>

        {quiz.questions.map((q, idx) => (
          <div
            key={idx}
            className="mb-8 p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <p className="font-semibold mb-5 text-lg text-gray-800">
              {idx + 1}. {q.questionText}
            </p>
            <ul className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = answers[idx] === opt;
                const isCorrect = submitted && opt === q.correctAnswer;
                const isWrong =
                  submitted && isSelected && opt !== q.correctAnswer;

                return (
                  <li
                    key={i}
                    onClick={() => !submitted && handleSelectAnswer(idx, opt)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 
                      ${
                        isSelected
                          ? "bg-blue-100 border-blue-500"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }
                      ${isCorrect ? "bg-green-100 border-green-500" : ""}
                      ${isWrong ? "bg-red-100 border-red-500" : ""}
                    `}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold shadow-md transition text-white 
              ${
                Object.keys(answers).length === quiz.questions.length
                  ? "bg-smartmind-dark  hover:bg-smartmind-medium"
                  : "bg-smartmind-medium cursor-not-allowed"
              }`}
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-10">
            {/* Score and Performance */}
            <div className="text-center mb-8">
              <div className="text-3xl font-bold mb-2 text-gray-800">
                You scored: {score} / {quiz.questions.length} ({percentage}%)
              </div>
              <div
                className={`text-2xl font-semibold inline-block px-6 py-3 rounded-2xl ${performanceColor}`}
              >
                {performanceText}
              </div>
            </div>

            {/* Retake Button aligned to the right */}
            <div className="flex justify-end">
              {attempts < maxAttempts ? (
                <button
                  onClick={loadQuiz}
                  className="px-10 py-3 rounded-xl font-semibold shadow-md bg-smartmind-dark text-white hover:bg-smartmind-medium transition"
                >
                  Retake Quiz ({attempts}/{maxAttempts})
                </button>
              ) : (
                <p className="text-red-600 font-semibold text-lg">
                  🚫 You have reached the maximum of {maxAttempts} attempts.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;