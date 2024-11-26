import { Cart, CartResponse } from "../../types/Cart";
import axiosInstance from "./axiosInstance";

export const getAllCart = async (): Promise<Cart[]> => {
  try {
    const response = await axiosInstance.get<CartResponse>(
      "/employees/cart/getcart"
    );
    console.log("Cart data fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch cart data:", error);
    throw error;
  }
};
