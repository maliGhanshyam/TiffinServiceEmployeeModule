import { Cart, CartResponse } from "../../Types/Cart";
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
    const response = await axiosInstance.put(
      `/employees/cart/removetiffinfromcart/${tiffinId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing tiffin from cart:", error);
    throw error;
  }
};

export const placeOrder = async (cartId: string, paymentMode: string) => {
  try {
    const response = await axiosInstance.post(
      `/employees/order/placeorder/${cartId}`,
      { payment_mode: paymentMode }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing the order:", error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await axiosInstance.get(
      `/employees/cancelorder/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error canceling the order:", error);
    throw error;
  }
};

export const clearCart = async (cartId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/employees/cart/removecart/${cartId}`
    );
    return response.data;
  } catch (error) {
    console.error("error removing cart", error);
    throw error;
  }
};
