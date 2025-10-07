import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuizState } from './useQuizState'
import type { QuizQuestion } from '../types/quiz'

// Mock Math.random for predictable shuffling in exam mode
const mockMathRandom = vi.fn()

// Store original Math.random
const originalMathRandom = Math.random

beforeAll(() => {
  // Mock Math.random while preserving other Math methods
  Object.defineProperty(Math, 'random', {
    value: mockMathRandom,
    writable: true,
    configurable: true
  })
})

afterAll(() => {
  // Restore original Math.random
  Object.defineProperty(Math, 'random', {
    value: originalMathRandom,
    writable: true,
    configurable: true
  })
})

describe('useQuizState', () => {
  // Sample test data
  const mockQuestions: QuizQuestion[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    question: `Question ${index + 1}`,
    options: [
      { text: 'Option A', isCorrect: true },
      { text: 'Option B', isCorrect: false },
      { text: 'Option C', isCorrect: false }
    ],
    selectedAnswers: []
  }))

  beforeEach(() => {
    vi.clearAllMocks()
    // Default Math.random to return 0.5 for predictable behavior
    mockMathRandom.mockReturnValue(0.5)
  })

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useQuizState())

      expect(result.current.quizMode).toBe('exam')
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.quizQuestions).toEqual([])
      expect(result.current.isLastQuestion).toBe(false)
      expect(result.current.canGoPrevious).toBe(false)
    })
  })

  describe('Mode Management', () => {
    it('should set quiz mode to practice', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.setMode('practice')
      })

      expect(result.current.quizMode).toBe('practice')
    })

    it('should set quiz mode to exam', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.setMode('practice')
        result.current.setMode('exam')
      })

      expect(result.current.quizMode).toBe('exam')
    })
  })

  describe('Exam Mode Initialization', () => {
    it('should select exactly 80 questions for exam mode', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializeExamMode(mockQuestions)
      })

      expect(result.current.quizQuestions).toHaveLength(80)
      expect(result.current.currentQuestionIndex).toBe(0)
    })

    it('should handle fewer than 80 questions available', () => {
      const { result } = renderHook(() => useQuizState())
      const fewQuestions = mockQuestions.slice(0, 20)

      act(() => {
        result.current.initializeExamMode(fewQuestions)
      })

      expect(result.current.quizQuestions).toHaveLength(20)
    })

    it('should shuffle questions in exam mode', () => {
      const { result } = renderHook(() => useQuizState())

      // Mock Math.random to return different values for shuffling
      mockMathRandom
        .mockReturnValueOnce(0.8)  // This will affect sorting
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.6)

      act(() => {
        result.current.initializeExamMode(mockQuestions.slice(0, 5))
      })

      // Verify Math.random was called for shuffling
      expect(mockMathRandom).toHaveBeenCalled()
    })

    it('should reset selected answers for exam questions', () => {
      const { result } = renderHook(() => useQuizState())
      const questionsWithAnswers = mockQuestions.slice(0, 3).map(q => ({
        ...q,
        selectedAnswers: [0, 1]
      }))

      act(() => {
        result.current.initializeExamMode(questionsWithAnswers)
      })

      result.current.quizQuestions.forEach(question => {
        expect(question.selectedAnswers).toEqual([])
      })
    })

    it('should reassign question IDs sequentially', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializeExamMode(mockQuestions.slice(0, 5))
      })

      result.current.quizQuestions.forEach((question, index) => {
        expect(question.id).toBe(index)
      })
    })
  })

  describe('Practice Mode Initialization', () => {
    it('should use provided questions for practice mode', () => {
      const { result } = renderHook(() => useQuizState())
      const practiceQuestions = mockQuestions.slice(0, 10)

      act(() => {
        result.current.initializePracticeMode(practiceQuestions)
      })

      expect(result.current.quizQuestions).toHaveLength(10)
      expect(result.current.currentQuestionIndex).toBe(0)
    })

    it('should reset selected answers for practice questions', () => {
      const { result } = renderHook(() => useQuizState())
      const questionsWithAnswers = mockQuestions.slice(0, 3).map(q => ({
        ...q,
        selectedAnswers: [0, 2]
      }))

      act(() => {
        result.current.initializePracticeMode(questionsWithAnswers)
      })

      result.current.quizQuestions.forEach(question => {
        expect(question.selectedAnswers).toEqual([])
      })
    })

    it('should handle empty question array', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode([])
      })

      expect(result.current.quizQuestions).toEqual([])
      expect(result.current.currentQuestionIndex).toBe(0)
    })
  })

  describe('Question Navigation', () => {
    beforeEach(() => {
      // Helper to setup a quiz with questions
    })

    it('should navigate to next question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 5))
      })

      expect(result.current.currentQuestionIndex).toBe(0)

      act(() => {
        result.current.nextQuestion()
      })

      expect(result.current.currentQuestionIndex).toBe(1)
    })

    it('should navigate to previous question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 5))
        result.current.nextQuestion()
        result.current.nextQuestion()
      })

      expect(result.current.currentQuestionIndex).toBe(2)

      act(() => {
        result.current.previousQuestion()
      })

      expect(result.current.currentQuestionIndex).toBe(1)
    })

    it('should not go to previous question when at first question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 5))
      })

      expect(result.current.currentQuestionIndex).toBe(0)

      act(() => {
        result.current.previousQuestion()
      })

      expect(result.current.currentQuestionIndex).toBe(0)
    })

    it('should correctly identify last question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 3))
      })

      expect(result.current.isLastQuestion).toBe(false)

      act(() => {
        result.current.nextQuestion()
        result.current.nextQuestion()
      })

      expect(result.current.currentQuestionIndex).toBe(2)
      expect(result.current.isLastQuestion).toBe(true)
    })

    it('should correctly determine if can go previous', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 3))
      })

      expect(result.current.canGoPrevious).toBe(false)

      act(() => {
        result.current.nextQuestion()
      })

      expect(result.current.canGoPrevious).toBe(true)
    })
  })

  describe('Answer Management', () => {
    it('should update answers for current question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 3))
      })

      act(() => {
        result.current.updateQuestionAnswers([0, 2])
      })

      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([0, 2])
      expect(result.current.quizQuestions[1].selectedAnswers).toEqual([])
      expect(result.current.quizQuestions[2].selectedAnswers).toEqual([])
    })

    it('should update answers for different questions', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 3))
      })

      // Answer first question (index 0)
      expect(result.current.currentQuestionIndex).toBe(0)
      act(() => {
        result.current.updateQuestionAnswers([0])
      })

      // Move to second question (index 1) and answer
      act(() => {
        result.current.nextQuestion()
      })
      expect(result.current.currentQuestionIndex).toBe(1)
      act(() => {
        result.current.updateQuestionAnswers([1, 2])
      })

      // Verify answers are stored correctly
      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([0])
      expect(result.current.quizQuestions[1].selectedAnswers).toEqual([1, 2])
      expect(result.current.quizQuestions[2].selectedAnswers).toEqual([])
    })

    it('should replace previous answers for same question', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 2))
      })

      act(() => {
        result.current.updateQuestionAnswers([0])
      })

      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([0])

      act(() => {
        result.current.updateQuestionAnswers([1, 2])
      })

      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([1, 2])
    })

    it('should handle empty answer array', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 2))
        result.current.updateQuestionAnswers([0, 1])
      })

      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([0, 1])

      act(() => {
        result.current.updateQuestionAnswers([])
      })

      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([])
    })
  })

  describe('Quiz Reset', () => {
    it('should reset quiz state', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode(mockQuestions.slice(0, 5))
        result.current.nextQuestion()
        result.current.nextQuestion()
        result.current.updateQuestionAnswers([0, 1])
      })

      expect(result.current.currentQuestionIndex).toBe(2)
      expect(result.current.quizQuestions).toHaveLength(5)

      act(() => {
        result.current.resetQuiz()
      })

      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.quizQuestions).toEqual([])
      expect(result.current.isLastQuestion).toBe(false)
      expect(result.current.canGoPrevious).toBe(false)
    })

    it('should not affect quiz mode when resetting', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.setMode('practice')
        result.current.initializePracticeMode(mockQuestions.slice(0, 3))
      })

      expect(result.current.quizMode).toBe('practice')

      act(() => {
        result.current.resetQuiz()
      })

      expect(result.current.quizMode).toBe('practice')
    })
  })

  describe('Edge Cases', () => {
    it('should handle single question quiz', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.initializePracticeMode([mockQuestions[0]])
      })

      expect(result.current.quizQuestions).toHaveLength(1)
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.isLastQuestion).toBe(true)
      expect(result.current.canGoPrevious).toBe(false)
    })

    it('should handle question updates when no questions loaded', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.updateQuestionAnswers([0, 1])
      })

      // Should not throw error and questions should remain empty
      expect(result.current.quizQuestions).toEqual([])
    })

    it('should maintain state consistency after multiple operations', () => {
      const { result } = renderHook(() => useQuizState())

      act(() => {
        result.current.setMode('practice')
        result.current.initializePracticeMode(mockQuestions.slice(0, 5))
        // Now at index 0
      })

      act(() => {
        result.current.nextQuestion() // Move to index 1
        result.current.updateQuestionAnswers([0]) // Update question at index 1
      })

      act(() => {
        result.current.nextQuestion() // Move to index 2
        result.current.updateQuestionAnswers([1, 2]) // Update question at index 2
      })

      act(() => {
        result.current.previousQuestion() // Move back to index 1
      })

      expect(result.current.quizMode).toBe('practice')
      expect(result.current.currentQuestionIndex).toBe(1)

      // Based on the operations:
      // - Question at index 1 should have [0]
      // - Question at index 2 should have [1, 2]
      // - Question at index 0 should remain empty
      expect(result.current.quizQuestions[0].selectedAnswers).toEqual([])
      expect(result.current.quizQuestions[1].selectedAnswers).toEqual([0])
      expect(result.current.quizQuestions[2].selectedAnswers).toEqual([1, 2])
      expect(result.current.canGoPrevious).toBe(true)
      expect(result.current.isLastQuestion).toBe(false)
    })
  })
})