import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Footer } from "./components/Footer";
// import { SnackbarProvider } from "./context";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar/>
      {/* {/ <Navbar /> /} */}
      <main className="main-content">
        {/* {/ <SnackbarProvider> /} */}
        <Outlet />
        {/* {/ </SnackbarProvider> /} */}
      </main>
      <Footer />
    </Box>
  );
}

export default App;
