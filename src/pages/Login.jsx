import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Backend API call using the central API.js config
      const response = await API.post("api/auth/login", { 
        email: email, 
        password: password 
      });

      // 2. Check if response is successful (Based on your Spring Boot structure)
    if (response.data.success) {
  const { token, role, fullName } = response.data.data;
  
  localStorage.setItem("token", token);
  localStorage.setItem("role", role); // e.g., "ROLE_ADMIN"
  localStorage.setItem("userName", fullName);

  // Structured Routing Based on Role
  if (role === "ROLE_ADMIN" || role === "ADMIN") {
    navigate("/admin/dashboard");
  } else {
    navigate("/employee/dashboard");
  }
}
    } 
    catch (err) {
      console.error("Login Error:", err);
      // Agar backend se koi error message aa raha hai toh wahi dikhayenge
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 shadow-md"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            KITE <span className="text-indigo-600">Portal</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to manage your attendance
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
              loading 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Contact Admin if you forgot your credentials.
        </p>
      </div>
    </div>
  );
}