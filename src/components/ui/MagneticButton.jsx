import { useRef } from 'react'
import { cn } from '../../utils/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  as: As = 'button',
  ...props
}) => {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  const handleMove = (e) => {
    if (reduced) return
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px)`
  }
  const handleLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = 'translate(0,0)'
  }

  return (
    <span
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block will-change-transform align-middle"
      style={{ transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1)' }}
    >
      <As className={cn(className)} {...props}>
        {children}
      </As>
    </span>
  )
}
