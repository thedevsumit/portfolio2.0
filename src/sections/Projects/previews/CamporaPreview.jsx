import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Calendar, MapPin, Users, Check, ChevronRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

const CLUBS = [
  {
    id: 'Criminalz',
    name: 'Criminalz Club',
    short: 'C',
    accent: '#00a8e8',
    featured: {
      title: 'Dance Workshop OAT',
      date: 'Sat · 18 Oct',
      time: '4:00 PM',
      location: 'OAT',
      rsvps: 47,
      going: 41,
    },
    events: [
      { title: 'Couple dance practice', date: '22 Oct', rsvps: 32, going: 29 },
      { title: 'Kurunkar special Duet with Her', date: '28 Oct', rsvps: 18, going: 12 },
    ],
  },
  {
    id: 'SI Crew',
    name: 'SI Dance Society',
    short: 'SI',
    accent: '#20cfc8',
    featured: {
      title: 'Height Measurement Event',
      date: 'Sun · 19 Oct',
      time: '10:00 AM',
      location: 'LT circle',
      rsvps: 124,
      going: 118,
    },
    events: [
      { title: 'How to pretend we dancin\'', date: '23 Oct', rsvps: 56, going: 51 },
      { title: 'How to increase Height', date: '30 Oct', rsvps: 41, going: 36 },
    ],
  },
  {
    id: 'GDGC',
    name: 'GDGC',
    short: 'G',
    accent: '#a6fff3',
    featured: {
      title: 'Hackmol Warmup',
      date: 'Fri · 17 Oct',
      time: '6:30 PM',
      location: 'IT Building',
      rsvps: 62,
      going: 58,
    },
    events: [
      { title: 'Learning C++ from you', date: '25 Oct', rsvps: 73, going: 67 },
      { title: 'Pretending Best Coding Club', date: '01 Nov', rsvps: 24, going: 21 },
    ],
  },
  {
    id: 'Chess Club',
    name: 'Chess Club NITJ',
    short: 'C',
    accent: '#00a8e8',
    featured: {
      title: 'Bullet practice (Not Vehicle)',
      date: 'Mon · 20 Oct',
      time: '5:00 PM',
      location: 'SAC',
      rsvps: 88,
      going: 82,
    },
    events: [
      { title: 'Hikaru Watch Party', date: '27 Oct', rsvps: 64, going: 60 },
      { title: 'Milking Magnus Carlsen', date: '03 Nov', rsvps: 38, going: 35 },
    ],
  },
]

const ClubAvatar = ({ short, accent, active }) => (
  <div
    className={cn(
      'w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold border transition-all shrink-0',
      active ? 'text-bg-page' : 'text-primary',
    )}
    style={{
      background: active
        ? `linear-gradient(135deg, ${accent}, #a6fff3)`
        : `linear-gradient(135deg, ${accent}30, transparent)`,
      borderColor: active ? accent : `${accent}40`,
      boxShadow: active ? `0 0 12px ${accent}55` : 'none',
    }}
  >
    {short}
  </div>
)

const FeaturedEvent = ({ event, accent, isRsvp, onRsvp }) => (
  <div
    className="rounded-[var(--radius-md)] border p-4 relative overflow-hidden"
    style={{
      borderColor: `${accent}55`,
      background: `linear-gradient(135deg, ${accent}1a, transparent 70%)`,
    }}
  >
    <div
      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 pointer-events-none"
      style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      aria-hidden
    />
    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-500 mb-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
      />
      Upcoming · featured
    </div>
    <h4 className="text-base font-semibold text-primary leading-tight">{event.title}</h4>

    <div className="mt-3 space-y-1.5 text-xs text-muted">
      <p className="inline-flex items-center gap-1.5">
        <Calendar size={11} className="text-cyan-500" /> {event.date} · {event.time}
      </p>
      <p className="inline-flex items-center gap-1.5">
        <MapPin size={11} className="text-cyan-500" /> {event.location}
      </p>
      <p className="inline-flex items-center gap-1.5">
        <Users size={11} className="text-cyan-500" /> {event.going} going · {event.rsvps} RSVPs
      </p>
    </div>

    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        onClick={onRsvp}
        className={cn(
          'text-xs px-3 py-1.5 rounded-pill border inline-flex items-center gap-1.5 font-mono uppercase tracking-wider transition-all',
          isRsvp
            ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-500'
            : 'border-[var(--border-soft)] bg-[var(--elev-1)] text-primary hover:border-cyan-500/40',
        )}
        style={isRsvp ? { borderColor: accent, color: accent, background: `${accent}1a` } : undefined}
      >
        {isRsvp ? (
          <>
            <Check size={12} /> Going
          </>
        ) : (
          <>RSVP</>
        )}
      </button>
      <span className="text-[10px] font-mono text-faint">free · open to all</span>
    </div>
  </div>
)

