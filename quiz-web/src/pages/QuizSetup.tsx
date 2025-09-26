import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizzesByModule } from "../services/api";

const QuizSetup: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      if (moduleId) {
        const data = await fetchQuizzesByModule(moduleId);
        setQuizzes(data as any[]);
      }
    };
    loadQuizzes();
  }, [moduleId]);

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate(`/module/${moduleId}/quiz/${selectedQuiz}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
        Quizzes for Module
      </h1>

      <div className="grid gap-6 w-full max-w-3xl">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => setSelectedQuiz(quiz.id)}
            className={`p-6 rounded-2xl shadow-md transition-all duration-300 cursor-pointer ${
              selectedQuiz === quiz.id
                ? "border-2 border-smartmind-medium  bg-indigo-50 scale-105 shadow-lg"
                : "border border-gray-200 bg-white hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {quiz.title}
            </h2>
            <p className="text-gray-600">{quiz.totalQuestions} Questions</p>
          </div>
        ))}
      </div>

      <button
        disabled={!selectedQuiz}
        onClick={handleStartQuiz}
        className={`mt-10 px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
          selectedQuiz
            ? "bg-smartmind-dark text-white hover:bg-smartmind-medium shadow-md hover:shadow-xl"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizSetup;
