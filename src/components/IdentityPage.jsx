import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { identities } from '../data/content'
import SurfaceReveal from './SurfaceReveal'
import MaskMirror from './MaskMirror'

const ease = [0.2, 0.7, 0.2, 1]

export function Section({ title, lede, children, className = '' }) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28 ${className}`}>
      <h2 className="font-display text-4xl font-light tracking-tight md:text-6xl">{title}</h2>
      {lede && <p className="mt-4 max-w-xl text-[17px] leading-relaxed opacity-70">{lede}</p>}
      <div className="mt-12">{children}</div>
    </section>
  )
}

export default function IdentityPage({ identity, go, carried, setCarried }) {
  const idx = identities.findIndex((i) => i.id === identity.id)
  const prev = identities[(idx - 1 + identities.length) % identities.length]
  const next = identities[idx + 1]
  const arrivedWith = carried && carried.to === identity.id ? carried : null

  return (
    <article style={{ '--accent': identity.accent }}>
      {/* Hero */}
      <header className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-10">
        {arrivedWith && (
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease }}
            className="mb-10 max-w-xl text-[15px] leading-relaxed text-warm/70"
          >
            You arrived carrying{' '}
            <span className="font-display italic text-warm">{arrivedWith.words.join(', ').toLowerCase()}</span>{' '}
            from {arrivedWith.from}. They come along.
          </motion.p>
        )}
        <p className="font-display text-lg italic text-[var(--accent)]">
          Version {idx + 1} of {identities.length}
        </p>
        <h1 className="mt-2 font-display font-light leading-[0.82] tracking-[-0.04em] text-[clamp(4rem,15vw,12rem)]">
          <motion.span
            className="block pl-[0.08em] text-[0.32em] italic leading-none text-warm/50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
          >
            The
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.25, duration: 1.1, ease }}
          >
            {identity.short}
          </motion.span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-warm/75 md:text-xl">{identity.background}</p>
        <ArrowDown aria-hidden="true" className="mt-14 text-[var(--accent)]" size={22} />
      </header>

      <Section
        title="What you see, and what you don’t"
        lede="This is how I appear in this role. Pull the surface aside to find what sits underneath it."
      >
        <SurfaceReveal see={identity.see} dontSee={identity.dontSee} accent={identity.accent} />
      </Section>

      <Section
        title="The mask and the mirror"
        lede="Every role comes with a script. The mask is the line it hands me. The mirror is what I see when I stop performing."
      >
        <MaskMirror mask={identity.mask} mirror={identity.mirror} accent={identity.accent} />
      </Section>

      <Section title="What matters to me">
        <ol className="border-y border-warm/10">
          {identity.matters.map((m, i) => (
            <motion.li
              key={m}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease }}
              className="group flex items-baseline gap-6 border-b border-warm/10 py-6 last:border-b-0"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 translate-y-[-0.35em] rounded-full bg-[var(--accent)] transition-transform group-hover:scale-150" />
              <span className="font-display text-2xl font-light leading-snug transition-transform duration-500 group-hover:translate-x-2 md:text-[2.5rem]">
                {m}
              </span>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section
        title="What I carry with me"
        lede="The title stays in this room. These come with me to the next one."
      >
        <Carry
          words={identity.carry}
          next={next}
          onCarry={() => {
            setCarried({ from: identity.name, words: identity.carry, to: next.id })
            go(next.id)
          }}
        />
      </Section>

      <nav aria-label="Other versions" className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-warm/10 px-5 py-10 text-sm md:px-10">
        <button type="button" onClick={() => go(prev.id)} className="inline-flex items-center gap-2 text-warm/60 hover:text-warm">
          <ArrowLeft size={16} aria-hidden="true" /> {prev.name}
        </button>
        <button type="button" onClick={() => go('')} className="text-warm/60 hover:text-warm">
          All versions
        </button>
        <button type="button" onClick={() => go(next.id)} className="inline-flex items-center gap-2 text-warm/60 hover:text-warm">
          {next.name} <ArrowRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </article>
  )
}

function Carry({ words, next, onCarry }) {
  const [leaving, setLeaving] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div>
      <motion.ul
        className="flex flex-wrap items-baseline gap-x-10 gap-y-4"
        animate={leaving ? { x: 120, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      >
        {words.map((w, i) => (
          <motion.li
            key={w}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.8, ease }}
            className="font-display text-4xl font-light italic text-[var(--accent)] md:text-6xl"
          >
            {w}
          </motion.li>
        ))}
      </motion.ul>
      <button
        type="button"
        disabled={leaving}
        onClick={() => {
          setLeaving(true)
          setTimeout(onCarry, reduce ? 0 : 600)
        }}
        className="mt-14 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3.5 font-medium text-night transition hover:brightness-110"
      >
        Carry these into {next.name}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
