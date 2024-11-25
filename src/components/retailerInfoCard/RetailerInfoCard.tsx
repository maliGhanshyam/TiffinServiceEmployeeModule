import React from "react";
import { Box, CardActions, Rating, Button, Typography } from "@mui/material";
import { RetailerInfoCardProps } from "./RetailerInfoCard.types";
import { styles } from "./retailerInfo.styles";
import { useNavigate } from "react-router-dom";

const RetailerInfoCard: React.FC<RetailerInfoCardProps> = ({
  retailer,
  showButtons = false,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const truncate = (text: string) => {
    return text.length > 25 ? `${text.slice(0, 24)}...` : text;
  };

  const handleShowRetailer = () => {
    
    navigate(`/retailerpage/${retailer._id}`); 
  };

  return (
    <Box sx={styles.boxStyle}>
      <Typography variant="h6" sx={styles.titleStyles}>
        {retailer.username}
      </Typography>
      <Typography variant="body2" sx={styles.descriptionStyles}>
        Email: {truncate(retailer.email)}
      </Typography>
      <Typography variant="body2" sx={styles.descriptionStyles}>
        Contact: {truncate(retailer.contact_number)}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: 500,
        }}
      >
        Retailer Rating:
        <Rating
          name="retailer-rating"
          value={retailer.role_specific_details?.retailer_rating || 0}
          precision={0.5}
          readOnly
        />
      </Typography>

      {showButtons && (
        <CardActions sx={styles.cardActionsStyles}>
          <Button
            onClick={handleShowRetailer} // Handle the click to navigate to the retailer's tiffin items
            size="small"
            variant="contained"
            color="primary"
            sx={styles.buttonStyles}
          >
            Show Retailer
          </Button>
        </CardActions>
      )}
    </Box>
  );
};

export default RetailerInfoCard;
