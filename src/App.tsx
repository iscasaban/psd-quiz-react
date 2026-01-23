import { useEffect, useState } from "react";
import { Container, CircularProgress, Alert, Box } from "@mui/material";
import { useNavigation } from "./hooks/useNavigation";
import { useQuizState } from "./hooks/useQuizState";
import { useQuestions } from "./hooks/useQuestions";
import { clearExamTimer } from "./hooks/useExamTimer";
import { LandingScreen } from "./screens/LandingScreen";
import { RangeSelectionScreen } from "./screens/RangeSelectionScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { ResultsModal } from "./components/ResultsModal";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import type { QuizMode, QuizQuestion } from "./types/quiz";

function App() {
  const { allQuestions, loading, error } = useQuestions();
  const {
    currentScreen,
    goToLanding,
    goToRangeSelection,
    startQuiz,
    showResults,
    goToAbout,
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
    restoreExamSession,
    checkForActiveExamSession,
    isLastQuestion,
    canGoPrevious,
  } = useQuizState();

  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  // Restore active exam session on page load
  useEffect(() => {
    if (!loading && !hasCheckedSession) {
      setHasCheckedSession(true);
      if (checkForActiveExamSession()) {
        const restored = restoreExamSession();
        if (restored) {
          startQuiz();
        }
      }
    }
  }, [loading, hasCheckedSession, checkForActiveExamSession, restoreExamSession, startQuiz]);

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
      clearExamTimer();
      showResults();
    } else {
      nextQuestion();
    }
  };

  const handleTimeExpired = () => {
    clearExamTimer();
    showResults();
  };

  const handleRestart = () => {
    clearExamTimer();
    resetQuiz();
    goToLanding();
  };

  const handleHomeClick = () => {
    clearExamTimer();
    resetQuiz();
    goToLanding();
  };

  const handleExamClick = () => {
    handleModeSelect("exam");
  };

  const handlePracticeClick = () => {
    setMode("practice");
    goToRangeSelection();
  };

  const handleAboutClick = () => {
    goToAbout();
  };

  const handleAnswerChange = (
    _questionId: number,
    selectedAnswers: number[],
  ) => {
    // The questionId parameter ensures we're updating the correct question
    // but useQuizState handles this via currentQuestionIndex, so we just pass selectedAnswers
    updateQuestionAnswers(selectedAnswers);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar
        onHomeClick={handleHomeClick}
        onExamClick={handleExamClick}
        onPracticeClick={handlePracticeClick}
        onAboutClick={handleAboutClick}
      />

      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {currentScreen === "landing" && (
            <LandingScreen onModeSelect={handleModeSelect} />
          )}

          {currentScreen === "range-selection" && (
            <RangeSelectionScreen onSelectRange={handleRangeSelect} />
          )}

          {currentScreen === "quiz" && (
            <QuizScreen
              currentQuestion={quizQuestions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={quizQuestions.length}
              quizMode={quizMode}
              onAnswerChange={handleAnswerChange}
              onNext={handleNext}
              onPrevious={previousQuestion}
              canGoPrevious={canGoPrevious}
              isLastQuestion={isLastQuestion}
              onTimeExpired={handleTimeExpired}
            />
          )}

          {currentScreen === "about" && <AboutScreen />}

          <ResultsModal
            open={currentScreen === "results"}
            questions={quizQuestions}
            onClose={() => startQuiz()}
            onRestart={handleRestart}
          />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
