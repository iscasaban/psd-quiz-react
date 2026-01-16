export type AppScreen = "landing" | "range-selection" | "quiz" | "results" | "about";

export type NavigationAction =
  | { type: "GO_TO_LANDING" }
  | { type: "GO_TO_RANGE_SELECTION" }
  | { type: "START_QUIZ" }
  | { type: "SHOW_RESULTS" }
  | { type: "GO_TO_ABOUT" };

export interface NavigationState {
  currentScreen: AppScreen;
  history: AppScreen[];
}
