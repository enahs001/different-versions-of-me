import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { justMe } from '../data/content'
import MaskMirror from './MaskMirror'
import { Section } from './IdentityPage'

const ease = [0.2, 0.7, 0.2, 1]
// Varied sizes so the themes read like handwriting on a page, not a tag cloud
const SIZES = ['text-5xl md:text-7xl', 'text-3xl md:text-5xl', 'text-4xl md:text-6xl', 'text-2xl md:text-4xl']

export default function JustMePage({ identity, go, carried }) {
  const [theme, setTheme] = useState(null)
  const arrived = carried && carried.to === 'me'

  return (
    <article className="relative bg-glass text-ink">
      {/* faint reflective sheen */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.55)_45%,transparent_60%)] opacity-60" />

      <header className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 md:px-10">
        <p className="font-display text-lg italic text-ink/60">No version number</p>
        <motion.h1
          className="mt-2 font-display font-light italic leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,17vw,14rem)]"
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 1.4, ease }}
        >
          just me
        </motion.h1>
        <p className="mt-10 font-display text-2xl md:text-3xl">{justMe.opening}</p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{justMe.lede}</p>
        {arrived && (
          <p className="mt-8 max-w-xl text-[15px] text-ink/60">
            You carried <em className="font-display">{carried.words.join(', ').toLowerCase()}</em> here. Everything people carry
            from each role ends up in this room.
          </p>
        )}
      </header>

      <Section title="What runs through all of them" lede="Choose a word.">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {justMe.themes.map((t, i) => {
            const on = theme === t.word
            return (
              <button
                key={t.word}
                type="button"
                aria-pressed={on}
                onClick={() => setTheme(on ? null : t.word)}
                className={`font-display font-light leading-tight transition-colors ${SIZES[i % SIZES.length]} ${
                  on ? 'italic text-violet' : theme ? 'text-ink/30 hover:text-ink/70' : 'text-ink hover:text-violet'
                }`}
              >
                {t.word}
              </button>
            )
          })}
        </div>
        <div aria-live="polite" className="mt-10 min-h-[5rem] max-w-2xl">
          <AnimatePresence mode="wait">
            {theme && (
              <motion.p
                key={theme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="font-display text-2xl italic leading-snug text-ink/80 md:text-3xl"
              >
                {justMe.themes.find((t) => t.word === theme).note}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Section>

      <Section
        title="Contradictions I hold"
        lede="Both ends are true. Move between them; there’s no correct place to stop."
      >
        <div className="space-y-14">
          {justMe.tensions.map((t) => (
            <Tension key={t.left} {...t} />
          ))}
        </div>
      </Section>

      <Section title="The mask and the mirror" lede="Even with no title, there’s still a script I sometimes follow.">
        <MaskMirror mask={identity.mask} mirror={identity.mirror} accent="#a48bfa" onPaper />
      </Section>

      <Section title="Still in draft" lede="Sentences about myself I’ve had to rewrite.">
        <ul className="space-y-12">
          {justMe.drafts.map((d, i) => (
            <li key={d.struck}>
              <p className="relative inline text-xl text-ink/45 md:text-2xl">
                <span className="sr-only">Earlier draft: </span>
                {d.struck}
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-1/2 h-[2px] origin-left bg-violet"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease }}
                />
              </p>
              <motion.p
                className="mt-3 max-w-[34ch] font-display text-3xl font-light italic leading-snug md:text-[2.6rem]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ delay: 0.9 + i * 0.05, duration: 0.8 }}
              >
                <span className="sr-only">Revised: </span>
                {d.revised}
              </motion.p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Where I take a side" lede="Values only mean something when they make me choose.">
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {justMe.stands.map((s) => (
            <li key={s} className="border-l-2 border-violet pl-6 text-xl leading-relaxed md:text-2xl">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <section className="relative mx-auto max-w-6xl px-5 pb-28 pt-16 md:px-10">
        <p className="caret font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light italic leading-[0.95] tracking-tight">
          {justMe.closing}
        </p>
        <div className="mt-14 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => go('connections')}
            className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-glass hover:bg-ink/85"
          >
            See how the versions connect <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go('')} className="rounded-full border border-ink/25 px-6 py-3.5 hover:border-ink/60">
            All versions
          </button>
        </div>
      </section>
    </article>
  )
}

function Tension({ left, right, lines }) {
  const [v, setV] = useState(50)
  const id = useId()
  const line = v < 34 ? lines[0] : v > 66 ? lines[2] : lines[1]
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 font-display text-2xl md:text-4xl">
        <span style={{ opacity: 0.35 + (1 - v / 100) * 0.65 }}>{left}</span>
        <span style={{ opacity: 0.35 + (v / 100) * 0.65 }} className="italic">{right}</span>
      </div>
      <label htmlFor={id} className="sr-only">Between {left} and {right}</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-valuetext={line}
        className="track mt-3"
        style={{ '--track': 'rgba(21,26,61,0.25)', '--thumb': '#151a3d' }}
      />
      <p className="mt-3 min-h-[2rem] text-lg text-ink/70">{line}</p>
    </div>
  )
}
