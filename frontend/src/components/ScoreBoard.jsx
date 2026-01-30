import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../theme/animations'
import { Button } from './Button'
import { Badge } from './Badge'
import Confetti from 'react-confetti'

export function ScoreBoard({ score, correctCount, total, onReview, passed }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      {passed && windowSize.width > 0 && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />
      )}

      <motion.div
        variants={staggerItem}
        className="glass rounded-3xl p-12 max-w-md w-full bg-white/20 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
          >
            <span className="text-6xl font-bold text-white">{score}%</span>
          </motion.div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {passed ? '🎉 Excellent!' : '💪 Good Effort!'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 mb-6">
            You got <strong className="text-primary-600 dark:text-primary-400">{correctCount} out of {total}</strong> correct
          </p>

          {passed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-8"
            >
              <Badge text="Achievement Unlocked" variant="gold" size="lg" />
            </motion.div>
          )}

          <motion.div
            variants={staggerItem}
            className="flex gap-3 flex-col"
          >
            <Button variant="primary" size="lg" onClick={onReview}>
              📖 Review Answers
            </Button>
            <Button variant="secondary" size="lg">
              🔄 Try Again
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
