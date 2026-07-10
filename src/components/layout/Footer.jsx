import { motion } from 'framer-motion'
import { BrandMark } from '../ui/BrandMark'
import { SocialLink } from '../ui/SocialLink'
import { socials } from '../../data/socials'
import { personal } from '../../data/personal'
import { Heart } from 'lucide-react'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-12 border-t border-[var(--border-soft)] bg-[var(--bg-footer)]">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-3 items-start">
          <div className="space-y-4">
            <BrandMark />
            <p className="text-sm text-muted max-w-xs text-pretty">
              {personal.tagline}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-faint">
              // connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {['github', 'linkedin', 'discord', 'instagram', 'email'].map((id) => (
                <SocialLink key={id} id={id} href={socials[id].href} label={socials[id].label} handle={socials[id].handle} size="sm" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-faint">
              // explore
            </h4>
            <div className="flex flex-wrap gap-2">
              {['leetcode', 'codeforces', 'chess'].map((id) => (
                <SocialLink key={id} id={id} href={socials[id].href} label={socials[id].label} handle={socials[id].handle} size="sm" />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-6 border-t border-[var(--border-soft)] flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-muted flex items-center gap-1.5">
            Made with <Heart size={12} className="text-cyan-500 fill-cyan-500" /> by Sumit Kumar
          </p>
          <p className="text-xs font-mono text-faint">
            {'> thanks_for_visiting'}
            <span className="ml-1 inline-block w-2 h-3 bg-cyan-500 animate-pulse align-middle" />
          </p>
          <p className="text-xs text-muted">© {year}</p>
        </motion.div>
      </div>
    </footer>
  )
}
