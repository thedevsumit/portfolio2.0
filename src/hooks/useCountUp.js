import { useEffect, useRef, useState } from 'react'

export const useCountUp = (target, { duration = 1600, decimals = 1, start = false } = {}) => {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const t0 = performance.now()
    let raf
    const step = (now) => {
      const elapsed = now - t0
      const t = Math.min(1, elapsed / duration)
      
      const eased = 1 - Math.pow(1 - t, 4)
      const current = target * eased
      setValue(current)
      if (t < 1) raf = requestAnimationFrame(step)
      else setValue(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return Number(value.toFixed(decimals))
}
