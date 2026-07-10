import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github } from 'lucide-react'
import { BrandMark } from '../ui/BrandMark'
import { useScrolled } from '../../hooks/useScrolled'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useUIStore } from '../../store/useUIStore'
import { sections } from '../../data/sections'
import { socials } from '../../data/socials'
import { cn } from '../../utils/cn'

export const Header = () => {
  const scrolled = useScrolled(24)
  const active = useActiveSection(sections.map((s) => s.id))
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore()
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHeader(true), 200)
    return () => clearTimeout(t)
  }, [])

  
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMobileMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen, closeMobileMenu])

  
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleClick = (id) => {
    closeMobileMenu()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={showHeader ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 bg-[rgba(10,13,20,0.72)] backdrop-blur-xl border-b border-[var(--border-soft)]'
            : 'py-5 bg-transparent',
        )}
      >
        <div className="container-x flex items-center justify-between">
          <button
            onClick={() => handleClick('home')}
            className="group flex items-center"
            aria-label="Scroll to home"
          >
            <BrandMark />
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                  active === s.id ? 'text-mint-500' : 'text-muted hover:text-primary',
                )}
              >
                <span className="font-mono text-[10px] mr-1.5 text-cyan-500">{s.number}</span>
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-cyan-500 to-mint-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={socials.github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-pill border border-[var(--border-soft)] hover:border-cyan-500/50 hover:text-mint-500 transition-all"
            >
              <Github size={18} />
            </a>
            <button
              onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-pill border border-[var(--border-soft)]"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={closeMobileMenu}
          >
            <div
              className="absolute inset-0 bg-[rgba(10,13,20,0.85)] backdrop-blur-xl"
              aria-hidden
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 pt-28 px-6 pb-10"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-2">
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  >
                    <button
                      onClick={() => handleClick(s.id)}
                      className={cn(
                        'w-full text-left px-4 py-4 rounded-[var(--radius-md)] border transition-all',
                        active === s.id
                          ? 'border-cyan-500/40 bg-cyan-500/5 text-mint-500'
                          : 'border-[var(--border-soft)] bg-[var(--elev-1)] text-secondary',
                      )}
                    >
                      <span className="font-mono text-[10px] text-cyan-500 mr-3">
                        {s.number}
                      </span>
                      <span className="text-xl font-semibold">{s.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
