import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { slowFloat } from '../lib/motion'

const FloatingHearts = () => {
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

  if (prefersReduced) return null

  // avoid heavy animations on small viewports
  if (windowSize.width && windowSize.width < 520) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(10)].map((_, i) => {
        const left = Math.random() * (windowSize.width || 1200)
        const size = Math.random() * 22 + 12
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: left, y: (windowSize.height || 800) + 80, scale: 0, rotate: 0 }}
            animate={{ y: -120, scale: [0, 1, 0], rotate: 360, x: left + (Math.random() * 40 - 20) }}
            transition={{ ...slowFloat, duration: Math.random() * 8 + 10, delay: Math.random() * 5 }}
          >
            <Heart className="text-valentine-300 opacity-30 drop-shadow-sm" size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingHearts