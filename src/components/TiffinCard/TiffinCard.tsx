import React from "react";
import { Box } from "@mui/material";
import { ActionCard } from "../ActionCard";
import { TiffinInfoCard } from "../TiffinInfoCard";
import { styles } from "./TiffinCard.styles";
import { TiffinCardProps } from "./TiffinCard.types";

const TiffinCard: React.FC<TiffinCardProps> = ({
  tiffin,
  tiffin_quantity,
  onApprove,
  onReject,
  showButtons = false,
}) => {
  const style = showButtons ? styles.innerCardContainerStyle : styles.innerCardContainerStyleAR;
  return (
    <Box sx={style}>
      <ActionCard
        sx={styles.cardStyles}
        imageUrl={tiffin.user_image!}
        imageStyles={styles.cardMediaStyles}
      >
        <TiffinInfoCard
          tiffin={tiffin}
          tiffin_quantity={tiffin_quantity}
          showButtons={true}
          onApprove={onApprove}
          onReject={onReject}
        />
      </ActionCard>
    </Box>
  );
};

export default TiffinCard;
