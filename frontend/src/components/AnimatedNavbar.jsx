import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, hoverScale } from '../theme/animations'

export function AnimatedNavbar({ scrolled }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled 
          ? 'glass-dark bg-dark-bg/80 backdrop-blur-lg border-b border-slate-700/30'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            {...hoverScale}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">♻</span>
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">SustainIQ</span>
          </motion.div>

          <motion.div className="flex gap-6 items-center">
            <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
              Features
            </a>
            <a href="#leaderboard" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
              Leaderboard
            </a>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
