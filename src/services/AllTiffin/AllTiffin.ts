import { ApiResponse, tiffin } from "./AllTiffin.types";
import axiosInstance from "../axiosinstance";
import { UserData } from "../../Types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000/api";

//Fetch all tiffins available at the organization
// export const getAllTiffins = async (): Promise<tiffin[]> => {
//   const response = await axiosInstance.get(
//     `${API_URL}/employees/getalltiffinoforg`
//   );
//   return response.data.data;
// };

export const getAllTiffins = async (
  type?: string,
): Promise<tiffin[]> => {
  try{
  const url = type
    ? `${API_URL}/employees/getalltiffinoforg?type=${type}`
    : `${API_URL}/employees/getalltiffinoforg`;
  const response = await axiosInstance.get<ApiResponse>(url);
  return response.data.data
}catch(error){
  throw error;
}
};
//get all tiffins with pagination and sorting
export const getAllTiffinsSort = async (
  page?: number,
  limit?: number,
  type?: string,
): Promise<{data:tiffin[];totalPages: number; totalItems: number}> => {
  try{
  const url = type
    ? `${API_URL}/employees/getalltiffinoforg?page=${page}&limit=${limit}&type=${type}`
    : `${API_URL}/employees/getalltiffinoforg?page=${page}&limit=${limit}`;
  const response = await axiosInstance.get<ApiResponse & { pagination: { totalPages: number; totalItems: number } }>(url);
  return {
    data: response.data.data,
    totalPages: response.data.pagination.totalPages,
    totalItems: response.data.pagination.totalItems,
  }
}catch(error){
  throw error;
}
};

export const getAllTiffinofOrg = async (): Promise<tiffin[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/employees/getalltiffinoforg`
  );
  return response.data.data;
};

export const getAllRetailersofOrg = async (): Promise<UserData[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/employees/getallretailersoforg`
  );
  return response.data.data;
};

// export const getAllTiffinsByRetailer = async (): Promise<tiffin[]> => {
//   console.log("Start");
//   // const response = await axiosInstance.get(
//   //   `${API_URL}/employees/getalltiffinsbyretailer/:retailer_id`
//   // );
//   const response = await axiosInstance.get(
//     `${API_URL}/employees/getalltiffinsbyretailer/${"674014ab32de315575386a3d"}`
//   );
//   console.log(response);
//   console.log("end");

//   return response.data.data;
// };

export const getAllTiffinsByRetailer = async (
  retailerId: string
): Promise<tiffin[]> => {
  try {
    console.log("Start");

    // Dynamically include retailerId in the URL
    const response = await axiosInstance.get(
      `${API_URL}/employees/getalltiffinsbyretailer/${retailerId}`
    );

    console.log(response);
    console.log("End");

    return response.data.data;
  } catch (error) {
    console.error("Error fetching tiffins:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


// /api/employees/getallretailersoforg
// /api/employees/getallretailersoforg

// export const getAllTiffins = async (): Promise<tiffin[]> => {
//     try {
//         const response = await axiosInstance.get(`${API_URL}/api/employees/getalltiffinoforg`);
//         return response.data.data;
//     }catch(error){
//         throw error
//     }
// }
// export {};
