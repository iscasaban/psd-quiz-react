# PSD I Quiz Application

A React-based quiz application for Professional Scrum Developer I (PSD I) certification practice, featuring 305 questions with both exam and practice modes.

The questions used on this app are extracted from [Ditectrev](https://github.com/Ditectrev/Scrum-Developer-I-PSD-I-Practice-Tests-Exams-Questions-Answers).
This is a project created merely for educational purposes, as I was bored studying for the PSD I certification. Spoiler: [I passed!](https://www.credly.com/badges/c635a845-2f48-42e9-be6d-464075379c64) 🎉😊

## Features

- **Exam Mode**: 80 randomly selected questions from the full question bank
- **Practice Mode**: Select specific question ranges for targeted study
- **Interactive UI**: Material-UI components with responsive design
- **Persistent Navigation**: Navbar with quick access to all modes from any screen
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
├── components/              # Reusable UI components
│   ├── Footer.tsx              # App footer
│   ├── Footer.test.tsx         # Footer tests
│   ├── HeroContent.tsx         # Landing page hero text
│   ├── ModeSelector.tsx        # Exam/Practice mode buttons
│   ├── Navbar.tsx              # Persistent navigation bar
│   ├── Navbar.test.tsx         # Navbar tests
│   ├── QuestionCard.tsx        # Question display with answer options
│   ├── QuestionCard.test.tsx   # QuestionCard tests
│   ├── QuizNavigation.tsx      # Previous/Next controls
│   ├── QuizProgress.tsx        # Progress indicator
│   ├── RangeSelector.tsx       # Question range selection grid
│   ├── ResultsModal.tsx        # Results summary modal
│   └── ResultsModal.test.tsx   # ResultsModal tests
├── screens/                 # Screen-level components
│   ├── AboutScreen.tsx         # About page
│   ├── AboutScreen.test.tsx    # AboutScreen tests
│   ├── LandingScreen.tsx       # Mode selection
│   ├── QuizScreen.tsx          # Main quiz interface
│   └── RangeSelectionScreen.tsx # Practice mode range picker
├── hooks/                   # Custom React hooks
│   ├── useNavigation.ts        # Screen navigation state
│   ├── useNavigation.test.ts   # Navigation hook tests
│   ├── useQuestions.ts         # Context hook for questions
│   ├── useQuizState.ts         # Quiz state management
│   └── useQuizState.test.ts    # Quiz state tests
├── context/                 # React Context providers
│   └── QuestionContext.tsx     # Question data provider
├── utils/                   # Utility functions
│   ├── parseMarkdown.ts        # Question parsing logic
│   └── parseMarkdown.test.ts   # Parser tests
├── data/                    # Static data
│   └── answers.md              # Question bank (305 questions)
├── theme/                   # MUI theme configuration
│   └── theme.ts                # Custom theme settings
├── types/                   # TypeScript type definitions
│   ├── navigation.ts           # Navigation types
│   └── quiz.ts                 # Quiz-related types
├── test/                    # Test configuration
│   └── setup.ts                # Vitest setup with jest-dom
└── App.tsx                  # Main application component
```

## Question Format

Questions are stored in Markdown format (`src/data/answers.md`):

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

The application uses custom hooks for state management:

| Hook            | Purpose                                                                    |
|-----------------|----------------------------------------------------------------------------|
| `useNavigation` | Screen transitions (landing, range-selection, quiz, results, about)        |
| `useQuizState`  | Quiz logic: questions, current index, answers, mode                        |
| `useQuestions`  | Access to parsed questions from context                                    |

- **QuestionContext**: Loads and parses questions from markdown at app startup
- **Local State**: Component-specific state using standard React hooks

## Architecture

### Quiz Modes
- **Exam Mode**: 80 randomly shuffled questions, immediate start
- **Practice Mode**: User-selected question ranges, optional answer checking

### Navigation Flow

The app features a persistent navbar visible on all screens with links to Home, Exam, Practice, and About.

```
┌─────────────────────────────────────────────────────────────┐
│                    Navbar (always visible)                  │
│              Home | Exam | Practice | About                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Landing ──┬── Exam ─────────────────┬──► Quiz ──► Results │
│             │                         │                     │
│             └── Practice ──► Range ───┘                     │
│                              Selection                      │
│                                                             │
│   About (standalone page)                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    Footer (always visible)                  │
└─────────────────────────────────────────────────────────────┘
```

- **Home**: Returns to landing screen and resets quiz state
- **Exam**: Starts exam mode immediately with 80 random questions
- **Practice**: Goes to range selection screen
- **About**: Displays information about the app

### State Flow
1. Questions loaded from markdown and parsed via context
2. Mode selection initializes appropriate question set
3. Quiz state tracks current question, user answers, and progress
4. Results calculated and displayed upon completion

## Testing

The project uses Vitest with React Testing Library. Current test coverage:

| Module          | Tests | Coverage                                     |
|-----------------|-------|----------------------------------------------|
| `useQuizState`  | 25    | Exam/practice modes, navigation, answers     |
| `QuestionCard`  | 21    | Single/multi-select, practice mode, feedback |
| `ResultsModal`  | 11    | Score calculation, pass/fail, interactions   |
| `Navbar`        | 10    | Navigation links, mobile menu, click handlers|
| `useNavigation` | 5     | Screen transitions                           |
| `parseMarkdown` | 4     | Question parsing, edge cases                 |
| `AboutScreen`   | 3     | Heading, content, semantic structure         |
| `Footer`        | 2     | Content rendering, semantic structure        |

**Total: 81 tests**

### Test Commands
```bash
npm test                    # Run all tests (watch mode)
npm test -- --run          # Run tests once
npm test -- --ui           # Interactive test UI
npm test -- --coverage     # Coverage report
npm test -- <pattern>      # Run specific test files
```
