import axiosInstance from "../axiosinstance";
const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000/api";


export const addTiffinToCart = async (
    tiffinId: string,
    quantity: number
  ): Promise<void> => {
    const response = await axiosInstance.post(
      `${API_URL}/employees/cart/addtiffintocart/${tiffinId}`,
      { quantity }
    );
    return response.data;
  };