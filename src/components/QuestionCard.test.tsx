import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { QuestionCard } from "./QuestionCard";
import { theme } from "../theme/theme";
import type { QuizQuestion } from "../types/quiz";
import type { ReactNode } from "react";

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("QuestionCard", () => {
  const singleAnswerQuestion: QuizQuestion = {
    id: 1,
    question: "What is React?",
    options: [
      { text: "A database", isCorrect: false },
      { text: "A JavaScript library", isCorrect: true },
      { text: "A CSS framework", isCorrect: false },
    ],
    selectedAnswers: [],
  };

  const multiAnswerQuestion: QuizQuestion = {
    id: 2,
    question: "Which are JavaScript frameworks?",
    options: [
      { text: "React", isCorrect: true },
      { text: "Python", isCorrect: false },
      { text: "Vue", isCorrect: true },
      { text: "Java", isCorrect: false },
    ],
    selectedAnswers: [],
  };

  let mockOnAnswerChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnAnswerChange = vi.fn();
  });

  describe("Basic rendering", () => {
    it("should render question text", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      expect(screen.getByText("What is React?")).toBeInTheDocument();
    });

    it("should render all answer options", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      expect(screen.getByText("A database")).toBeInTheDocument();
      expect(screen.getByText("A JavaScript library")).toBeInTheDocument();
      expect(screen.getByText("A CSS framework")).toBeInTheDocument();
    });
  });

  describe("Single answer questions", () => {
    it("should show 'Select one answer' hint", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Select one answer:")).toBeInTheDocument();
    });

    it("should render radio buttons for single answer", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("should call onAnswerChange with single selection", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByLabelText("A database"));
      expect(mockOnAnswerChange).toHaveBeenCalledWith(1, [0]);
    });

    it("should show selected answer as checked", () => {
      const questionWithSelection = {
        ...singleAnswerQuestion,
        selectedAnswers: [1],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithSelection}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText("A JavaScript library")).toBeChecked();
    });
  });

  describe("Multi answer questions", () => {
    it("should show 'Select all that apply' hint", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={multiAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Select all that apply:")).toBeInTheDocument();
    });

    it("should render checkboxes for multi answer", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={multiAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(4);
    });

    it("should add to selection when checking an option", () => {
      const questionWithOneSelected = {
        ...multiAnswerQuestion,
        selectedAnswers: [0],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithOneSelected}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByLabelText("Vue"));
      expect(mockOnAnswerChange).toHaveBeenCalledWith(2, [0, 2]);
    });

    it("should remove from selection when unchecking an option", () => {
      const questionWithSelection = {
        ...multiAnswerQuestion,
        selectedAnswers: [0, 2],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithSelection}
            onAnswerChange={mockOnAnswerChange}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByLabelText("React"));
      expect(mockOnAnswerChange).toHaveBeenCalledWith(2, [2]);
    });
  });

  describe("Practice mode", () => {
    it("should show Check Answer button in practice mode", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Check Answer")).toBeInTheDocument();
    });

    it("should not show Check Answer button in exam mode", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={false}
          />
        </TestWrapper>
      );

      expect(screen.queryByText("Check Answer")).not.toBeInTheDocument();
    });

    it("should disable Check Answer when no answer selected", () => {
      render(
        <TestWrapper>
          <QuestionCard
            question={singleAnswerQuestion}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Check Answer")).toBeDisabled();
    });

    it("should enable Check Answer when answer is selected", () => {
      const questionWithSelection = {
        ...singleAnswerQuestion,
        selectedAnswers: [1],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithSelection}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Check Answer")).not.toBeDisabled();
    });

    it("should show Correct feedback when answer is right", () => {
      const questionWithCorrectAnswer = {
        ...singleAnswerQuestion,
        selectedAnswers: [1], // "A JavaScript library" is correct
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithCorrectAnswer}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    it("should show Incorrect feedback when answer is wrong", () => {
      const questionWithWrongAnswer = {
        ...singleAnswerQuestion,
        selectedAnswers: [0], // "A database" is wrong
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithWrongAnswer}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Incorrect")).toBeInTheDocument();
    });

    it("should show Reset button after checking answer", () => {
      const questionWithAnswer = {
        ...singleAnswerQuestion,
        selectedAnswers: [1],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithAnswer}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Reset")).toBeInTheDocument();
    });

    it("should clear selection and hide feedback on Reset", () => {
      const questionWithAnswer = {
        ...singleAnswerQuestion,
        selectedAnswers: [1],
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithAnswer}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      fireEvent.click(screen.getByText("Reset"));

      expect(mockOnAnswerChange).toHaveBeenCalledWith(1, []);
      expect(screen.queryByText("Correct!")).not.toBeInTheDocument();
    });
  });

  describe("Multi-select answer validation", () => {
    it("should show Correct only when all correct options are selected", () => {
      const questionWithAllCorrect = {
        ...multiAnswerQuestion,
        selectedAnswers: [0, 2], // React and Vue are correct
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithAllCorrect}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    it("should show Incorrect when only partial correct options selected", () => {
      const questionWithPartial = {
        ...multiAnswerQuestion,
        selectedAnswers: [0], // Only React, missing Vue
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithPartial}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Incorrect")).toBeInTheDocument();
    });

    it("should show Incorrect when extra wrong options selected", () => {
      const questionWithExtra = {
        ...multiAnswerQuestion,
        selectedAnswers: [0, 1, 2], // React, Python, Vue - Python is wrong
      };

      render(
        <TestWrapper>
          <QuestionCard
            question={questionWithExtra}
            onAnswerChange={mockOnAnswerChange}
            isPracticeMode={true}
          />
        </TestWrapper>
      );

      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("Incorrect")).toBeInTheDocument();
    });
  });
});
