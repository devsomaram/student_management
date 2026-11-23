import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/students",
});

// CREATE STUDENT
export const createStudent = async (studentData) => {
  const response = await API.post("/", studentData);
  return response.data;
};

// GET ALL STUDENTS
export const getAllStudents = async () => {
  const response = await API.get("/");
  return response.data;
};

// UPDATE STUDENT
export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/${id}`, studentData);
  return response.data;
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
