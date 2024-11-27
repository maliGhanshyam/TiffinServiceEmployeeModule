import { Cart, CartResponse } from "../../types/Cart";
import axiosInstance from "./axiosInstance";

export const getAllCart = async (): Promise<Cart[]> => {
  try {
    const response = await axiosInstance.get<CartResponse>(
      "/employees/cart/getcart"
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch cart data:", error);
    throw error;
  }
};

export const updateCartQuantity = async (
  itemId: string,
  quantity: number
): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      `/employees/cart/updatetiffinquantity/${itemId}`,
      { quantity }
    );
  } catch (error) {
    console.error("Failed to update quantity:", error);
    throw error;
  }
};

export const removeTiffinFromCart = async (tiffinId: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(
      `/employees/cart/removetiffinFromcart/${tiffinId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing tiffin from cart:", error);
    throw error;
  }
};
