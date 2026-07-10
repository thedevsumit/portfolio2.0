import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

export const AnimatedCounter = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1600,
  className = '',
}) => {
  const [ref, inView] = useInView({ once: true, amount: 0.4 })
  const v = useCountUp(value, { duration, decimals, start: inView })
  return (
    <span ref={ref} className={className}>
      {prefix}
      {Number.isInteger(value) ? Math.round(v) : v.toFixed(decimals)}
      {suffix}
    </span>
  )
}
