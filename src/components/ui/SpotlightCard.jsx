import { useRef, useState } from 'react'
import { cn } from '../../utils/cn'

export const SpotlightCard = ({ children, className = '', accent = '#00a8e8', ...props }) => {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-card)] transition-all duration-300',
        className,
      )}
      style={{
        boxShadow: hovered
          ? `0 0 0 1px ${accent}33, 0 20px 50px -20px ${accent}44`
          : 'none',
      }}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${accent}1a, transparent 45%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
