import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  paginationStyles: {
    display: "flex",
    justifyContent: {sm:"end",xs:"center"},
    mt: 3,
    marginRight: {sm:6,xs:0},
    marginBottom:2
  },
};
