# SustainIQ - AI-Powered Gamified Quiz Platform

A modular, production-ready quiz platform focused on the 17 UN Sustainable Development Goals (SDGs). Built with React (Vite) frontend and Express.js backend with AI-generated explanations via Grok API.

---

## Project Structure

```
sustainiq/
  /frontend          # React + Vite
    /src
      /pages         # QuizPage, ScorePage, ReviewPage
      /components    # ProgressBar, QuestionCard
      /state         # Context API for state
      /api.js        # API service layer
    /index.html
    /package.json
    /vite.config.js
    /README.md
  
  /backend           # Express.js
    /routes          # Quiz API routes
    /services        # Grok AI service abstraction
    /data            # SDG data (JSON)
    /models.js       # Question, Option, QuizSession, UserAnswer
    /index.js        # Server entry
    /.env.example
    /package.json
    /README.md
```

---

## Architecture

### Clean Separation of Concerns

- **Frontend**: UI, React state, navigation, API client layer. No business logic.
- **Backend**: Quiz generation, scoring, validation, AI explanations. No UI.
- **API**: REST JSON endpoints only.
- **Models**: Shared data structure definitions (Question, Option, QuizSession, UserAnswer).
- **Services**: AI service abstraction (provider-agnostic) with fallback handling.

### Security

- API keys (GROK_API_KEY) read from environment, never exposed to frontend.
- No secrets in code or frontend.
- Validation on backend before processing answers.

---

## Features

### Quiz Flow

1. **Start Quiz** → Backend generates 10 random SDG-based questions.
2. **Quiz Page** → Navigate questions, select answers, progress bar shows position.
3. **Submit** → Last question's "Next" becomes "Submit" (must answer all questions).
4. **Score Page** → Shows percentage. If ≥40%, displays SDG badge + "Review Answers" button.
5. **Review Mode** → Shows user's answer vs. correct answer with AI-generated explanation.
   - Green overlay for correct answers.
   - Red overlay for incorrect answers.

### Dynamic Question Generation

Questions are generated from SDG data (not hardcoded):
- 10 unique questions per quiz.
- Each from a different SDG (to prevent repetition).
- Questions include 4 options: 1 correct, 3 distractors.
- Grok API generates educational explanations (with fallback).

---

## Setup & Run

### Prerequisites

- Node.js (v16+)
- GROK_API_KEY (optional, fallback works without it)

### Backend

```bash
cd backend
npm install
# Create .env file and set GROK_API_KEY (or skip, fallback will be used)
npm start
```

Server runs on `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173` (proxies /api to backend)

---

## API Endpoints

### GET `/api/quiz/new`

Returns a new quiz session with 10 questions.

**Response:**
```json
{
  "sessionId": "12345",
  "questions": [
    {
      "id": 1,
      "sdgId": 1,
      "text": "Which statement best describes...",
      "options": [
        { "id": 1, "text": "Option A" },
        { "id": 2, "text": "Option B" },
        { "id": 3, "text": "Option C" },
        { "id": 4, "text": "Option D" }
      ]
    }
  ]
}
```

### POST `/api/quiz/submit`

Submits answers and receives score with explanations.

**Request:**
```json
{
  "sessionId": "12345",
  "answers": [
    { "questionId": 1, "selectedOptionId": 2 },
    ...
  ]
}
```

**Response:**
```json
{
  "score": 70,
  "correctCount": 7,
  "total": 10,
  "perQuestion": [
    {
      "questionId": 1,
      "questionText": "...",
      "selectedOptionId": 2,
      "selectedText": "Option B",
      "correctOptionId": 1,
      "correctText": "Option A",
      "isCorrect": false,
      "sdg": { "id": 1, "title": "No Poverty", "description": "..." }
    }
  ],
  "explanations": [
    { "questionId": 1, "explanation": "Option A is correct because..." }
  ]
}
```

---

## AI Explanations (Grok Service)

The backend abstracts AI logic so providers can be swapped:

- If `GROK_API_KEY` is set: Uses Grok API to generate explanations.
- If not set: Returns a safe, fallback explanation.

**Service Location:** `backend/services/grokService.js`

To integrate a different AI provider, modify only this service layer.

---

## Data Model

### Question
- `id`: unique question ID
- `sdgId`: SDG reference
- `text`: question text
- `options`: array of Option objects
- `correctOptionId`: ID of the correct option

### Option
- `id`: unique option ID
- `text`: option text

### QuizSession
- `id`: unique session ID
- `questions`: array of Questions

### UserAnswer
- `questionId`: which question
- `selectedOptionId`: user's choice

---

## State Management (Frontend)

Uses React Context API:
- `quizContext.jsx`: Central state for quiz flow, answers, results, explanations.
- Actions: `SET_QUIZ`, `SELECT_ANSWER`, `GO_NEXT`, `GO_PREV`, `SET_RESULT`, `SET_EXPLANATIONS`

No Redux needed for this scope, but easily refactorable.

---

## Visual Design

- Clean, minimal UI focused on readability.
- Progress bar updates as user navigates.
- Overlay colors (green/red) on review cards with 30% opacity to preserve text readability.
- Responsive flexbox layout.

---

## Future Extensions

- Persist sessions to a database (replace in-memory map in `routes/quiz.js`).
- Add user authentication and profiles.
- Leaderboards.
- Difficulty levels.
- Time-based modes.
- Integration with a larger learning platform.

---

## Assumptions

- Questions are in-memory (demo only). Replace with a database for production.
- Grok API key is optional (fallback explanations work).
- 10 questions per quiz is fixed.
- No global routing or auth (assumed to be embedded into a larger platform).

---

## Production Checklist

- [ ] Move in-memory sessions to a database (MongoDB, PostgreSQL, etc.).
- [ ] Add input validation and sanitization.
- [ ] Add rate limiting on quiz endpoints.
- [ ] Add logging and monitoring.
- [ ] Deploy backend to cloud (AWS, Azure, GCP).
- [ ] Deploy frontend to CDN or static host.
- [ ] Add HTTPS and CORS policies.
- [ ] Set up CI/CD pipeline.
- [ ] Add test suite (Jest, React Testing Library).
