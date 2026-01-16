import { Box, Container, Typography } from "@mui/material";

export function AboutScreen() {
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
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", lg: "3rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            color: "secondary.main",
            mb: 4,
            textAlign: "center",
          }}
        >
          About
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.8,
            color: "text.secondary",
            mb: 3,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.8,
            color: "text.secondary",
          }}
        >
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
      </Container>
    </Box>
  );
}
