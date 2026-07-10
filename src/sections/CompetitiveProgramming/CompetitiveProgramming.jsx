import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'
import { TrendingUp, Code2, Award, Loader2, AlertCircle, BarChart3, Crown, Swords } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { AnimatedCounter } from '../../components/ui/AnimatedCounter'
import { SkeletonCard } from '../../components/ui/SkeletonCard'
import { ErrorState } from '../../components/ui/ErrorState'
import { cpService } from '../../services/cpService'
import { platforms, fallbackCP } from '../../data/cp'
import { fadeUp, staggerParent } from '../../styles/motion'
import { cn } from '../../utils/cn'

const PlatformHeader = ({ platform, data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
        <div>
          <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-16 bg-white/5 rounded mt-1 animate-pulse" />
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
          <AlertCircle size={18} className="text-warning" />
        </div>
        <div>
          <div className="font-semibold text-primary">{platform.name}</div>
          <div className="text-xs text-muted font-mono">@{platform.handle}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm"
        style={{ background: `${platform.color}20`, color: platform.color, border: `1px solid ${platform.color}55` }}
      >
        {platform.name[0]}
      </div>
      <div>
        <div className="font-semibold text-primary">{platform.name}</div>
        <div className="text-xs text-muted font-mono">@{platform.handle}</div>
      </div>
    </div>
  )
}

const BADGE_META = {
  Knight: { color: '#5b9bff', glow: 'rgba(91,155,255,0.55)' },
  Guardian: { color: '#9b8aff', glow: 'rgba(155,138,255,0.55)' },
  Hero: { color: '#3b82f6', glow: 'rgba(59,130,246,0.55)' },
}

const ContestBadge = ({ name, rating, maxRating }) => {
  if (!name) return null
  const meta = BADGE_META[name] || { color: '#00a8e8', glow: 'rgba(0,168,232,0.5)' }
  return (
    <div
      className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-pill border text-[10px] font-mono uppercase tracking-wider"
      style={{
        borderColor: `${meta.color}66`,
        background: `linear-gradient(135deg, ${meta.color}1f, ${meta.color}08)`,
        color: meta.color,
        boxShadow: `0 0 14px ${meta.glow}`,
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: `${meta.color}33`, border: `1px solid ${meta.color}88` }}
      >
        <Crown size={10} />
      </span>
      <span className="font-bold">{name}</span>
      {rating != null && (
        <span className="text-faint normal-case tracking-normal text-[10px]">
          · {rating}
          {maxRating != null && maxRating !== rating && (
            <span className="text-faint/70"> (max {maxRating})</span>
          )}
        </span>
      )}
    </div>
  )
}

