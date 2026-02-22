# 🌱 SustainIQ – AI-Powered Gamified Quiz Platform

SustainIQ is a modular, production-ready quiz platform built around the **17 UN Sustainable Development Goals (SDGs)**.  
It provides an engaging quiz experience with AI-generated explanations to promote sustainability awareness through gamification.

The platform uses a **React (Vite) frontend** and an **Express.js backend**, with Grok AI integration for educational explanations.

---

## 🚀 Features

### 🧠 Quiz Flow
- Start Quiz → Backend generates **10 random SDG-based questions**
- Navigate questions with progress tracking
- Mandatory answer selection before submission
- Score calculation with percentage result
- SDG badge shown if score ≥ 40%
- Review mode with:
  - Correct vs. incorrect answers
  - AI-generated explanations
  - Visual overlays (green/red)

---

### 🎯 Dynamic Question Generation
- Questions generated from SDG dataset (not hardcoded)
- 10 unique questions per session
- Each question belongs to a different SDG
- 4 options per question (1 correct + 3 distractors)

---

### 🤖 AI Explanations
- Grok API generates educational explanations
- Provider-agnostic service abstraction
- Safe fallback explanations if API key not available

---

### 🔐 Security
- API keys stored in environment variables
- Backend validation before answer processing
- No secrets exposed to frontend

---

## 🏗️ Project Structure
sustainiq/
/frontend # React + Vite
/src
/pages # QuizPage, ScorePage, ReviewPage
/components # ProgressBar, QuestionCard
/state # Context API state management
/api.js # API service layer

/backend # Express.js
/routes # Quiz API routes
/services # Grok AI service abstraction
/data # SDG JSON dataset
/models.js # Question & session models
/index.js # Server entry


---

## 🧩 Architecture

### Clean Separation of Concerns
- **Frontend:** UI rendering, navigation, state, API client
- **Backend:** Quiz generation, scoring, validation, AI explanations
- **API:** REST JSON endpoints
- **Services:** AI abstraction layer (provider swappable)
- **Models:** Shared quiz data structures

---

## ⚙️ Setup & Run

### ✅ Prerequisites
- Node.js (v16+)
- GROK_API_KEY (optional)

---

### 🔹 Backend
```bash
cd backend
npm install
# Create .env and add GROK_API_KEY (optional)
npm start
🔌 API Endpoints
GET /api/quiz/new

Returns a new quiz session with 10 questions.

POST /api/quiz/submit

Submits answers and returns:

Score

Correct count

Per-question result

AI explanations

🧾 Data Models
Question

id

sdgId

text

options

correctOptionId

QuizSession

id

questions

UserAnswer

questionId

selectedOptionId

🎨 Frontend State Management

React Context API

Centralized quiz state and actions

Easily refactorable to Redux if needed

📱 UI Highlights

Minimal and readable UI

Progress tracking bar

Responsive layout

Review overlay colors for correctness

🔮 Future Enhancements

Database persistence (MongoDB/PostgreSQL)

Authentication and user profiles

Leaderboards

Difficulty levels

Timed quiz mode

Analytics dashboard

✅ Production Checklist

Move sessions from memory → database

Add rate limiting

Add logging & monitoring

Enable HTTPS & CORS policies

CI/CD pipeline setup

Test suite (Jest + React Testing Library)

📚 Learning Outcomes

This project demonstrates:

Full stack architecture design

REST API development

AI service abstraction

Context-based state management

Secure API key handling

Modular scalable code structure

👨‍💻 Author

Arun Sankar B

Java Full Stack Developer (Aspiring)

Passionate about scalable backend systems and impactful products
