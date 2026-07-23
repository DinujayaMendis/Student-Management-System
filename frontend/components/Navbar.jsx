"use client";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { FiBell } from "react-icons/fi";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="md:hidden flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="EduManage Logo"
          width={32}
          height={32}
          className="rounded-lg object-contain"
        />
        <h1 className="font-bold text-gray-900 dark:text-white">EduManage</h1>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for left side of navbar on desktop */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <FiBell className="w-6 h-6" />
        </button>
        <button
          onClick={logout}
          className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
