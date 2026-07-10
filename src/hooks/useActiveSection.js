import { useEffect, useState } from 'react'

export const useActiveSection = (ids, options = {}) => {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        rootMargin: options.rootMargin ?? '-40% 0px -50% 0px',
        threshold: options.threshold ?? 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    
  }, [ids.join(',')])

  return active
}
