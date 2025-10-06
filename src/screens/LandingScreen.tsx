import { ModeSelector } from "../components/ModeSelector";
import type { QuizMode } from "../types/quiz";
import { useQuestions } from "../context/QuestionContext.tsx";

interface LandingScreenProps {
  onModeSelect: (mode: QuizMode) => void;
}

export function LandingScreen({ onModeSelect }: LandingScreenProps) {
  const { allQuestions } = useQuestions();

  return (
    <ModeSelector
      totalQuestions={allQuestions.length}
      onSelectMode={onModeSelect}
    />
  );
}
