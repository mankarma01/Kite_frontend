// import DashboardLayout from "./DashboardLayout";
// import { LayoutDashboard, Camera } from "lucide-react";

// const EMPLOYEE_MENU = [
//   { label: "My Stats", path: "/dashboard", icon: <LayoutDashboard size={20}/> },
//   { label: "Attendance", path: "/attendance", icon: <Camera size={20}/> },
// ];

// export default function EmployeeLayout() {
//   return <DashboardLayout menuItems={EMPLOYEE_MENU} roleName="Employee" initialInitials="EM" />;
// }

import { LayoutDashboard, Camera, LogOut} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


export default function EmployeeLayout() {
  const employeeMenu = [
    { text: "My Stats", path: "/employee/dashboard", icon: <LayoutDashboard size={18} /> },
    { text: "Attendance", path: "/attendance", icon: <Camera size={18} /> },
    {
  text: "Check Out",
  path: "/checkout",
  icon: <LogOut size={18} />,
}
  ];

  return (
    <div className="flex">
      <Sidebar menuItems={employeeMenu} />
      <main className="flex-1 bg-slate-50 dark:bg-[#020617] h-screen overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}