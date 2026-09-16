"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiPieChart, FiUsers, FiBook, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const navItems = isAdmin
    ? [
        { name: "Dashboard", href: "/dashboard", icon: FiPieChart },
        { name: "Students", href: "/students", icon: FiUsers },
        { name: "Courses", href: "/courses", icon: FiBook },
      ]
    : [
        { name: "My Profile", href: "/profile", icon: FiUser },
        { name: "Courses", href: "/courses", icon: FiBook },
      ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col h-screen fixed left-0 top-0 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="p-6 flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="EduManage Logo"
          width={32}
          height={32}
          className="rounded-lg object-contain"
        />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">
          EduManage
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 dark:shadow-none"
                    : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <item.icon className="mr-3 w-5 h-5" />
                {item.name}
              </Link>
            );
        })}
      </nav>

      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-violet-50/80 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-100/50 dark:border-indigo-800/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md flex items-center justify-center text-white font-bold text-lg">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 font-medium truncate mt-0.5">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
