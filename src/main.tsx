import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme.ts";
import { CssBaseline } from "@mui/material";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import { QuestionProvider } from "./context/QuestionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuestionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QuestionProvider>
  </StrictMode>,
);
