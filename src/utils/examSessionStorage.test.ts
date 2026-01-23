import { describe, it, expect, beforeEach } from "vitest";
import type { QuizQuestion } from "../types/quiz";
import {
  saveExamSession,
  loadExamSession,
  updateExamQuestions,
  updateExamCurrentIndex,
  clearExamSession,
  hasActiveExamSession,
  getExamStartTime,
} from "./examSessionStorage";

const createMockQuestion = (id: number): QuizQuestion => ({
  id,
  question: `Question ${id}`,
  options: [
    { text: "Option A", isCorrect: true },
    { text: "Option B", isCorrect: false },
  ],
  selectedAnswers: [],
});

describe("examSessionStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveExamSession", () => {
    it("should store startTime, questions, and currentIndex in localStorage", () => {
      const session = {
        startTime: 1700000000000,
        questions: [createMockQuestion(1), createMockQuestion(2)],
        currentIndex: 5,
      };

      saveExamSession(session);

      expect(localStorage.getItem("exam_session_start_time")).toBe(
        "1700000000000"
      );
      expect(localStorage.getItem("exam_session_questions")).toBe(
        JSON.stringify(session.questions)
      );
      expect(localStorage.getItem("exam_session_current_index")).toBe("5");
    });

    it("should overwrite existing session data", () => {
      const initialSession = {
        startTime: 1700000000000,
        questions: [createMockQuestion(1)],
        currentIndex: 0,
      };
      saveExamSession(initialSession);

      const newSession = {
        startTime: 1800000000000,
        questions: [createMockQuestion(2), createMockQuestion(3)],
        currentIndex: 10,
      };
      saveExamSession(newSession);

      expect(localStorage.getItem("exam_session_start_time")).toBe(
        "1800000000000"
      );
      expect(localStorage.getItem("exam_session_current_index")).toBe("10");
    });
  });

  describe("loadExamSession", () => {
    it("should return null when no session exists", () => {
      const result = loadExamSession();

      expect(result).toBeNull();
    });

    it("should return null when only partial session data exists", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      // Missing questions and currentIndex

      const result = loadExamSession();

      expect(result).toBeNull();
    });

    it("should return session data when all fields exist", () => {
      const questions = [createMockQuestion(1), createMockQuestion(2)];
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem("exam_session_questions", JSON.stringify(questions));
      localStorage.setItem("exam_session_current_index", "3");

      const result = loadExamSession();

      expect(result).toEqual({
        startTime: 1700000000000,
        questions,
        currentIndex: 3,
      });
    });

    it("should return null and clear storage when questions JSON is corrupted", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem("exam_session_questions", "invalid json {{{");
      localStorage.setItem("exam_session_current_index", "3");

      const result = loadExamSession();

      expect(result).toBeNull();
      expect(localStorage.getItem("exam_session_start_time")).toBeNull();
      expect(localStorage.getItem("exam_session_questions")).toBeNull();
      expect(localStorage.getItem("exam_session_current_index")).toBeNull();
    });
  });

  describe("updateExamQuestions", () => {
    it("should update only the questions in storage", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem("exam_session_current_index", "5");

      const newQuestions = [createMockQuestion(10)];
      updateExamQuestions(newQuestions);

      expect(localStorage.getItem("exam_session_questions")).toBe(
        JSON.stringify(newQuestions)
      );
      expect(localStorage.getItem("exam_session_start_time")).toBe(
        "1700000000000"
      );
      expect(localStorage.getItem("exam_session_current_index")).toBe("5");
    });

    it("should preserve selectedAnswers in questions", () => {
      const questionWithAnswers: QuizQuestion = {
        ...createMockQuestion(1),
        selectedAnswers: [0, 2],
      };

      updateExamQuestions([questionWithAnswers]);

      const stored = JSON.parse(
        localStorage.getItem("exam_session_questions") || "[]"
      );
      expect(stored[0].selectedAnswers).toEqual([0, 2]);
    });
  });

  describe("updateExamCurrentIndex", () => {
    it("should update only the currentIndex in storage", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem(
        "exam_session_questions",
        JSON.stringify([createMockQuestion(1)])
      );

      updateExamCurrentIndex(42);

      expect(localStorage.getItem("exam_session_current_index")).toBe("42");
      expect(localStorage.getItem("exam_session_start_time")).toBe(
        "1700000000000"
      );
    });

    it("should handle index of 0", () => {
      updateExamCurrentIndex(0);

      expect(localStorage.getItem("exam_session_current_index")).toBe("0");
    });
  });

  describe("clearExamSession", () => {
    it("should remove all session keys from localStorage", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem(
        "exam_session_questions",
        JSON.stringify([createMockQuestion(1)])
      );
      localStorage.setItem("exam_session_current_index", "5");

      clearExamSession();

      expect(localStorage.getItem("exam_session_start_time")).toBeNull();
      expect(localStorage.getItem("exam_session_questions")).toBeNull();
      expect(localStorage.getItem("exam_session_current_index")).toBeNull();
    });

    it("should not throw when no session exists", () => {
      expect(() => clearExamSession()).not.toThrow();
    });

    it("should not affect other localStorage keys", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      localStorage.setItem("other_key", "other_value");

      clearExamSession();

      expect(localStorage.getItem("other_key")).toBe("other_value");
    });
  });

  describe("hasActiveExamSession", () => {
    it("should return false when no session exists", () => {
      expect(hasActiveExamSession()).toBe(false);
    });

    it("should return true when session exists", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");

      expect(hasActiveExamSession()).toBe(true);
    });

    it("should return true even if only startTime exists", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");
      // No questions or currentIndex

      expect(hasActiveExamSession()).toBe(true);
    });
  });

  describe("getExamStartTime", () => {
    it("should return null when no start time exists", () => {
      expect(getExamStartTime()).toBeNull();
    });

    it("should return the stored timestamp as a number", () => {
      localStorage.setItem("exam_session_start_time", "1700000000000");

      expect(getExamStartTime()).toBe(1700000000000);
    });

    it("should correctly parse large timestamps", () => {
      const largeTimestamp = Date.now();
      localStorage.setItem("exam_session_start_time", largeTimestamp.toString());

      expect(getExamStartTime()).toBe(largeTimestamp);
    });
  });
});
