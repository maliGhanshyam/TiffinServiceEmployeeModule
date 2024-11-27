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
import { Box, Grid2, Typography } from "@mui/material";
import { AccessAlarm, Explore, Storefront } from "@mui/icons-material";

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [orgTiffins, setOrgTiffins] = useState<tiffin[]>([]);
  const [retailers, setRetailers] = useState<UserData[]>([]);
  const [selectedSort, setSelectedSort] = useState("rating");
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
      <Grid2 size={12} sx={{marginBottom:3}}>
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
        </Grid2>
      <Grid2 size={12} sx={{marginBottom:3}}>
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "70px", marginTop: "40px"}}>
          <Storefront sx={{ marginRight: "8px" }} /> 
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Our Retail Partners
          </Typography>
        </Box>

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


// WIth filters
// import React, { useEffect, useState } from "react";
// import {
//   getAllRetailersofOrg,
//   getAllTiffinofOrg,
//   getAllTiffins,
// } from "../../services/AllTiffin/AllTiffin";
// import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
// import { UserData } from "../../Types";
// import CardSlider from "../../components/CardSlider/CardSlider";
// import { ActionCard } from "../../components/ActionCard";
// import { TiffinInfoCard } from "../../components/TiffinInfoCard";
// import { styles } from "./UserDashboard.styles";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import RetailerInfoCard from "../../components/retailerInfoCard/RetailerInfoCard";
// import { Box, Grid2, Typography, Tabs, Tab } from "@mui/material";
// import { Explore, Storefront } from "@mui/icons-material";

// const UserDashboard = () => {
//   const [tiffins, setTiffins] = useState<tiffin[]>([]);
//   const [retailers, setRetailers] = useState<UserData[]>([]);
//   const [selectedSort, setSelectedSort] = useState("rating"); // Sorting option for Tiffins

//   const tiffin_quantity = 1;

//   // Fetch functions
//   const fetchRetailerTiffins = async () => {
//     try {
//       const data = await getAllTiffins();
//       setTiffins(data);
//     } catch (error) {
//       console.error("Error fetching tiffins:", error);
//     }
//   };

//   const fetchRetailersOfOrg = async () => {
//     try {
//       const data = await getAllRetailersofOrg();
//       setRetailers(data);
//     } catch (error) {
//       console.error("Error fetching retailers:", error);
//     }
//   };

//   // Handle the sort change
//   const handleSortChange = (event: React.ChangeEvent<{}>, newValue: string) => {
//     setSelectedSort(newValue);
//   };

//   // Sorting logic for tiffins
//   const sortedTiffins = [...tiffins].sort((a, b) => {
//     if (selectedSort === "rating") {
//       return b.tiffin_rating - a.tiffin_rating; // Sort by rating (descending)
//     } else if (selectedSort === "veg") {
//       return a.tiffin_type[0] === "veg" ? -1 : 1; // Veg first
//     } else if (selectedSort === "nonveg") {
//       return a.tiffin_type[0] === "veg" ? 1 : -1; // Non-Veg first
//     }
//     return 0;
//   });

//   // Fetch data on mount
//   useEffect(() => {
//     fetchRetailerTiffins();
//     fetchRetailersOfOrg();
//   }, []);

//   return (
//     <>
//       {/* Explore Tiffins Section */}
//       <Grid2 size={12} sx={{ marginBottom: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", marginLeft: "70px", marginTop: "20px" }}>
//           <Explore sx={{ marginRight: "8px" }} />
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Explore Our Tiffins
//           </Typography>
//         </Box>

//         {/* Sort Tab for Tiffins */}
//         <Tabs
//           value={selectedSort}
//           onChange={handleSortChange}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{ marginBottom: 1,marginLeft:10 }}
//         >
//           <Tab value="rating" label="Rating" />
//           <Tab value="veg" label="Veg" />
//           <Tab value="nonveg" label="Non-Veg" />
//         </Tabs>

//         <CardSlider data={sortedTiffins}>
//           {(tiff) => (
//             <ActionCard sx={styles.cardStyles} imageUrl={tiff.tiffin_image_url} imageStyles={styles.cardMediaStyles}>
//               <TiffinInfoCard tiffin={tiff} showButtons={true} tiffin_quantity={tiffin_quantity} />
//             </ActionCard>
//           )}
//         </CardSlider>
//       </Grid2>

//       {/* Retailers Section */}
//       <Grid2 size={12} sx={{ marginBottom: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", marginLeft: "70px", marginTop: "40px" }}>
//           <Storefront sx={{ marginRight: "8px" }} />
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Our Retail Partners
//           </Typography>
//         </Box>

//         {/* Sort Tab for Retailers */}
//         <Tabs
//           value={selectedSort}
//           onChange={handleSortChange}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{ marginBottom: 1,marginLeft:10 }}
//         >
//           <Tab value="rating" label="Rating" />
//           <Tab value="veg" label="Veg" />
//           <Tab value="nonveg" label="Non-Veg" />
//         </Tabs>

//         <CardSlider data={retailers}>
//           {(retail) => (
//             <ActionCard sx={styles.cardStyles} imageUrl={retail.user_image} imageStyles={styles.cardMediaStyles}>
//               <RetailerInfoCard retailer={retail} showButtons={true} />
//             </ActionCard>
//           )}
//         </CardSlider>
//       </Grid2>
//     </>
//   );
// };

// export default UserDashboard;

