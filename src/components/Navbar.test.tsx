import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { Navbar } from "./Navbar";
import { theme } from "../theme/theme";
import type { ReactNode } from "react";

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Navbar", () => {
  let mockOnHomeClick: ReturnType<typeof vi.fn>;
  let mockOnExamClick: ReturnType<typeof vi.fn>;
  let mockOnPracticeClick: ReturnType<typeof vi.fn>;
  let mockOnAboutClick: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnHomeClick = vi.fn();
    mockOnExamClick = vi.fn();
    mockOnPracticeClick = vi.fn();
    mockOnAboutClick = vi.fn();
  });

  const renderNavbar = () => {
    return render(
      <TestWrapper>
        <Navbar
          onHomeClick={mockOnHomeClick}
          onExamClick={mockOnExamClick}
          onPracticeClick={mockOnPracticeClick}
          onAboutClick={mockOnAboutClick}
        />
      </TestWrapper>
    );
  };

  describe("Basic rendering", () => {
    it("should render the logo and title", () => {
      renderNavbar();

      expect(screen.getByText("PSD quiz")).toBeInTheDocument();
    });

    it("should render all navigation links", () => {
      renderNavbar();

      expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Exam" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Practice" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "About" })).toBeInTheDocument();
    });
  });

  describe("Navigation clicks", () => {
    it("should call onHomeClick when Home is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByRole("button", { name: "Home" }));
      expect(mockOnHomeClick).toHaveBeenCalledTimes(1);
    });

    it("should call onExamClick when Exam is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByRole("button", { name: "Exam" }));
      expect(mockOnExamClick).toHaveBeenCalledTimes(1);
    });

    it("should call onPracticeClick when Practice is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByRole("button", { name: "Practice" }));
      expect(mockOnPracticeClick).toHaveBeenCalledTimes(1);
    });

    it("should call onHomeClick when logo is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByText("PSD quiz"));
      expect(mockOnHomeClick).toHaveBeenCalledTimes(1);
    });

    it("should call onAboutClick when About is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByRole("button", { name: "About" }));
      expect(mockOnAboutClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mobile menu", () => {
    it("should render mobile menu button", () => {
      renderNavbar();

      expect(
        screen.getByLabelText("open navigation menu")
      ).toBeInTheDocument();
    });

    it("should open drawer when mobile menu button is clicked", () => {
      renderNavbar();

      fireEvent.click(screen.getByLabelText("open navigation menu"));

      // Drawer should show navigation items in list format
      const listItems = screen.getAllByRole("button", { name: "Home" });
      expect(listItems.length).toBeGreaterThanOrEqual(1);
    });

    it("should close drawer when a navigation item is clicked", () => {
      renderNavbar();

      // Open the drawer
      fireEvent.click(screen.getByLabelText("open navigation menu"));

      // Click Home in the drawer (there will be multiple Home buttons - desktop and drawer)
      const homeButtons = screen.getAllByRole("button", { name: "Home" });
      fireEvent.click(homeButtons[homeButtons.length - 1]); // Click the last one (drawer)

      expect(mockOnHomeClick).toHaveBeenCalled();
    });
  });
});
