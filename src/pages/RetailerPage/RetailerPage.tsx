import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAllTiffinsByRetailer } from "../../services/AllTiffin/AllTiffin";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";

interface RetailerPageProps {}

const RetailerPage: React.FC<RetailerPageProps> = () => {
  const { retailer_id } = useParams();

  const [tiffins, setTiffins] = useState<tiffin[]>([]);


  const fetchAllTiffinsByRetailers = async () => {
    try {
      const data = await getAllTiffinsByRetailer();
      console.log("Retailer tiffin data:", data);
      setTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  useEffect(() => {
    fetchAllTiffinsByRetailers();
    console.log(tiffins);
  }, []);

  return (
    <div>
      <Typography variant="h4">Retailer ID: {retailer_id}</Typography>
    </div>
  );
};

export default RetailerPage;
