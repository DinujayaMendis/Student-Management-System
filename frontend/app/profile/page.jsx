"use client";
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { studentService } from "@/services/student";
import { useAuth } from "@/context/AuthContext";
import { FiEdit2, FiUser, FiMail, FiBook, FiCalendar } from "react-icons/fi";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const data = await studentService.getStudentByEmail(user.email);
        setProfile(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          course: data.course,
          age: data.age,
        });
      } catch (err) {
        // If 404 or not found, they might not have a student profile yet
        console.log("Profile not found, user needs to complete it.");
        // Pre-fill what we know from user token
        const names = user.fullName ? user.fullName.split(" ") : [""];
        setFormData({
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: user.email,
          course: "",
          age: "",
        });
        setIsEditMode(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: parseInt(formData.age, 10),
      };
      if (profile?.id) {
        // Update existing
        const data = await studentService.updateStudent(profile.id, payload);
        setProfile(data);
        setSuccess("Profile updated successfully!");
      } else {
        // Create new
        const data = await studentService.createStudent(payload);
        setProfile(data);
        setSuccess("Profile created successfully!");
      }
      setIsEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your personal information
            </p>
          </div>
          {profile && !isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="btn-secondary flex items-center gap-2 bg-gray-400 hover:bg-blue-500 text-white"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="card p-8 border-t-4 border-t-indigo-600">
          <div>
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-xl text-sm font-medium">
                {success}
              </div>
            )}

            {!isEditMode && profile ? (
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-8">
                
                {/* Profile Avatar & Quick Info */}
                <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 w-full sm:w-1/3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <span className="px-3 py-1 mt-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-center">
                    Student
                  </span>
                </div>

                {/* Detailed Information */}
                <div className="w-full sm:w-2/3 space-y-6">
                  
                  {/* Personal Info Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          <FiUser className="mr-2 text-indigo-600 dark:text-indigo-400" /> Full Name
                        </div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {profile.firstName} {profile.lastName}
                        </p>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          <FiMail className="mr-2 text-indigo-600 dark:text-indigo-400" /> Email Address
                        </div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                      Academic Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          <FiBook className="mr-2 text-indigo-600 dark:text-indigo-400" /> Enrolled Course
                        </div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {profile.course}
                        </p>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          <FiCalendar className="mr-2 text-indigo-600 dark:text-indigo-400" /> Age
                        </div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {profile.age} years old
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {!profile && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm font-medium mb-6">
                    Welcome! Please complete your student profile setup to
                    continue.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      pattern="^[a-zA-Z\s]+$"
                      minLength={2}
                      maxLength={50}
                      title="Only letters and spaces allowed (2-50 characters)"
                      className="input-field"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      pattern="^[a-zA-Z\s]+$"
                      minLength={2}
                      maxLength={50}
                      title="Only letters and spaces allowed (2-50 characters)"
                      className="input-field"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-field bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                    value={formData.email}
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Enrolled Course
                    </label>
                    <select
                      name="course"
                      required
                      className="input-field"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a course</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Interactive Media">Interactive Media</option>
                      <option value="Business Management">Business Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      min="16"
                      max="100"
                      step="1"
                      className="input-field"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
                  {profile && (
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn-primary">
                    {profile ? "Save Changes" : "Complete Profile"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
