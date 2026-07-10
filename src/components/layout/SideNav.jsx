import { motion } from 'framer-motion'
import { sections } from '../../data/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'

export const SideNav = () => {
  const active = useActiveSection(sections.map((s) => s.id))

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-5"
      aria-label="Section navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className="group flex items-center justify-end gap-3 cursor-pointer"
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={cn(
                'text-[10px] font-mono uppercase tracking-[0.18em] transition-all duration-300',
                isActive
                  ? 'text-mint-500 opacity-100'
                  : 'text-faint opacity-0 group-hover:opacity-100',
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                'transition-all duration-500',
                isActive
                  ? 'w-12 h-px bg-gradient-to-r from-cyan-500 to-mint-500'
                  : 'w-6 h-px bg-white/20 group-hover:w-8 group-hover:bg-cyan-500/60',
              )}
            />
            <span
              className={cn(
                'font-mono text-[10px] transition-colors',
                isActive ? 'text-mint-500' : 'text-faint',
              )}
            >
              {s.number}
            </span>
          </button>
        )
      })}
    </motion.aside>
  )
}
