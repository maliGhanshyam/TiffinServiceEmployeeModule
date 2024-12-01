import React from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import { ActionCardProps } from "./ActionCard.types";
import { DEFAULT_IMAGE_CARD } from "../../constants/DEFAULT_IMAGE";

// Removed AdjustIcon import to use text-based approach
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const ActionCard: React.FC<ActionCardProps> = ({
  imageUrl,
  imageStyles,
  children,
  tiffinType, // Pass tiffin type as a prop to know if it's veg or non-veg
  sx = {},
}: ActionCardProps) => {
  const defaultImageUrl = DEFAULT_IMAGE_CARD; // Default image
  const imageToDisplay = imageUrl || defaultImageUrl;

  return (
    <Card sx={sx}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={imageStyles}
          image={imageToDisplay}
          title="Retailer Image"
        />
        {/* Conditionally Render Veg/Non-Veg Badge */}
        {tiffinType && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: tiffinType === "veg" ? "green" : "red", // Green for Veg, Red for Non-Veg
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              boxShadow: 2,
              fontWeight: "bold",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            {tiffinType === "veg" ? (
              <>
                <Typography variant="body2">Veg</Typography>
              </>
            ) : (
              <>
                <Typography variant="body2">Non-Veg</Typography>
              </>
            )}
          </Box>
        )}
      </Box>
      {children}
    </Card>
  );
};

export default ActionCard;
