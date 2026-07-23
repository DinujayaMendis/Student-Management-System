"use client";
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import Modal from "@/components/Modal";
import { courseService } from "@/services/course";
import { useAuth } from "@/context/AuthContext";
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiClock } from "react-icons/fi";

export default function Courses() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    duration: "",
    lecturer: "",
  });
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenModal = (course = null) => {
    if (course) {
      setFormData({
        courseName: course.courseName,
        courseCode: course.courseCode,
        duration: course.duration,
        lecturer: course.lecturer,
      });
      setCurrentCourseId(course.id);
      setIsEditMode(true);
    } else {
      setFormData({
        courseName: "",
        courseCode: "",
        duration: "",
        lecturer: "",
      });
      setCurrentCourseId(null);
      setIsEditMode(false);
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { ...formData, duration: parseInt(formData.duration) };
      if (isEditMode) {
        await courseService.updateCourse(currentCourseId, payload);
      } else {
        await courseService.createCourse(payload);
      }
      handleCloseModal();
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.deleteCourse(id);
        fetchCourses();
      } catch (err) {
        console.error("Failed to delete course", err);
      }
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage academic courses
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Add Course
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center items-center">
            <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              Loading courses...
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full card p-12 text-center text-gray-500 dark:text-gray-400">
            No courses found. Click "Add Course" to create one.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="card p-6 flex flex-col h-full hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-bold text-lg">
                  {course.courseCode.substring(0, 2).toUpperCase()}
                </div>
                {isAdmin && (
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenModal(course)}
                      className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {course.courseName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">
                {course.courseCode}
              </p>

              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiUser className="w-4 h-4 mr-2 text-gray-400" />
                  {course.lecturer}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                  {course.duration} months
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? "Edit Course" : "Add New Course"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              required
              className="input-field"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                required
                className="input-field"
                value={formData.courseCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (Months)
              </label>
              <input
                type="number"
                name="duration"
                required
                min="1"
                className="input-field"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lecturer
            </label>
            <input
              type="text"
              name="lecturer"
              required
              className="input-field"
              value={formData.lecturer}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
