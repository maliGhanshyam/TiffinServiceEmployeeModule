import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hook";
import { placeOrder, clearCart } from "../../services/CartService/Cart";

type CartItem = {
  tiffin_name: string;
  price: number;
  quantity: number;
  tiffin_image_url: string;
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [paymentMode, setPaymentMode] = useState("CoD");
  // Retrieve the data passed from CartPage
  const { items = [], totalAmount = 0, cartId } = location.state || {};
  const typedItems: CartItem[] = items;

  const handlePlaceOrder = async () => {
    if (!cartId) {
      showSnackbar("Cart ID is missing!", "error");
      return;
    }

    try {
      const data = await placeOrder(cartId, paymentMode);
      const orderData = data.data;
      if (data?.success) {
        showSnackbar("Order placed successfully!", "success");
        handleClearCart();
        navigate("/order-confirmation", { state: orderData });
      } else {
        showSnackbar("Failed to place order.", "error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      showSnackbar("An error occurred while placing the order.", "error");
    }
  };
  const handleClearCart = async () => {
    if (!cartId) {
      showSnackbar("Cart ID is missing!", "error");
      return;
    }
    try {
      const data = await clearCart(cartId);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h5" mb={"20px"}>
        Order Summary
      </Typography>
      {/* Table Headings */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          fontWeight: "600",
        }}
      >
        <Typography sx={{ flex: 2 }}>Items</Typography>
        <Typography sx={{ flex: 1, textAlign: "center" }}>Price</Typography>
        <Typography sx={{ flex: 1, textAlign: "center" }}>Quantity</Typography>
        <Typography sx={{ flex: 1, textAlign: "center" }}>Total</Typography>
      </Box>

      {typedItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
            textAlign: "center",
          }}
        >
          <Typography sx={{ flex: 2 }}>{item.tiffin_name}</Typography>
          <Typography sx={{ flex: 1, textAlign: "center" }}>
            ₹{item.price.toFixed(2)}
          </Typography>
          <Typography sx={{ flex: 1, textAlign: "center" }}>
            {item.quantity}
          </Typography>
          <Typography sx={{ flex: 1, textAlign: "center" }}>
            ₹{(item.quantity * item.price).toFixed(2)}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Shipping</Typography>
        <Typography>Free</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₹{totalAmount.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Payment Type
      </Typography>
      <RadioGroup
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <FormControlLabel
          value="CoD"
          control={<Radio />}
          label="Cash on Delivery"
        />
      </RadioGroup>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
