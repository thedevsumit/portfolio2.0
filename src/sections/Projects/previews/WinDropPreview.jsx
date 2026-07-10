import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Upload, File, Wifi, RotateCcw, Play } from 'lucide-react'
import { cn } from '../../../utils/cn'

const STAGES = [
  { label: 'Session', detail: 'Sharing session created' },
  { label: 'Discovery', detail: 'Lighthouse finds peer' },
  { label: 'Socket', detail: 'C++ core opens socket' },
  { label: 'Transfer', detail: 'Bytes flowing peer ↔ peer' },
]

const formatBytes = (b) => {
  if (!b) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(b) / Math.log(k))
  return `${(b / Math.pow(k, i)).toFixed(b < 1024 ? 0 : 1)} ${sizes[i]}`
}

const StatusDot = ({ state }) => {
  const color =
    state === 'connected'
      ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.7)]'
      : state === 'connecting'
        ? 'bg-warning animate-pulse'
        : 'bg-faint'
  return <span className={cn('inline-block w-2 h-2 rounded-full', color)} />
}

const PeerPane = ({ side, state, fileName, fileSize, progress, stageIndex }) => {
  const accent = side === 'you' ? '#00a8e8' : '#20cfc8'
  return (
    <div className="flex-1 min-w-0 rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--elev-1)] p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <StatusDot state={state} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            {side === 'you' ? 'You' : 'Peer'}
          </span>
        </div>
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: state === 'connected' ? '#22c55e' : 'rgba(255,255,255,0.4)' }}
        >
          {state === 'idle' && 'offline'}
          {state === 'connecting' && 'connecting…'}
          {state === 'connected' && 'connected'}
        </span>
      </div>

      <div
        className="rounded-[var(--radius-sm)] border border-dashed border-[var(--border-soft)] p-2.5 flex items-center gap-2 min-h-[44px]"
        style={{ borderColor: fileName ? `${accent}66` : undefined }}
      >
        <File size={14} className="shrink-0" style={{ color: fileName ? accent : 'rgba(255,255,255,0.4)' }} />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-primary truncate">
            {fileName || <span className="text-faint italic">no file selected</span>}
          </p>
          {fileSize > 0 && (
            <p className="text-[10px] font-mono text-faint">{formatBytes(fileSize)}</p>
          )}
        </div>
      </div>

      <div className="mt-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-faint">
            {STAGES[stageIndex]?.label || 'ready'}
          </span>
          <span className="text-[10px] font-mono" style={{ color: accent }}>
            {progress}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--elev-3)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent}, #a6fff3)` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}

