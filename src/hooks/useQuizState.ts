// hooks/useQuizState.ts
import { useState } from "react";
import type { QuizMode, QuizQuestion } from "../types/quiz";

const EXAM_QUESTION_COUNT = 80;

function prepareQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((question, index) => ({
    ...question,
    id: index,
    selectedAnswers: [],
  }));
}

export function useQuizState() {
  const [quizMode, setQuizMode] = useState<QuizMode>("exam");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const setMode = (mode: QuizMode) => {
    setQuizMode(mode);
  };

  const initializeExamMode = (allQuestions: QuizQuestion[]) => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, EXAM_QUESTION_COUNT);
    const prepared = prepareQuestions(selected);

    setQuizQuestions(prepared);
    setCurrentQuestionIndex(0);
  };

  const initializePracticeMode = (selectedQuestions: QuizQuestion[]) => {
    const prepared = prepareQuestions(selectedQuestions);

    setQuizQuestions(prepared);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
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
    setCurrentQuestionIndex(0);
    setQuizQuestions([]);
  };

  return {
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
    isLastQuestion: currentQuestionIndex === quizQuestions.length - 1,
    canGoPrevious: currentQuestionIndex > 0,
  };
}
