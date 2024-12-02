import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2, Button, Divider, Chip } from "@mui/material";
import { Cart } from "../../Types/Cart";
import {
  getAllCart,
  removeTiffinFromCart,
  updateCartQuantity,
} from "../../services/CartService/Cart";
import NumberInputWithDebounce from "../../components/debounce/NumberInputWithDebounce";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getAllCart();
        if (data) {
          setCartData(data);
        } else {
          console.error("Failed to load cart data:", data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    // if (quantity < 1) return;
    try {
      const response = await updateCartQuantity(itemId, quantity);

      console.log("Quantity updated:", response);
      // Fetch updated cart data
      const updatedCartData = await getAllCart();
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (tiffinId: string) => {
    try {
      await removeTiffinFromCart(tiffinId);
      // Fetch updated cart data
      const updatedCartData = await getAllCart();
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };
  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        items: cartItems,
        totalAmount: subtotal,
        cartId: cartData[0]._id,
      },
    });
  };

  const cartItems = cartData.flatMap((cart) => cart.items);
  const subtotal = cartData.length > 0 ? cartData[0].total_amount : 0;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "snow" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Cart
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      <Grid2 container spacing={2}>
        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="h6" color="text.secondary">
              No items in cart.
            </Typography>
          </Grid2>
        ) : (
          <Grid2 size={{ xs: 12, md: 9 }}>
            {cartItems.map((item) => {
              return (
                <Box
                  key={item._id}
                  sx={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "20px",
                  }}
                >
                  <Grid2 container spacing={2}>
                    {/* Image */}
                    <Grid2 size={{ xs: 3 }}>
                      <img
                        src={
                          item.tiffin_image_url ||
                          "https://res.cloudinary.com/dvtyyjpeo/image/upload/v1732857522/tiffin_image/c7eevh1rgefd3zpovxxl.jpg"
                        }
                        alt={item.tiffin_name}
                        style={{ width: "100%" }}
                      />
                    </Grid2>
                    {/* Details */}
                    <Grid2
                      size={{ xs: 9 }}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ marginBottom: "10px", fontSize: "1.5rem" }}
                        >
                          {item.tiffin_name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            marginBottom: "10px",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                          }}
                        >
                          ₹{item.price.toFixed(2)}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          sx={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItem: "left",
                            fontSize: "1.25rem",
                          }}
                        >
                          {item.tiffin_description}
                        </Typography>
                      </div>

                      <Box display="flex" alignItems="center" flex="1">
                        <NumberInputWithDebounce
                          initialValue={item.quantity}
                          onUpdateQuantity={(newQuantity) =>
                            handleQuantityChange(item.tiffin_id, newQuantity)
                          }
                        />

                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          size="small"
                          sx={{ marginLeft: "5px" }}
                          onClick={() => handleRemoveItem(item.tiffin_id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid2>
                  </Grid2>
                </Box>
              );
            })}
          </Grid2>
        )}
        {/* Summary */}
        {cartItems.length > 0 && (
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Subtotal ({cartItems.length} item
                {cartItems.length > 1 ? "s" : ""}): ₹{subtotal.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleProceedToPayment}
              >
                Proceed to Buy
              </Button>
            </Box>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default CartPage;
