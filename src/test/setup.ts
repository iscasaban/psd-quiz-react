import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

// Global test setup
beforeEach(() => {
  // Reset any global state before each test
});

// Mock IntersectionObserver for MUI components
global.IntersectionObserver = class IntersectionObserver {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options;
  }

  observe() {}
  unobserve() {}
  disconnect() {}

  // Add the required properties
  get root() { return null; }
  get rootMargin() { return '0px'; }
  get thresholds() { return [0]; }

  // Method to manually trigger the callback for testing
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
