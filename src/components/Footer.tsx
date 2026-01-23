import { Box, Container, Link, Typography } from "@mui/material";

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
          Made with ☕ & 🎵 by{" "}
          <Link
            href="https://github.com/iscasaban/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary"
            fontWeight="bold"
          >
            Inma Sánchez Casabán
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
