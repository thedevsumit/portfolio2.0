import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from './store/useUIStore'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { SideNav } from './components/layout/SideNav'
import { CustomCursor } from './components/layout/CustomCursor'
import { Hero } from './sections/Hero/Hero'
import { Skills } from './sections/Skills/Skills'
import { Education } from './sections/Education/Education'
import { Projects } from './sections/Projects/Projects'
import { CompetitiveProgramming } from './sections/CompetitiveProgramming/CompetitiveProgramming'
import { Chess } from './sections/Chess/Chess'
import { Contact } from './sections/Contact/Contact'

export default function App() {
  const appReady = useUIStore((s) => s.appReady)

  
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let pos = 0
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (k === seq[pos]) {
        pos++
        if (pos === seq.length) {
          pos = 0
          window.dispatchEvent(new CustomEvent('konami-trigger'))
        }
      } else {
        pos = k === seq[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <Loader />

      <AnimatePresence>
        {appReady && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Header />
            <SideNav />
            <main id="main-content">
              <Hero />
              <Skills />
              <Education />
              <Projects />
              <CompetitiveProgramming />
              <Chess />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
