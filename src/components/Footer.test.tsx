import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "./Footer";
import { theme } from "../theme/theme";
import type { ReactNode } from "react";

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Footer", () => {
  it("should render the footer text", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByText(/Made with/)).toBeInTheDocument();
  });

  it("should render as a footer element", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
