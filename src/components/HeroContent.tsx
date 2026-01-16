import { Box, Typography } from "@mui/material";
import { ModeSelector } from "./ModeSelector";
import type { QuizMode } from "../types/quiz";

interface HeroContentProps {
  totalQuestions: number;
  onSelectMode: (mode: QuizMode) => void;
}

export function HeroContent({
  totalQuestions,
  onSelectMode,
}: HeroContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", lg: "3rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            color: "secondary.main",
          }}
        >
          Professional Scrum Developer™ Certification
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: 1.6,
            color: "text.secondary",
            mx: "auto",
          }}
        >
          Prepare for your PSD I certification with our interactive quiz
          platform. Currently featuring{" "}
          <strong>{totalQuestions} questions</strong>. Choose your preferred
          learning style and start improving your skills today.
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            • <strong>Practice Mode:</strong> Choose specific question ranges
            and get immediate feedback
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>Exam Mode:</strong> Test yourself with 80 randomly
            selected questions
          </Typography>
        </Box>
      </Box>

      <ModeSelector onSelectMode={onSelectMode} />
    </Box>
  );
}
