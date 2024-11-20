import { tiffin } from "./AllTiffin.types";
import axiosInstance from "../axiosinstance";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

//Fetch all tiffins available at the organization
export const getAllTiffins = async (): Promise<tiffin[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/api/employees/getalltiffinoforg`
  );
  return response.data.data;
};

export const getAllTiffinofOrg = async (): Promise<tiffin[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/api/employees/getallretailersoforg`
  );
  return response.data.data;
};

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
