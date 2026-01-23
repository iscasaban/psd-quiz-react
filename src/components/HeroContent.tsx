import { Box, Typography } from "@mui/material";
import { ModeSelector } from "./ModeSelector";
import type { QuizMode } from "../types/quiz";

interface HeroContentProps {
  onSelectMode: (mode: QuizMode) => void;
}

export function HeroContent({ onSelectMode }: HeroContentProps) {
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
            color: "primary.dark",
          }}
        >
          Master the Professional Scrum Developer™ I Certification
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
          Pass your PSD I exam with confidence using our comprehensive quiz
          platform featuring 305 real-world practice questions. Choose your
          learning path and start your Scrum Developer journey today.
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            🎯 Practice Mode: Select custom question ranges and receive instant
            feedback to reinforce your learning
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🚀 Exam Mode: Simulate the real test with 80 randomly selected
            questions under exam conditions
          </Typography>
        </Box>
      </Box>

      <ModeSelector onSelectMode={onSelectMode} />
    </Box>
  );
}
