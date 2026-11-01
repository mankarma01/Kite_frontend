// import React, { useState, useEffect } from "react";
// // Icons import karna zaroori hai
// import { 
//   Users, 
//   UserCheck, 
//   UserPlus, 
//   Camera, 
//   MapPin, 
//   TrendingUp, 
//   Clock, 
//   Activity 
// } from "lucide-react";
// import API from "../api/api";

// const AdminOverview = () => {
//   const [stats, setStats] = useState({
//     totalEmployees: 42, // Default/Dummy values
//     presentToday: 38,
//     pendingFaceReg: 4,
//     officeStatus: "Active"
//   });

//   // Backend se stats fetch karne ka logic
//   useEffect(() => {
//     const getStats = async () => {
//       try {
//         const res = await API.get("/admin/stats");
//         if (res.data.success) setStats(res.data.data);
//       } catch (err) {
//         console.log("Using static data for now");
//       }
//     };
//     getStats();
//   }, []);

//   return (
//     <div className="space-y-6 p-1 animate-in fade-in duration-700">
      
//       {/* --- HEADER SECTION --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
//           <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
//         </div>
//         <div className="flex gap-3">
//           <div className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center gap-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Live</span>
//           </div>
//         </div>
//       </div>

//       {/* --- STATS CARDS --- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           title="Total Employees" 
//           value={stats.totalEmployees} 
//           icon={<Users size={24} />} 
//           color="blue" 
//           trend="+2 new this month"
//         />
//         <StatCard 
//           title="Present Today" 
//           value={stats.presentToday} 
//           icon={<UserCheck size={24} />} 
//           color="emerald" 
//           trend="92% attendance rate"
//         />
//         <StatCard 
//           title="Pending Face ID" 
//           value={stats.pendingFaceReg} 
//           icon={<Camera size={24} />} 
//           color="amber" 
//           trend="Action required"
//         />
//         <StatCard 
//           title="Office Location" 
//           value={stats.officeStatus} 
//           icon={<MapPin size={24} />} 
//           color="indigo" 
//           trend="Geofence: 200m"
//         />
//       </div>

//       {/* --- MAIN CONTENT GRID --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Recent Activity Table */}
//         <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
//               <Activity size={18} className="text-indigo-500" />
//               Recent Attendance
//             </h3>
//             <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
//           </div>
          
//           <div className="space-y-4">
//             {/* Sample Activity List */}
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold">
//                     AK
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800 dark:text-white">Aman Karma</p>
//                     <p className="text-xs text-gray-500">Checked in via Face ID</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-800 dark:text-white">09:15 AM</p>
//                   <p className="text-xs text-green-500 font-medium">On Time</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* System Quick Links / Status */}
//         <div className="space-y-6">
//           <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
//             <h3 className="font-bold mb-2 flex items-center gap-2">
//               <TrendingUp size={18} />
//               Quick Action
//             </h3>
//             <p className="text-indigo-100 text-sm mb-4">You have 4 employees waiting for Face Registration approval.</p>
//             <button className="w-full py-2 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">
//               Review Now
//             </button>
//           </div>

//           <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
//             <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
//               <Clock size={18} className="text-amber-500" />
//               Office Hours
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Shift Starts</span>
//                 <span className="font-bold dark:text-white">09:00 AM</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Grace Period</span>
//                 <span className="font-bold dark:text-white">15 Mins</span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // Reusable Stat Card Component
// const StatCard = ({ title, value, icon, color, trend }) => {
//   const colors = {
//     blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
//     emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600",
//     amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
//     indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600",
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-xl ${colors[color]}`}>
//           {icon}
//         </div>
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</h2>
//         <p className="text-xs font-medium text-gray-400 mt-2">{trend}</p>
//       </div>
//     </div>
//   );
// };

// export default AdminOverview;



import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  Camera, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Activity,
  ChevronRight
} from "lucide-react";
import API from "../api/api";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalEmployees: 42,
    presentToday: 38,
    pendingFaceReg: 4,
    officeStatus: "Active"
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        if (res.data.success) setStats(res.data.data);
      } catch (err) {
        console.log("Using static data for now");
      }
    };
    getStats();
  }, []);

  return (
    // Added horizontal padding for mobile (px-4) and larger for desktop (md:p-0)
    <div className="space-y-6 animate-in fade-in duration-700" style={
      {"marginTop":'16px',
        marginLeft:'10px'
      }
    }>
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's today's overview.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">System Live</span>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Employees" 
          value={stats.totalEmployees} 
          icon={<Users size={20} />} 
          color="blue" 
          trend="+2 this month"
        />
        <StatCard 
          title="Present Today" 
          value={stats.presentToday} 
          icon={<UserCheck size={20} />} 
          color="emerald" 
          trend="92% rate"
        />
        <StatCard 
          title="Pending Face ID" 
          value={stats.pendingFaceReg} 
          icon={<Camera size={20} />} 
          color="amber" 
          trend="Action required"
        />
        <StatCard 
          title="Office Location" 
          value={stats.officeStatus} 
          icon={<MapPin size={20} />} 
          color="indigo" 
          trend="Geofence active"
        />
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-indigo-500" />
              Recent Attendance
            </h3>
            <button className="text-xs text-indigo-600 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    AK
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">Aman Karma</p>
                    <p className="text-[10px] md:text-xs text-gray-500 truncate">Face ID Check-in</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">09:15 AM</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">On Time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <TrendingUp size={18} />
                Action Required
              </h3>
              <p className="text-indigo-100 text-sm mb-4">4 employees waiting for Face ID approval.</p>
              <button className="w-full py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:shadow-xl transition-all">
                Review Approval <ChevronRight size={14} />
              </button>
            </div>
            {/* Decorative circles for style */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Clock size={16} className="text-amber-500" />
              Office Policy
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b dark:border-gray-800 pb-2">
                <span className="text-gray-500">Shift Starts</span>
                <span className="font-bold dark:text-white">09:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b dark:border-gray-800 pb-2">
                <span className="text-gray-500">Late After</span>
                <span className="font-bold dark:text-white">09:15 AM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Geofence</span>
                <span className="font-bold text-indigo-500">200 Meters</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STAT CARD COMPONENT ---
const StatCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all active:scale-95 sm:active:scale-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{title}</p>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white mt-1">{value}</h2>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <p className="text-[10px] font-medium text-gray-400">{trend}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;