import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, Quiz as QuizIcon } from "@mui/icons-material";

interface NavbarProps {
  onHomeClick: () => void;
  onExamClick: () => void;
  onPracticeClick: () => void;
  onAboutClick: () => void;
}

interface NavItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Navbar({
  onHomeClick,
  onExamClick,
  onPracticeClick,
  onAboutClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Home", onClick: onHomeClick },
    { label: "Exam", onClick: onExamClick },
    { label: "Practice", onClick: onPracticeClick },
    { label: "About", onClick: onAboutClick },
  ];

  const handleNavItemClick = (item: NavItem) => {
    if (!item.disabled) {
      item.onClick();
      setMobileMenuOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "primary.main" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo and Title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={onHomeClick}
            >
              <QuizIcon sx={{ color: "primary.light", fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  color: "primary.light",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                PSD quiz
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavItemClick(item)}
                  disabled={item.disabled}
                  sx={{
                    color: "primary.light",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "&.Mui-disabled": {
                      color: "primary.light",
                      opacity: 0.5,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="open navigation menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "primary.light",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            bgcolor: "primary.main",
          },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavItemClick(item)}
                  disabled={item.disabled}
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "primary.light",
                        fontWeight: 600,
                        opacity: item.disabled ? 0.5 : 1,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
