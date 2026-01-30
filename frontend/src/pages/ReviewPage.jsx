import React, { useState } from 'react'
import { useQuizState } from '../state/quizContext'
import { Button } from '../components/Button'

export default function ReviewPage({ onBackHome }) {
  const { result, explanations } = useQuizState()
  const [expandedId, setExpandedId] = useState(null)

  if (!result) return null

  return (
    <div className="min-h-screen bg-white pt-8 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Answers</h1>
        <p className="text-gray-600 mb-8">Learn from each question</p>

        <div className="space-y-4">
          {result.perQuestion.map((pq, idx) => {
            const expl = explanations.find(e => e.questionId === pq.questionId)?.explanation || ''
            const isExpanded = expandedId === pq.questionId
            const isCorrect = pq.isCorrect

            return (
              <div
                key={pq.questionId}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : pq.questionId)}
                  className="w-full px-4 py-4 text-left hover:bg-gray-50 border-b"
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Question {idx + 1}</p>
                      <p className="text-gray-700 text-sm mt-1">{pq.questionText}</p>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 py-4 bg-gray-50 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Your Answer:</p>
                      <p className="text-gray-900">{pq.selectedText || 'Not answered'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700">Correct Answer:</p>
                      <p className="text-gray-900">{pq.correctText}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Explanation:</p>
                      <p className="text-gray-700 text-sm">{expl}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={onBackHome}
            variant="primary"
            size="lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
