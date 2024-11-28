import axiosInstance from "../Interceptor/axiosInstance"
import { ApiResponse, OrderValue } from "./Order.types";
const API_URL = process.env.REACT_APP_API_URL!;

export const getAllOrders = async (
    page?: number,
    limit?: number,
    status?: string
  ): Promise<{ data: OrderValue[]; totalPages: number; totalItems: number }> => {
    try {
      const url =
        page && limit && status
          ? `${API_URL}/employees/getallorders?page=${page}&limit=${limit}&status=${status}`
          : `${API_URL}/employees/getallorders?page=${page}&limit=${limit}`;
      const response = await axiosInstance.get<
        ApiResponse & { pagination: { totalPages: number; totalItems: number } }
      >(url);
      return {
        data: response.data.data,
        totalPages: response.data.pagination.totalPages,
        totalItems: response.data.pagination.totalItems,
      };
    } catch (error) {
      throw error;
    }
  };

  export const searchOrders = async (
    query: string,
    page: number,
    limit: number
  ) => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/retailers/searchorders`,
        {
          params: { query, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };