export const motion = {
  duration: {
    instant: 0.12,
    fast: 0.2,
    normal: 0.32,
    slow: 0.52,
    cinematic: 0.9,
    scene: 1.2,
  },
  ease: {
    outExpo: [0.22, 1, 0.36, 1],
    outQuart: [0.25, 1, 0.5, 1],
    inOutQuart: [0.76, 0, 0.24, 1],
    spring: [0.34, 1.56, 0.64, 1],
    glide: [0.4, 0, 0.2, 1],
  },
  
  spring: {
    gentle: { type: 'spring', stiffness: 120, damping: 18, mass: 1 },
    snappy: { type: 'spring', stiffness: 320, damping: 24, mass: 0.6 },
    soft: { type: 'spring', stiffness: 80, damping: 16, mass: 1.2 },
  },
  stagger: {
    child: 0.06,
    section: 0.12,
    scene: 0.18,
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motion.duration.normal, ease: motion.ease.outQuart },
  },
}

export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motion.stagger.child,
      delayChildren: 0.05,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.duration.normal, ease: motion.ease.outExpo },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
}

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: motion.duration.cinematic, ease: motion.ease.outExpo },
  },
}
