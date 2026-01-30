import React, { useState } from 'react'
import { QuizProvider, useQuizState } from './state/quizContext'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ReviewPage from './pages/ReviewPage'

function AppContent() {
  const [showQuiz, setShowQuiz] = useState(false)
  const { result } = useQuizState()

  return (
    <div className="bg-white min-h-screen">
      {result ? (
        <ReviewPage onBackHome={() => {
          setShowQuiz(false)
          window.location.reload()
        }} />
      ) : !showQuiz ? (
        <HomePage onStartQuiz={() => setShowQuiz(true)} />
      ) : (
        <QuizPage />
      )}
    </div>
  )
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  )
}

