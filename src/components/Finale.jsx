import { Fragment, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { identities, finale } from '../data/content'

/*
 * stage 0 — six titles with the expectations attached to them
 * stage 1 — titles dissolve letter by letter, expectations fade, glows drift inward
 * stage 2 — the shared values remain
 * stage 3 — "These are not things I become…"
 * stage 4 — the closing statement + revisit
 */
const RING = identities.map((id, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180
  return { ...id, gx: 50 + 34 * Math.cos(a), gy: 50 + 34 * Math.sin(a) }
})

export default function Finale({ go }) {
  const [stage, setStage] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (stage === 0 || stage === 4) return
    const delays = reduce ? { 1: 300, 2: 600, 3: 600 } : { 1: 2600, 2: 2200, 3: 2400 }
    const t = setTimeout(() => setStage((s) => s + 1), delays[stage])
    return () => clearTimeout(t)
  }, [stage, reduce])

  const stripped = stage >= 1

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:px-10">
      {/* Six coloured glows that drift together as the titles disappear */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 -z-0 h-full w-full blur-2xl">
        {RING.map((r, i) => (
          <motion.circle
            key={r.id}
            r="14"
            fill={r.accent}
            initial={{ cx: r.gx, cy: r.gy, opacity: 0.14 }}
            animate={stripped ? { cx: 50 + (r.gx - 50) * 0.18, cy: 50 + (r.gy - 50) * 0.18, opacity: 0.2 } : { cx: r.gx, cy: r.gy, opacity: 0.14 }}
            transition={{ duration: 3.2, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
      </svg>

      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {stage < 2 ? (
            <motion.div key="titles" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="sr-only">{finale.heading}</h1>
              <motion.p
                aria-hidden="true"
                className="font-display text-xl italic text-lavender"
                animate={{ opacity: stripped ? 0 : 1 }}
                transition={{ duration: 0.8 }}
              >
                {finale.heading}
              </motion.p>

              <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-y-16">
                {identities.map((id, ri) => (
                  <li key={id.id}>
                    <p aria-label={stripped ? undefined : id.name} className="font-display text-[1.65rem] font-light leading-tight md:text-5xl" style={{ color: id.accent }}>
                      {id.name.split(' ').map((word, wi, words) => {
                        const offset = words.slice(0, wi).join(' ').length + (wi ? 1 : 0)
                        return (
                          <Fragment key={wi}>
                          <span className="inline-block whitespace-nowrap">
                            {word.split('').map((ch, k) => {
                              const ci = offset + k
                              return (
                                <motion.span
                                  key={k}
                                  aria-hidden="true"
                                  className="inline-block"
                                  animate={stripped ? { opacity: 0, y: -18 - ((ci * 7) % 20), filter: 'blur(8px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                                  transition={{ duration: 0.9, delay: stripped ? ri * 0.18 + ci * 0.035 : 0 }}
                                >
                                  {ch}
                                </motion.span>
                              )
                            })}
                          </span>
                          {wi < words.length - 1 ? ' ' : ''}
                          </Fragment>
                        )
                      })}
                    </p>
                    <motion.p
                      className="mx-auto mt-4 max-w-[22ch] text-sm leading-snug text-warm/55 md:text-[15px]"
                      animate={{ opacity: stripped ? 0 : 1 }}
                      transition={{ duration: 1.2, delay: stripped ? 0.4 + ri * 0.12 : 0 }}
                    >
                      “{id.mask}”
                    </motion.p>
                  </li>
                ))}
              </ul>

              <AnimatePresence>
                {stage === 0 && (
                  <motion.button
                    type="button"
                    onClick={() => setStage(1)}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="mt-16 rounded-full border border-warm/30 px-8 py-4 font-display text-xl italic text-warm transition hover:border-warm hover:bg-warm hover:text-night"
                  >
                    {finale.button}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="values" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <h1 className="sr-only">What remains</h1>
              <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-2 md:gap-x-12">
                {finale.values.map((v, i) => (
                  <motion.li
                    key={v}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.18, duration: 1 }}
                    className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl"
                    style={{ color: ['#f4efe7', '#cdbdf7', '#a9cdf5'][i % 3] }}
                  >
                    {v}
                  </motion.li>
                ))}
              </ul>

              <div aria-live="polite" className="mx-auto mt-16 max-w-2xl space-y-3">
                {stage >= 3 && (
                  <>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-lg text-warm/75 md:text-xl">
                      {finale.lineOne}
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="text-lg text-warm/75 md:text-xl">
                      {finale.lineTwo}
                    </motion.p>
                  </>
                )}
              </div>

              {stage >= 4 && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
                    className="mx-auto mt-16 max-w-[26ch] font-display text-3xl font-light italic leading-tight md:text-5xl"
                  >
                    {finale.statement}
                  </motion.p>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    onClick={() => go('')}
                    className="mt-16 inline-flex items-center gap-2 text-sm text-warm/50 hover:text-warm"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> {finale.revisit}
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
