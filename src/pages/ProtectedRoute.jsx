// import { Navigate, Outlet } from "react-router-dom";

// // Protection for Authentication and Roles
// export const ProtectedRoute = ({ allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" replace />;
  
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // Redirect to a default page if the user doesn't have the right role
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {

    const role = localStorage.getItem("role");

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};