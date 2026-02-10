import { useEffect, useState } from 'react'

export default function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    setReduced(mq.matches)
    if ('addEventListener' in mq) {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    } else {
      // Fallback for older browsers
      (mq as any).addListener(onChange)
      return () => (mq as any).removeListener(onChange)
    }
  }, [])

  return reduced
}
