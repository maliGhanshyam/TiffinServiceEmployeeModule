import React, { useEffect, useState } from "react";
import { getAllTiffins } from "../../services/AllTiffin/AllTiffin";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";
import { ActionCard } from "../../components/ActionCard";
import { styles } from "../dashboard/UserDashboard.styles";
import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";
import { Explore } from "@mui/icons-material";

const AllTiffinsPage = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [selectedSort, setSelectedSort] = useState("rating"); 

  // Fetch all tiffins
  const fetchAllTiffins = async () => {
    try {
      const data = await getAllTiffins();
      setTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedSort(newValue);
  };

  // Sorting logic for tiffins
  const sortedTiffins = [...tiffins].sort((a, b) => {
    if (selectedSort === "rating") {
      return b.tiffin_rating - a.tiffin_rating; // Sort by rating (descending)
    } else if (selectedSort === "veg") {
      return a.tiffin_type[0] === "veg" ? -1 : 1; // Veg first
    } else if (selectedSort === "nonveg") {
      return a.tiffin_type[0] === "veg" ? 1 : -1; // Non-Veg first
    }
    return 0;
  });

  useEffect(() => {
    fetchAllTiffins();
  }, []);

  return (
    <>
      {/* Explore Tiffins Section */}
      <Box sx={{ marginBottom: 3, marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "70px",
          }}
        >
          <Explore sx={{ marginRight: "8px" }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            All Available Tiffins
          </Typography>
        </Box>

        {/* Sort Tab for Tiffins */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mr: 7 }}>
          <Tabs
            value={selectedSort}
            onChange={handleSortChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ marginBottom: 1, marginLeft: 10 }}
          >
            <Tab value="rating" label="Rating" />
            <Tab value="veg" label="Veg" />
            <Tab value="nonveg" label="Non-Veg" />
          </Tabs>
        </Box>

        {/* Display the tiffin cards */}
        <Grid container spacing={2}>
          {sortedTiffins.map((tiff, index) => (
            <Grid item key={index}>
              <ActionCard
                sx={styles.cardStyles}
                imageUrl={tiff.tiffin_image_url}
                imageStyles={styles.cardMediaStyles}
              >
                <TiffinInfoCard
                  tiffin={tiff}
                  showButtons={true}
                  tiffin_quantity={1}
                />
              </ActionCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AllTiffinsPage;
