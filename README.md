# PSD I Quiz Application

A React-based quiz application for Professional Scrum Developer I (PSD I) certification practice, featuring 305 questions with both exam and practice modes.

## Features

- **Exam Mode**: 80 randomly selected questions from the full question bank
- **Practice Mode**: Select specific question ranges for targeted study
- **Interactive UI**: Material-UI components with responsive design
- **Real-time Feedback**: Immediate answer validation in practice mode
- **Progress Tracking**: Visual progress indicators and quiz navigation
- **Results Summary**: Comprehensive scoring and performance analysis

## Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Styling**: Material-UI (MUI) with custom theme
- **Build Tool**: Vite for fast development and optimized builds
- **Testing**: Vitest with React Testing Library
- **Linting**: ESLint with TypeScript support
- **Fonts**: Rubik font family

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd psd-quiz-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run preview      # Preview production build locally

# Building
npm run build        # Build for production (TypeScript + Vite)

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check

# Testing
npm test             # Run all tests
npm test -- --watch # Run tests in watch mode
npm test -- --coverage # Generate coverage report
npm test -- <pattern> # Run specific test files
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── QuestionCard.tsx    # Question display with answer options
│   ├── QuizProgress.tsx    # Progress indicator
│   ├── QuizNavigation.tsx  # Previous/Next controls
│   └── ResultsModal.tsx    # Results summary modal
├── screens/            # Screen-level components
│   ├── LandingScreen.tsx   # Mode selection
│   ├── RangeSelectionScreen.tsx # Practice mode setup
│   └── QuizScreen.tsx      # Main quiz interface
├── hooks/              # Custom React hooks
│   ├── useNavigation.ts    # Screen navigation logic
│   └── useQuizState.ts     # Quiz state management
├── context/            # React Context providers
│   └── QuestionContext.tsx # Question data provider
├── utils/              # Utility functions
│   └── parseMarkdown.ts    # Question parsing logic
├── data/               # Static data
│   └── answers.md          # Question bank (1400+ questions)
├── theme/              # MUI theme configuration
│   └── theme.ts            # Custom theme settings
└── types/              # TypeScript type definitions
    └── quiz.ts             # Quiz-related types
```

## Question Format

Questions are stored in markdown format (`src/data/answers.md`):

```markdown
### What is React?

- [ ] A database system
- [x] A JavaScript library for building user interfaces
- [ ] A CSS framework
- [x] A declarative UI library
```

- Questions use H3 headers (`###`)
- Multiple choice options with checkboxes
- Correct answers marked with `[x]`
- Incorrect answers marked with `[ ]`

## Development Guidelines

### Code Style
- Use functional components with hooks (no class components)
- Prefer named exports over default exports
- Keep components under 200 lines; extract logic to custom hooks
- File naming: PascalCase for components, camelCase for utilities

### Testing Patterns
- **Components**: Use React Testing Library with MUI TestWrapper
- **Hooks**: Use `renderHook` and `act` from React Testing Library
- **Utilities**: Focus on edge cases and data transformation
- **Mocking**: Use `vi.fn()` for function mocks, mock browser APIs in setup

### State Management
- **Navigation**: `useNavigation` hook for screen transitions
- **Quiz Logic**: `useQuizState` hook for questions, answers, and progress
- **Global Data**: `QuestionContext` for parsed questions
- **Local State**: Standard React hooks for component-specific state

## Architecture

### Quiz Modes
- **Exam Mode**: 80 randomly shuffled questions, immediate start
- **Practice Mode**: User-selected question ranges, optional answer checking

### Navigation Flow
```
Landing → [Mode Selection] → Range Selection (Practice only) → Quiz → Results
```

### State Flow
1. Questions loaded from markdown and parsed via context
2. Mode selection initializes appropriate question set
3. Quiz state tracks current question, user answers, and progress
4. Results calculated and displayed upon completion

## Testing

The project uses Vitest with comprehensive test coverage:

- **Unit Tests**: Individual functions and utilities
- **Hook Tests**: Custom React hooks with state management
- **Component Tests**: UI components with user interactions
- **Integration Tests**: Complete user workflows

### Test Commands
```bash
npm test                    # Run all tests
npm test -- --ui           # Interactive test UI
npm test -- --coverage     # Coverage report
npm test -- <pattern>      # Run specific tests
```
