import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import type { QuizQuestion } from "../types/quiz";

interface ResultsModalProps {
  open: boolean;
  questions: QuizQuestion[];
  onClose: () => void;
  onRestart: () => void;
}

export function ResultsModal({
  open,
  questions,
  onClose,
  onRestart,
}: ResultsModalProps) {
  const calculateResults = () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      const correctIndices = question.options
        .map((option, index) => (option.isCorrect ? index : -1))
        .filter((index) => index !== -1);

      const selectedIndices = [...question.selectedAnswers].sort();
      const correctIndicesSorted = [...correctIndices].sort();

      // Check if selected answers exactly match correct answers
      const isCorrect =
        selectedIndices.length === correctIndicesSorted.length &&
        selectedIndices.every(
          (val, index) => val === correctIndicesSorted[index],
        );

      if (isCorrect) correctAnswers++;
    });

    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };
  };

  const results = calculateResults();
  const passed = results.percentage >= 85;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Quiz Results</DialogTitle>

      <DialogContent>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="h4" gutterBottom>
            {results.percentage}%
          </Typography>

          <Chip
            label={passed ? "PASSED" : "FAILED"}
            color={passed ? "success" : "error"}
            size="medium"
            sx={{ mb: 2 }}
          />

          <Typography variant="body1" gutterBottom>
            You answered {results.correct} out of {results.total} questions
            correctly
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Passing score: 85% (68 of 80 questions)
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 1 }}>
        <Button onClick={onRestart} variant="contained">
          Try Again
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
