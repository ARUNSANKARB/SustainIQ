import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { expandCollapse } from '../theme/animations'

export function AIExplanationPanel({ explanation, isCorrect, userAnswer, correctAnswer }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-3">
      <div className={`
        rounded-xl p-4 border-2 transition-all
        ${isCorrect
          ? 'bg-green-50/50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
          : 'bg-red-50/50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
        }
      `}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
          <span className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? 'Correct!' : 'Not quite'}
          </span>
        </div>

        {!isCorrect && (
          <div className="mb-2 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>Your answer:</strong> {userAnswer}</div>
            <div className="mt-1"><strong>Correct answer:</strong> {correctAnswer}</div>
          </div>
        )}

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline"
        >
          {isExpanded ? '▼ Hide' : '▶ Show'} AI Explanation
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            {...expandCollapse}
            className="glass rounded-xl p-4 bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/30"
          >
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              {explanation}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>🤖</span>
              <span>AI-generated explanation</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
