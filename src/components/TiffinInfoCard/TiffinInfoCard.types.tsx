export interface TiffinInfoCardProps {
  tiffin: any;
  showButtons?: boolean;
  tiffin_quantity:number;
  onApprove?: (retailerId: string) => void;
  onReject?: (retailerId: string) => void;
  onTrendy?: (retailerId: string) => void;
}
