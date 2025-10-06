export type AppScreen = "landing" | "range-selection" | "quiz" | "results";

export type NavigationAction =
  | { type: "GO_TO_LANDING" }
  | { type: "GO_TO_RANGE_SELECTION" }
  | { type: "START_QUIZ" }
  | { type: "SHOW_RESULTS" };

export interface NavigationState {
  currentScreen: AppScreen;
  history: AppScreen[];
}
