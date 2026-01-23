import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const usefulLinks = [
  { label: "Scrum Guide", href: "https://scrumguides.org/" },
  {
    label: "Atlassian Scrum Guide",
    href: "https://www.atlassian.com/agile/scrum",
  },
  { label: "Agile Manifesto", href: "https://agilemanifesto.org/" },
  {
    label: "Resources for developers on Scrum.org",
    href: "https://www.scrum.org/resources-developers",
  },
];

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
          This free, open-source quiz application was created to help aspiring
          Professional Scrum Developers prepare for the PSD I certification
          exam. This free PSD I quiz started as a personal study tool while
          preparing for the PSD I exam (spoiler:{" "}
          <Link
            href="https://www.credly.com/badges/c635a845-2f48-42e9-be6d-464075379c64"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary"
          >
            I passed! 🎉
          </Link>
          ). Now it's here to help you succeed too.
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
          All questions are sourced from{" "}
          <Link
            href="https://github.com/Ditectrev/Scrum-Developer-I-PSD-I-Practice-Tests-Exams-Questions-Answers"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary"
          >
            Ditectrev's comprehensive PSD I practice repository
          </Link>
          — check out their high-quality content.
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
          Found a bug or have an idea to make this better?{" "}
          <Link
            href="https://github.com/iscasaban/psd-quiz-react/issues"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary"
            fontWeight="bold"
          >
            Open an issue on GitHub
          </Link>{" "}
          or submit a pull request. Contributions are always welcome!
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
          Have questions, feedback, or just want to say hi?{" "}
          <Link href="#" underline="hover" color="secondary" fontWeight="bold">
            Contact me
          </Link>{" "}
          — I'd love to hear about your certification journey and how this app
          helped you prepare.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.8,
            color: "text.secondary",
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Good luck with your certification! 🚀
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.8,
            color: "text.secondary",
          }}
        >
          Some useful links:
        </Typography>

        <List dense sx={{ mt: 1 }}>
          {usefulLinks.map((link) => (
            <ListItem key={link.href} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <OpenInNewIcon fontSize="small" color="inherit" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="secondary"
                  >
                    {link.label}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
