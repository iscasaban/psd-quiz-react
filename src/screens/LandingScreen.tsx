import { Box, Container } from "@mui/material";
import { HeroImage } from "../components/HeroImage";
import { HeroContent } from "../components/HeroContent";
import { useQuestions } from "../context/QuestionContext";
import type { QuizMode } from "../types/quiz";

interface LandingScreenProps {
  onModeSelect: (mode: QuizMode) => void;
}

export function LandingScreen({ onModeSelect }: LandingScreenProps) {
  const { allQuestions } = useQuestions();

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <Box sx={{ order: { xs: 2, lg: 1 } }}>
            <HeroImage />
          </Box>

          <Box sx={{ order: { xs: 1, lg: 2 } }}>
            <HeroContent
              totalQuestions={allQuestions.length}
              onSelectMode={onModeSelect}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
