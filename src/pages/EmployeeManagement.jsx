import React, { useState, useEffect } from 'react';
import { UserPlus, Search, X, Loader2, ShieldCheck, Mail, Lock, User } from "lucide-react";
import API from "../api/api"; // Aapka axios instance

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 1. Backend se list lana
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/admin/employees");
      if (res.data.success) setEmployees(res.data.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  // 2. Data Backend ko bhejna
 // Data Backend ko bhejna
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Yahan hum role add kar rahe hain request body mein
    const payload = {
      ...formData,
      role: "ROLE_EMPLOYEE" // Backend is role ko pehchan lega
    };

    try {
      const res = await API.post("/admin/register-employee", payload);
      if (res.data.success) {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '' }); 
        fetchEmployees(); 
        alert("Employee added successfully!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* --- UPPER SECTION (Search & Add Button) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#0B1120] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-none outline-none focus:ring-2 ring-indigo-500/20 dark:text-white transition-all"
          />
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
        >
          <UserPlus size={20} /> Add Employee
        </button>
      </div>

      {/* --- EMPLOYEE TABLE --- */}
      <div className="bg-white dark:bg-[#0B1120] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {employees.length > 0 ? employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      {emp.fullName.charAt(0)}
                    </div>
                    <span className="font-bold dark:text-white">{emp.fullName}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{emp.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-lg">Active</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {emp.faceRegistered ? 
                      <ShieldCheck className="inline text-emerald-500" size={20} /> : 
                      <span className="text-slate-300 text-xs">Pending</span>
                    }
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-400">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD EMPLOYEE MODAL (Popup) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0B1120] w-full max-w-md rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-2xl scale-in-center">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Add Employee</h2>
                <p className="text-sm text-slate-500">Create login for new staff</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:rotate-90 transition-all"
              >
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-indigo-500/20 outline-none dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-indigo-500/20 outline-none dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Temporary Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-indigo-500/20 outline-none dark:text-white transition-all"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirm & Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}