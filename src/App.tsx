import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Footer } from "./components/Footer";
// import { SnackbarProvider } from "./context";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
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
