import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { gentle } from '../lib/motion'

const AnimatedHeart = () => {
  const meshRef = useRef<any>(null)
  const prefersReduced = usePrefersReducedMotion()

  // Lightweight Canvas with DPR clamp and reduced-motion fallback
  if (prefersReduced) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21s-8-4.35-8-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-8 10-8 10z" fill="#ec4899" />
        </svg>
      </div>
    )
  }

  return (
    <Canvas className="w-full h-full" dpr={Math.min(window.devicePixelRatio || 1, 1.5)}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial color="#ec4899" metalness={0.2} roughness={0.4} transparent opacity={0.95} />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} enablePan={false} />
    </Canvas>
  )
}

const HeroSection = () => {
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

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * (windowSize.width || 1200),
                y: Math.random() * (windowSize.height || 800),
                scale: 0 
              }}
              animate={{ 
                y: [null, -100, null],
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Heart className="text-valentine-400" size={Math.random() * 20 + 10} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* 3D Heart */}
        <motion.div className="w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ scale: 1, rotateY: 360 }}
          transition={{ ...gentle, duration: 1.6 }}
        >
          <AnimatedHeart />
        </motion.div>

        {/* Main Title */}
        <motion.div className="text-center">
          <motion.h1
            className="font-romantic text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gradient mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.4 }}
          >
            {"Will You Be My".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.h1
            className="font-romantic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-gradient mb-6 sm:mb-8 animate-heartbeat"
            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 2, delay: 1.5, type: "spring", bounce: 0.3 }}
          >
            {"Valentine?".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  color: ["#ec4899", "#db2777", "#be185d", "#ec4899"]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.8 + i * 0.1,
                  ...(prefersReduced ? {} : { color: { duration: 2, repeat: Infinity } })
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-elegant text-lg sm:text-xl md:text-2xl lg:text-3xl text-valentine-700 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto px-4 text-center leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          {"A journey through our love story awaits...".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 2.5 + i * 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA Button */}
        <motion.div className="flex justify-center">
          <motion.button
            onClick={scrollToNext}
            type="button"
            aria-label="Start the journey"
            className="group relative focus-ring px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-valentine-500 to-valentine-600 text-white font-semibold rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 3, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="flex items-center gap-2"
              animate={prefersReduced ? undefined : { 
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={prefersReduced ? { duration: 0 } : { duration: 2, repeat: Infinity }}
            >
              {"Start the Journey".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 3.2 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.div
                animate={prefersReduced ? {} : { rotate: 360, scale: [1, 1.2, 1] }}
                transition={prefersReduced ? { duration: 0 } : { duration: 2, repeat: Infinity }}
              >
                <Sparkles className="animate-sparkle" size={20} />
              </motion.div>
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-valentine-400 to-valentine-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-valentine-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-valentine-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection