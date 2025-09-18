import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { QuizQuestion } from "../types/quiz";

interface AnswerFeedbackProps {
  question: QuizQuestion;
  onClose: () => void;
}

export function AnswerFeedback({ question, onClose }: AnswerFeedbackProps) {
  const correctIndices = question.options
    .map((option, index) => (option.isCorrect ? index : -1))
    .filter((index) => index !== -1);

  const selectedIndices = question.selectedAnswers.sort();
  const correctIndicesSorted = correctIndices.sort();

  const isCorrect =
    selectedIndices.length === correctIndicesSorted.length &&
    selectedIndices.every((val, index) => val === correctIndicesSorted[index]);

  return (
    <Box sx={{ mt: 3, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
      <Alert severity={isCorrect ? "success" : "error"} sx={{ mb: 2 }}>
        <Typography variant="h6">
          {isCorrect ? "Correct!" : "Incorrect"}
        </Typography>
      </Alert>

      <Typography variant="subtitle1" gutterBottom>
        Answer explanation:
      </Typography>

      <List dense>
        {question.options.map((option, index) => {
          const isSelectedByUser = question.selectedAnswers.includes(index);
          const isCorrectOption = option.isCorrect;

          let icon;
          let color: "success.main" | "error.main" | "text.secondary" =
            "text.secondary";

          if (isCorrectOption) {
            icon = <CheckCircleIcon />;
            color = "success.main";
          } else if (isSelectedByUser && !isCorrectOption) {
            icon = <CancelIcon />;
            color = "error.main";
          }

          return (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={option.text}
                sx={{
                  color,
                  fontWeight: isCorrectOption ? "bold" : "normal",
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button variant="text" onClick={onClose}>
          Continue
        </Button>
      </Box>
    </Box>
  );
}
