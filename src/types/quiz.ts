export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  selectedAnswers: number[];
}

export type QuizMode = "exam" | "practice";
