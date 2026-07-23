"use client";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { studentService } from "@/services/student";
import { courseService } from "@/services/course";
import Link from "next/link";
import { FiUsers, FiBook, FiUserPlus, FiFilePlus, FiArrowRight } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          studentService.getAllStudents(),
          courseService.getAllCourses(),
        ]);
        setStats({
          students: studentsRes.length,
          courses: coursesRes.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of your institution's metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Students Card */}
        <div className="card p-6 relative overflow-hidden group bg-gradient-to-br from-indigo-500 to-blue-600 border-none text-white shadow-indigo-200 dark:shadow-none shadow-lg">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm font-medium text-blue-100">
                Total Students
              </p>
              <h3 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.students}
              </h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl text-white">
              <FiUsers />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/students"
              className="text-sm font-medium text-blue-100 hover:text-white transition-colors flex items-center gap-1"
            >
              View all students
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Courses Card */}
        <div className="card p-6 relative overflow-hidden group bg-gradient-to-br from-violet-500 to-purple-600 border-none text-white shadow-violet-200 dark:shadow-none shadow-lg">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm font-medium text-purple-100">
                Total Courses
              </p>
              <h3 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.courses}
              </h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl text-white">
              <FiBook />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/courses"
              className="text-sm font-medium text-purple-100 hover:text-white transition-colors flex items-center gap-1"
            >
              View all courses
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/students"
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <FiUserPlus className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Add Student
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Register a new student
              </p>
            </Link>
            <Link
              href="/courses"
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <FiFilePlus className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Add Course
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create a new course
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
