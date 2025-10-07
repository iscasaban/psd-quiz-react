import { describe, it, expect } from 'vitest'
import { parseQuestionsFromMarkdown } from './parseMarkdown'

describe('parseMarkdown', () => {
  describe('parseQuestionsFromMarkdown', () => {
    it('should parse a simple question with multiple choice options', () => {
      const markdown = `### What is React?

- [ ] A database
- [x] A JavaScript library
- [ ] A CSS framework
- [x] A UI library`

      const result = parseQuestionsFromMarkdown(markdown)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 1,
        question: 'What is React?',
        options: [
          { text: 'A database', isCorrect: false },
          { text: 'A JavaScript library', isCorrect: true },
          { text: 'A CSS framework', isCorrect: false },
          { text: 'A UI library', isCorrect: true }
        ],
        selectedAnswers: []
      })
    })

    it('should parse multiple questions', () => {
      const markdown = `### Question 1?

- [x] Correct answer
- [ ] Wrong answer

### Question 2?

- [ ] Wrong answer
- [x] Correct answer`

      const result = parseQuestionsFromMarkdown(markdown)

      expect(result).toHaveLength(2)
      expect(result[0].question).toBe('Question 1?')
      expect(result[1].question).toBe('Question 2?')
    })

    it('should handle empty markdown', () => {
      const result = parseQuestionsFromMarkdown('')
      expect(result).toEqual([])
    })

    it('should handle malformed markdown gracefully', () => {
      const markdown = `### Incomplete question

No options here`

      const result = parseQuestionsFromMarkdown(markdown)
      expect(result).toHaveLength(0)
    })
  })
})