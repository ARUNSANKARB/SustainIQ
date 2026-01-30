import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '../theme/animations'
import { Button } from './Button'

export function HeroSection({ onStartQuiz }) {
  const fullText = "Learn Sustainability. Play Smart. Change the World."
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="relative min-h-screen bg-gradient-eco flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div variants={staggerItem}>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {displayedText}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span>
          </h1>
        </motion.div>

        <motion.p variants={staggerItem} className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
          Master the 17 UN Sustainable Development Goals through AI-powered quizzes. Earn badges, compete, and make real impact.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={onStartQuiz}
            className="font-bold text-lg"
          >
            🚀 Start Quiz
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerItem}
          className="mt-16 grid grid-cols-3 gap-8 text-white"
        >
          <div>
            <div className="text-4xl font-bold">10</div>
            <div className="text-primary-100">Questions</div>
          </div>
          <div>
            <div className="text-4xl font-bold">17</div>
            <div className="text-primary-100">SDGs</div>
          </div>
          <div>
            <div className="text-4xl font-bold">∞</div>
            <div className="text-primary-100">Impact</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
