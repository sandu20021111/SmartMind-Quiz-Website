import React, { useState } from "react";
import api from "../services/api";

const ModuleForm: React.FC = () => {
  const [module, setModule] = useState({
    name: "",
    description: "",
    quizzes: 0,
    difficulty: "",
    year: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setModule({ ...module, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/modules", module);
      alert("Module added successfully!");
      setModule({
        name: "",
        description: "",
        quizzes: 0,
        difficulty: "",
        year: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding module");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#40739e" }}
      >
        Add Module
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <select
          name="year"
          value={module.year}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Select Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Module Name"
          value={module.name}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={module.description}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="number"
          name="quizzes"
          placeholder="Number of Quizzes"
          value={module.quizzes}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          name="difficulty"
          value={module.difficulty}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Select Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#40739e",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2f3640")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#40739e")
          }
        >
          Save Module
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
