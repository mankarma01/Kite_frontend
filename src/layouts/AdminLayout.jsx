// import DashboardLayout from "./DashboardLayout";
// import { LayoutDashboard, Users, Settings } from "lucide-react";

// const ADMIN_MENU = [
//   { label: "Overview", path: "/admin/dashboard", icon: <LayoutDashboard size={20}/> },
//   { label: "Employees", path: "/admin/employees", icon: <Users size={20}/> },
//   { label: "Settings", path: "/admin/settings", icon: <Settings size={20}/> },
// ];

// export default function AdminLayout() {
//   return <DashboardLayout menuItems={ADMIN_MENU} roleName="Administrator" initialInitials="AD" />;
// }

import { LayoutDashboard, Users, Settings } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const adminMenu = [
    { text: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { text: "Employees", path: "/admin/employees", icon: <Users size={18} /> },
    { text: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex">
      <Sidebar menuItems={adminMenu} />
      <main className="flex-1 bg-slate-50 dark:bg-[#020617] h-screen overflow-y-auto">
        <Outlet /> {/* This renders AdminOverview or EmployeeManagement */}
      </main>
    </div>
  );
}   