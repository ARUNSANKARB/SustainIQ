import React from 'react'
import { Button } from '../components/Button'

export default function HomePage({ onStartQuiz }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4">SustainIQ</h1>
        <p className="text-lg text-gray-700 mb-2">
          Learn about the 17 UN Sustainable Development Goals
        </p>
        <p className="text-gray-500 mb-8">
          Test your knowledge with interactive quizzes and AI-powered explanations
        </p>
        
        <Button
          onClick={onStartQuiz}
          variant="primary"
          size="lg"
          className="w-full mb-8"
        >
          Start Quiz
        </Button>
        
        <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
          <div>
            <p className="font-semibold text-gray-900">📝 10 Questions</p>
            <p className="text-sm text-gray-600">Diverse SDG topics</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">💡 4 Options Each</p>
            <p className="text-sm text-gray-600">Multiple choice format</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">🤖 AI Explanations</p>
            <p className="text-sm text-gray-600">Learn from every answer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
