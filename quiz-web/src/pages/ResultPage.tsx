import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  AwardIcon,
  BarChart2Icon,
  ArrowRightCircleIcon,
  RefreshCcwIcon,
} from "lucide-react";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { moduleId, quizId } = useParams<{
    moduleId: string;
    quizId: string;
  }>();

  // Redirect if state is missing
  useEffect(() => {
    if (!location.state) {
      navigate(`/module/${moduleId}/quizzes`);
    }
  }, [location.state, navigate, moduleId]);

  if (!location.state) {
    return null; // Prevent rendering before redirect
  }

  const { score, totalQuestions, quizTitle } = location.state as {
    score: number;
    totalQuestions: number;
    selectedAnswers: number[];
    quizTitle: string;
  };

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 60;

  const getResultInfo = () => {
    if (percentage >= 90) {
      return {
        message: "Excellent!",
        description: "You have mastered this topic.",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    } else if (percentage >= 75) {
      return {
        message: "Great Job!",
        description: "You have a good understanding of this topic.",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    } else if (percentage >= 60) {
      return {
        message: "Good Work!",
        description: "You have a basic understanding of this topic.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    } else {
      return {
        message: "Keep Practicing!",
        description: "You need more practice on this topic.",
        color: "text-red-600",
        bgColor: "bg-red-100",
      };
    }
  };

  const resultInfo = getResultInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Result Header */}
          <div className={`px-6 py-8 text-center ${resultInfo.bgColor}`}>
            <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
              {isPassing ? (
                <CheckCircleIcon className="h-10 w-10 text-green-500" />
              ) : (
                <XCircleIcon className="h-10 w-10 text-red-500" />
              )}
            </div>
            <h1 className={`text-2xl font-bold ${resultInfo.color}`}>
              {resultInfo.message}
            </h1>
            <p className="text-gray-700 mt-2">{resultInfo.description}</p>
          </div>
          {/* Quiz Info */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{quizTitle}</h2>
            <p className="text-sm text-gray-600">Module: {moduleId}</p>
          </div>
          {/* Score Details */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm text-gray-500">Your Score</span>
                <div className="flex items-center">
                  <AwardIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">
                    {score}/{totalQuestions}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Percentage</span>
                <div className="text-3xl font-bold text-gray-900">
                  {percentage}%
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Result</span>
                <div
                  className={`text-lg font-semibold ${
                    isPassing ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPassing ? "Passed" : "Failed"}
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`${
                    isPassing ? "bg-green-600" : "bg-red-600"
                  } h-4 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            {/* Performance Analysis */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <BarChart2Icon className="h-5 w-5 mr-2 text-blue-600" />
                Performance Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Strengths</div>
                  <ul className="text-sm text-gray-700">
                    {percentage >= 75 ? (
                      <>
                        <li className="flex items-center mb-1">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                          Good understanding of core concepts
                        </li>
                        <li className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                          Strong technical knowledge
                        </li>
                      </>
                    ) : (
                      <li className="text-gray-500 italic">
                        Keep practicing to develop strengths
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">
                    Areas to Improve
                  </div>
                  <ul className="text-sm text-gray-700">
                    {percentage < 80 ? (
                      <>
                        <li className="flex items-center mb-1">
                          <ArrowRightCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                          Review fundamental concepts
                        </li>
                        <li className="flex items-center">
                          <ArrowRightCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                          Practice more example problems
                        </li>
                      </>
                    ) : (
                      <li className="text-gray-500 italic">
                        No major areas to improve
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to={`/module/${moduleId}/quizzes`}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Try Another Quiz
              </Link>
              <Link
                to={`/module/${moduleId}/quiz/${quizId}`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Retake This Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
