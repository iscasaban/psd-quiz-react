import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNavigation } from './useNavigation'

describe('useNavigation', () => {
  it('should initialize with landing screen', () => {
    const { result } = renderHook(() => useNavigation())

    expect(result.current.currentScreen).toBe('landing')
  })

  it('should navigate to range selection', () => {
    const { result } = renderHook(() => useNavigation())

    act(() => {
      result.current.goToRangeSelection()
    })

    expect(result.current.currentScreen).toBe('range-selection')
  })

  it('should navigate to quiz', () => {
    const { result } = renderHook(() => useNavigation())

    act(() => {
      result.current.startQuiz()
    })

    expect(result.current.currentScreen).toBe('quiz')
  })

  it('should navigate to results', () => {
    const { result } = renderHook(() => useNavigation())

    act(() => {
      result.current.showResults()
    })

    expect(result.current.currentScreen).toBe('results')
  })

  it('should navigate back to landing', () => {
    const { result } = renderHook(() => useNavigation())

    act(() => {
      result.current.startQuiz()
    })

    expect(result.current.currentScreen).toBe('quiz')

    act(() => {
      result.current.goToLanding()
    })

    expect(result.current.currentScreen).toBe('landing')
  })
})