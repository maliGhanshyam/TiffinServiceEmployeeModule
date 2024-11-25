import { tiffin } from "./AllTiffin.types";
import axiosInstance from "../axiosinstance";
import { UserData } from "../../Types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

//Fetch all tiffins available at the organization
export const getAllTiffins = async (): Promise<tiffin[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/employees/getalltiffinoforg`
  );
  return response.data.data;
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

export const getAllTiffinsByRetailer = async (): Promise<tiffin[]> => {
  console.log("Start");
  // const response = await axiosInstance.get(
  //   `${API_URL}/employees/getalltiffinsbyretailer/:retailer_id`
  // );
  const response = await axiosInstance.get(
    `${API_URL}/employees/getalltiffinsbyretailer/${"674014ab32de315575386a3d"}`
  );
  console.log(response);
  console.log("end");

  return response.data.data;
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
