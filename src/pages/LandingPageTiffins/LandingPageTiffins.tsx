import { useEffect, useState } from "react";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
import { useSnackbar } from "../../hook";
import { getAllTiffinsSort } from "../../services/AllTiffin/AllTiffin";
import { Grid2, Select, MenuItem, TextField, InputAdornment, Typography, Box } from "@mui/material";
import { ActionCard } from "../../components/ActionCard";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";
import { styles } from "./LandingPageTiffins.styles";
import { PaginationComponent } from "../../components/PaginationComponent";
import SearchIcon from "@mui/icons-material/Search";

const LandingPageTiffins = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { showSnackbar } = useSnackbar();

  const limit = 4;

  useEffect(() => {
    fetchAllTiffins(page, type);
  }, [page, type]);

  const fetchAllTiffins = async (page: number, type: string | null = null) => {
    try {
      const { data, totalItems, totalPages } = type
        ? await getAllTiffinsSort(page, limit, type)
        : await getAllTiffinsSort(page, limit);
      setTotalPages(totalPages);
      setTiffins(data);
    } catch (error) {
      showSnackbar("Error fetching all tiffins", "error");
    }
  };

  const handlePageChange = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<any>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* Search Field */}
      <Grid2 container spacing={2} size={12} sx={{marginX:7,marginY:2, justifyContent:"flex-end"}}>
      

      {/* Sorting Dropdown */}
      <Grid2 size={{ sm: 1, xs: 12 }} sx={styles.filterStyle}>
        <Select
          value={type || ""}
          onChange={(event) => {
            setType(event.target.value || null);
            setPage(1); // Reset to first page on sorting change
          }}
          displayEmpty
          fullWidth
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="veg">Veg</MenuItem>
          <MenuItem value="non-veg">Non-Veg</MenuItem>
        </Select>
      </Grid2>
      <Grid2 size={{ sm: 3, xs: 12 }} sx={styles.searchStyle}>
        <TextField
          label="Search Tiffins"
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={styles.searchTermStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid2>
      </Grid2>
      {/* Tiffin Cards */}
      <Grid2 container size={{sm:12}} sx={{ marginLeft:"40px"}}>
        {tiffins.map((tiff, index) => (
          // <Grid2 size={{sm:3}} key={index}>
          <Box sx={{minWidth: 320}}>
            <ActionCard
              sx={styles.cardStyles}
              imageUrl={tiff.tiffin_image_url}
              imageStyles={styles.cardMediaStyles}
              tiffinType={tiff.tiffin_type}
            >
              <TiffinInfoCard
                tiffin={tiff}
                showButtons={true}
                tiffin_quantity={1}
              />
            </ActionCard>
           {/* </Grid2> */}
           </Box>
        ))}
      </Grid2>
      {/* Pagination */}
      <PaginationComponent
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
};

export default LandingPageTiffins;
