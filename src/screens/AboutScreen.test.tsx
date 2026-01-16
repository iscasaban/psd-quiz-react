import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { AboutScreen } from "./AboutScreen";
import { theme } from "../theme/theme";
import type { ReactNode } from "react";

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("AboutScreen", () => {
  it("should render the About heading", () => {
    render(
      <TestWrapper>
        <AboutScreen />
      </TestWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "About", level: 1 })
    ).toBeInTheDocument();
  });

  it("should render the about content", () => {
    render(
      <TestWrapper>
        <AboutScreen />
      </TestWrapper>
    );

    expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
  });

  it("should render as a section element", () => {
    render(
      <TestWrapper>
        <AboutScreen />
      </TestWrapper>
    );

    expect(document.querySelector("section")).toBeInTheDocument();
  });
});
