import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart, Sparkles, Star } from 'lucide-react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const Confetti = ({ show }: { show: boolean }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  if (!show || prefersReduced) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (windowSize.width || 1200),
            y: -10,
            rotate: 0,
            scale: 0
          }}
          animate={{
            y: (windowSize.height || 800) + 100,
            rotate: Math.random() * 720,
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        >
          <Heart 
            className="text-valentine-500" 
            size={Math.random() * 20 + 10} 
          />
        </motion.div>
      ))}
    </div>
  )
}

const ProposalSection = () => {
  const [hasAnswered, setHasAnswered] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleYes = () => {
    setHasAnswered(true)
    setShowConfetti(true)
    
    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-valentine-200 via-valentine-300 to-valentine-400">
      <Confetti show={showConfetti} />
      
      {/* Background Spotlight Effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-valentine-500/20 to-valentine-600/40"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!hasAnswered ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
            >
              {/* Dramatic Pause Animation */}
              <motion.div
                className="mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="text-valentine-600 mx-auto mb-6 sm:mb-8" size={60} />
                </motion.div>
              </motion.div>

              {/* The Big Question */}
              <motion.div className="mb-8 sm:mb-12">
                <motion.h1
                  className="font-romantic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 drop-shadow-lg leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {"Will You Be My".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-3 sm:mr-4"
                      initial={{ opacity: 0, rotateX: -90, y: 50 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      transition={{ duration: 0.8, delay: 2 + i * 0.2, type: "spring" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.h1
                  className="font-romantic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.5, delay: 2.8, type: "spring", bounce: 0.4 }}
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(236, 72, 153, 0.5)",
                        "0 0 40px rgba(236, 72, 153, 0.8)",
                        "0 0 60px rgba(236, 72, 153, 1)",
                        "0 0 40px rgba(236, 72, 153, 0.8)",
                        "0 0 20px rgba(236, 72, 153, 0.5)"
                      ],
                      color: ["#ffffff", "#fce7f3", "#f9a8d4", "#fce7f3", "#ffffff"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {"Valentine?".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 100, rotateZ: -180 }}
                        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                        transition={{ duration: 0.6, delay: 3 + i * 0.1, type: "spring", bounce: 0.6 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Answer Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
              >
                <motion.button
                  onClick={handleYes}
                  type="button"
                  aria-label="Answer yes to the proposal"
                  className="group relative focus-ring px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-valentine-500 to-valentine-600 text-white font-bold text-xl sm:text-2xl rounded-full shadow-2xl w-full sm:w-auto"
                  initial={{ opacity: 0, x: -50, rotateY: -90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 4.2, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="flex items-center justify-center gap-3"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 20px rgba(255,255,255,0.8)",
                        "0 0 0px rgba(255,255,255,0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {"YES".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 4.4 + i * 0.1 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    <span className="text-2xl">💖</span>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart className="animate-heartbeat" size={28} />
                    </motion.div>
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-valentine-400 to-valentine-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </motion.button>

                <motion.button
                  onClick={handleYes}
                  type="button"
                  aria-label="Answer no to the proposal"
                  className="group relative focus-ring px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg sm:text-2xl rounded-full shadow-2xl w-full sm:w-auto"
                  initial={{ opacity: 0, x: 50, rotateY: 90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 4.4, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(244, 114, 182, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="flex items-center justify-center gap-2 sm:gap-3"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 15px rgba(255,255,255,0.6)",
                        "0 0 0px rgba(255,255,255,0)"
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {"YES, OBVIOUSLY".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 4.6 + i * 0.2 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                    <span className="text-2xl">💕</span>
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="animate-sparkle" size={28} />
                    </motion.div>
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              {/* Celebration Message */}
              <motion.div
                className="mb-6 sm:mb-8"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="text-yellow-400 mx-auto mb-4" size={80} />
              </motion.div>

              <motion.h2
                className="font-romantic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 drop-shadow-lg leading-tight"
                animate={{
                  textShadow: [
                    "0 0 30px rgba(255, 255, 255, 0.8)",
                    "0 0 60px rgba(255, 255, 255, 1)",
                    "0 0 30px rgba(255, 255, 255, 0.8)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {"You just made me the".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br className="hidden sm:block" />
                {"happiest person alive!".split(" ").map((word, i) => (
                  <motion.span
                    key={i + 10}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, scale: 0, rotateZ: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.15, type: "spring", bounce: 0.6 }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-4xl sm:text-6xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💕
                </motion.span>
              </motion.h2>

              <motion.p
                className="font-elegant text-lg sm:text-2xl lg:text-3xl text-valentine-100 mb-8 sm:mb-12 max-w-xs sm:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {"This is the beginning of our most beautiful chapter together. I love you more than words can express!".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-2xl sm:text-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </motion.p>

              {/* Floating Elements */}
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    <Heart className="text-valentine-300" size={Math.random() * 30 + 20} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProposalSection