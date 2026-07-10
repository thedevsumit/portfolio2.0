import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const BrandMark = ({ className = '', small = false }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className={cn(
      'relative inline-flex items-center font-mono font-bold tracking-wider',
      small ? 'text-sm gap-1' : 'text-base gap-2',
      className,
    )}
  >
    <motion.span
      aria-hidden
      animate={{ rotate: [0, -3, 3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="text-mint-500"
    >
      {'{'}
    </motion.span>
    <span className="gradient-text">SUMIT</span>
    <motion.span
      aria-hidden
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="text-cyan-500"
    >
      {'}'}
    </motion.span>
  </motion.span>
)
