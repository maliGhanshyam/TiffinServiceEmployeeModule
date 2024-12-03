import { useEffect, useState } from "react";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";
import { useSnackbar } from "../../hook";
import {
  getAllTiffinsSort,
  searchTiffinWithType,
} from "../../services/AllTiffin/AllTiffin";
import {
  Grid2,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ActionCard } from "../../components/ActionCard";
import { TiffinInfoCard } from "../../components/TiffinInfoCard";
import { noDataImgStyle, styles } from "./LandingPageTiffins.styles";
import { PaginationComponent } from "../../components/PaginationComponent";
import SearchIcon from "@mui/icons-material/Search";
import { NoData } from "../../components/NoData";
import noData from "../../assets/noReports.svg";
import { TiffinCard } from "../../components/TiffinCard";

const LandingPageTiffins = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<tiffin[]>([]);
  const { showSnackbar } = useSnackbar();

  const limit = 4;

  useEffect(() => {
    fetchAllTiffins(page, type);
  }, [page, type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        fetchAllTiffins(page, type);
      } else {
        handleSearch();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, page]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      fetchAllTiffins(page, type);
      return;
    }
    try {
      const searchData = await searchTiffinWithType(searchTerm);
      if (searchData.length === 0) {
        setSearchResults([]);
        showSnackbar(
          "No any tiffin found matching the search criteria.",
          "success"
        );
      }
      setSearchResults(searchData);
    } catch (error) {
      showSnackbar("No such Tiffin found", "error");
      setSearchResults([]);
    }
  };
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
      <Grid2
        container
        spacing={2}
        size={12}
        sx={{ marginX: 7, marginY: 2, justifyContent: "flex-end" }}
      >
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
      {searchTerm.trim() !== "" && searchResults.length === 0 ? (
        <NoData
          message={"No such tiffin available"}
          image={noData}
          boxStyle={styles.noDataBox}
          imgStyle={noDataImgStyle}
        />
      ) : searchResults.length > 0 ? (
        <Grid2
          container
          size={{ sm: 12 }}
          sx={{
            marginLeft: "40px",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          {" "}
          {searchResults.map((tiff) => {
            return (
              <TiffinCard tiffin={tiff} tiffin_quantity={1}/>
            );
          })}
        </Grid2>
      ) : (
        <>
        <Grid2
          container
          size={{ sm: 12 }}
          sx={{
            marginLeft: {sm:"40px",xs:"25px"},
            marginRight: {sm:"0px",xs:"15px"},
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          {tiffins.map((tiff, index) => (
            // <Box sx={{ minWidth: 320 }}>
            //   <ActionCard
            //     sx={styles.cardStyles}
            //     imageUrl={tiff.tiffin_image_url}
            //     imageStyles={styles.cardMediaStyles}
            //     tiffinType={tiff.tiffin_type}
            //   >
            //     <TiffinInfoCard
            //       tiffin={tiff}
            //       showButtons={true}
            //       tiffin_quantity={1}
            //     />
            //   </ActionCard>
            // </Box>
            <TiffinCard tiffin={tiff} tiffin_quantity={1}/>
          ))}
        </Grid2>
        <PaginationComponent
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
        </>
      )}
      {/* Pagination */}
      
    </>
  );
};

export default LandingPageTiffins;
