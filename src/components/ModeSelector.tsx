import { Box, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import type { QuizMode } from "../types/quiz";

interface ModeSelectorProps {
  onSelectMode: (mode: QuizMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        justifyContent: { xs: "center", lg: "center" },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => onSelectMode("exam")}
        startIcon={<SchoolIcon />}
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          px: 4,
          py: 2,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Exam Mode
      </Button>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => onSelectMode("practice")}
        startIcon={<MenuBookIcon />}
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          px: 4,
          py: 2,
          borderWidth: 2,
          backgroundColor: "transparent",
          "&:hover": {
            borderWidth: 2,
            backgroundColor: "rgba(30, 212, 161, 0.08)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Practice Mode
      </Button>
    </Box>
  );
}
