import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const InteractiveSection = () => {
  const [isHovering, setIsHovering] = useState(false)
  const prefersReduced = usePrefersReducedMotion()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (prefersReduced) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, prefersReduced])

  return (
    <section className="relative py-16 sm:py-20 px-4 min-h-screen bg-gradient-to-b from-valentine-100 to-valentine-200">
      {/* Cursor Follower (disabled for accessibility) */}
      {!prefersReduced && (
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: 360
          }}
          transition={{
            scale: { duration: 0.3 },
            rotate: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
        >
          <Heart className="text-valentine-500" size={24} />
        </motion.div>
      </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-romantic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
          >
            {"Interactive Love".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className="font-elegant text-lg sm:text-xl lg:text-2xl text-valentine-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {"Move your cursor around and feel the magic".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            { title: "Our First Date", content: "That magical evening when everything felt perfect" },
            { title: "Shared Dreams", content: "Building castles in the air, together" },
            { title: "Quiet Moments", content: "Finding peace in each other's presence" },
            { title: "Future Together", content: "All the adventures waiting for us" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-6 sm:p-8 cursor-pointer group relative overflow-hidden"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)"
              }}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.h3 
                  className="font-romantic text-xl sm:text-2xl lg:text-3xl text-gradient"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {item.title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h3>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Sparkles className="text-valentine-400 group-hover:text-valentine-500" size={24} />
                </motion.div>
              </div>
              <motion.p 
                className="font-elegant text-sm sm:text-base lg:text-lg text-valentine-700 group-hover:text-valentine-800 transition-colors leading-relaxed"
                initial={{ opacity: 0, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                {item.content.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 + 0.4 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
              
              {/* Hover Hearts */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, y: 0 }}
                    animate={{ scale: [0, 1, 0], y: -50 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity
                    }}
                  >
                    <Heart className="text-valentine-400" size={12} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InteractiveSection