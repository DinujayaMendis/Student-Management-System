import api from "./api";

// Get all students
export const getAllStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

// Get student by ID
export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

// Create new student
export const createStudent = async (student) => {
  const response = await api.post("/students", student);
  return response.data;
};

// Update student
export const updateStudent = async (id, student) => {
  const response = await api.put(`/students/${id}`, student);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};