import { AlertCircle } from 'lucide-react'

export const ErrorState = ({ title = 'Live data temporarily unavailable', description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
    <div className="w-12 h-12 rounded-full border border-warning/30 bg-warning/10 flex items-center justify-center">
      <AlertCircle className="w-5 h-5 text-warning" />
    </div>
    <h3 className="text-sm font-medium text-primary">{title}</h3>
    {description && <p className="text-xs text-muted max-w-xs">{description}</p>}
    {action}
  </div>
)
