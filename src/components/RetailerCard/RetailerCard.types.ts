// import { Retailer } from "../../pages/dashboard/AdminDashboard/AdminDashboard.types";

export interface RetailerCardProps {
  retailer: Retailer;
  onApprove?: () => void;
  onReject?: () => void;
  showButtons?: boolean;
}
export interface Retailer {
  _id: string;
  username: string;
  user_image: string;
  email: string;
  contact_number: string;
  role_specific_details: {
    retailer_rating: number;
  };
  role_id: string;
}
