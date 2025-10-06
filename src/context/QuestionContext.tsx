import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { QuizQuestion } from "../types/quiz";
import { parseQuestionsFromMarkdown } from "../utils/parseMarkdown";
import answersContent from "../data/answers.md?raw";

interface QuestionContextType {
  allQuestions: QuizQuestion[];
  loading: boolean;
  error: Error | null;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined,
);

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const parsedQuestions = parseQuestionsFromMarkdown(answersContent);
      setAllQuestions(parsedQuestions);
      setError(null);
    } catch (err) {
      console.error("Failed to parse questions:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to parse questions"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <QuestionContext.Provider value={{ allQuestions, loading, error }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return context;
}
