import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Boxes } from 'lucide-react'
import { StatusPill } from '../ui/StatusPill'
import { useUIStore } from '../../store/useUIStore'
import { fadeUp } from '../../styles/motion'

const ProjectVisual = ({ project, hovered }) => {
  
  const { accent, id, number } = project
  return (
    <div
      className="relative w-full aspect-[16/10] rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-soft)]"
      style={{
        background: `radial-gradient(ellipse at 30% 30%, ${accent}22, transparent 60%)`,
      }}
    >
      {}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      {}
      <motion.div
        animate={hovered ? { scale: 1.05, rotate: -2 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-24 h-24 rounded-2xl border flex items-center justify-center"
          style={{
            borderColor: `${accent}55`,
            background: `linear-gradient(135deg, ${accent}22, transparent)`,
            boxShadow: `0 0 40px ${accent}33`,
          }}
        >
          <Boxes size={32} style={{ color: accent }} />
        </div>
      </motion.div>

      {}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.ellipse
          cx="50" cy="30" rx="40" ry="14"
          fill="none"
          stroke={accent}
          strokeWidth="0.4"
          strokeDasharray="2 3"
          opacity="0.5"
          animate={hovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 30%' }}
        />
        <motion.ellipse
          cx="50" cy="30" rx="32" ry="10"
          fill="none"
          stroke="#a6fff3"
          strokeWidth="0.3"
          strokeDasharray="1 2"
          opacity="0.4"
          animate={hovered ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 30%' }}
        />
      </svg>

      {}
      <span
        className="absolute top-3 left-4 font-mono text-xs font-bold tracking-widest"
        style={{ color: accent }}
      >
        {number}
      </span>

      {}
      <div className="absolute top-3 right-3">
        <StatusPill status={project.status} />
      </div>
    </div>
  )
}

export const ProjectCard = ({ project, onOpen }) => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => {
        setHovered(true)
        setCursorVariant('view')
      }}
      onMouseLeave={() => {
        setHovered(false)
        setCursorVariant('default')
      }}
      className="group relative rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-card)] overflow-hidden transition-all duration-500 hover:border-cyan-500/40"
    >
      <button
        onClick={() => onOpen?.(project)}
        className="block w-full text-left"
        aria-label={`View project ${project.title}`}
      >
        <ProjectVisual project={project} hovered={hovered} />
      </button>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-faint">
              {project.year} · {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary group-hover:text-mint-500 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-cyan-500 mt-0.5">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted text-pretty line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s} className="tech-chip">
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="tech-chip text-faint">+{project.stack.length - 5}</span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-mint-500 transition-colors"
                aria-label={`${project.title} source code`}
              >
                <Github size={13} /> source
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-mint-500 transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={13} /> live
              </a>
            )}
          </div>
          <span className="text-xs font-mono text-cyan-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
