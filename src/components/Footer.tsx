import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "text.secondary",
            opacity: 0.7,
          }}
        >
          Made with ☕ & 🎵
        </Typography>
      </Container>
    </Box>
  );
}
