import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { ResultsModal } from "./ResultsModal";
import { theme } from "../theme/theme";
import type { QuizQuestion } from "../types/quiz";
import type { ReactNode } from "react";

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const createQuestion = (
  id: number,
  correctIndices: number[],
  selectedAnswers: number[]
): QuizQuestion => ({
  id,
  question: `Question ${id}`,
  options: [
    { text: "Option A", isCorrect: correctIndices.includes(0) },
    { text: "Option B", isCorrect: correctIndices.includes(1) },
    { text: "Option C", isCorrect: correctIndices.includes(2) },
    { text: "Option D", isCorrect: correctIndices.includes(3) },
  ],
  selectedAnswers,
});

describe("ResultsModal", () => {
  const mockOnClose = vi.fn();
  const mockOnRestart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Score calculation", () => {
    it("should calculate correct percentage for all correct answers", () => {
      const questions = [
        createQuestion(0, [0], [0]),
        createQuestion(1, [1], [1]),
        createQuestion(2, [2], [2]),
        createQuestion(3, [3], [3]),
      ];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(screen.getByText(/4 out of 4/)).toBeInTheDocument();
    });

    it("should calculate correct percentage for partial correct answers", () => {
      const questions = [
        createQuestion(0, [0], [0]), // correct
        createQuestion(1, [1], [2]), // wrong
        createQuestion(2, [2], [2]), // correct
        createQuestion(3, [3], [0]), // wrong
      ];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(screen.getByText(/2 out of 4/)).toBeInTheDocument();
    });

    it("should calculate 0% for all wrong answers", () => {
      const questions = [
        createQuestion(0, [0], [1]),
        createQuestion(1, [1], [0]),
      ];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("0%")).toBeInTheDocument();
      expect(screen.getByText(/0 out of 2/)).toBeInTheDocument();
    });

    it("should handle multi-select questions correctly", () => {
      const questions = [
        createQuestion(0, [0, 1], [0, 1]), // correct - selected both
        createQuestion(1, [1, 2], [1]),    // wrong - missed one
        createQuestion(2, [0, 2], [2, 0]), // correct - order doesn't matter
      ];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("67%")).toBeInTheDocument();
      expect(screen.getByText(/2 out of 3/)).toBeInTheDocument();
    });
  });

  describe("Pass/fail status", () => {
    it("should show PASSED when score is exactly 85%", () => {
      // 17 out of 20 = 85%
      const questions = Array.from({ length: 20 }, (_, i) =>
        createQuestion(i, [0], i < 17 ? [0] : [1])
      );

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("PASSED")).toBeInTheDocument();
    });

    it("should show FAILED when score is below 85%", () => {
      // 16 out of 20 = 80%
      const questions = Array.from({ length: 20 }, (_, i) =>
        createQuestion(i, [0], i < 16 ? [0] : [1])
      );

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("FAILED")).toBeInTheDocument();
    });

    it("should show PASSED when score is above 85%", () => {
      const questions = [
        createQuestion(0, [0], [0]),
        createQuestion(1, [1], [1]),
      ];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("PASSED")).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call onRestart when Try Again button is clicked", () => {
      const questions = [createQuestion(0, [0], [0])];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Try Again"));
      expect(mockOnRestart).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when Close button is clicked", () => {
      const questions = [createQuestion(0, [0], [0])];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Close"));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Modal visibility", () => {
    it("should not render content when open is false", () => {
      const questions = [createQuestion(0, [0], [0])];

      render(
        <TestWrapper>
          <ResultsModal
            open={false}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.queryByText("Quiz Results")).not.toBeInTheDocument();
    });

    it("should render content when open is true", () => {
      const questions = [createQuestion(0, [0], [0])];

      render(
        <TestWrapper>
          <ResultsModal
            open={true}
            questions={questions}
            onClose={mockOnClose}
            onRestart={mockOnRestart}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Quiz Results")).toBeInTheDocument();
    });
  });
});
