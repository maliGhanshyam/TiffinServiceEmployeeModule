/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, TextField, Box, Snackbar } from "@mui/material";
import axiosInstance from "../../services/axiosinstance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addTiffinToCart } from "../../services/AllTiffin/AddToCart";
import { useSnackbar } from "../../hook";

interface AddToCartButtonProps {
  tiffinId: string;
  availableQuantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tiffinId,
  availableQuantity,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {showSnackbar}=useSnackbar();
  const handleAddTiffinToCart = async (tiffinId: string, quantity: number) => {
    try {
      if(quantity>0){
      const response = await addTiffinToCart(tiffinId, quantity);
      showSnackbar("Tiffin added to cart successfully!","success");
      }else
      showSnackbar("Please select a quantity before adding to cart.", "error");
    } catch (err: unknown) {
      showSnackbar("Items from different retailers can't be in the same cart.", "error");
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
        InputLabelProps={{
          style: { fontSize: '0.85rem' },
        }}
      />

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleAddToCart}
        disabled={loading || quantity < 0 || quantity > availableQuantity}
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
