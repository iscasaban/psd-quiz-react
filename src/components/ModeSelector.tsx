import { Box, Button, Typography } from "@mui/material";
import { InfoCard } from "./InfoCard.tsx";

interface ModeSelectorProps {
  totalQuestions: number;
  onSelectMode: (mode: "exam" | "practice") => void;
}

export function ModeSelector({
  totalQuestions,
  onSelectMode,
}: ModeSelectorProps) {
  return (
    <Box component="main" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        color="secondary"
      >
        Professional Scrum Developer™ Certification Quiz
      </Typography>

      <InfoCard>
        <Typography variant="body1">
          Prepare for your PSD I certification with this interactive quiz.
        </Typography>
        <Typography variant="body1">
          <strong>{totalQuestions} questions</strong> are currently available.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Practice Mode:</strong> Choose specific question ranges and
          get immediate feedback
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Exam Mode:</strong> Test yourself with 80 randomly selected
          questions
        </Typography>
      </InfoCard>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => onSelectMode("exam")}
        >
          Exam Mode
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => onSelectMode("practice")}
        >
          Practice Mode
        </Button>
      </Box>
    </Box>
  );
}
