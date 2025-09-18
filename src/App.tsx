import "./App.css";
import { useEffect, useState } from "react";
import type { QuizMode, QuizQuestion } from "./types/quiz.ts";
import { parseQuestionsFromMarkdown } from "./utils/parseMarkdown.ts";
import answersContent from "./data/answers.md?raw";
import { QuestionCard } from "./components/QuestionCard.tsx";
import { ResultsModal } from "./components/ResultsModal.tsx";
import { ModeSelector } from "./components/ModeSelector.tsx";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuizState } from "./hooks/useQuizState.ts";
import { RangeSelector } from "./components/RangeSelector.tsx";

function App() {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    currentScreen,
    quizMode,
    currentQuestionIndex,
    quizQuestions,
    navigateToScreen,
    setMode,
    startQuiz,
    nextQuestion,
    previousQuestion,
    updateQuestionAnswers,
    resetQuiz,
  } = useQuizState();

  useEffect(() => {
    try {
      const parsedQuestions = parseQuestionsFromMarkdown(answersContent);
      setAllQuestions(parsedQuestions);
    } catch (error) {
      console.error("Failed to parse questions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleModeSelect = (mode: QuizMode) => {
    setMode(mode);
    if (mode === "exam") {
      handleExamStart();
    } else {
      navigateToScreen("range-selection");
    }
  };

  const handleRangeSelect = (selectedQuestions: QuizQuestion[]) => {
    startQuiz(selectedQuestions);
  };

  const handleExamStart = () => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 80);

    const examQuestions = selectedQuestions.map((question, index) => ({
      ...question,
      id: index,
      selectedAnswers: [],
    }));

    startQuiz(examQuestions);
  };

  const handleRestart = () => {
    resetQuiz();
  };

  if (currentScreen === "range-selection") {
    return (
      <RangeSelector
        questions={allQuestions}
        onSelectRange={handleRangeSelect}
        onBack={() => navigateToScreen("mode-selection")}
      />
    );
  }

  if (loading) return <div>Loading questions...</div>;
  if (allQuestions.length === 0) return <div>No questions found</div>;

  if (currentScreen === "mode-selection") {
    return (
      <ModeSelector
        totalQuestions={allQuestions.length}
        onSelectMode={handleModeSelect}
      />
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizMode === "exam" ? 80 : quizQuestions.length;

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ marginInlineEnd: 4 }}>
            <Typography variant="h6" color="secondary">
              PSD I Quiz - {quizMode === "exam" ? "Exam" : "Practice"} Mode
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Typography variant="subtitle1" sx={{ mt: 7 }}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Typography>

        <QuestionCard
          question={currentQuestion}
          onAnswerChange={updateQuestionAnswers}
          isPracticeMode={quizMode === "practice"}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <Button variant="contained" onClick={nextQuestion}>
          {currentQuestionIndex === quizQuestions.length - 1
            ? "Finish Quiz"
            : "Next"}
        </Button>

        <ResultsModal
          open={currentScreen === "results"}
          questions={quizQuestions}
          onClose={() => navigateToScreen("quiz")}
          onRestart={handleRestart}
        />
      </Box>
    </>
  );
}

export default App;
