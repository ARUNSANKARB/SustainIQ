import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ProgressBar({ current, total }) {
  const [displayValue, setDisplayValue] = useState(0)
  const progress = ((current + 1) / total) * 100

  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(progress), 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Question {current + 1} of {total}
        </span>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-xs font-bold text-primary-600 dark:text-primary-400"
        >
          {Math.round(displayValue)}%
        </motion.span>
      </div>
      
      <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}
