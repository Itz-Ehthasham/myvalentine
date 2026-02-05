import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

const FloatingHearts = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (windowSize.width || 1200),
            y: (windowSize.height || 800) + 100,
            scale: 0,
            rotate: 0
          }}
          animate={{
            y: -100,
            scale: [0, 1, 0],
            rotate: 360,
            x: Math.random() * (windowSize.width || 1200)
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <Heart 
            className="text-valentine-300 opacity-30" 
            size={Math.random() * 25 + 15} 
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts