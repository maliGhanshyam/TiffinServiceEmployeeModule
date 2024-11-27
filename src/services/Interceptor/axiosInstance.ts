import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
  // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2VjOTE4MmMxNDVlYjUwOTJmZmZhZiIsInJvbGUiOiI2NzIzNDc1Zjc0YjMyY2ZlMzllNWQwYTIiLCJpYXQiOjE3MzI0OTYzNjIsImV4cCI6MTczMjUwMzU2Mn0.Ysw41QQVR9Jv5fckXI7-FvOc_xsHy0EJ9Cn6C1vIm9M";
  // return token;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
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