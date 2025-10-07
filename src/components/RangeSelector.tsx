import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { QuizQuestion } from "../types/quiz.ts";

interface RangeSelectorProps {
  questions: QuizQuestion[];
  onSelectRange: (selectedQuestions: QuizQuestion[]) => void;
}

interface QuestionRange {
  label: string;
  startIndex: number;
  endIndex: number;
}

const QUESTION_RANGES: QuestionRange[] = [
  { label: "1-60", startIndex: 0, endIndex: 59 },
  { label: "61-121", startIndex: 60, endIndex: 120 },
  { label: "122-182", startIndex: 121, endIndex: 181 },
  { label: "183-243", startIndex: 182, endIndex: 242 },
  { label: "244-305", startIndex: 243, endIndex: 304 },
];

export function RangeSelector({
  questions,
  onSelectRange,
}: RangeSelectorProps) {
  const handleRangeSelect = (range: QuestionRange | null) => {
    let selectedQuestions: QuizQuestion[];

    if (range === null) {
      selectedQuestions = questions;
    } else {
      selectedQuestions = questions.slice(range.startIndex, range.endIndex + 1);
    }

    const practiceQuestions = selectedQuestions.map((question, index) => ({
      ...question,
      id: index,
      selectedAnswers: [],
    }));

    onSelectRange(practiceQuestions);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: 4,
      }}
    >
      <Box sx={{ mb: 4, maxWidth: 600 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Select a question range to practice:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose from predefined ranges or practice all {questions.length}{" "}
          questions.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: 600,
          justifyContent: "center",
        }}
      >
        {QUESTION_RANGES.map((range) => (
          <Grid size={{ xs: 6, sm: 4 }} key={range.label}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleRangeSelect(range)}
              sx={{ py: 2 }}
            >
              Questions {range.label}
            </Button>
          </Grid>
        ))}

        <Grid size={{ xs: 6, sm: 4 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleRangeSelect(null)}
            sx={{ py: 2 }}
          >
            All Questions
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
