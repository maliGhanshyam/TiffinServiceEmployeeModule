/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, TextField, Box, Snackbar } from "@mui/material";
import axiosInstance from "../../services/axiosinstance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addTiffinToCart } from "../../services/AllTiffin/AddToCart";

interface AddToCartButtonProps {
  tiffinId: string;
  availableQuantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tiffinId,
  availableQuantity,
}) => {
  console.log("tiffinId: ", tiffinId);
  console.log("availableQuantity", availableQuantity);

  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddTiffinToCart = async (tiffinId: string, quantity: number) => {
    try {
      const response = await addTiffinToCart(tiffinId, quantity);
      console.log("Tiffin added to cart successfully:", response);
      setSuccessMessage("Tiffin added to cart successfully!");
    } catch (err: unknown) {
      console.error("Error adding tiffin to cart:", err);
      setError("Failed to add tiffin to cart.");
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await handleAddTiffinToCart(tiffinId, quantity);
    } catch (err: unknown) {
      console.error("Error in handleAddToCart:", err);
      setError("An error occurred while adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Quantity Input */}
      <TextField
        label="Qty"
        type="number"
        // value={quantity}
        size="small"
        onChange={(e) => {
          const newValue = Number(e.target.value);
          if (newValue >= 1 && newValue <= availableQuantity) {
            setQuantity(newValue);
          }
        }}
        inputProps={{ min: 1, max: availableQuantity }}
        sx={{
          width: "auto",
          flexGrow: 1,
          height: "45px", // Set fixed height for consistency
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
          height: "40px",
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
