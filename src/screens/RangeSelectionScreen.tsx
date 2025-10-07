import { RangeSelector } from "../components/RangeSelector";
import type { QuizQuestion } from "../types/quiz";
import { useQuestions } from "../context/QuestionContext.tsx";

interface RangeSelectionScreenProps {
  onSelectRange: (questions: QuizQuestion[]) => void;
}

export function RangeSelectionScreen({
  onSelectRange,
}: RangeSelectionScreenProps) {
  const { allQuestions } = useQuestions();

  return (
    <RangeSelector questions={allQuestions} onSelectRange={onSelectRange} />
  );
}
