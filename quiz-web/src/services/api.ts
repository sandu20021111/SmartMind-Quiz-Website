// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

// create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Existing API calls
export const fetchModulesByYear = async (yearId: string) => {
  try {
    const response = await api.get(`/modules/year/${yearId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

export const fetchAllModules = async () => {
  try {
    const response = await api.get(`/modules`);
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

export async function fetchModuleDescription(moduleId: string) {
  const res = await fetch(`${API_BASE_URL}/descriptions/module/${moduleId}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();

  // Backend returns an array → pick first item
  return data.length > 0 ? data[0] : null;
}

// Contact form API call
export const sendContactForm = async (formData: any) => {
  try {
    const response = await api.post("/contact/save", formData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error submitting contact form:", error);
    throw error;
  }
};

export const registerUser = (name: string, email: string, password: string) =>
  api.post("auth/register", { name, email, password });

export const loginUser = (email: string, password: string) =>
  api.post("auth/login", { email, password });

export const fetchUserProfile = () => api.get("auth/profile");

export const fetchQuizzesByModule = async (moduleId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/quizzes/module/${moduleId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchQuizById = async (quizId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Submit a quiz attempt
export const submitQuizAttempt = async (
  quizId: string,
  userId: string,
  score: number
) => {
  try {
    const response = await api.post(
      `/quizzes/${quizId}/attempt/${userId}`,
      score
    );
    return response.data;
  } catch (error) {
    console.error(`Error submitting attempt for quiz ${quizId}:`, error);
    return null;
  }
};
