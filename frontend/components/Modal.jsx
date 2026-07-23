"use client";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-900/10 dark:shadow-black/50 w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 border-t-4 border-t-indigo-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-indigo-50 dark:border-gray-700 bg-indigo-50/30 dark:bg-indigo-900/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all p-2 rounded-xl"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
