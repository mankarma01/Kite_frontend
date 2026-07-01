import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem'; 
import { LogOut, ShieldCheck, Menu, X, Sun, Moon } from "lucide-react";

export default function DashboardLayout({ menuItems = [], roleName, initialInitials }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const location = useLocation(); // To track which tab is active

  // Sync Dark Mode with the HTML document
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out flex flex-col
      `}>
        
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold dark:text-white">KITE AI</h1>
          </div>
          <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>
            <X size={20}/>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              icon={item.icon} 
              text={item.label} 
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false); // Close sidebar on mobile after click
              }} 
            />
          ))}
        </nav>

        <div className="p-4 border-t dark:border-slate-800 space-y-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <button className="lg:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} className="dark:text-white" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold dark:text-white">{roleName}</p>
              <p className="text-[10px] text-green-500 font-medium">Online</p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {initialInitials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}