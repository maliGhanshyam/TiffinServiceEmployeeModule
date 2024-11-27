import axiosInstance from "../Interceptor/axiosInstance";
import { Organization, OrganizationResponse, OrganizationsResponse } from "./Organization.types";

const API_URL = process.env.REACT_APP_API_URL!;

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await axiosInstance.get<OrganizationsResponse>(
      `${API_URL}/superadmin/organizations/getallOrganizationname`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getOrganizationById = async (orgId: string): Promise<Organization> => {
  try {
    const response = await axiosInstance.get<OrganizationResponse>(
      `${API_URL}/superadmin/organizations/getOrganization/${orgId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