export const WinDropPreview = ({ liveUrl }) => {
  const reduceMotion = useReducedMotion()
  const [file, setFile] = useState(null)
  const [state, setState] = useState('idle') 
  const [stageIndex, setStageIndex] = useState(-1)
  const [progress, setProgress] = useState(0)
  const [youProgress, setYouProgress] = useState(0)
  const [peerProgress, setPeerProgress] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
  }

  useEffect(() => () => clearTimers(), [])

 const onPickFile = (e) => {
   const f = e.target.files?.[0];

   if (f) {
     const trimmedName =
       f.name.length > 20 ? f.name.slice(0, 12) + "..." : f.name;

     setFile({
       name: trimmedName,
       size: f.size,
     });

     reset();
   }
 };

  const reset = () => {
    clearTimers()
    setState('idle')
    setStageIndex(-1)
    setProgress(0)
    setYouProgress(0)
    setPeerProgress(0)
  }

  const start = () => {
    if (!file) return
    clearTimers()
    setState('connecting')
    setStageIndex(0)

    const STAGE_DURATION = reduceMotion ? 60 : 600
    const tickYou = (from, to, ms) => {
      const start = performance.now()
      const loop = (now) => {
        const t = Math.min(1, (now - start) / ms)
        setYouProgress(Math.round(from + (to - from) * t))
        if (t < 1) requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    }
    const tickPeer = (from, to, ms) => {
      const start = performance.now()
      const loop = (now) => {
        const t = Math.min(1, (now - start) / ms)
        setPeerProgress(Math.round(from + (to - from) * t))
        if (t < 1) requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    }

    STAGES.forEach((_, i) => {
      const ms = STAGE_DURATION
      const t = setTimeout(() => {
        setStageIndex(i)
        const targetPct = Math.round(((i + 1) / STAGES.length) * 100)
        const prevPct = Math.round((i / STAGES.length) * 100)
        tickYou(prevPct, targetPct, ms * 0.7)
        if (i === STAGES.length - 1) {
          
          timers.current.push(setTimeout(() => {
            tickPeer(prevPct, targetPct, ms * 1.1)
          }, ms * 0.25))
        } else {
          tickPeer(prevPct, targetPct, ms * 0.7)
        }
        if (i === STAGES.length - 1) {
          setState('connected')
          setProgress(100)
        }
      }, i * ms)
      timers.current.push(t)
    })
  }

  return (
    <div className="surface overflow-hidden">
      {}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-soft)] bg-[var(--elev-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 max-w-[60%] mx-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-[var(--bg-page)] border border-[var(--border-soft)] text-[10px] font-mono text-faint">
            <Wifi size={10} />
            winsdrop://transfer/{file ? file.name.split('.')[0].toLowerCase() : 'new-session'}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {}
        <div className="flex gap-3">
          <PeerPane
            side="you"
            state={state === 'idle' ? 'idle' : 'connected'}
            fileName={file?.name}
            fileSize={file?.size}
            progress={youProgress}
            stageIndex={Math.max(stageIndex, 0)}
            className={"overflow-hidden"}
          />
          <PeerPane
            side="peer"
            state={state === 'idle' ? 'idle' : state === 'connected' ? 'connected' : 'connecting'}
            fileName={file?.name}
            fileSize={file?.size}
            progress={peerProgress}
            stageIndex={Math.max(stageIndex, 0)}
          />
        </div>

        {}
        <div className="grid grid-cols-4 gap-1.5">
          {STAGES.map((s, i) => {
            const active = i === stageIndex
            const done = i < stageIndex || (state === 'connected')
            return (
              <div
                key={s.label}
                className={cn(
                  'rounded-[var(--radius-sm)] border px-2 py-1.5 text-center transition-colors',
                  done && 'border-cyan-500/40 bg-cyan-500/5',
                  active && 'border-cyan-500/60 bg-cyan-500/10 shadow-[var(--glow-cyan-sm)]',
                  !active && !done && 'border-[var(--border-soft)] bg-[var(--elev-1)]',
                )}
              >
                <p
                  className={cn(
                    'text-[9px] font-mono uppercase tracking-widest',
                    done || active ? 'text-cyan-500' : 'text-faint',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  className={cn(
                    'text-[10px] font-medium mt-0.5 truncate',
                    done || active ? 'text-primary' : 'text-muted',
                  )}
                  title={s.label}
                >
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>

        {}
        <div className="flex flex-wrap items-center gap-2">
          <label className="btn-ghost cursor-pointer text-xs">
            <Upload size={13} />
            {file ? 'Change file' : 'Select file'}
            <input type="file" className="sr-only" onChange={onPickFile} />
          </label>

          <button
            type="button"
            onClick={start}
            disabled={!file || state === 'connecting'}
            className={cn(
              'btn-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed',
            )}
          >
            <Play size={13} />
            {state === 'connecting' ? 'Transferring…' : 'Start transfer'}
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={state === 'idle' && !file}
            className="ml-auto text-xs font-mono text-faint hover:text-primary inline-flex items-center gap-1 transition-colors disabled:opacity-30"
          >
            <RotateCcw size={12} /> reset
          </button>
        </div>

        <AnimatePresence>
          {state === 'connected' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] bg-success/10 border border-success/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-xs text-success font-mono">
                Direct socket open · {file ? formatBytes(file.size) : '0 B'} delivered peer-to-peer via C++ core
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
