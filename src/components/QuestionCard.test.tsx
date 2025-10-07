import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { QuestionCard } from "./QuestionCard";
import { theme } from "../theme/theme";
import type { QuizQuestion } from "../types/quiz";
import type { ReactNode } from "react";

// Test wrapper component
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("QuestionCard", () => {
  const mockQuestion: QuizQuestion = {
    id: 1,
    question: "What is React?",
    options: [
      { text: "A database", isCorrect: false },
      { text: "A JavaScript library", isCorrect: true },
      { text: "A CSS framework", isCorrect: false },
    ],
    selectedAnswers: [],
  };

  const mockOnAnswerChange = vi.fn();

  it("should render question text", () => {
    render(
      <TestWrapper>
        <QuestionCard
          question={mockQuestion}
          onAnswerChange={mockOnAnswerChange}
        />
      </TestWrapper>,
    );

    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });

  it("should render all answer options", () => {
    render(
      <TestWrapper>
        <QuestionCard
          question={mockQuestion}
          onAnswerChange={mockOnAnswerChange}
        />
      </TestWrapper>,
    );

    expect(screen.getByText("A database")).toBeInTheDocument();
    expect(screen.getByText("A JavaScript library")).toBeInTheDocument();
    expect(screen.getByText("A CSS framework")).toBeInTheDocument();
  });

  it("should call onAnswerChange when an option is selected", () => {
    render(
      <TestWrapper>
        <QuestionCard
          question={mockQuestion}
          onAnswerChange={mockOnAnswerChange}
        />
      </TestWrapper>,
    );

    const firstOption = screen.getByLabelText("A database");
    fireEvent.click(firstOption);

    expect(mockOnAnswerChange).toHaveBeenCalledWith(1, [0]);
  });

  it("should show selected answers", () => {
    const questionWithSelection = {
      ...mockQuestion,
      selectedAnswers: [1],
    };

    render(
      <TestWrapper>
        <QuestionCard
          question={questionWithSelection}
          onAnswerChange={mockOnAnswerChange}
        />
      </TestWrapper>,
    );

    const selectedOption = screen.getByLabelText("A JavaScript library");
    expect(selectedOption).toBeChecked();
  });
});
