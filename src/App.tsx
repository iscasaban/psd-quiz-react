import "./App.css";
import { useEffect, useState } from "react";
import type { QuizQuestion } from "./types/quiz.ts";
import { parseQuestionsFromMarkdown } from "./utils/parseMarkdown.ts";
import answersContent from "./data/answers.md?raw";
import { QuestionCard } from "./components/QuestionCard.tsx";
import { ResultsModal } from "./components/ResultsModal.tsx";
import { Button } from "@mui/material";

function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    try {
      const parsedQuestions = parseQuestionsFromMarkdown(answersContent);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Failed to parse questions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleStart = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 80);

    const quizQuestions = selectedQuestions.map((question, index) => ({
      ...question,
      id: index,
      selectedAnswers: [],
    }));

    setQuestions(quizQuestions);
    setQuizStarted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    // Reset all selected answers
    setQuestions((prev) => prev.map((q) => ({ ...q, selectedAnswers: [] })));
    setQuizStarted(false); // Return to start screen
  };

  if (loading) return <div>Loading questions...</div>;
  if (questions.length === 0) return <div>No questions found</div>;

  if (!quizStarted) {
    return (
      <>
        <h1 color="primary">
          Professional Scrum Developer™ Certification quiz
        </h1>

        <div className="card">
          <p>Prepare your PSD I certification with this quiz</p>
          <p>
            {questions.length} questions available. 80 will be selected
            randomly.
          </p>
        </div>
        <Button variant="contained" color="primary" onClick={handleStart}>
          Start
        </Button>
      </>
    );
  }

  return (
    <div>
      <h1 color="primary">Professional Scrum Developer™ Certification quiz</h1>

      {/* Progress indicator */}
      <div>Question {currentQuestionIndex + 1} of 80</div>

      {/* Current question display */}
      <QuestionCard
        question={currentQuestion}
        onAnswerChange={(selectedAnswers) => {
          // Update the selected answers for current question
          setQuestions((prev) =>
            prev.map((q, index) =>
              index === currentQuestionIndex ? { ...q, selectedAnswers } : q,
            ),
          );
        }}
      />

      {/* Navigation buttons */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handlePrevious}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </Button>
      <Button variant="contained" onClick={handleNext} disabled={false}>
        {isLastQuestion ? "Finish Quiz" : "Next"}
      </Button>

      <ResultsModal
        open={showResults}
        questions={questions}
        onClose={() => setShowResults(false)}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;
