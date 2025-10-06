import { RangeSelector } from "../components/RangeSelector";
import type { QuizQuestion } from "../types/quiz";
import { useQuestions } from "../context/QuestionContext.tsx";

interface RangeSelectionScreenProps {
  onSelectRange: (questions: QuizQuestion[]) => void;
  onBack: () => void;
}

export function RangeSelectionScreen({
  onSelectRange,
  onBack,
}: RangeSelectionScreenProps) {
  const { allQuestions } = useQuestions();

  return (
    <RangeSelector
      questions={allQuestions}
      onSelectRange={onSelectRange}
      onBack={onBack}
    />
  );
}
