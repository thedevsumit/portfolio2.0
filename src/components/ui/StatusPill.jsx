import { cn } from '../../utils/cn'

const variants = {
  completed: {
    label: 'Completed',
    classes: 'bg-success/10 text-success border-success/30',
    dot: 'bg-success',
  },
  'in-progress': {
    label: 'In Progress',
    classes: 'bg-warning/10 text-warning border-warning/30',
    dot: 'bg-warning',
  },
}

export const StatusPill = ({ status = 'completed', className = '' }) => {
  const v = variants[status] || variants.completed
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill border text-[10px] font-mono uppercase tracking-wider',
        v.classes,
        className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', v.dot)} />
      {v.label}
    </span>
  )
}
