import { cn } from '../../utils/cn'

export const SkeletonCard = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-card)]',
      className,
    )}
  >
    <div
      aria-hidden
      className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
      style={{ backgroundSize: '200% 100%' }}
    />
  </div>
)
