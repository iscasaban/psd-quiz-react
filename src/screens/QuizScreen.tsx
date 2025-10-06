// screens/QuizScreen.tsx
import { Container } from "@mui/material";
import { QuestionCard } from "../components/QuestionCard";
import type { QuizQuestion, QuizMode } from "../types/quiz";
import { QuizProgress } from "../components/QuizProgress.tsx";
import { QuizNavigation } from "../components/QuizNavigation.tsx";

interface QuizScreenProps {
  currentQuestion: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  quizMode: QuizMode;
  onAnswerChange: (answers: number[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuizScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  quizMode,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
}: QuizScreenProps) {
  return (
    <Container maxWidth="lg">
      <QuizProgress current={currentIndex + 1} total={totalQuestions} />

      <QuestionCard
        question={currentQuestion}
        onAnswerChange={onAnswerChange}
        isPracticeMode={quizMode === "practice"}
      />

      <QuizNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        canGoPrevious={canGoPrevious}
        isLastQuestion={isLastQuestion}
      />
    </Container>
  );
}
