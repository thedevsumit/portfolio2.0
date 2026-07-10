import { cn } from '../../utils/cn'

export const GradientText = ({ children, className = '', as: As = 'span' }) => (
  <As
    className={cn(
      'gradient-text inline-block',
      className,
    )}
  >
    {children}
  </As>
)
