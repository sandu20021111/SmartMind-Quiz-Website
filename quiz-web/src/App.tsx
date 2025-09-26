import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ModuleList from "./pages/ModuleList";
import ModuleDescription from "./pages/ModuleDescription";
import QuizSetup from "./pages/QuizSetup";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/*  Public Home Page */}
            <Route
              path="/year/:yearId"
              element={
                <ProtectedRoute>
                  <ModuleList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:moduleId/description"
              element={
                <ProtectedRoute>
                  <ModuleDescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:moduleId/quizzes"
              element={
                <ProtectedRoute>
                  <QuizSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:moduleId/quiz/:quizId"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:moduleId/quiz/:quizId/result"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
