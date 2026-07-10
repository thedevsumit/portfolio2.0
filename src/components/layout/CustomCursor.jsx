import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore } from '../../store/useUIStore'
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const CustomCursor = () => {
  const variant = useUIStore((s) => s.cursorVariant)
  const isCoarse = useIsCoarsePointer()
  const reduced = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 22, stiffness: 200, mass: 0.6 })
  const ringY = useSpring(y, { damping: 22, stiffness: 200, mass: 0.6 })

  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (isCoarse || reduced) return
    let visible = false
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) {
        visible = true
        if (dotRef.current) dotRef.current.style.opacity = 1
        if (ringRef.current) ringRef.current.style.opacity = 1
      }
    }
    const onLeave = () => {
      visible = false
      if (dotRef.current) dotRef.current.style.opacity = 0
      if (ringRef.current) ringRef.current.style.opacity = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [isCoarse, reduced, x, y])

  if (isCoarse || reduced) return null

  const variants = {
    default: { w: 28, h: 28, opacity: 0.6, label: null },
    hover: { w: 48, h: 48, opacity: 0.9, label: null },
    view: { w: 92, h: 92, opacity: 1, label: 'VIEW' },
    open: { w: 92, h: 92, opacity: 1, label: 'OPEN' },
    drag: { w: 70, h: 70, opacity: 0.95, label: 'DRAG' },
    send: { w: 92, h: 92, opacity: 1, label: 'SEND' },
  }
  const cfg = variants[variant] || variants.default

  return (
    <>
      <motion.div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x, y, opacity: 0 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-mint-500" />
      </motion.div>
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
          width: cfg.w,
          height: cfg.h,
          opacity: 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      >
        <div
          className="w-full h-full rounded-full border flex items-center justify-center"
          style={{
            borderColor: `rgba(166, 255, 243, ${cfg.opacity})`,
            background: cfg.label ? 'rgba(0,168,232,0.08)' : 'transparent',
            backdropFilter: cfg.label ? 'blur(2px)' : 'none',
          }}
        >
          {cfg.label && (
            <span className="text-[10px] font-mono font-bold tracking-widest text-mint-500">
              {cfg.label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  )
}
