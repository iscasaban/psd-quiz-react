# PSD I Quiz Application

A React-based quiz application for Professional Scrum Developer I (PSD I) certification practice, featuring 305 questions with both exam and practice modes.

The questions used on this app are extracted from [Ditectrev](https://github.com/Ditectrev/Scrum-Developer-I-PSD-I-Practice-Tests-Exams-Questions-Answers).
This is a project created merely for educational purposes, as I was bored studying for the PSD I certification. Spoiler: [I passed!](https://www.credly.com/badges/c635a845-2f48-42e9-be6d-464075379c64) 🎉😊

## Features

- **Exam Mode**: 80 randomly selected questions from the full question bank with a 60-minute timer and visual warning when time is running low
- **Session Persistence**: Exam progress is saved to local storage, allowing you to resume if you accidentally close the browser
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

## Architecture

### Quiz Modes
- **Exam Mode**: 80 randomly shuffled questions with 60-minute timer; session persisted to local storage for recovery
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
   - In Exam mode, checks for existing session in local storage to allow recovery
3. Quiz state tracks current question, user answers, and progress
   - Exam mode persists state to local storage on each interaction
4. Results calculated and displayed upon completion or timer expiration

## Testing

The project uses Vitest with React Testing Library.

### Test Commands
```bash
npm test                    # Run all tests (watch mode)
npm test -- --run          # Run tests once
npm test -- --ui           # Interactive test UI
npm test -- --coverage     # Coverage report
npm test -- <pattern>      # Run specific test files
```
