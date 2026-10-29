import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { identities, connections, connectionsIntro, pairKey } from '../data/content'

const C = 300
const R = 205
const ROLE_IDS = ['student', 'president', 'intern', 'tutor', 'friend']
const POS = { me: [C, C] }
ROLE_IDS.forEach((id, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180
  POS[id] = [C + R * Math.cos(a), C + R * Math.sin(a)]
})

const byId = Object.fromEntries(identities.map((i) => [i.id, i]))
const ALL_PAIRS = Object.keys(connections).map((k) => k.split('+'))
const SUGGESTED = [['student', 'tutor'], ['president', 'friend'], ['intern', 'president']]

// Bend each strand slightly so the web feels woven rather than ruled
function curve(a, b) {
  const [x1, y1] = POS[a]
  const [x2, y2] = POS[b]
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  let cx, cy
  if (a === 'me' || b === 'me') {
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.hypot(dx, dy) || 1
    cx = mx + (-dy / len) * 28
    cy = my + (dx / len) * 28
  } else {
    cx = mx + (C - mx) * 0.4
    cy = my + (C - my) * 0.4
  }
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

export default function ConnectionsMap({ go }) {
  const [sel, setSel] = useState([])
  const reduce = useReducedMotion()

  const toggle = (id) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 2 ? [...s, id] : [s[1], id]))

  const key = sel.length === 2 ? pairKey(sel[0], sel[1]) : null
  const pair = key ? connections[key] : null

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[6fr_5fr]">
      <div className="relative order-2 mx-auto w-full max-w-[600px] lg:order-1">
        <svg viewBox="0 0 600 600" className="w-full overflow-visible" role="group" aria-label="Web of connections between the six versions">
          {key && (
            <defs>
              <linearGradient id="pairGrad" gradientUnits="userSpaceOnUse" x1={POS[sel[0]][0]} y1={POS[sel[0]][1]} x2={POS[sel[1]][0]} y2={POS[sel[1]][1]}>
                <stop offset="0%" stopColor={byId[sel[0]].accent} />
                <stop offset="100%" stopColor={byId[sel[1]].accent} />
              </linearGradient>
            </defs>
          )}

          {ALL_PAIRS.map(([a, b]) => {
            const touched = sel.length === 1 && (a === sel[0] || b === sel[0])
            return (
              <path
                key={a + b}
                d={curve(a, b)}
                fill="none"
                stroke={touched ? byId[sel[0]].accent : 'rgba(205,189,247,0.13)'}
                strokeWidth={touched ? 1.2 : 1}
                strokeDasharray={touched ? '4 6' : undefined}
                style={{ transition: 'stroke .4s' }}
              />
            )
          })}

          {key && (
            <g key={key}>
              <motion.path
                d={curve(sel[0], sel[1])}
                fill="none"
                stroke="url(#pairGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                style={{ filter: 'drop-shadow(0 0 10px rgba(205,189,247,.55))' }}
              />
              {!reduce && (
                <circle r="5" fill="#f4efe7">
                  <animateMotion dur="3.2s" repeatCount="indefinite" path={curve(sel[0], sel[1])} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
                </circle>
              )}
            </g>
          )}

          {identities.map((id) => {
            const [x, y] = POS[id.id]
            const on = sel.includes(id.id)
            const isMe = id.id === 'me'
            const r = isMe ? 42 : 32
            return (
              <g
                key={id.id}
                className="node cursor-pointer"
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={id.name}
                onClick={() => toggle(id.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle(id.id)
                  }
                }}
              >
                <circle className="focus-ring" r={r + 9} fill="none" stroke="#cdbdf7" strokeWidth="2" />
                <circle
                  r={r}
                  fill={on ? id.accent : '#0e1131'}
                  fillOpacity={on ? 0.3 : 1}
                  stroke={id.accent}
                  strokeWidth={on ? 2.5 : 1.2}
                  style={{ transition: 'all .35s' }}
                />
                <circle r={on ? 7 : 4} fill={id.accent} style={{ transition: 'r .35s' }} />
                <text
                  y={r + 26}
                  textAnchor="middle"
                  className="font-display"
                  fontSize={isMe ? 22 : 19}
                  fontStyle={isMe ? 'italic' : 'normal'}
                  fill={on ? id.accent : '#f4efe7'}
                >
                  {id.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="order-1 lg:order-2">
        <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">{connectionsIntro.title}</h1>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-warm/70">{connectionsIntro.lede}</p>

        <div aria-live="polite" className="mt-12 min-h-[15rem]">
          <AnimatePresence mode="wait">
            {pair ? (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-[15px] text-warm/60">
                  <span style={{ color: byId[sel[0]].accent }}>{byId[sel[0]].name}</span> and{' '}
                  <span style={{ color: byId[sel[1]].accent }}>{byId[sel[1]].name}</span> share
                </p>
                <p
                  className="mt-3 bg-clip-text font-display text-4xl italic leading-tight text-transparent md:text-6xl"
                  style={{ backgroundImage: `linear-gradient(90deg, ${byId[sel[0]].accent}, ${byId[sel[1]].accent})` }}
                >
                  {pair.value}
                </p>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-warm/80">{pair.text}</p>
                <button
                  type="button"
                  onClick={() => setSel([])}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-warm/60 hover:text-warm"
                >
                  <RotateCcw size={14} aria-hidden="true" /> Clear and choose again
                </button>
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-display text-2xl italic text-warm/70">
                  {sel.length === 1 ? `${byId[sel[0]].name}, and…?` : 'Choose two versions of me.'}
                </p>
                <p className="mt-6 text-sm text-warm/50">Or start with one of these:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTED.map(([a, b]) => (
                    <li key={a + b}>
                      <button
                        type="button"
                        onClick={() => setSel([a, b])}
                        className="rounded-full border border-warm/15 px-4 py-2 text-sm text-warm/80 hover:border-warm/40 hover:text-warm"
                      >
                        {byId[a].short} + {byId[b].short}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => go('finale')}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-warm px-6 py-3.5 font-medium text-night hover:bg-white"
        >
          Take away the titles <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
