// hooks/useQuizState.ts
import { useState, useCallback } from "react";
import type { QuizMode, QuizQuestion } from "../types/quiz";
import {
  saveExamSession,
  loadExamSession,
  updateExamQuestions,
  updateExamCurrentIndex,
  clearExamSession,
  hasActiveExamSession,
} from "../utils/examSessionStorage";

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

  const initializeExamMode = useCallback((allQuestions: QuizQuestion[]) => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, EXAM_QUESTION_COUNT);
    const prepared = prepareQuestions(selected);

    const startTime = Date.now();
    saveExamSession({
      startTime,
      questions: prepared,
      currentIndex: 0,
    });

    setQuizQuestions(prepared);
    setCurrentQuestionIndex(0);
    setQuizMode("exam");
  }, []);

  const initializePracticeMode = (selectedQuestions: QuizQuestion[]) => {
    const prepared = prepareQuestions(selectedQuestions);

    setQuizQuestions(prepared);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      const newIndex = prev + 1;
      if (quizMode === "exam") {
        updateExamCurrentIndex(newIndex);
      }
      return newIndex;
    });
  }, [quizMode]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev - 1;
        if (quizMode === "exam") {
          updateExamCurrentIndex(newIndex);
        }
        return newIndex;
      });
    }
  }, [currentQuestionIndex, quizMode]);

  const updateQuestionAnswers = useCallback((selectedAnswers: number[]) => {
    setCurrentQuestionIndex((currentIndex) => {
      setQuizQuestions((prev) => {
        const updated = prev.map((q, index) =>
          index === currentIndex ? { ...q, selectedAnswers } : q,
        );
        if (quizMode === "exam") {
          updateExamQuestions(updated);
        }
        return updated;
      });
      return currentIndex; // Don't change the index
    });
  }, [quizMode]);

  const resetQuiz = useCallback(() => {
    clearExamSession();
    setCurrentQuestionIndex(0);
    setQuizQuestions([]);
  }, []);

  const restoreExamSession = useCallback(() => {
    const session = loadExamSession();
    if (session) {
      setQuizMode("exam");
      setQuizQuestions(session.questions);
      setCurrentQuestionIndex(session.currentIndex);
      return true;
    }
    return false;
  }, []);

  const checkForActiveExamSession = useCallback(() => {
    return hasActiveExamSession();
  }, []);

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
    restoreExamSession,
    checkForActiveExamSession,
    isLastQuestion: currentQuestionIndex === quizQuestions.length - 1,
    canGoPrevious: currentQuestionIndex > 0,
  };
}
