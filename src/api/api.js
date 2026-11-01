import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// No request interceptor needed anymore

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("role");
            localStorage.removeItem("userName");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;