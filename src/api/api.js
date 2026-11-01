import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

export const clearAuthSession = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
};

export const getAuthSession = () => ({
    role: localStorage.getItem("role"),
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            clearAuthSession();

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default API;