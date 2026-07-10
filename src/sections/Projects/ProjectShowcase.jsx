import { motion } from 'framer-motion'
import { Github, ArrowUpRight, Cpu, Layers } from 'lucide-react'
import { StatusPill } from '../../components/ui/StatusPill'
import { fadeUp } from '../../styles/motion'
import { cn } from '../../utils/cn'

export const ProjectShowcase = ({ project, reverse = false }) => {
  const Preview = project.preview
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
    >
      {}
      <div className={cn('lg:col-span-5 space-y-5', reverse && 'lg:order-2')}>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: project.accent }}
          >
            {project.number} / PROJECT
          </span>
          <StatusPill status={project.status} />
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold gradient-text leading-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-cyan-500 text-sm md:text-base">{project.tagline}</p>
        </div>

        <p className="text-secondary/90 text-pretty leading-relaxed">
          {project.longDescription}
        </p>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-faint mb-2 inline-flex items-center gap-2">
            <Layers size={11} /> key features
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-xs text-secondary/90 px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--elev-1)] border border-[var(--border-soft)]"
              >
                <span className="text-cyan-500 mt-0.5 shrink-0">▹</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-faint mb-2 inline-flex items-center gap-2">
            <Cpu size={11} /> architecture
          </p>
          <pre
            className="text-[11px] md:text-xs font-mono text-mint-500 bg-[var(--elev-1)] border border-[var(--border-soft)] rounded-[var(--radius-md)] p-3 overflow-x-auto"
            style={{ borderColor: `${project.accent}33` }}
          >
            {project.architecture}
          </pre>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="tech-chip">
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              <Github size={13} /> Source
            </a>
          )}
          <span className="ml-auto text-xs font-mono text-faint inline-flex items-center gap-1.5">
            {project.year}
            <ArrowUpRight size={12} className="text-cyan-500" />
          </span>
        </div>
      </div>

      {}
      <div className={cn('lg:col-span-7', reverse ? 'lg:order-1' : 'lg:order-2')}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {}
          <div
            className="absolute -inset-4 rounded-[var(--radius-xl)] opacity-30 blur-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
            aria-hidden
          />
          <div className="relative">
            {Preview ? <Preview liveUrl={project.links?.live} /> : null}
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}
