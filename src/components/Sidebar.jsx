import { LogOut, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { clearAuthSession } from "../api/api";

export default function Sidebar({ menuItems }) {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="h-screen w-64 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xs">K</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          KITE AI
        </h1>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-sm font-bold text-indigo-700 dark:text-indigo-300">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{userName}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Active</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Menu
        </p>
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>

      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          type="button"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
          type="button"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${isActive
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none font-semibold"
          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600"
        }
      `}
    >
      {item.icon}
      <span className="text-sm">{item.text}</span>
    </NavLink>
  );
}