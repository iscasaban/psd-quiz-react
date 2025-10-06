import { useReducer } from "react";
import type { NavigationState, NavigationAction } from "../types/navigation";

const initialState: NavigationState = {
  currentScreen: "landing",
  history: ["landing"],
};

function navigationReducer(
  state: NavigationState,
  action: NavigationAction,
): NavigationState {
  switch (action.type) {
    case "GO_TO_LANDING":
      return {
        currentScreen: "landing",
        history: [...state.history, "landing"],
      };
    case "GO_TO_RANGE_SELECTION":
      return {
        currentScreen: "range-selection",
        history: [...state.history, "range-selection"],
      };
    case "START_QUIZ":
      return { currentScreen: "quiz", history: [...state.history, "quiz"] };
    case "SHOW_RESULTS":
      return {
        currentScreen: "results",
        history: [...state.history, "results"],
      };
    default:
      return state;
  }
}

export function useNavigation() {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return {
    currentScreen: state.currentScreen,
    goToLanding: () => dispatch({ type: "GO_TO_LANDING" }),
    goToRangeSelection: () => dispatch({ type: "GO_TO_RANGE_SELECTION" }),
    startQuiz: () => dispatch({ type: "START_QUIZ" }),
    showResults: () => dispatch({ type: "SHOW_RESULTS" }),
  };
}
