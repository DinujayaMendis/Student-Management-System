import api from "./api";

// Get all courses
export const getAllCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

// Get course by ID
export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

// Create new course
export const createCourse = async (course) => {
  const response = await api.post("/courses", course);
  return response.data;
};

// Update course
export const updateCourse = async (id, course) => {
  const response = await api.put(`/courses/${id}`, course);
  return response.data;
};

// Delete course
export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};