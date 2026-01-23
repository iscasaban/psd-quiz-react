import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExamTimer } from "./useExamTimer";

const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes
const WARNING_THRESHOLD_SECONDS = 5 * 60; // 5 minutes

describe("useExamTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initialization", () => {
    it("should initialize with full duration when no session exists", () => {
      const onTimeExpired = vi.fn();

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS);
      expect(result.current.formattedTime).toBe("60:00");
    });

    it("should calculate remaining time from stored startTime", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const thirtyMinutesAgo = now - 30 * 60 * 1000;

      vi.setSystemTime(now);
      localStorage.setItem(
        "exam_session_start_time",
        thirtyMinutesAgo.toString()
      );

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      // 60 minutes - 30 minutes elapsed = 30 minutes remaining
      expect(result.current.timeRemaining).toBe(30 * 60);
      expect(result.current.formattedTime).toBe("30:00");
    });

    it("should set remaining time to 0 if elapsed time exceeds duration", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const twoHoursAgo = now - 2 * 60 * 60 * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", twoHoursAgo.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isExpired).toBe(true);
    });

    it("should not initialize timer when isActive is false", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const thirtyMinutesAgo = now - 30 * 60 * 1000;

      vi.setSystemTime(now);
      localStorage.setItem(
        "exam_session_start_time",
        thirtyMinutesAgo.toString()
      );

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: false })
      );

      // Should stay at default full duration since isActive is false
      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS);
    });
  });

  describe("countdown", () => {
    it("should decrement time every second when active", () => {
      const onTimeExpired = vi.fn();

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS - 1);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS - 6);
    });

    it("should not decrement when isActive is false", () => {
      const onTimeExpired = vi.fn();

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: false })
      );

      const initialTime = result.current.timeRemaining;

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(initialTime);
    });

    it("should stop countdown when time reaches 0", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      // Set start time so only 2 seconds remain
      const almostExpired = now - (EXAM_DURATION_SECONDS - 2) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", almostExpired.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(2);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.timeRemaining).toBe(0);
      // Should not go negative
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.timeRemaining).toBe(0);
    });
  });

  describe("warning state", () => {
    it("should set isWarning to true when 5 minutes or less remain", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      // Set start time so exactly 5 minutes remain
      const fiveMinutesLeft =
        now - (EXAM_DURATION_SECONDS - WARNING_THRESHOLD_SECONDS) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem(
        "exam_session_start_time",
        fiveMinutesLeft.toString()
      );

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.isWarning).toBe(true);
      expect(result.current.timeRemaining).toBe(WARNING_THRESHOLD_SECONDS);
    });

    it("should set isWarning to false when more than 5 minutes remain", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      // Set start time so 6 minutes remain
      const sixMinutesLeft =
        now - (EXAM_DURATION_SECONDS - 6 * 60) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", sixMinutesLeft.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.isWarning).toBe(false);
    });

    it("should set isWarning to false when time is exactly 0", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const expired = now - EXAM_DURATION_SECONDS * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", expired.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isWarning).toBe(false);
      expect(result.current.isExpired).toBe(true);
    });
  });

  describe("expiration", () => {
    it("should call onTimeExpired when timer reaches 0", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      // Set start time so only 1 second remains
      const almostExpired = now - (EXAM_DURATION_SECONDS - 1) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", almostExpired.toString());

      renderHook(() => useExamTimer({ onTimeExpired, isActive: true }));

      expect(onTimeExpired).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(onTimeExpired).toHaveBeenCalledTimes(1);
    });

    it("should only call onTimeExpired once", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const almostExpired = now - (EXAM_DURATION_SECONDS - 1) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", almostExpired.toString());

      renderHook(() => useExamTimer({ onTimeExpired, isActive: true }));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(onTimeExpired).toHaveBeenCalledTimes(1);

      // Advance more time - should not call again
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(onTimeExpired).toHaveBeenCalledTimes(1);
    });

    it("should set isExpired to true when timeRemaining is 0", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const expired = now - EXAM_DURATION_SECONDS * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", expired.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.isExpired).toBe(true);
    });
  });

  describe("resetTimer", () => {
    it("should reset timer to full duration", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const thirtyMinutesAgo = now - 30 * 60 * 1000;

      vi.setSystemTime(now);
      localStorage.setItem(
        "exam_session_start_time",
        thirtyMinutesAgo.toString()
      );

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.timeRemaining).toBe(30 * 60);

      act(() => {
        result.current.resetTimer();
      });

      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS);
    });

    it("should clear exam session from localStorage", () => {
      const onTimeExpired = vi.fn();
      localStorage.setItem("exam_session_start_time", Date.now().toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      act(() => {
        result.current.resetTimer();
      });

      expect(localStorage.getItem("exam_session_start_time")).toBeNull();
    });

    it("should allow timer to expire again after reset", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const almostExpired = now - (EXAM_DURATION_SECONDS - 1) * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", almostExpired.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      // First expiration
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(onTimeExpired).toHaveBeenCalledTimes(1);

      // Reset and set up for another expiration
      act(() => {
        result.current.resetTimer();
      });

      // After reset, timer is at full duration, advance to near end
      act(() => {
        vi.advanceTimersByTime((EXAM_DURATION_SECONDS - 1) * 1000);
      });

      // Final second to trigger expiration
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(onTimeExpired).toHaveBeenCalledTimes(2);
    });
  });

  describe("formattedTime", () => {
    it("should format full duration as 60:00", () => {
      const onTimeExpired = vi.fn();

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.formattedTime).toBe("60:00");
    });

    it("should format single digit minutes and seconds with leading zeros", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      // 5 minutes and 9 seconds remaining = 309 seconds
      const remaining = 5 * 60 + 9;
      const elapsed = EXAM_DURATION_SECONDS - remaining;
      const startTime = now - elapsed * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", startTime.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.formattedTime).toBe("05:09");
    });

    it("should format 0 seconds as 00:00", () => {
      const onTimeExpired = vi.fn();
      const now = Date.now();
      const expired = now - EXAM_DURATION_SECONDS * 1000;

      vi.setSystemTime(now);
      localStorage.setItem("exam_session_start_time", expired.toString());

      const { result } = renderHook(() =>
        useExamTimer({ onTimeExpired, isActive: true })
      );

      expect(result.current.formattedTime).toBe("00:00");
    });
  });

  describe("isActive transitions", () => {
    it("should start counting when isActive changes from false to true", () => {
      const onTimeExpired = vi.fn();

      const { result, rerender } = renderHook(
        ({ isActive }) => useExamTimer({ onTimeExpired, isActive }),
        { initialProps: { isActive: false } }
      );

      const initialTime = result.current.timeRemaining;

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should not have changed while inactive
      expect(result.current.timeRemaining).toBe(initialTime);

      // Activate the timer
      rerender({ isActive: true });

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Now it should be counting down
      expect(result.current.timeRemaining).toBe(EXAM_DURATION_SECONDS - 3);
    });
  });
});
