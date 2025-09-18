import { useState } from "react";
import type { AppScreen, QuizMode, QuizQuestion } from "../types/quiz";

export function useQuizState() {
  const [currentScreen, setCurrentScreen] =
    useState<AppScreen>("mode-selection");
  const [quizMode, setQuizMode] = useState<QuizMode>("exam");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const setMode = (mode: QuizMode) => {
    setQuizMode(mode);
  };

  const startQuiz = (questions: QuizQuestion[]) => {
    setQuizQuestions(questions);
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    if (isLastQuestion) {
      setCurrentScreen("results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const updateQuestionAnswers = (selectedAnswers: number[]) => {
    setQuizQuestions((prev) =>
      prev.map((q, index) =>
        index === currentQuestionIndex ? { ...q, selectedAnswers } : q,
      ),
    );
  };

  const resetQuiz = () => {
    setCurrentScreen("mode-selection");
    setCurrentQuestionIndex(0);
    setQuizQuestions([]);
  };

  return {
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
  };
}
