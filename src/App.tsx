import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useNavigation } from "./hooks/useNavigation";
import { useQuizState } from "./hooks/useQuizState";
import { useQuestions } from "./context/QuestionContext";
import { LandingScreen } from "./screens/LandingScreen";
import { RangeSelectionScreen } from "./screens/RangeSelectionScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { ResultsModal } from "./components/ResultsModal";
import type { QuizMode, QuizQuestion } from "./types/quiz";

function App() {
  const { allQuestions, loading, error } = useQuestions();
  const {
    currentScreen,
    goToLanding,
    goToRangeSelection,
    startQuiz,
    showResults,
  } = useNavigation();
  const {
    quizMode,
    currentQuestionIndex,
    quizQuestions,
    setMode,
    initializeExamMode,
    initializePracticeMode,
    nextQuestion,
    previousQuestion,
    updateQuestionAnswers,
    resetQuiz,
    isLastQuestion,
    canGoPrevious,
  } = useQuizState();

  const handleModeSelect = (mode: QuizMode) => {
    setMode(mode);
    if (mode === "exam") {
      initializeExamMode(allQuestions);
      startQuiz();
    } else {
      goToRangeSelection();
    }
  };

  const handleRangeSelect = (selectedQuestions: QuizQuestion[]) => {
    initializePracticeMode(selectedQuestions);
    startQuiz();
  };

  const handleNext = () => {
    if (isLastQuestion) {
      showResults();
    } else {
      nextQuestion();
    }
  };

  const handleRestart = () => {
    resetQuiz();
    goToLanding();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load questions: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {currentScreen === "quiz" && (
        <AppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar>
              <Typography variant="h6" color="secondary">
                PSD I Quiz - {quizMode === "exam" ? "Exam" : "Practice"} Mode
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {currentScreen === "landing" && (
          <LandingScreen onModeSelect={handleModeSelect} />
        )}

        {currentScreen === "range-selection" && (
          <RangeSelectionScreen
            onSelectRange={handleRangeSelect}
            onBack={goToLanding}
          />
        )}

        {currentScreen === "quiz" && (
          <QuizScreen
            currentQuestion={quizQuestions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            quizMode={quizMode}
            onAnswerChange={updateQuestionAnswers}
            onNext={handleNext}
            onPrevious={previousQuestion}
            canGoPrevious={canGoPrevious}
            isLastQuestion={isLastQuestion}
          />
        )}

        <ResultsModal
          open={currentScreen === "results"}
          questions={quizQuestions}
          onClose={() => startQuiz()}
          onRestart={handleRestart}
        />
      </Container>
    </>
  );
}

export default App;
