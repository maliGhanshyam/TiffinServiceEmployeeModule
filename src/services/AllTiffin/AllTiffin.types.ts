export interface tiffin {
  _id:string;
  tiffin_id: string
  tiffin_image_url: string;
  tiffin_name: string;
  tiffin_available_quantity: number;
  tiffin_description: string;
  retailer_id: string;
  tiffin_type: string;
  tiffin_price: number;
  tiffin_rating: number;
  tiffin_isavailable: boolean;
  tiffin_created_at: Date;
  tiffin_updated_at: Date;
  isActive: boolean;
  __v: number;
}

//api response 
export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: [];
}