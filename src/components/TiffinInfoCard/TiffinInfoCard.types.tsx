import { tiffin } from "../../services/AllTiffin/AllTiffin.types";

export interface TiffinInfoCardProps {
  tiffin: tiffin;
  showButtons?: boolean;
  tiffin_quantity:number;
  onApprove?: (retailerId: string) => void;
  onReject?: (retailerId: string) => void;
  onTrendy?: (retailerId: string) => void;
}
