import React, { useEffect, useState } from "react";
import {
  getAllRetailersofOrg,
  getAllTiffinofOrg,
  getAllTiffins,
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
import { Typography } from "@mui/material";

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [orgTiffins, setOrgTiffins] = useState<tiffin[]>([]);
  const [retailers, setRetailers] = useState<UserData[]>([]);

  const tiffin_quantity = 1;

  const fetchRetailerTiffins = async () => {
    try {
      const data = await getAllTiffins();
      console.log("Retailer tiffin data:", data);
      setTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  const fetchOrgTiffins = async () => {
    try {
      const data = await getAllTiffinofOrg();
      console.log("data:", data);
      setOrgTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  const fetchRetailersOfOrg = async () => {
    try {
      const data = await getAllRetailersofOrg();
      console.log("data:", data);
      setRetailers(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  // useEffect to fetch data
  useEffect(() => {
    fetchRetailerTiffins();
    fetchOrgTiffins();
    fetchRetailersOfOrg();
    console.log(orgTiffins);
  }, []);

  return (
    <>
      <Typography variant="h4">All Tiffins</Typography>
      <CardSlider data={tiffins}>
        {(tiff) => (
          <ActionCard
            sx={styles.cardStyles}
            imageUrl={tiff.tiffin_image_url}
            imageStyles={styles.cardMediaStyles}
          >
            <TiffinInfoCard
              tiffin={tiff}
              showButtons={true}
              tiffin_quantity={tiffin_quantity}
            />
          </ActionCard>
        )}
      </CardSlider>

      <Typography variant="h4">All Retailers</Typography>

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
    </>
  );
};

export default UserDashboard;
