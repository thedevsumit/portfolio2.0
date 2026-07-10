import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../../store/useUIStore'

const lines = [
  'initializing portfolio...',
  'loading experience',
  'mounting scenes',
  'connecting nodes',
  'ready',
]

export const Loader = () => {
  const appReady = useUIStore((s) => s.appReady)
  const setAppReady = useUIStore((s) => s.setAppReady)
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    
    const timers = lines.map((_, i) =>
      setTimeout(() => setStep(i + 1), 240 + i * 180),
    )
    
    const finish = setTimeout(() => setAppReady(true), 240 + lines.length * 180 + 280)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
  }, [setAppReady])

  
  useEffect(() => {
    if (appReady) {
      const t = setTimeout(() => setMounted(false), 900)
      return () => clearTimeout(t)
    }
  }, [appReady])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!appReady ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[var(--bg-page)] flex items-center justify-center noise-overlay"
          role="status"
          aria-live="polite"
        >
          <div className="glow-blob" style={{ width: '60vmax', height: '60vmax', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center gap-3 font-mono text-5xl md:text-6xl font-bold"
            >
              <motion.span
                animate={{ rotate: [0, -4, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-mint-500"
                style={{ textShadow: '0 0 28px rgba(166,255,243,0.5)' }}
              >
                {'{'}
              </motion.span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="gradient-text"
                style={{ fontSize: '0.7em' }}
              >
                SUMIT
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-cyan-500"
                style={{ textShadow: '0 0 28px rgba(0,168,232,0.5)' }}
              >
                {'}'}
              </motion.span>
            </motion.div>

            <div className="h-6 flex flex-col items-center gap-1">
              <AnimatePresence mode="wait">
                {step < lines.length && (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs font-mono text-muted"
                  >
                    $ {lines[step]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="w-40 h-px bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-cyan-500 to-mint-500"
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="braces"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 30, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            className="font-mono text-6xl font-bold text-mint-500/40"
            style={{ textShadow: '0 0 40px rgba(0,168,232,0.5)' }}
          >
            {'{ }'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
