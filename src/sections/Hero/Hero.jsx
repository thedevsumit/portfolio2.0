import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { personal, roles } from '../../data/personal'
import { socials } from '../../data/socials'
import { MagneticButton } from '../../components/ui/MagneticButton'
import { SocialLink } from '../../components/ui/SocialLink'
import { HeroScene } from '../../scenes/HeroScene'
import { useUIStore } from '../../store/useUIStore'
import { fadeUp, staggerParent } from '../../styles/motion'

const RotatingRole = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="inline-flex items-center gap-2 text-mint-500 font-mono font-medium min-w-[280px]">
      <span className="text-cyan-500">{'>'}</span>
      <span className="relative inline-block h-[1.6em] min-w-[260px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 whitespace-nowrap"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="inline-block w-2 h-5 bg-cyan-500 animate-pulse" />
    </span>
  )
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export const Hero = () => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden"
    >
      {}
      <div className="glow-blob" style={{ left: '10%', top: '20%' }} />
      <div className="glow-blob" style={{ right: '5%', bottom: '5%', opacity: 0.6 }} />
      <div className="absolute inset-0 grid-backdrop opacity-40 md:opacity-60" />

      {}
      <div className="absolute top-16 right-2 w-[160px] h-[160px] md:hidden pointer-events-none">
        <HeroScene compact />
      </div>
      <div className="absolute inset-0 hidden md:block lg:left-1/3 lg:right-0 pointer-events-none">
        <HeroScene />
      </div>

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-balance font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            <span className="block text-muted text-[0.5em] font-light mb-2">Hi, I'm</span>
            <span className="block gradient-text">Sumit Kumar</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <RotatingRole />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-secondary/85 max-w-xl text-pretty"
          >
            Full-stack developer, competitive programmer, and builder of interactive
            digital experiences. B.Tech CSE @ NIT Jalandhar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} className="text-cyan-500" /> {personal.location}
            </span>
            <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
            <span>CGPA 9.05 / 10</span>
            <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
            <span>{`{ open_to_work }`}</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton
              as="a"
              href={socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onMouseEnter={() => setCursorVariant('open')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <span>Let's Connect</span>
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => scrollTo('projects')}
              className="btn-ghost"
              onMouseEnter={() => setCursorVariant('view')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Sparkles size={16} />
              <span>Explore My Work</span>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-faint">
              // find me on
            </span>
            <div className="flex gap-2">
              {['github', 'linkedin', 'discord', 'instagram'].map((id) => (
                <SocialLink
                  key={id}
                  id={id}
                  href={socials[id].href}
                  label={socials[id].label}
                  handle={socials[id].handle}
                  size="sm"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {}
        <div className="hidden lg:block" />
      </div>

      {}
      <motion.button
        onClick={() => scrollTo('skills')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted hover:text-mint-500 transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"
        />
      </motion.button>
    </section>
  )
}
