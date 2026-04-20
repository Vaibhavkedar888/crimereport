import axios from 'axios';

// Create an axios instance with dynamic base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.token) {
                config.headers['Authorization'] = `Bearer ${user.token}`;
            }
        }
        console.log(">>> AXIOS DEBUG: Requesting to: " + config.baseURL + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
