'use client';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="md:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          S
        </div>
        <h1 className="font-bold text-gray-900 dark:text-white">EduManage</h1>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for left side of navbar on desktop */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
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
