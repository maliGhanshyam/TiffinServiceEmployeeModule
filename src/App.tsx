import "./App.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
<<<<<<< Updated upstream
import { SnackbarProvider } from "./context";
=======
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
>>>>>>> Stashed changes

function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
<<<<<<< Updated upstream
=======
      <Navbar />
>>>>>>> Stashed changes
      <main style={{ flex: 1 }}>
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </main>
      <Footer />
    </Box>
  );
}

export default App;
