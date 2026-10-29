import { useId, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

/*
 * Two layers stacked in the same grid cell.
 *   Top    = "What you see"     (polished, upright type)
 *   Below  = "What you don't see" (private, italic, a little uneven)
 * Dragging the seam (or using the slider / keys) peels the surface back.
 */
export default function SurfaceReveal({ see, dontSee, accent }) {
  const [v, setV] = useState(7) // % of the surface peeled back; a sliver shows at rest
  const box = useRef(null)
  const dragging = useRef(false)
  const sliderId = useId()

  const setFromX = (clientX) => {
    const r = box.current.getBoundingClientRect()
    setV(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  const tween = (to) => animate(v, to, { duration: 0.9, ease: [0.65, 0, 0.35, 1], onUpdate: setV })

  return (
    <div style={{ '--accent': accent }}>
      <div
        ref={box}
        className="relative grid cursor-ew-resize select-none overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] border border-warm/10 [touch-action:pan-y]"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromX(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* Beneath: what you don't see */}
        <div className="col-start-1 row-start-1 bg-[#0a0c22] p-8 md:p-14">
          <h3 className="font-display text-lg italic text-warm/50">What you don’t see</h3>
          <ul className="mt-8 space-y-5 md:space-y-7">
            {dontSee.map((t, i) => (
              <li
                key={t}
                className="max-w-[28ch] font-display text-2xl font-light italic leading-snug text-warm/90 md:max-w-[36ch] md:text-[2.1rem]"
                style={{ marginLeft: `${(i % 3) * 6}%`, transform: `rotate(${i % 2 ? 0.6 : -0.5}deg)` }}
              >
                {t.charAt(0).toLowerCase() + t.slice(1)}…
              </li>
            ))}
          </ul>
        </div>

        {/* Surface: what you see */}
        <div
          className="col-start-1 row-start-1 p-8 md:p-14"
          style={{
            clipPath: `inset(0 0 0 ${v}%)`,
            background: `linear-gradient(140deg, color-mix(in srgb, ${accent} 26%, #1a1c48) 0%, #15173d 55%, #10123a 100%)`,
          }}
        >
          <h3 className="font-display text-lg text-warm/60">What you see</h3>
          <ul className="mt-8 space-y-5 md:space-y-7">
            {see.map((t) => (
              <li key={t} className="flex items-baseline gap-5 text-2xl font-medium tracking-tight md:text-[2.1rem]">
                <span aria-hidden="true" className="h-px w-8 shrink-0 translate-y-[-0.3em] bg-[var(--accent)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Seam */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-[var(--accent)]" style={{ left: `${v}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-night shadow-[0_0_30px_var(--accent)]">
            <MoveHorizontal size={18} />
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <label htmlFor={sliderId} className="shrink-0 text-sm text-warm/60">
          Drag the seam to look beneath the surface
        </label>
        <input
          id={sliderId}
          type="range"
          min="0"
          max="100"
          value={Math.round(v)}
          onChange={(e) => setV(Number(e.target.value))}
          aria-valuetext={v > 50 ? 'Mostly beneath the surface' : 'Mostly the surface'}
          className="track md:max-w-xs"
          style={{ '--thumb': accent }}
        />
        <div className="flex gap-2 text-sm">
          <button type="button" onClick={() => tween(0)} className="rounded-full border border-warm/20 px-4 py-2 hover:border-warm/50">
            Show the surface
          </button>
          <button type="button" onClick={() => tween(100)} className="rounded-full bg-warm/10 px-4 py-2 hover:bg-warm/20">
            Look beneath
          </button>
        </div>
      </div>
    </div>
  )
}
