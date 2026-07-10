import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { TechIcon } from '../../components/ui/TechIcon'
import { SpotlightCard } from '../../components/ui/SpotlightCard'
import { skillGroups } from '../../data/skills'
import { capabilities } from '../../data/personal'
import { useUIStore } from '../../store/useUIStore'
import { fadeUp, staggerParent } from '../../styles/motion'

const CapabilityStrip = () => {
  const items = [...capabilities, ...capabilities]
  return (
    <div className="relative overflow-hidden border-y border-[var(--border-soft)] bg-[var(--bg-card)]/40 py-5 my-12 group">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10" />
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused'
        }}
      >
        {items.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="flex items-center gap-3 text-sm font-mono text-muted"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="uppercase tracking-widest">{c}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const SkillCard = ({ group, index }) => {
  const setHoveredSkill = useUIStore((s) => s.setHoveredSkill)
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <motion.div variants={fadeUp}>
      <SpotlightCard accent={group.accent} className="p-6 h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-cyan-500">
              0{index + 1}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {group.subtitle}
            </span>
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-primary">{group.title}</h3>
        <p className="mt-2 text-sm text-muted text-pretty">{group.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {group.items.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => {
                setHoveredItem(item)
                setHoveredSkill(item)
              }}
              onMouseLeave={() => {
                setHoveredItem(null)
                setHoveredSkill(null)
              }}
              className="relative"
            >
              <TechIcon name={item.name} />
              {hoveredItem?.name === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-[10px] font-mono whitespace-nowrap pointer-events-none shadow-lg"
                >
                  <div className="text-primary font-semibold">{item.name}</div>
                  <div className="text-faint">{item.category} · {item.proficiency}</div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="// capability_stack"
          title={
            <>
              What I build <span className="gradient-text">with</span>
            </>
          }
          description="A focused stack across the modern web — frontend, backend, and the supporting tools that keep work fast, versioned, and shippable."
        />

        <CapabilityStrip />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillGroups.map((g, i) => (
            <SkillCard key={g.id} group={g} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
