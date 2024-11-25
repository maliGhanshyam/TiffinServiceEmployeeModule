import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const loginUser = async (email: string, password: string) => {
  try {
    console.log("api", API_URL);

    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = (): boolean => {
  return !!localStorage.getItem("token");
};
