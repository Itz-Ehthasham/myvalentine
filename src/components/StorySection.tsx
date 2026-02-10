import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Star, Sparkles } from 'lucide-react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const StoryCard = ({ title, content, icon: Icon, delay = 0 }: any) => {
  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -10, rotateY: 5 }}
    >
      <motion.div 
        className="flex items-center justify-center mb-6"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="p-4 bg-gradient-to-r from-valentine-400 to-valentine-500 rounded-full"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="text-white" size={32} />
        </motion.div>
      </motion.div>
      
      <motion.h3 
        className="font-romantic text-2xl sm:text-3xl lg:text-4xl text-gradient text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {title.split(" ").map((word: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block mr-2"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.4 + i * 0.1 }}
            viewport={{ once: true }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
      
      <motion.p 
        className="font-elegant text-base sm:text-lg lg:text-xl text-valentine-700 text-center leading-relaxed px-2"
        initial={{ opacity: 0, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: delay + 0.6 }}
        viewport={{ once: true }}
      >
        {content.split(" ").map((word: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block mr-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.6 + i * 0.05 }}
            viewport={{ once: true }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  )
}

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, prefersReduced ? [0, 0] : [0, 1], prefersReduced ? [0, 0] : [100, -100])
  const opacity = useTransform(scrollYProgress, prefersReduced ? [0, 1] : [0, 0.2, 0.8, 1], prefersReduced ? [1, 1] : [0, 1, 1, 0])

  const stories = [
    {
      title: "From the Moment We Met",
      content: "Time stopped when our eyes first met. In that magical instant, I knew my heart had found its home. Every smile, every laugh, every shared moment since then has been a beautiful chapter in our love story.",
      icon: Heart,
      delay: 0.2
    },
    {
      title: "Every Moment With You",
      content: "You turn ordinary days into extraordinary memories. Your laughter is my favorite melody, your smile my greatest treasure. With you, even the simplest moments become precious gems in the crown of our love.",
      icon: Star,
      delay: 0.4
    },
    {
      title: "You Make My World Brighter",
      content: "Before you, my world was in black and white. You painted it with the most beautiful colors - the pink of your blush, the gold of your heart, the sparkle in your eyes that lights up my entire universe.",
      icon: Sparkles,
      delay: 0.6
    }
  ]

  return (
    <section ref={containerRef} className="relative py-20 px-4 min-h-screen">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y, opacity }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Heart className="text-valentine-300" size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-romantic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
          >
            {"Our Love Story".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, rotateX: -90, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className="font-elegant text-lg sm:text-xl lg:text-2xl text-valentine-600 max-w-xs sm:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {"Every love story is beautiful, but ours is my favorite".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {stories.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {!prefersReduced && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <div className="w-2 h-2 bg-valentine-400 rounded-full animate-sparkle"></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default StorySection