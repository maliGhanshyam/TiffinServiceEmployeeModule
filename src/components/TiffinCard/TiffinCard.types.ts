// import { Retailer } from "../../pages/dashboard/AdminDashboard/AdminDashboard.types";

export interface TiffinCardProps {
  tiffin: any;
  tiffin_quantity:number;
  onApprove?: () => void;
  onReject?: () => void;
  showButtons?: boolean;
}
