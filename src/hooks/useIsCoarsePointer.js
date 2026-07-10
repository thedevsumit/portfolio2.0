import { useEffect, useState } from 'react'

export const useIsCoarsePointer = () => {
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setIsCoarse(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  return isCoarse
}
