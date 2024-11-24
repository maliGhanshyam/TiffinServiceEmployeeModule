import React, { useEffect, useState } from "react";
import {
  getAllRetailersofOrg,
  getAllTiffinofOrg,
  getAllTiffins,
} from "../../services/AllTiffin/AllTiffin";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
import { UserData } from "../../Types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CardActionArea,
  Grid2,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { AddToCartButton } from "../../components/AddToCartButton";
import CardSlider from "../../components/CardSlider/CardSlider";
import { ActionCard } from "../../components/ActionCard";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";
import { styles } from "./UserDashboard.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [orgTiffins, setOrgTiffins] = useState<tiffin[]>([]);
  const [retailers, setRetailers] = useState<UserData[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const tiffin_quantity = 1;

  const fetchRetailerTiffins = async () => {
    try {
      const data = await getAllTiffins();
      console.log("data:", data);
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

  const openConfirmationModal = (
    tiffin: tiffin,
    action: "approve" | "reject"
  ) => {
    // setSelectedRetailer(pendingRetailer);
    setOpenModal(true);
  };
  return (
    // <div>
    //   <img
    //     src="https://t3.ftcdn.net/jpg/05/33/82/34/360_F_533823407_h0wVzQub7h3b6OZVWE44BPf5E6SHndxI.jpg"
    //     alt="test"
    //   />
    //   <div style={{ marginTop: "20px" }}>
    //     <Typography variant="h6">Tiffins:</Typography>
    //     <Grid container spacing={3}>
    //       {tiffins.length === 0 ? (
    //         <p>Loading...</p>
    //       ) : (
    //         tiffins.map((tiffinItem) => (
    //           <Grid item xs={12} sm={6} md={4} key={tiffinItem.tiffin_name}>
    //             <Card sx={{ width: 345 }}>
    //               <CardActionArea>
    //                 {tiffinItem.tiffin_image_url && (
    //                   <CardMedia
    //                     component="img"
    //                     height="140"
    //                     image={
    //                       tiffinItem.tiffin_image_url &&
    //                       tiffinItem.tiffin_image_url.trim() !== ""
    //                         ? tiffinItem.tiffin_image_url
    //                         : "https://t3.ftcdn.net/jpg/05/33/82/34/360_F_533823407_h0wVzQub7h3b6OZVWE44BPf5E6SHndxI.jpg"
    //                     }
    //                     alt={tiffinItem.tiffin_name}
    //                     sx={{ objectFit: "cover", width: "100%" }}
    //                   />
    //                 )}
    //                 <CardContent>
    //                   <Typography variant="h5" component="div">
    //                     {tiffinItem.tiffin_name}
    //                   </Typography>
    //                   <Typography variant="body2" color="textSecondary">
    //                     {tiffinItem.tiffin_description}
    //                   </Typography>
    //                   <Typography variant="h6" color="primary">
    //                     Price: ${tiffinItem.tiffin_price}
    //                   </Typography>
    //                   <Typography variant="h6" color="textSecondary">
    //                     Rating: ${tiffinItem.tiffin_rating}
    //                   </Typography>
    //                 </CardContent>
    //               </CardActionArea>
    //               <CardActions>
    //                 <AddToCartButton
    //                   tiffinId={tiffinItem.tiffin_id}
    //                   availableQuantity={tiffin_quantity}
    //                 ></AddToCartButton>
    //               </CardActions>
    //             </Card>
    //           </Grid>
    //         ))
    //       )}
    //     </Grid>
    //   </div>

    //   <hr />
    //   <div>
    //     {retailers.length === 0 ? (
    //       <p>Loading...</p>
    //     ) : (
    //       retailers.map((retailer) => (
    //         <div key={retailer.username}>
    //           <p>{retailer.username}</p>
    //           <p>{retailer.email}</p>
    //           <p>{retailer.contact_number}</p>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </div>
    <CardSlider data={tiffins}>
      {(tiff) => (
        <ActionCard
          sx={styles.cardStyles}
          imageUrl={tiff.tiffin_image_url}
          imageStyles={styles.cardMediaStyles}
        >
          <TiffinInfoCard tiffin={tiff}
          showButtons={true}
          tiffin_quantity={tiffin_quantity} />
        </ActionCard>
      )}
    </CardSlider>
  );
};

export default UserDashboard;
