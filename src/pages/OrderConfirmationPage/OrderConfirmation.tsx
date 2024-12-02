import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hook";
import { cancelOrder } from "../../services/CartService/Cart";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const orderData = location.state || {};

  const handleCancelOrder = async () => {
    if (!orderData) {
      showSnackbar("Order ID is missing!", "error");
      return;
    }

    try {
      const data = await cancelOrder(orderData._id);
      if (data?.success) {
        showSnackbar("Order canceled successfully!", "success");
        navigate("/");
      } else {
        showSnackbar("Failed to canceled order.", "error");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      showSnackbar("An error occurred while canceling the order.", "error");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        bgcolor: "#f8f7f7eb",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        mt: 5,
        backgroundColor: "snow",
      }}
    >
      {/* Success Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: "orange",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(255, 165, 0, 0.5)",
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: "48px", color: "#fff" }} />
        </Box>
      </Box>

      {/* Thank You Message */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Thank you for ordering!
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button variant="outlined" color="primary" onClick={handleCancelOrder}>
          Cancel Order
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
