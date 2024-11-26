export interface CartItem {
  tiffin_id: string;
  quantity: number;
  price: number;
  tiffin_name: string;
  tiffin_image_url: string;
  _id: string;
}

export interface Cart {
  _id: string;
  retailer_id: string;
  customer_id: string;
  items: CartItem[];
  total_amount: number;
  isActive: boolean;
  created_at: string;
  __v: number;
}

export interface CartResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Cart[];
}
