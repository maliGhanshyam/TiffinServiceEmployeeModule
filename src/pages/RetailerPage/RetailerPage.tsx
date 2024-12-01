import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material"; // Use Grid instead of Grid2
import { useParams } from "react-router-dom";
import { tiffin } from "../../Types";
import { getAllTiffinsByRetailer } from "../../services/AllTiffin/AllTiffin";
import { ActionCard } from "../../components/ActionCard";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";

const RetailerPage: React.FC = () => {
  const { retailer_id } = useParams<{ retailer_id: string }>();
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [tiffin_quantity] = useState<number>(1);

  const fetchAllTiffinsByRetailers = async () => {
    try {
      if (retailer_id) {
        const data = await getAllTiffinsByRetailer(retailer_id);
        setTiffins(data);
      }
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  useEffect(() => {
    fetchAllTiffinsByRetailers();
  }, [retailer_id]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Available Tiffins 
      </Typography>
      <Grid container spacing={2}>
        {tiffins.map((tiff, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ActionCard
              sx={{
                maxWidth: 345,
                margin: "auto",
              }}
              imageUrl={tiff.tiffin_image_url}
              imageStyles={{
                height: 140,
                objectFit: "cover",
              }}
              tiffinType={tiff.tiffin_type}
            >
              <TiffinInfoCard
                tiffin={tiff}
                showButtons={true}
                tiffin_quantity={tiffin_quantity}
              />
            </ActionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RetailerPage;
