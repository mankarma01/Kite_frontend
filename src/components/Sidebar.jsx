import { LogOut, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ menuItems }) {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="h-screen w-64 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xs">K</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          KITE AI
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Menu
        </p>
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
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