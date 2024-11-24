import React, { useState } from "react";
import { Button, TextField, Box, Snackbar } from "@mui/material";
import axiosInstance from "../../services/axiosinstance";

interface AddToCartButtonProps {
  tiffinId: string;
  availableQuantity: number;
  // price: number;
  // retailerId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tiffinId,
  availableQuantity,
  // price,
  // retailerId,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    // Prepare the API request data
    const requestData = {
      quantity: quantity,
    };
    // http://localhost:5000/api/employees/cart/addtiffintocart/6740e5fef3245845727a4250
    try {
      const response = await axiosInstance.post(
        `http://localhost:5000/api/employees/cart/addtiffintocart/${tiffinId}`,
        requestData
      );

      // If the request is successful
      setSuccessMessage(response.data.message); // Assuming response has message
      setLoading(false);
    } catch (err: unknown) {
      // Handle errors
      setLoading(false);
      // setError(err.response?.data?.message || "Error adding to cart");
    }
  };

  return (
    <Box>
      {/* Quantity Input */}
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{ min: 1, max: availableQuantity }}
        fullWidth
        margin="normal"
      />

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        disabled={loading || quantity <= 0 || quantity > availableQuantity}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </Button>

      {/* Success or Error Message */}
      <Snackbar
        open={!!successMessage || !!error}
        autoHideDuration={6000}
        onClose={() => {
          setSuccessMessage(null);
          setError(null);
        }}
        message={successMessage || error}
      />
    </Box>
  );
};

export default AddToCartButton;
