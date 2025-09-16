import { createTheme, type ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#FFA955",
    },
    secondary: {
      main: "#FFD63A",
    },
    error: {
      main: "#F75A5A",
    },
    success: {
      main: "#6DE1D2",
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
      fontSize: "3.5rem",
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
};

export const theme = createTheme(themeOptions);
