import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Q4MGI4ZGI1MjVmYjAxYTIxNjA5NCIsInJvbGUiOiI2NzI4YjZmNDNhNzNjZjc1N2Q4MjRhZTQiLCJpYXQiOjE3MzIxMDAzOTYsImV4cCI6MTczMjEwNzU5Nn0.RIyTurVAugAw_qQDWxh__xLtOlamxgA8z2R_LwzjNMw";
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
