export interface RetailerInfoCardProps {
    retailer: {
      _id: string;
      username: string;
      email: string;
      contact_number: string;
      role_specific_details: {
        retailer_rating: number;
      };
      role_id: string;
    };
    showButtons?: boolean;
    onApprove?: (retailerId: string) => void;
    onReject?: (retailerId: string) => void;
  }