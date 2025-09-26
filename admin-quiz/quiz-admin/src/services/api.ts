import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", // Spring Boot backend URL
});

export default api;
