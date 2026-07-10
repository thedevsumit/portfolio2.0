import { useEffect, useRef, useState } from 'react'

export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.disconnect()
        } else if (options.once === false) {
          setInView(false)
        }
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px',
      },
    )
    observer.observe(el)
    return () => observer.disconnect()
    
  }, [options.threshold, options.rootMargin, options.once])

  return [ref, inView]
}
