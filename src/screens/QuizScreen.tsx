// screens/QuizScreen.tsx
import { Container } from "@mui/material";
import { QuestionCard } from "../components/QuestionCard";
import { ExamTimer } from "../components/ExamTimer";
import { useExamTimer } from "../hooks/useExamTimer";
import type { QuizQuestion, QuizMode } from "../types/quiz";
import { QuizProgress } from "../components/QuizProgress.tsx";
import { QuizNavigation } from "../components/QuizNavigation.tsx";

interface QuizScreenProps {
  currentQuestion: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  quizMode: QuizMode;
  onAnswerChange: (questionId: number, answers: number[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  onTimeExpired?: () => void;
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
  onTimeExpired,
}: QuizScreenProps) {
  const isExamMode = quizMode === "exam";

  const { formattedTime, isWarning } = useExamTimer({
    onTimeExpired: onTimeExpired ?? (() => {}),
    isActive: isExamMode,
  });

  return (
    <Container maxWidth="lg">
      <QuizProgress current={currentIndex + 1} total={totalQuestions} />

      {isExamMode && (
        <ExamTimer formattedTime={formattedTime} isWarning={isWarning} />
      )}

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
