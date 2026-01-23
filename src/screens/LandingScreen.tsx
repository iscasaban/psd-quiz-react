import { Box, Container } from "@mui/material";
import { HeroContent } from "../components/HeroContent";
import type { QuizMode } from "../types/quiz";

interface LandingScreenProps {
  onModeSelect: (mode: QuizMode) => void;
}

export function LandingScreen({ onModeSelect }: LandingScreenProps) {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <HeroContent onSelectMode={onModeSelect} />
      </Container>
    </Box>
  );
}
