import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiFramer,
  SiLucide,
  SiFirebase,
  SiSupabase,
  SiPython,
  SiSocketdotio,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiNetlify,
  SiRedux,
  SiVite,
  SiJsonwebtokens,
  SiCloudinary,
  SiWebrtc,
} from 'react-icons/si'

const ICON_MAP = {
  react: SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  mongo: SiMongodb,
  tailwind: SiTailwindcss,
  three: SiThreedotjs,
  javascript: SiJavascript,
  js: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  bootstrap: SiBootstrap,
  framer: SiFramer,
  lucide: SiLucide,
  firebase: SiFirebase,
  supabase: SiSupabase,
  python: SiPython,
  socket: SiSocketdotio,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  vercel: SiVercel,
  netlify: SiNetlify,
  redux: SiRedux,
  vite: SiVite,
  jwt: SiJsonwebtokens,
  cloudinary: SiCloudinary,
  webrtc: SiWebrtc,
}

const pickIcon = (name) => {
  const n = name.toLowerCase()
  for (const [key, comp] of Object.entries(ICON_MAP)) {
    if (n.includes(key)) return comp
  }
  return null
}

const initials = (name) => {
  return name
    .replace(/[^a-zA-Z0-9+]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const SIZES = {
  sm: { box: 'w-9 h-9', icon: 18 },
  md: { box: 'w-12 h-12', icon: 24 },
  lg: { box: 'w-14 h-14', icon: 30 },
}

export const TechIcon = ({ name, className = '', size = 'md', showLabel = false, onClick }) => {
  const Icon = pickIcon(name)
  const { box, icon } = SIZES[size] || SIZES.md

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={cn(
        'group relative flex flex-col items-center gap-2 focus:outline-none',
        showLabel ? '' : 'cursor-default',
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--elev-2)] text-secondary/90 transition-all duration-300 group-hover:border-cyan-500/60 group-hover:shadow-[0_0_18px_rgba(0,168,232,0.35)] group-hover:text-primary',
          box,
          className,
        )}
      >
        {Icon ? (
          <Icon size={icon} aria-label={name} />
        ) : (
          <span className="font-mono font-bold text-xs">{initials(name)}</span>
        )}
      </span>
      {showLabel && (
        <span className="text-[11px] font-mono text-muted group-hover:text-mint-500 transition-colors">
          {name}
        </span>
      )}
    </motion.button>
  )
}
