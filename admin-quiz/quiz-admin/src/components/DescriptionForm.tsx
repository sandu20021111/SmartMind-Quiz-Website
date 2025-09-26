import React, { useState } from "react";
import api from "../services/api";

interface Assessment {
  name: string;
  weight: string;
}

interface DescriptionData {
  moduleId: string;
  name: string;
  description: string;
  learningOutcomes: string[];
  instructors: string[];
  prerequisites: string[];
  assessments: Assessment[];
  topics: string[];
  duration: string;
}

const DescriptionForm: React.FC = () => {
  const [description, setDescription] = useState<DescriptionData>({
    moduleId: "", // initially empty
    name: "",
    description: "",
    learningOutcomes: [""],
    instructors: [""],
    prerequisites: [""],
    assessments: [{ name: "", weight: "" }],
    topics: [""],
    duration: "",
  });

  // Generic input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDescription({ ...description, [name]: value });
  };

  // Array fields handler
  const handleArrayChange = (
    field: keyof DescriptionData,
    index: number,
    value: string
  ) => {
    const arr = [...description[field]] as string[] | Assessment[];
    if (field === "assessments") {
      const assessmentsArr = arr as Assessment[];
      const parts = value.split("|"); // Enter as Name|Weight
      assessmentsArr[index] = { name: parts[0] || "", weight: parts[1] || "" };
      setDescription({ ...description, assessments: assessmentsArr });
    } else {
      arr[index] = value;
      setDescription({ ...description, [field]: arr } as any);
    }
  };

  const addArrayItem = (field: keyof DescriptionData) => {
    const arr = [...description[field]] as string[] | Assessment[];
    if (field === "assessments") {
      setDescription({
        ...description,
        assessments: [...(arr as Assessment[]), { name: "", weight: "" }],
      });
    } else {
      setDescription({
        ...description,
        [field]: [...(arr as string[]), ""],
      } as any);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/descriptions", description);
      alert("Description added successfully!");
      setDescription({
        moduleId: "",
        name: "",
        description: "",
        learningOutcomes: [""],
        instructors: [""],
        prerequisites: [""],
        assessments: [{ name: "", weight: "" }],
        topics: [""],
        duration: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding description");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add Description</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        {/* Module ID input */}
        <input
          type="text"
          name="moduleId"
          placeholder="Module ID (e.g., OOP)"
          value={description.moduleId}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Description Name"
          value={description.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 10 weeks)"
          value={description.duration}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Detailed Description"
          value={description.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px" }}
        />

        {/* Learning Outcomes */}
        <label style={labelStyle}>Learning Outcomes:</label>
        {description.learningOutcomes.map((lo, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Outcome #${index + 1}`}
            value={lo}
            onChange={(e) =>
              handleArrayChange("learningOutcomes", index, e.target.value)
            }
            style={inputStyle}
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("learningOutcomes")}
          style={addButtonStyle}
        >
          + Add Outcome
        </button>

        {/* Instructors */}
        <label style={labelStyle}>Instructors:</label>
        {description.instructors.map((ins, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Instructor #${index + 1}`}
            value={ins}
            onChange={(e) =>
              handleArrayChange("instructors", index, e.target.value)
            }
            style={inputStyle}
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("instructors")}
          style={addButtonStyle}
        >
          + Add Instructor
        </button>

        {/* Prerequisites */}
        <label style={labelStyle}>Prerequisites:</label>
        {description.prerequisites.map((pre, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Prerequisite #${index + 1}`}
            value={pre}
            onChange={(e) =>
              handleArrayChange("prerequisites", index, e.target.value)
            }
            style={inputStyle}
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("prerequisites")}
          style={addButtonStyle}
        >
          + Add Prerequisite
        </button>

        {/* Assessments */}
        <label style={labelStyle}>Assessments (Name|Weight):</label>
        {description.assessments.map((ass, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Assessment #${index + 1} e.g., Lab|30%`}
            value={`${ass.name}|${ass.weight}`}
            onChange={(e) =>
              handleArrayChange("assessments", index, e.target.value)
            }
            style={inputStyle}
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("assessments")}
          style={addButtonStyle}
        >
          + Add Assessment
        </button>

        {/* Topics */}
        <label style={labelStyle}>Topics:</label>
        {description.topics.map((topic, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Topic #${index + 1}`}
            value={topic}
            onChange={(e) => handleArrayChange("topics", index, e.target.value)}
            style={inputStyle}
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("topics")}
          style={addButtonStyle}
        >
          + Add Topic
        </button>

        <button type="submit" style={submitButtonStyle}>
          Save Description
        </button>
      </form>
    </div>
  );
};

// Styles (same as before)
const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const headingStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#44bd32",
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
const addButtonStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#7f8fa6",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
  width: "150px",
  marginBottom: "10px",
};
const submitButtonStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#44bd32",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "20px",
};
const labelStyle: React.CSSProperties = { fontWeight: "bold" };

export default DescriptionForm;
