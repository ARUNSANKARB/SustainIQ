import React, { useEffect } from 'react'
import { useQuizState, useQuizDispatch } from '../state/quizContext'
import { fetchNewQuiz, submitAnswers } from '../api'
import { Button } from '../components/Button'

export default function QuizPage() {
  const state = useQuizState()
  const dispatch = useQuizDispatch()

  useEffect(() => {
    async function load() {
      const data = await fetchNewQuiz()
      dispatch({ type: 'SET_QUIZ', payload: { sessionId: data.sessionId, questions: data.questions } })
    }
    load()
  }, [dispatch])

  const { questions, current, answers, sessionId, result } = state

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (result) {
    const passed = result.score >= 40
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {passed ? 'Great Job! 🎉' : 'Good Try! 💪'}
          </h2>
          <p className="text-5xl font-bold text-green-600 mb-4">{result.score}%</p>
          <p className="text-gray-600 mb-8">
            You got {result.correctCount} out of {result.total} correct
          </p>
          <Button
            onClick={() => {}}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Review Answers
          </Button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const selected = answers[current]

  function onSelect(optionId) {
    dispatch({ type: 'SELECT_ANSWER', payload: { index: current, questionId: q.id, optionId } })
  }

  async function onNext() {
    if (!selected) {
      alert('Please select an answer')
      return
    }
    dispatch({ type: 'GO_NEXT' })
  }

  function onPrev() {
    dispatch({ type: 'GO_PREV' })
  }

  async function onSubmit() {
    if (answers.some(a => a == null)) {
      alert('Please answer all questions')
      return
    }
    const data = await submitAnswers(sessionId, answers)
    dispatch({ type: 'SET_RESULT', payload: data })
    dispatch({ type: 'SET_EXPLANATIONS', payload: data.explanations })
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-white pt-8 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Math.round((current / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{q.text}</h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selected?.selectedOptionId === option.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{option.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          {current > 0 && (
            <Button variant="secondary" onClick={onPrev}>
              ← Previous
            </Button>
          )}
          <div className="flex-1" />
          {current < questions.length - 1 && (
            <Button variant="primary" onClick={onNext}>
              Next →
            </Button>
          )}
          {current === questions.length - 1 && (
            <Button variant="primary" onClick={onSubmit} size="lg">
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
