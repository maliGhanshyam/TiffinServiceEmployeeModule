import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  cardMediaStyles: {
    height: 140,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  cardStyles: {
    maxWidth: 350,
    margin: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  noDataBox:{
    textAlign: "center",
    padding:"15px"
  },
  buttonStyleSeeAll: {
    variant: "contained",
    marginTop:1,
    borderRadius: "1.2rem",
    borderColor: "primary.main",
    color: "primary.main",
    padding: "5px 16px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e43e38",
      color: "#fff",
    },
  },
  tabStyle:{
    marginLeft: { sm: 10, xs: 9 },
    fontWeight: "bold",
    "& .MuiTab-root": {
      fontSize: { xs: "14px", sm: "14px" },
      padding: { xs: "5px 10px", sm: "8px 16px" },
      minWidth: { sm: "90px", xs: "50px" },
      textTransform: "none",
    },
    "& .Mui-selected": {
      color: "secondary.main",
      fontWeight: "bold",
    },
  }
};

