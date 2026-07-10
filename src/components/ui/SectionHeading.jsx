import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { fadeUp, staggerParent } from '../../styles/motion'

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  badge,
}) => {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn('flex flex-col gap-4 max-w-3xl', alignClass, className)}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="section-eyebrow">
          <span className="inline-block w-8 h-px bg-cyan-500" />
          {eyebrow}
        </motion.div>
      )}
      {badge && (
        <motion.div variants={fadeUp} className="chip self-start">
          {badge}
        </motion.div>
      )}
      {title && (
        <motion.h2 variants={fadeUp} className="section-title text-balance">
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-muted text-pretty max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