const EventRow = ({ event, isRsvp, onRsvp, accent }) => (
  <div className="flex items-center gap-2 p-2.5 rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--elev-1)] hover:border-cyan-500/30 transition-colors">
    <div
      className="w-10 h-10 rounded-md flex flex-col items-center justify-center text-center shrink-0 border"
      style={{ borderColor: `${accent}40`, background: `${accent}10` }}
    >
      <span className="text-[8px] font-mono uppercase tracking-widest leading-none" style={{ color: accent }}>
        {event.date.split(' ')[1]}
      </span>
      <span className="text-sm font-bold text-primary leading-none mt-0.5">
        {event.date.split(' ')[0]}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-primary truncate">{event.title}</p>
      <p className="text-[10px] font-mono text-faint">
        {event.going}/{event.rsvps} going
      </p>
    </div>
    <button
      type="button"
      onClick={onRsvp}
      aria-label={isRsvp ? 'Cancel RSVP' : 'RSVP'}
      className={cn(
        'w-7 h-7 rounded-pill border flex items-center justify-center transition-all',
        isRsvp
          ? 'border-cyan-500/60 text-cyan-500 bg-cyan-500/10'
          : 'border-[var(--border-soft)] text-faint hover:text-primary hover:border-cyan-500/40',
      )}
      style={isRsvp ? { borderColor: accent, color: accent, background: `${accent}1a` } : undefined}
    >
      {isRsvp ? <Check size={12} /> : <ChevronRight size={12} />}
    </button>
  </div>
)

export const CamporaPreview = ({ liveUrl }) => {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(CLUBS[0].id)
  const [rsvps, setRsvps] = useState({}) 

  const toggle = (clubId, title) => {
    const k = `${clubId}:${title}`
    setRsvps((r) => ({ ...r, [k]: !r[k] }))
  }

  const active = CLUBS.find((c) => c.id === activeId)

  return (
    <div className="surface overflow-hidden">
      {}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-soft)] bg-[var(--elev-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 max-w-[60%] mx-auto">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-[var(--bg-page)] border border-[var(--border-soft)] text-[10px] font-mono text-faint hover:text-cyan-500 hover:border-cyan-500/40 transition-colors truncate"
            >
              <span className="shrink-0">🌐</span>
              <span className="truncate">{liveUrl.replace(/^https?:\/\//, '')}</span>
            </a>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-[var(--bg-page)] border border-[var(--border-soft)] text-[10px] font-mono text-faint">
              campora.app/clubs/{activeId}
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[340px]">
        {}
        <div className="w-[42%] border-r border-[var(--border-soft)] p-2.5 space-y-1 overflow-y-auto bg-[var(--elev-1)]">
          <p className="text-[9px] font-mono uppercase tracking-widest text-faint px-2 mb-1.5">
            // your clubs
          </p>
          {CLUBS.map((c) => {
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-2 rounded-[var(--radius-sm)] text-left transition-all',
                  isActive
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'border border-transparent hover:bg-[var(--elev-2)]',
                )}
              >
                <ClubAvatar short={c.short} accent={c.accent} active={isActive} />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-xs font-medium truncate',
                      isActive ? 'text-primary' : 'text-secondary/90',
                    )}
                  >
                    {c.name}
                  </p>
                  <p className="text-[9px] font-mono text-faint">
                    {Math.floor(c.featured.rsvps / 10) * 10}+ members
                  </p>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="club-active-pill"
                    className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                    style={{ boxShadow: '0 0 6px #00a8e8' }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {}
        <div className="flex-1 min-w-0 p-3 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-primary truncate">
                  {active.name}
                </h3>
                <button className="text-[10px] font-mono text-cyan-500 hover:text-mint-500 transition-colors shrink-0">
                  follow +
                </button>
              </div>

              <FeaturedEvent
                event={active.featured}
                accent={active.accent}
                isRsvp={!!rsvps[`${active.id}:${active.featured.title}`]}
                onRsvp={() => toggle(active.id, active.featured.title)}
              />

              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-faint mb-2">
                  // upcoming
                </p>
                <div className="space-y-1.5">
                  {active.events.map((e) => (
                    <EventRow
                      key={e.title}
                      event={e}
                      accent={active.accent}
                      isRsvp={!!rsvps[`${active.id}:${e.title}`]}
                      onRsvp={() => toggle(active.id, e.title)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-[var(--border-soft)] bg-[var(--elev-1)]">
        <p className="text-[10px] font-mono text-faint">
          {Object.values(rsvps).filter(Boolean).length} RSVPs · live updates on
        </p>
        <p className="text-[10px] font-mono text-cyan-500 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          socket.io
        </p>
      </div>
    </div>
  )
}
