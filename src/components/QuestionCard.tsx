import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import type { QuizQuestion } from "../types/quiz";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerChange: (selectedAnswers: number[]) => void;
}

export function QuestionCard({ question, onAnswerChange }: QuestionCardProps) {
  // Check if only one answer is correct
  const correctAnswersCount = question.options.filter(
    (option) => option.isCorrect,
  ).length;
  const isSingleAnswer = correctAnswersCount === 1;

  const handleOptionChange = (optionIndex: number, checked: boolean) => {
    if (isSingleAnswer) {
      // For single answer, replace the selection
      onAnswerChange(checked ? [optionIndex] : []);
    } else {
      // For multiple answers, add/remove from selection
      const currentSelected = question.selectedAnswers;
      let newSelected: number[];
      if (checked) {
        newSelected = [...currentSelected, optionIndex];
      } else {
        newSelected = currentSelected.filter((index) => index !== optionIndex);
      }
      onAnswerChange(newSelected);
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {question.question}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isSingleAnswer ? "Select one answer:" : "Select all that apply:"}
        </Typography>

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          {isSingleAnswer ? (
            <RadioGroup
              value={question.selectedAnswers[0] ?? ""}
              onChange={(event) =>
                handleOptionChange(parseInt(event.target.value), true)
              }
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option.text}
                  sx={{ mb: 1, alignItems: "flex-start" }}
                />
              ))}
            </RadioGroup>
          ) : (
            <FormGroup>
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={question.selectedAnswers.includes(index)}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.checked)
                      }
                    />
                  }
                  label={option.text}
                  sx={{ mb: 1, alignItems: "flex-start" }}
                />
              ))}
            </FormGroup>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
