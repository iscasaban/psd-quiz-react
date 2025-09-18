import type { QuizQuestion } from "../types/quiz.ts";

export function parseQuestionsFromMarkdown(
  markdownContent: string,
): QuizQuestion[] {
  const questionBlocks = markdownContent
    .split(/^### /m)
    .filter((block) => block.trim().length > 0);

  return questionBlocks.map((block, index) => {
    const lines = block.trim().split("\n");
    const questionText = lines[0].trim();

    const optionLines = lines
      .slice(1)
      .filter((line) => line.trim().match(/^- \[[x ]]/));

    const options = optionLines.map((line) => {
      const trimmedLine = line.trim();
      const isCorrect = trimmedLine.includes("- [x]"); // More explicit check
      const text = trimmedLine.replace(/^- \[[x ]]\s*/, "").trim();

      return { text, isCorrect };
    });

    return {
      id: index,
      question: questionText,
      options,
      selectedAnswers: [],
    };
  });
}
