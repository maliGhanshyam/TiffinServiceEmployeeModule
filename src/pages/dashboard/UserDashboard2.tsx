import {  Stack, Button } from "@mui/material";
import React from "react";

const UserDashboard2 = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="text">TEXT</Button>
      <Button variant="contained">CONTAINTED</Button>
      <Button variant="outlined">OUTLINED</Button>
    </Stack>
  );
};

export default UserDashboard2;
