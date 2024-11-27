import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
// import { SnackbarProvider } from "./context";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar/>
      <main style={{ flex: 1 }}>
        {/* <SnackbarProvider> */}
          <Outlet />
        {/* </SnackbarProvider> */}
      </main>
      <Footer />
    </Box>
  );
}

export default App;
