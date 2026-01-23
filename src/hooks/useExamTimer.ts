import { useState, useEffect, useCallback, useRef } from "react";
import {
  getExamStartTime,
  clearExamSession,
} from "../utils/examSessionStorage";

const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes
const WARNING_THRESHOLD_SECONDS = 5 * 60; // 5 minutes

interface UseExamTimerOptions {
  onTimeExpired: () => void;
  isActive: boolean;
}

interface UseExamTimerResult {
  timeRemaining: number;
  isWarning: boolean;
  isExpired: boolean;
  formattedTime: string;
  resetTimer: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function useExamTimer({
  onTimeExpired,
  isActive,
}: UseExamTimerOptions): UseExamTimerResult {
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_SECONDS);
  const hasExpiredRef = useRef(false);

  // Initialize timer from centralized exam session storage
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const startTime = getExamStartTime();

    if (startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, EXAM_DURATION_SECONDS - elapsed);
      setTimeRemaining(remaining);
    } else {
      // Start time should be set by useQuizState.initializeExamMode
      // If not found, default to full duration (edge case)
      setTimeRemaining(EXAM_DURATION_SECONDS);
    }

    hasExpiredRef.current = false;
  }, [isActive]);

  // Countdown interval
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0 && !hasExpiredRef.current) {
          hasExpiredRef.current = true;
          onTimeExpired();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeRemaining, onTimeExpired]);

  const resetTimer = useCallback(() => {
    clearExamSession();
    setTimeRemaining(EXAM_DURATION_SECONDS);
    hasExpiredRef.current = false;
  }, []);

  return {
    timeRemaining,
    isWarning: timeRemaining <= WARNING_THRESHOLD_SECONDS && timeRemaining > 0,
    isExpired: timeRemaining <= 0,
    formattedTime: formatTime(timeRemaining),
    resetTimer,
  };
}

// Re-export for convenience - clears entire exam session
export { clearExamSession as clearExamTimer } from "../utils/examSessionStorage";
