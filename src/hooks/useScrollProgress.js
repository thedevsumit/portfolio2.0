import { useEffect, useState } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const h = document.documentElement
      const scrollTop = h.scrollTop || document.body.scrollTop
      const scrollHeight = h.scrollHeight - h.clientHeight
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setProgress(Math.min(1, Math.max(0, p)))
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
