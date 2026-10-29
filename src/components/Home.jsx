import { useState } from 'react'
import { motion } from 'framer-motion'
import { site, identities } from '../data/content'

// Positions (percent of the square) — the five roles orbit "Just Me" at the centre.
const POS = {
  student: [22, 20],
  president: [75, 16],
  intern: [82, 60],
  tutor: [55, 86],
  friend: [17, 68],
  me: [50, 48],
}
const RING = ['student', 'president', 'intern', 'tutor', 'friend']
const LINES = [
  ...RING.map((id, i) => [id, RING[(i + 1) % RING.length]]),
  ...RING.map((id) => [id, 'me']),
  ['student', 'intern'],
  ['president', 'tutor'],
]

const ease = [0.2, 0.7, 0.2, 1]

export default function Home({ go }) {
  const [active, setActive] = useState(null)
  const byId = Object.fromEntries(identities.map((i) => [i.id, i]))
  const current = active ? byId[active] : null

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[5fr_7fr] lg:gap-4">
      <div className="relative z-10">
        <h1 className="font-display font-light leading-[0.86] tracking-[-0.03em] text-[clamp(3rem,8.4vw,7rem)]">
          {site.titleLines.map((line, i) => (
            <motion.span
              key={line}
              className={`block ${i === 1 ? 'pl-[0.6em]' : ''} ${i === 3 ? 'pl-[1.1em]' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.09, duration: 0.9, ease }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
          <p className="mt-8 font-display text-xl italic text-lavender md:text-2xl">{site.subtitle}</p>
          <p className="mt-10 max-w-sm text-[17px] leading-relaxed text-warm/75">{site.intro}</p>
          <p className="mt-6 font-display text-2xl md:text-3xl">{site.question}</p>
          <p aria-live="polite" className="mt-4 min-h-[3.5rem] max-w-sm text-[15px] leading-relaxed text-warm/60">
            {current ? (
              <>
                <span className="font-display italic" style={{ color: current.accent }}>{current.name}.</span>{' '}
                {current.tagline}
              </>
            ) : (
              site.hoverHint
            )}
          </p>
        </motion.div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[620px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <motion.circle
            cx="50" cy="50" r="40" fill="none" stroke="rgba(205,189,247,0.09)" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease }}
          />
          {LINES.map(([a, b]) => {
            const on = active && (a === active || b === active)
            const [x1, y1] = POS[a]
            const [x2, y2] = POS[b]
            return (
              <line
                key={a + b}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={on ? byId[active].accent : 'rgba(205,189,247,0.3)'}
                strokeWidth={on ? 1.6 : 0.8}
                vectorEffect="non-scaling-stroke"
                className="dash"
                style={{ opacity: active && !on ? 0.2 : 1, transition: 'opacity .4s, stroke .4s' }}
              />
            )
          })}
        </svg>

        {identities.map((id, i) => {
          const [x, y] = POS[id.id]
          const isMe = id.id === 'me'
          return (
            <div
              key={id.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, '--accent': id.accent }}
            >
              <motion.button
                type="button"
                onClick={() => go(id.id)}
                onMouseEnter={() => setActive(id.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(id.id)}
                onBlur={() => setActive(null)}
                className="group block rounded-2xl px-3 py-2 text-center"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.1, type: 'spring', stiffness: 120, damping: 15 }}
              >
                <motion.span
                  className="block"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className={`relative mx-auto mb-3 block rounded-full ${isMe ? 'h-5 w-5' : 'h-3 w-3'}`}>
                    <span className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_0_28px_var(--accent)]" />
                    <span className="absolute -inset-3 rounded-full border border-[var(--accent)] opacity-40 transition duration-500 group-hover:scale-[1.8] group-hover:opacity-0 group-focus-visible:scale-[1.8]" />
                  </span>
                  <span
                    className={`block whitespace-nowrap font-display leading-none transition-colors duration-300 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] ${
                      isMe ? 'text-[1.9rem] italic md:text-5xl' : 'text-[1.2rem] md:text-[2rem]'
                    }`}
                  >
                    {id.name}
                  </span>
                </motion.span>
              </motion.button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
