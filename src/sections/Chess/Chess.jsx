import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Zap, Target, Brain, Trophy } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { AnimatedCounter } from '../../components/ui/AnimatedCounter'
import { chess } from '../../data/chess'
import { fadeUp, staggerParent } from '../../styles/motion'
import { cn } from '../../utils/cn'

const Piece = ({ kind, className }) => {
  const paths = {
    king: 'M22.5 11.63V6M20 8h5M22.5 15c-2.5 0-5 1.5-5 4 0 2 1.5 3 2 4 0 .5-.5 1-1 1H27c-.5 0-1-.5-1-1 .5-1 2-2 2-4 0-2.5-2.5-4-5-4z M11 22h22',
    queen: 'M9 22h18 M12 18l-2-7 4 3 2-7 2 7 4-3-2 7 M12 18c0-1.5 1-3 3-3s3 1.5 3 3 M14 14l1-3 M18 14l-1-3 M20 14l1-3 M16 14l0-3',
    bishop: 'M9 22h18 M12 18c0-1.5 1-2 2-2s2 .5 2 2 M15 13l-3-9 1-2 4 4 4-4 1 2-3 9 M14 14h8',
    knight: 'M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21 M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3',
    rook: 'M9 22h18 M11 22V11h2v3h2v-3h2v3h2v-3h2v11',
    pawn: 'M22.5 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z M19 22h7',
  }
  return (
    <svg viewBox="0 0 45 45" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[kind]} />
    </svg>
  )
}

const Chessboard = ({ hoveredPiece }) => {
  const squares = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0
      const isCenter = (row >= 3 && row <= 4 && col >= 3 && col <= 4)
      squares.push({ row, col, isLight, isCenter })
    }
  }
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full rounded-[var(--radius-md)] overflow-hidden border border-cyan-500/30"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 60px rgba(0,168,232,0.25), inset 0 0 60px rgba(166,255,243,0.05)',
        }}
        whileHover={{ rotateX: 8, rotateY: -8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      >
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {squares.map((s) => (
            <div
              key={`${s.row}-${s.col}`}
              className={cn(
                'relative',
                s.isLight
                  ? 'bg-[#0a0d14]'
                  : 'bg-[#0f1421]',
                s.isCenter && 'ring-1 ring-cyan-500/40 ring-inset',
              )}
            >
              {s.isCenter && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: 'inset 0 0 20px rgba(0,168,232,0.4)' }}
                />
              )}
            </div>
          ))}
        </div>

        {}
        <div className="absolute inset-0 pointer-events-none">
          {chess.ratings.map((r, i) => {
            const positions = [
              { top: '18%', left: '20%' },
              { top: '18%', left: '70%' },
              { top: '70%', left: '20%' },
              { top: '70%', left: '70%' },
            ]
            const isHovered = hoveredPiece === r.id
            return (
              <motion.div
                key={r.id}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={positions[i]}
                animate={{
                  y: [0, -8, 0],
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{
                  y: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.3 },
                }}
              >
                <div
                  className={cn(
                    'w-full h-full flex items-center justify-center transition-colors duration-300',
                    isHovered ? 'text-mint-500' : 'text-cyan-500/70',
                  )}
                  style={{
                    filter: isHovered
                      ? 'drop-shadow(0 0 12px rgba(166,255,243,0.8))'
                      : 'drop-shadow(0 0 4px rgba(0,168,232,0.3))',
                  }}
                >
                  <Piece kind={r.piece} className="w-10 h-10" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(0,168,232,0.1) 0%, transparent 30%, transparent 70%, rgba(166,255,243,0.1) 100%)',
        }} />
      </motion.div>

      {}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-faint">A</div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-faint">H</div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-faint">A</div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-faint">H</div>
    </div>
  )
}

const RatingCard = ({ rating, hovered, onHover, onLeave }) => {
  const Icon = {
    rapid: Crown,
    puzzles: Brain,
    bullet: Zap,
    blitz: Target,
  }[rating.id]

  return (
    <motion.button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      variants={fadeUp}
      className={cn(
        'group relative text-left p-4 rounded-[var(--radius-md)] border transition-all duration-300',
        'bg-[var(--bg-card)]',
        hovered
          ? 'border-cyan-500/60 -translate-y-1 shadow-[0_0_24px_rgba(0,168,232,0.3)]'
          : 'border-[var(--border-soft)]',
      )}
      style={hovered ? { boxShadow: `0 0 30px ${rating.color}40` } : undefined}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: `${rating.color}20`, color: rating.color, border: `1px solid ${rating.color}55` }}
          >
            <Icon size={14} />
          </div>
          <span className="text-sm font-mono text-secondary">{rating.label}</span>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-faint capitalize">
          {rating.piece}
        </span>
      </div>
      <div className="text-3xl font-bold" style={{ color: rating.color }}>
        <AnimatedCounter value={rating.rating} duration={1500} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-muted">
        <span>{rating.games} games</span>
        <span className="text-mint-500">{rating.winRate}% wins</span>
      </div>
    </motion.button>
  )
}

export const Chess = () => {
  const [hoveredPiece, setHoveredPiece] = useState(null)

  return (
    <section id="chess" className="section relative">
      <div className="absolute inset-0 grid-backdrop opacity-30" aria-hidden />
      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="// extra_curricular"
          title={
            <>
              <span className="gradient-text">Chess</span> — strategy off-screen
            </>
          }
          description="Pattern recognition and forward planning. I play rapid and blitz, solve tactical puzzles, and treat the board like a search problem."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Chessboard hoveredPiece={hoveredPiece} />
            <div className="mt-6 text-center">
              <a
                href={chess.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-mint-500 transition-colors"
              >
                <Trophy size={14} className="text-cyan-500" />
                chess.com/@{chess.handle}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {chess.ratings.map((r) => (
              <RatingCard
                key={r.id}
                rating={r}
                hovered={hoveredPiece === r.id}
                onHover={() => setHoveredPiece(r.id)}
                onLeave={() => setHoveredPiece(null)}
              />
            ))}

            <div className="col-span-2 mt-4 p-4 rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-card)]">
              <p className="text-xs font-mono text-muted text-pretty">
                <span className="text-cyan-500">{'// '}</span>
                Chess mirrors the way I think about engineering — limited resources, clear objectives, and an opponent that's also trying to win. The board is a search problem with constraints, and the puzzle ratings track the same iterative improvement loop I use in code.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
