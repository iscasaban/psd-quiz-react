import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1ed4a1",
      dark: "#159470",
    },
    secondary: {
      main: "#11225D",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#e41404",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Rubik, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "1.1rem",
    },
    button: {
      fontWeight: 700,
      fontSize: "0.8rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
