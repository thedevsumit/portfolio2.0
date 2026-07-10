import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Code2, Sparkles } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { AnimatedCounter } from '../../components/ui/AnimatedCounter'
import { useInView } from '../../hooks/useInView'
import { education } from '../../data/education'
import { fadeUp, staggerParent } from '../../styles/motion'

const EducationIllustration = () => (
  <div className="relative w-full aspect-square max-w-[480px] mx-auto">
    <svg
      viewBox="0 0 480 480"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="laptopGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00a8e8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a6fff3" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20cfc8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00a8e8" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a6fff3" />
          <stop offset="100%" stopColor="#00a8e8" />
        </linearGradient>
        <radialGradient id="bgGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00a8e8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00a8e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {}
      <circle cx="240" cy="240" r="200" fill="url(#bgGlow)" />

      {}
      <ellipse cx="240" cy="240" rx="200" ry="80" stroke="#00a8e8" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="4 6" />
      <ellipse cx="240" cy="240" rx="160" ry="100" stroke="#a6fff3" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2 4" />

      {}
      <motion.path
        d="M 100,300 Q 240,200 380,300"
        stroke="#00a8e8"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {}
      <g transform="translate(80, 300)">
        <motion.g
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <rect x="0" y="0" width="80" height="18" rx="3" fill="url(#bookGrad)" stroke="#00a8e8" strokeWidth="0.6" />
          <rect x="6" y="-18" width="68" height="18" rx="3" fill="url(#bookGrad)" stroke="#a6fff3" strokeWidth="0.6" />
          <rect x="12" y="-36" width="56" height="18" rx="3" fill="url(#bookGrad)" stroke="#20cfc8" strokeWidth="0.6" />
          <line x1="0" y1="9" x2="80" y2="9" stroke="#0a0d14" strokeWidth="0.4" />
          <line x1="6" y1="-9" x2="74" y2="-9" stroke="#0a0d14" strokeWidth="0.4" />
        </motion.g>
      </g>

      {}
      <g transform="translate(170, 180)">
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {}
          <rect x="0" y="0" width="140" height="90" rx="6" fill="url(#laptopGrad)" stroke="#00a8e8" strokeWidth="1" />
          {}
          <motion.line
            x1="10" y1="20" x2="60" y2="20" stroke="#a6fff3" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.line
            x1="20" y1="32" x2="100" y2="32" stroke="#00a8e8" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.line
            x1="20" y1="44" x2="80" y2="44" stroke="#20cfc8" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <motion.line
            x1="10" y1="56" x2="50" y2="56" stroke="#a6fff3" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          {}
          <motion.rect
            x="10" y="65" width="1.5" height="9" fill="#a6fff3"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
          {}
          <path d="M -10,90 L 150,90 L 158,98 L -18,98 Z" fill="#0a0d14" stroke="#00a8e8" strokeWidth="0.8" />
        </motion.g>
      </g>

      {}
      <g transform="translate(340, 130)">
        <motion.g
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-6; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
          <polygon points="0,30 40,15 80,30 40,45" fill="url(#capGrad)" stroke="#a6fff3" strokeWidth="0.8" />
          <rect x="36" y="30" width="8" height="20" fill="#0a0d14" />
          <line x1="40" y1="50" x2="40" y2="60" stroke="#a6fff3" strokeWidth="1" />
          <circle cx="40" cy="62" r="3" fill="#a6fff3" />
        </motion.g>
      </g>

      {}
      <g transform="translate(110, 130)">
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <text x="0" y="0" fontFamily="JetBrains Mono, monospace" fontSize="22" fontWeight="700" fill="#a6fff3" opacity="0.7">{'{ }'}</text>
        </motion.g>
      </g>

      {}
      {[
        { cx: 240, cy: 80, r: 2, delay: 0 },
        { cx: 380, cy: 240, r: 2.5, delay: 0.3 },
        { cx: 240, cy: 400, r: 2, delay: 0.6 },
        { cx: 100, cy: 240, r: 2.5, delay: 0.9 },
        { cx: 360, cy: 380, r: 1.5, delay: 1.2 },
        { cx: 120, cy: 380, r: 1.5, delay: 1.5 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="#a6fff3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0.4, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: p.delay, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}

      {}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      </pattern>
      <rect width="480" height="480" fill="url(#grid)" />
    </svg>
  </div>
)

const TimelineNode = ({ entry, index, isLast }) => {
  const [ref, inView] = useInView({ once: true, amount: 0.3 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (inView) setActive(true)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="relative pl-12 pb-12 last:pb-0"
    >
      {}
      {!isLast && (
        <span
          className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent"
          aria-hidden
        />
      )}

      {}
      <motion.span
        initial={{ scale: 0 }}
        animate={active ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        className="absolute left-0 top-1.5 w-8 h-8 rounded-full border border-cyan-500/40 bg-[var(--bg-card)] flex items-center justify-center"
      >
        <motion.span
          animate={active ? { opacity: [0, 1, 0.4, 1] } : {}}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: 'reverse' }}
          className="w-2 h-2 rounded-full bg-mint-500"
          style={{ boxShadow: '0 0 12px #a6fff3' }}
        />
      </motion.span>

      {}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 hover:border-cyan-500/40 transition-colors">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] tracking-widest text-cyan-500">
            {entry.duration}
          </span>
          <span className="text-[10px] font-mono text-faint">
            {entry.location}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-semibold text-primary">
          {entry.short}
        </h3>
        <p className="text-sm text-muted">
          {entry.degree} · {entry.field}
        </p>
        <p className="mt-1 text-xs text-faint">
          {entry.institution}
        </p>
        <p className="mt-3 text-sm text-secondary/90 text-pretty">
          {entry.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold gradient-text">
            <AnimatedCounter
              value={entry.metric.value}
              decimals={entry.metric.decimals}
              duration={1500}
            />
            <span className="text-base ml-1">{entry.metric.suffix}</span>
          </span>
          <span className="text-xs font-mono text-muted">{entry.metric.label}</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {entry.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-muted">
              <span className="text-cyan-500 mt-0.5">▹</span>
              <span className="text-pretty">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="// foundation"
              title={
                <>
                  Academic <span className="gradient-text">journey</span>
                </>
              }
              description="Strong STEM foundation, focused on systems, algorithms, and engineering rigor."
            />
            <div className="mt-6 hidden lg:flex flex-wrap gap-2">
              <span className="chip"><GraduationCap size={12} /> B.Tech CSE</span>
              <span className="chip"><BookOpen size={12} /> CBSE PCM</span>
              <span className="chip"><Code2 size={12} /> DSA, OS, DBMS, CN</span>
              <span className="chip"><Sparkles size={12} /> 9.05 CGPA</span>
            </div>
          </div>

          <EducationIllustration />
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          {education.map((e, i) => (
            <TimelineNode key={e.id} entry={e} index={i} isLast={i === education.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
