import type { QuizQuestion } from "../types/quiz";

const STORAGE_KEYS = {
  START_TIME: "exam_session_start_time",
  QUESTIONS: "exam_session_questions",
  CURRENT_INDEX: "exam_session_current_index",
} as const;

export interface ExamSession {
  startTime: number;
  questions: QuizQuestion[];
  currentIndex: number;
}

export function saveExamSession(session: ExamSession): void {
  localStorage.setItem(STORAGE_KEYS.START_TIME, session.startTime.toString());
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(session.questions));
  localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, session.currentIndex.toString());
}

export function loadExamSession(): ExamSession | null {
  const startTime = localStorage.getItem(STORAGE_KEYS.START_TIME);
  const questions = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  const currentIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);

  if (!startTime || !questions || !currentIndex) {
    return null;
  }

  try {
    return {
      startTime: parseInt(startTime, 10),
      questions: JSON.parse(questions) as QuizQuestion[],
      currentIndex: parseInt(currentIndex, 10),
    };
  } catch {
    // If parsing fails, clear corrupted data
    clearExamSession();
    return null;
  }
}

export function updateExamQuestions(questions: QuizQuestion[]): void {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function updateExamCurrentIndex(index: number): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, index.toString());
}

export function clearExamSession(): void {
  localStorage.removeItem(STORAGE_KEYS.START_TIME);
  localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
}

export function hasActiveExamSession(): boolean {
  return localStorage.getItem(STORAGE_KEYS.START_TIME) !== null;
}

export function getExamStartTime(): number | null {
  const startTime = localStorage.getItem(STORAGE_KEYS.START_TIME);
  return startTime ? parseInt(startTime, 10) : null;
}
