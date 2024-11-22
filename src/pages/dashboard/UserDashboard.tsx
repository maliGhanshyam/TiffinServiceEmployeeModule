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
} from "@mui/material";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [orgTiffins, setOrgTiffins] = useState<tiffin[]>([]);
  const [retailers, setRetailers] = useState<UserData[]>([]);

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

  return (
    <div>
      <p>Hello From Dashboard</p>
      <Box>
        <Card>
          <CardContent>hii</CardContent>
        </Card>
      </Box>
      {/* <div>
        {tiffins.length === 0 ? (
          <p>Loading...</p>
        ) : (
          tiffins.map((orgTiffins) => (
            <div key={orgTiffins.tiffin_name}>
              <p>{orgTiffins.tiffin_name}</p>
              <p>{orgTiffins.tiffin_description}</p>
              <p>{orgTiffins.tiffin_price}</p>
            </div>
          ))
        )}
      </div> */}
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Tiffins:</Typography>
        <Grid container spacing={3}>
          {tiffins.length === 0 ? (
            <p>Loading...</p>
          ) : (
            tiffins.map((tiffinItem) => (
              <Grid item xs={12} sm={6} md={4} key={tiffinItem.tiffin_name}>
                <Card sx={{ width: 350, height: 450 }}>
                  {/* Display Tiffin Image */}
                  {tiffinItem.tiffin_image_url && (
                    <CardMedia
                      component="img"
                      height="240"
                      image={tiffinItem.tiffin_image_url}
                      alt={tiffinItem.tiffin_name}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">
                      {tiffinItem.tiffin_name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {tiffinItem.tiffin_description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      Price: ${tiffinItem.tiffin_price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>

      <hr />
      <div>
        {retailers.length === 0 ? (
          <p>Loading...</p>
        ) : (
          retailers.map((retailer) => (
            <div key={retailer.username}>
              <p>{retailer.username}</p>
              <p>{retailer.email}</p>
              <p>{retailer.contact_number}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
