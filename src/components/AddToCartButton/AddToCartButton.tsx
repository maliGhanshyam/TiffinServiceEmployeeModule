import React, { useState } from "react";
import { Button, TextField, Box, Snackbar } from "@mui/material";
import axiosInstance from "../../services/axiosinstance";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 

interface AddToCartButtonProps {
  tiffinId: string;
  availableQuantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tiffinId,
  availableQuantity,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    const requestData = {
      quantity: quantity,
    };

    try {
      const response = await axiosInstance.post(
        `http://localhost:5000/api/employees/cart/addtiffintocart/${tiffinId}`,
        requestData
      );

      setSuccessMessage(response.data.message); 
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      setError("Error adding to cart");
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Quantity Input */}
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        size="small"
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{ min: 1, max: availableQuantity }}
        sx={{
          width: 'auto',
          flexGrow: 1,
          height: '45px', // Set fixed height for consistency
        }}
        margin="normal"
      />

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleAddToCart}
        disabled={loading || quantity <= 0 || quantity > availableQuantity}
        sx={{
          height: '40px', 
        }}
        startIcon={<ShoppingCartIcon />} 
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
