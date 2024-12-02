import React, { useEffect, useState } from "react";
import {
  getAllTiffins,
  getAllRetailersofOrg,
} from "../../services/AllTiffin/AllTiffin";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
import { UserData } from "../../Types";
import CardSlider from "../../components/CardSlider/CardSlider";
import { ActionCard } from "../../components/ActionCard";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";
import { styles } from "./UserDashboard.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RetailerInfoCard from "../../components/retailerInfoCard/RetailerInfoCard";
import { Box, Grid2, Typography, Tabs, Tab, Button } from "@mui/material";
import { Explore, Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [retailers, setRetailers] = useState<UserData[]>([]);
  const [selectedSort, setSelectedSort] = useState(""); // Sorting option for Tiffins
  const navigate = useNavigate();
  const tiffin_quantity = 1;

  // Fetch functions
  const fetchRetailerTiffins = async (sortType: string) => {
    try {
      const data = await getAllTiffins(sortType); // Passing sort type to API
      setTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  const fetchRetailersOfOrg = async () => {
    try {
      const data = await getAllRetailersofOrg();
      setRetailers(data);
    } catch (error) {
      console.error("Error fetching retailers:", error);
    }
  };

  // Handle the sort change
  const handleSortChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedSort(newValue);
    fetchRetailerTiffins(newValue); // Fetch sorted data when sort option changes
  };

  const handleShowAllTiffins = () => {
    navigate(`/viewAllTiffins`);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchRetailerTiffins(selectedSort); // Fetch tiffins initially based on default sort (rating)
    fetchRetailersOfOrg();
  }, [selectedSort]); // Trigger fetch when sort changes

  return (
    <>
      {/* Explore Tiffins Section */}
      <Grid2 size={12} sx={{ marginBottom: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "70px",
            marginTop: "20px",
          }}
        >
          <Explore sx={{ marginRight: "8px" }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Explore Our Tiffins
          </Typography>
        </Box>

        {/* Sort Tab for Tiffins */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mr: 7,
          }}
        >
          <Tabs
            value={selectedSort}
            onChange={handleSortChange}
            textColor="primary"
            indicatorColor="primary"
            sx={styles.tabStyle}
          >
            <Tab value="" label="Rating" />
            <Tab value="veg" label="Veg" />
            <Tab value="non-veg" label="Non-Veg" />
          </Tabs>
          <Button
            sx={styles.buttonStyleSeeAll}
            variant="outlined"
            onClick={handleShowAllTiffins}
          >
            <VisibilityIcon
              sx={{
                display: { xs: "none", sm: "inline-block" },
                marginRight: "10px",
              }}
            />
            View All
          </Button>
        </Box>

        {/* Tiffins Display */}
        <CardSlider data={tiffins}>
          {(tiff) => (
            <ActionCard
              sx={styles.cardStyles}
              imageUrl={tiff.tiffin_image_url}
              imageStyles={styles.cardMediaStyles}
              tiffinType={tiff.tiffin_type}
            >
              <TiffinInfoCard
                tiffin={tiff}
                showButtons={true}
                tiffin_quantity={tiffin_quantity}
              />
            </ActionCard>
          )}
        </CardSlider>
      </Grid2>

      {/* Retailers Section */}
      <Grid2 size={12} sx={{ marginBottom: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "70px",
            marginTop: "40px",
          }}
        >
          <Storefront sx={{ marginRight: "8px" }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Our Retail Partners
          </Typography>
        </Box>

        {/* Retailer Cards */}
        <CardSlider data={retailers}>
          {(retail) => (
            <ActionCard
              sx={styles.cardStyles}
              imageUrl={retail.user_image}
              imageStyles={styles.cardMediaStyles}
            >
              <RetailerInfoCard retailer={retail} showButtons={true} />
            </ActionCard>
          )}
        </CardSlider>
      </Grid2>
    </>
  );
};

export default UserDashboard;
