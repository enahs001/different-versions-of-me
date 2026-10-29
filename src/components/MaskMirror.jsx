import { useState } from 'react'
import { motion } from 'framer-motion'
import { VenetianMask, Sparkles } from 'lucide-react'

/*
 * THE MASK — what the role expects of me (upright, porcelain, certain)
 * THE MIRROR — what I actually experience (italic, reflective, honest)
 * A 3D flip; with reduced motion it switches instantly.
 */
export default function MaskMirror({ mask, mirror, accent, onPaper = false }) {
  const [mirrorOn, setMirrorOn] = useState(false)

  const pill = (on) =>
    `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition ${
      on
        ? onPaper ? 'bg-ink text-glass' : 'bg-warm text-night'
        : onPaper ? 'text-ink/70 hover:text-ink' : 'text-warm/70 hover:text-warm'
    }`

  return (
    <div>
      <div
        role="group"
        aria-label="Switch between the mask and the mirror"
        className={`mb-8 inline-flex rounded-full border p-1 ${onPaper ? 'border-ink/20' : 'border-warm/15'}`}
      >
        <button type="button" aria-pressed={!mirrorOn} onClick={() => setMirrorOn(false)} className={pill(!mirrorOn)}>
          <VenetianMask size={16} aria-hidden="true" /> The mask
        </button>
        <button type="button" aria-pressed={mirrorOn} onClick={() => setMirrorOn(true)} className={pill(mirrorOn)}>
          <Sparkles size={16} aria-hidden="true" /> The mirror
        </button>
      </div>

      <div className="[perspective:1800px]">
        <motion.div
          className="relative grid cursor-pointer [transform-style:preserve-3d]"
          animate={{ rotateY: mirrorOn ? 180 : 0 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          onClick={() => setMirrorOn((m) => !m)}
        >
          {/* Mask face */}
          <div
            aria-hidden={mirrorOn}
            className="face relative col-start-1 row-start-1 flex min-h-[360px] flex-col items-center justify-between overflow-hidden rounded-[2.5rem_2.5rem_50%_50%/2.5rem_2.5rem_22%_22%] bg-[#ece8f3] px-8 pb-16 pt-10 text-center text-ink md:min-h-[440px] md:px-20 md:pb-24 md:pt-14"
          >
            <MaskShape />
            <p className="relative text-sm text-ink/60">What the role expects of me</p>
            <blockquote className="relative my-8 max-w-[22ch] text-balance font-display text-3xl font-normal leading-tight md:text-5xl">
              “{mask}”
            </blockquote>
            <p className="relative text-sm text-ink/50">Polished. Certain. Expected.</p>
          </div>

          {/* Mirror face */}
          <div
            aria-hidden={!mirrorOn}
            className="face relative col-start-1 row-start-1 flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2.5rem] px-8 py-10 text-warm [transform:rotateY(180deg)] md:min-h-[440px] md:px-20 md:py-14"
            style={{
              background: `linear-gradient(160deg, #2a2a5e 0%, #1a1b44 45%, color-mix(in srgb, ${accent} 45%, #1a1b44) 120%)`,
            }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[2rem] border border-white/15 md:inset-4" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-y-10 left-[-30%] w-1/3 rotate-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
            <p className="relative text-sm text-warm/60">What I actually experience</p>
            <blockquote className="relative my-8 max-w-[24ch] font-display text-3xl font-light italic leading-tight md:text-5xl">
              {mirror}
            </blockquote>
            <p className="relative text-sm text-warm/50">Unfinished. Honest. Mine.</p>
          </div>
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        {mirrorOn ? `The mirror: ${mirror}` : `The mask: ${mask}`}
      </p>
      <p className={`mt-5 text-sm ${onPaper ? 'text-ink/60' : 'text-warm/50'}`}>
        Click the card, or use the switch, to turn it over.
      </p>
    </div>
  )
}

function MaskShape() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      className="pointer-events-none absolute left-1/2 top-1/2 w-[80%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      fill="none"
      stroke="#151a3d"
      strokeWidth="2"
    >
      <path d="M10 30 C 40 5, 160 5, 190 30 C 195 70, 160 110, 120 100 C 110 80, 90 80, 80 100 C 40 110, 5 70, 10 30 Z" />
      <path d="M45 50 C 55 38, 75 38, 85 52 C 72 60, 56 60, 45 50 Z" />
      <path d="M115 52 C 125 38, 145 38, 155 50 C 144 60, 128 60, 115 52 Z" />
    </svg>
  )
}
