// import { Retailer } from "../../pages/dashboard/AdminDashboard/AdminDashboard.types";

import { tiffin } from "../../services/AllTiffin/AllTiffin.types";

export interface TiffinCardProps {
  tiffin: tiffin;
  tiffin_quantity:number;
  onApprove?: () => void;
  onReject?: () => void;
  showButtons?: boolean;
}
