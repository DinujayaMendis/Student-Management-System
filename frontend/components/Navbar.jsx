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
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">
          EduManage
        </h1>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for left side of navbar on desktop */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        <button className="p-2 text-indigo-400 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-all relative">
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          <FiBell className="w-5 h-5" />
        </button>
        <button
          onClick={logout}
          className="text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-md shadow-rose-500/20 px-4 py-2 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
