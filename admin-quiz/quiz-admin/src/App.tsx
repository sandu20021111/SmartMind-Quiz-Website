import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ModuleForm from "./components/ModuleForm";
import DescriptionForm from "./components/DescriptionForm";
import QuizForm from "./components/QuizForm";

const App: React.FC = () => {
  return (
    <div
      className="App"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      {/* Routes */}
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/modules" element={<ModuleForm />} />
        <Route path="/descriptions" element={<DescriptionForm />} />
        <Route path="/quizzes" element={<QuizForm />} />
      </Routes>
    </div>
  );
};

export default App;
