import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerItem } from '../theme/animations'

export default function QuestionCard({ question, selectedOptionId, onSelect }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="glass rounded-2xl p-8 backdrop-blur-lg bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-slate-700/30"
    >
      <motion.h2
        variants={staggerItem}
        className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 leading-tight"
      >
        {question.text}
      </motion.h2>

      <motion.div
        className="space-y-3"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        {question.options.map((option, idx) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={`
              w-full p-4 rounded-xl text-left font-semibold transition-all duration-300
              border-2 cursor-pointer
              ${selectedOptionId === option.id
                ? 'glass bg-primary-100/30 dark:bg-primary-900/40 border-primary-500 dark:border-primary-400 text-primary-900 dark:text-primary-100'
                : 'bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-primary-50/50 dark:hover:bg-primary-900/20 hover:border-primary-400 dark:hover:border-primary-600'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm
                ${selectedOptionId === option.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300'
                }
              `}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span>{option.text}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}
