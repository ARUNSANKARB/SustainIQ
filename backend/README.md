SustainIQ Backend

Run:

```
cd backend
npm install
# set environment variable GROK_API_KEY in environment or .env
npm start
```

Endpoints:
- GET /api/quiz/new -> { sessionId, questions }
- POST /api/quiz/submit -> { sessionId, answers } -> returns score and explanations

GROK API:
- The server reads `GROK_API_KEY` from environment variables.
- If not present, a safe fallback explanation is returned.
