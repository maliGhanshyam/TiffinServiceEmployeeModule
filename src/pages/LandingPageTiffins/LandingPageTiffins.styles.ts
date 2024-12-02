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
  innerCardContainerStyleAR: {
    minWidth: 320,
  },
};

export const noDataImgStyle = {
  width: "100%",
  maxWidth: "60%",
  height: "auto",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};