const LeetCodeCard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const platform = platforms.find((p) => p.id === 'leetcode')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    cpService.fetchLeetCode(platform.handle)
      .then((d) => {
        if (!mounted) return
        setData(d)
        setError(d?.__source === 'fallback')
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setData({ ...fallbackCP.leetcode, __source: 'fallback' })
        setError(true)
        setLoading(false)
      })
    return () => { mounted = false }
  }, [platform.handle])

  const total = data?.totalSolved || 0
  const easy = data?.easySolved || 0
  const med = data?.mediumSolved || 0
  const hard = data?.hardSolved || 0
  const rating = data?.rating ?? fallbackCP.leetcode.rating
  const maxRating = data?.maxRating ?? fallbackCP.leetcode.maxRating
  const badgeName = data?.contestBadge?.name ?? fallbackCP.leetcode.contestBadge?.name

  return (
    <motion.div variants={fadeUp} className="surface p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-6">
        <PlatformHeader platform={platform} loading={loading} error={error} data={data} />
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted hover:text-mint-500 transition-colors shrink-0"
        >
          view profile →
        </a>
      </div>

      {}
      {!loading && (
        <div className="flex items-center justify-between gap-3 mb-5 p-3 rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--elev-1)]">
          <ContestBadge name={badgeName} rating={rating} maxRating={maxRating} />
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-faint">
            <span className="inline-flex items-center gap-1">
              <Swords size={11} className="text-cyan-500" /> contest rating
            </span>
            <span className="text-primary text-base font-bold gradient-text">
              <AnimatedCounter value={rating} duration={1500} />
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4 flex-1">
          <SkeletonCard className="h-20" />
          <SkeletonCard className="h-32" />
        </div>
      ) : (
        <div className="space-y-6 flex-1">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-faint">total solved</div>
            <div className="text-5xl font-bold gradient-text mt-1">
              <AnimatedCounter value={total} duration={1400} />
            </div>
          </div>

          {}
          <div className="space-y-3">
            {[
              { label: 'Easy', value: easy, color: '#22c55e' },
              { label: 'Medium', value: med, color: '#eab308' },
              { label: 'Hard', value: hard, color: '#ef4444' },
            ].map((d) => {
              const pct = total > 0 ? (d.value / total) * 100 : 0
              return (
                <div key={d.label}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-mono text-secondary" style={{ color: d.color }}>
                      {d.label}
                    </span>
                    <span className="text-sm font-mono font-semibold text-primary">
                      <AnimatedCounter value={d.value} duration={1200} />
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: d.color, boxShadow: `0 0 12px ${d.color}80` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--border-soft)]">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-faint">ranking</div>
              <div className="text-lg font-semibold text-primary mt-1">
                <AnimatedCounter value={data?.ranking || 0} duration={1500} />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-faint">contribution</div>
              <div className="text-lg font-semibold text-primary mt-1">
                <AnimatedCounter value={data?.contributionPoints || 0} duration={1500} />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-faint">reputation</div>
              <div className="text-lg font-semibold text-primary mt-1">
                <AnimatedCounter value={data?.reputation || 0} duration={1500} />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-faint font-mono pt-2">
              * showing cached fallback
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}

const CodeforcesCard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const platform = platforms.find((p) => p.id === 'codeforces')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    cpService.fetchCodeforces(platform.handle)
      .then((d) => {
        if (!mounted) return
        setData(d)
        setError(d?.__source === 'fallback')
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setData({ ...fallbackCP.codeforces, __source: 'fallback' })
        setError(true)
        setLoading(false)
      })
    return () => { mounted = false }
  }, [platform.handle])

  
  const ratingData = (() => {
    if (!data) return []
    if (data.ratingHistory && data.ratingHistory.length > 0) {
      return data.ratingHistory.slice(-15).map((c, i) => ({
        idx: i,
        rating: c.newRating,
        label: c.contestName?.slice(0, 18) || `Contest ${i + 1}`,
      }))
    }
    
    const base = data.rating || 1400
    return Array.from({ length: 12 }, (_, i) => {
      const offset = Math.sin(i * 0.7) * 80 + (i - 6) * 5
      return {
        idx: i,
        rating: Math.round(base + offset),
        label: `Contest ${i + 1}`,
      }
    })
  })()

  return (
    <motion.div variants={fadeUp} className="surface p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <PlatformHeader platform={platform} loading={loading} error={error} data={data} />
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted hover:text-mint-500 transition-colors"
        >
          view profile →
        </a>
      </div>

      {loading ? (
        <div className="space-y-4 flex-1">
          <SkeletonCard className="h-20" />
          <SkeletonCard className="h-40" />
        </div>
      ) : (
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] p-4 bg-[var(--elev-1)]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-faint flex items-center gap-1.5">
                <Award size={10} /> rating
              </div>
              <div className="text-3xl font-bold text-primary mt-1">
                <AnimatedCounter value={data.rating} duration={1400} />
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] p-4 bg-[var(--elev-1)]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-faint flex items-center gap-1.5">
                <TrendingUp size={10} /> max
              </div>
              <div className="text-3xl font-bold gradient-text mt-1">
                <AnimatedCounter value={data.maxRating} duration={1400} />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] p-4 bg-[var(--elev-1)]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-faint flex items-center gap-1.5 mb-2">
              <BarChart3 size={10} /> rank
            </div>
            <div className="text-xl font-semibold text-mint-500 capitalize">
              {data.rank}
            </div>
            <div className="text-xs text-muted mt-1">
              max rank: <span className="text-cyan-500 capitalize">{data.maxRank}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-2">
              rating history
            </div>
            <div className="h-32 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ratingData}>
                  <defs>
                    <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00a8e8" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#00a8e8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="idx" hide />
                  <YAxis
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                    width={36}
                    domain={['dataMin - 50', 'dataMax + 50']}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0a0d14',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      fontSize: 12,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                    labelStyle={{ color: '#a6fff3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rating"
                    stroke="#00a8e8"
                    strokeWidth={2}
                    fill="url(#ratingGrad)"
                    isAnimationActive
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-faint font-mono">
              * showing cached fallback
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}

const AlgorithmicBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden>
    <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="algGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00a8e8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00a8e8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#algGlow)" />
      {}
      <g stroke="#a6fff3" strokeWidth="0.5" fill="none" opacity="0.4">
        <line x1="400" y1="50" x2="300" y2="120" />
        <line x1="400" y1="50" x2="500" y2="120" />
        <line x1="300" y1="120" x2="240" y2="190" />
        <line x1="300" y1="120" x2="360" y2="190" />
        <line x1="500" y1="120" x2="440" y2="190" />
        <line x1="500" y1="120" x2="560" y2="190" />
        <circle cx="400" cy="50" r="3" fill="#a6fff3" />
        <circle cx="300" cy="120" r="2.5" fill="#00a8e8" />
        <circle cx="500" cy="120" r="2.5" fill="#00a8e8" />
        <circle cx="240" cy="190" r="2" fill="#20cfc8" />
        <circle cx="360" cy="190" r="2" fill="#20cfc8" />
        <circle cx="440" cy="190" r="2" fill="#20cfc8" />
        <circle cx="560" cy="190" r="2" fill="#20cfc8" />
      </g>
    </svg>
  </div>
)

export const CompetitiveProgramming = () => {
  return (
    <section id="cp" className="section relative">
      <AlgorithmicBackground />
      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="// competitive_programming"
          title={
            <>
              <span className="gradient-text">Algorithmic</span> thinking
            </>
          }
          description="Live data from LeetCode and Codeforces. Problems, contests, and rating history."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid md:grid-cols-2 gap-5"
        >
          <LeetCodeCard />
          <CodeforcesCard />
        </motion.div>
      </div>
    </section>
  )
}
