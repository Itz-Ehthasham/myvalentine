import type { Transition } from 'framer-motion'

export const gentle: Transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
export const slowFloat: Transition = { duration: 6, ease: 'easeInOut', repeat: Infinity }
export const heartbeat: Transition = { duration: 1.4, ease: [0.2, 0.8, 0.2, 1], repeat: Infinity }

export const stagger = (staggerChildren = 0.06) => ({
  staggerChildren,
  delayChildren: 0.1
})
