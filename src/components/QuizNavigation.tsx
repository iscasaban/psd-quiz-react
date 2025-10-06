import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface QuizNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuizNavigation({
  onPrevious,
  onNext,
  canGoPrevious,
  isLastQuestion,
}: QuizNavigationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 800,
        margin: "2rem auto",
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        startIcon={<ArrowBackIcon />}
        sx={{ minWidth: 120 }}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        endIcon={
          isLastQuestion ? <CheckCircleOutlineIcon /> : <ArrowForwardIcon />
        }
        sx={{ minWidth: 120 }}
      >
        {isLastQuestion ? "Finish Quiz" : "Next"}
      </Button>
    </Box>
  );
}
