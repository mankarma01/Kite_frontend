import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Camera, Settings, 
  LogOut, Sun, Moon, Bell, Menu, X, ShieldCheck 
} from "lucide-react";

import AdminOverview from './AdminOverview'; 
import EmployeeManagement from './EmployeeManagement';
import EmployeeStats from './EmployeeStats';
import AttendanceCamera from './AttendanceCamera';
// ... (existing imports)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "ROLE_EMPLOYEE"; // Default to employee if null

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300 overflow-hidden">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-110 w-72 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold dark:text-white tracking-tight">KITE AI</h1>
          </div>
          <button className="lg:hidden p-2 text-slate-500" onClick={() => setSidebarOpen(false)}><X size={20}/></button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
          {role === "ROLE_ADMIN" ? (
            <>
              <SidebarItem icon={<LayoutDashboard size={20}/>} text="Overview" active={activeTab === "overview"} onClick={() => {setActiveTab("overview"); setSidebarOpen(false);}} />
              <SidebarItem icon={<Users size={20}/>} text="Employees" active={activeTab === "employees"} onClick={() => {setActiveTab("employees"); setSidebarOpen(false);}} />
              <SidebarItem icon={<Settings size={20}/>} text="Settings" active={activeTab === "settings"} onClick={() => {setActiveTab("settings"); setSidebarOpen(false);}} />
            </>
          ) : (
            <>
              <SidebarItem icon={<LayoutDashboard size={20}/>} text="My Stats" active={activeTab === "overview"} onClick={() => {setActiveTab("overview"); setSidebarOpen(false);}} />
              <SidebarItem icon={<Camera size={20}/>} text="Attendance" active={activeTab === "camera"} onClick={() => {setActiveTab("camera"); setSidebarOpen(false);}} />
            </>
          )}
        </nav>

        <div className="p-4 border-t dark:border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl font-bold transition-all">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-20 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-bold dark:text-white capitalize hidden sm:block">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l dark:border-slate-800">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold dark:text-white">{role === 'ROLE_ADMIN' ? 'Administrator' : 'Employee'}</p>
                <p className="text-[10px] text-green-500 font-medium">Online</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                {role === "ROLE_ADMIN" ? "AD" : "EM"}
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto scroll-smooth">
           <div className="max-w-7xl mx-auto">
              {/* Tab Logic Fixed */}
              {activeTab === "overview" && (
                role === "ROLE_ADMIN" 
                  ? <AdminOverview /> 
                  : <EmployeeStats setActiveTab={setActiveTab} /> // Pass setActiveTab here
              )}
              
              {activeTab === "employees" && role === "ROLE_ADMIN" && <EmployeeManagement /> }

              {activeTab === "camera" && role !== "ROLE_ADMIN" && <AttendanceCamera />}

              {activeTab === "settings" && <div className="dark:text-white">Settings coming soon...</div>}
           </div>
        </main>
      </div>
    </div>
  );
}

// SidebarItem remains same...

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold" 
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600"
    }`}>
      <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`}>
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </button>
  );
}