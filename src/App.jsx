import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import AdminOverview from "./pages/AdminOverview";
import EmployeeManagement from "./pages/EmployeeManagement";
import EmployeeStats from "./pages/EmployeeStats";
import AttendanceCamera from "./pages/AttendanceCamera";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function RootRedirect() {
  const role = localStorage.getItem("role");

  if (role === "ROLE_ADMIN" || role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role) {
    return <Navigate to="/employee/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminOverview />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]} />}>
          <Route element={<EmployeeLayout />}>
            <Route path="/employee/dashboard" element={<EmployeeStats />} />
            <Route path="/attendance" element={<AttendanceCamera />} />
            <Route path="/checkout" element={<AttendanceCamera />} />
          </Route>
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}