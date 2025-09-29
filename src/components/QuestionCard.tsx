import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { QuizQuestion } from "../types/quiz";
import { useState, useEffect } from "react";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerChange: (selectedAnswers: number[]) => void;
  isPracticeMode?: boolean;
}

export function QuestionCard({
  question,
  onAnswerChange,
  isPracticeMode = false,
}: QuestionCardProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    setShowAnswers(false);
  }, [question]);

  const correctAnswersCount = question.options.filter(
    (option) => option.isCorrect,
  ).length;
  const isSingleAnswer = correctAnswersCount === 1;

  const correctIndices = question.options
    .map((option, index) => (option.isCorrect ? index : -1))
    .filter((index) => index !== -1);

  const selectedIndices = question.selectedAnswers.sort();
  const correctIndicesSorted = correctIndices.sort();

  const isCorrect =
    selectedIndices.length === correctIndicesSorted.length &&
    selectedIndices.every((val, index) => val === correctIndicesSorted[index]);

  const getOptionFeedback = (index: number) => {
    if (!showAnswers)
      return { icon: null, color: "inherit", fontWeight: "normal" };

    const isSelectedByUser = question.selectedAnswers.includes(index);
    const isCorrectOption = question.options[index].isCorrect;

    if (isCorrectOption) {
      return {
        icon: (
          <CheckCircleIcon
            sx={{ color: "success.main", fontSize: "1.2rem", mx: 1 }}
          />
        ),
        color: "success.main",
        fontWeight: "bold",
      };
    } else if (isSelectedByUser && !isCorrectOption) {
      return {
        icon: (
          <CancelIcon sx={{ color: "error.main", fontSize: "1.2rem", mx: 1 }} />
        ),
        color: "error.main",
        fontWeight: "normal",
      };
    }

    return { icon: null, color: "inherit", fontWeight: "normal" };
  };

  const handleOptionChange = (optionIndex: number, checked: boolean) => {
    if (isSingleAnswer) {
      onAnswerChange(checked ? [optionIndex] : []);
    } else {
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

  const handleCheckAnswers = () => {
    setShowAnswers(true);
  };

  const handleReset = () => {
    setShowAnswers(false);
    onAnswerChange([]);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "4rem auto" }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {question.question}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isSingleAnswer ? "Select one answer:" : "Select all that apply:"}
        </Typography>

        {showAnswers && (
          <Alert severity={isCorrect ? "success" : "error"} sx={{ mb: 2 }}>
            <Typography variant="h6">
              {isCorrect ? "Correct!" : "Incorrect"}
            </Typography>
          </Alert>
        )}

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          {isSingleAnswer ? (
            <RadioGroup
              value={question.selectedAnswers[0] ?? ""}
              onChange={(event) =>
                handleOptionChange(parseInt(event.target.value), true)
              }
            >
              {question.options.map((option, index) => {
                const feedback = getOptionFeedback(index);
                return (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: "24px",
                        }}
                      >
                        {feedback.icon}
                        <Typography
                          sx={{
                            color: feedback.color,
                            fontWeight: feedback.fontWeight,
                            lineHeight: "24px",
                          }}
                        >
                          {option.text}
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 1, alignItems: "center" }}
                  />
                );
              })}
            </RadioGroup>
          ) : (
            <FormGroup>
              {question.options.map((option, index) => {
                const feedback = getOptionFeedback(index);
                return (
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
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: "24px",
                        }}
                      >
                        {feedback.icon}
                        <Typography
                          sx={{
                            color: feedback.color,
                            fontWeight: feedback.fontWeight,
                            lineHeight: "24px",
                          }}
                        >
                          {option.text}
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 1, alignItems: "center" }}
                  />
                );
              })}
            </FormGroup>
          )}
        </FormControl>

        {isPracticeMode && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={showAnswers ? handleReset : handleCheckAnswers}
              disabled={!showAnswers && question.selectedAnswers.length === 0}
            >
              {showAnswers ? "Reset" : "Check Answer"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
