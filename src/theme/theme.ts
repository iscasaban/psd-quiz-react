import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#395852",
      dark: "#163A34",
      light: "#D0DCD9",
    },
    secondary: {
      main: "#FE9F6B",
    },
    warning: {
      main: "#FE9F6B",
    },
    error: {
      main: "#e41404",
    },
    success: {
      main: "#395852",
    },
    background: {
      default: "#FAFAF9",
      paper: "#fff",
    },
    text: {
      primary: "#163A34",
      secondary: "#000",
    },
    grey: {
      50: "#F6F5F1",
      100: "#F6F5F1",
      200: "#E0E6E3",
      300: "#D0DCD9",
      400: "#D0DCD9",
      500: "#395852",
      600: "#395852",
      700: "#395852",
      800: "#163A34",
      900: "#163A34",
    },
  },
  typography: {
    fontFamily: "Nunito, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 500,
    fontWeightRegular: 700,
    fontWeightBold: 800,
    body1: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
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

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #FFFFFF 0%, #F6F5F1 100%)",
          minHeight: "100vh",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#395852",
        },
      },
    },
  },
});
