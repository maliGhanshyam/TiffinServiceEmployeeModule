import React from "react";
import {
  Box,
  CardActions,
  Chip,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { TiffinInfoCardProps } from "./TiffinInfoCard.types";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { styles } from "./TiffinInfo.styles";
import { AddToCartButton } from "../AddToCartButton";
// import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import AdjustIcon from "@mui/icons-material/Adjust";
// import FastfoodIcon from "@mui/icons-material/Fastfood";

const TiffinInfoCard: React.FC<TiffinInfoCardProps> = ({
  tiffin,
  showButtons = false,
  // tiffin_quantity,
  // onApprove,
  // onReject,
  // onTrendy,
}) => {
  const truncate = (description: string) => {
    return description.length > 25
      ? `${description.slice(0, 24)}...`
      : description;
  };
  // const approvalStatus =
  //   retailer.role_specific_details?.approval[0]?.approval_status;
  // const rejectionReason =
  //   retailer.role_specific_details?.approval[0]?.rejection_reason;
  return (
    <Box sx={styles.boxStyle}>
      <Typography variant="h6" sx={styles.titleStyles}>
        {tiffin.tiffin_name}
      </Typography>
      <Tooltip title={tiffin.tiffin_description} placement="top">
        <Typography variant="body2" sx={styles.descriptionStyles}>
          {truncate(tiffin.tiffin_description)}
        </Typography>
      </Tooltip>
      {tiffin.tiffin_type === "veg" ? (
        <AdjustIcon color="success" />
      ) : (
        <AdjustIcon color="error" />
      )}
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: 500,
        }}
      >
        <Rating
          name="tiffin-rating"
          value={tiffin.tiffin_rating}
          precision={0.5}
          readOnly
        />
      </Typography>
      <Box sx={styles.fieldsBoxStyles}>
        <Chip
          label={`Price: Rs.${tiffin.tiffin_price}`}
          variant="outlined"
          color="primary"
          sx={{ fontWeight: 600, marginRight: 1 }}
        />
        <Chip
          label={`Qty: ${tiffin.tiffin_available_quantity}`}
          variant="outlined"
          color="secondary"
          sx={{ fontWeight: 600 }}
        />
      </Box>
      {showButtons && (
        <CardActions sx={styles.cardActionsStyles}>
          {/* {onApprove && (
            <Button
              onClick={() => onApprove(tiffin._id)}
              size="small"
              variant="contained"
              color="success"
              sx={styles.buttonStyles}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Approve
            </Button> */}
          <AddToCartButton
            tiffinId={tiffin._id}
            availableQuantity={tiffin.tiffin_available_quantity}
          />
          {/* )} */}
        </CardActions>
      )}
    </Box>
  );
};

export default TiffinInfoCard;
