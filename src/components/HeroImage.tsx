import { Box } from "@mui/material";
import heroImage from "../assets/hero-image-learning-express.jpg";

export function HeroImage() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Box
        component="img"
        src={heroImage}
        alt="Professional workspace with laptop"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 4,
          display: "block",
          boxShadow:
            "8px 9px 9px 7px rgba(198,225,244,0.3), 0 4px 8px rgba(198, 225, 244, 0.3)",
        }}
      />
    </Box>
  );
}
