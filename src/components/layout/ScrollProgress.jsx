import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export const ScrollProgress = () => {
  const progress = useScrollProgress()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, #00a8e8, #a6fff3, #20cfc8)',
        boxShadow: '0 0 12px rgba(0,168,232,0.6)',
      }}
    />
  )
}
