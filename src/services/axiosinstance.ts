import axios from "axios";

const API_URL = '';

const getToken = () => {
  return localStorage.getItem("token");
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //temp
    const ogToken = getToken();
    console.log(ogToken);
    // const token = getToken();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDAxOWNkNmE0MjQ3ZDVjZjQxNDkzOCIsInJvbGUiOiI2NzI4YjZmNDNhNzNjZjc1N2Q4MjRhZTQiLCJpYXQiOjE3MzI0NTU0NTMsImV4cCI6MTczMjQ2MjY1M30.Sjy5czjgWfCreMohG0zbw6vju_P_W2sEaLLbJiGJ6h4";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
