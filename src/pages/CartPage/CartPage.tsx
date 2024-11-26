import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  Button,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import { Cart } from "../../types/Cart";
import { getAllCart } from "../../services/CartService/Cart";

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
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

  const cartItems = cartData.flatMap((cart) => cart.items);
  const subtotal = cartData.reduce((sum, cart) => sum + cart.total_amount, 0);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Cart
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      <Grid2 container spacing={2}>
        {/* Cart Items */}
        <Grid2 size={{ xs: 12, md: 9 }}>
          {cartItems.map((item) => (
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
                    src={item.tiffin_image_url}
                    alt={item.tiffin_name}
                    style={{ width: "100%" }}
                  />
                </Grid2>
                {/* Details */}
                <Grid2 size={{ xs: 9 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    {item.tiffin_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "10px" }}
                  >
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      value={item.quantity}
                      onChange={() => {}}
                      sx={{ marginRight: "10px", width: "80px" }}
                    >
                      {[...Array(10).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button color="error" onClick={() => {}}>
                      Delete
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          ))}
        </Grid2>
        {/* Summary */}
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
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}
              ): ₹{subtotal.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Buy
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CartPage;
