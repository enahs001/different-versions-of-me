import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Drifting particle field + a soft glow that takes on each version's accent.
export default function Background({ accent }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0
    const pts = Array.from({ length: 64 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.00011,
      vy: (Math.random() - 0.5) * 0.00011,
      a: Math.random() * 0.45 + 0.15,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (!reduce) for (const p of pts) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1 }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * w, dy = (pts[i].y - pts[j].y) * h
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.strokeStyle = `rgba(205,189,247,${(1 - d / 120) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(pts[i].x * w, pts[i].y * h); ctx.lineTo(pts[j].x * w, pts[j].y * h); ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230,224,255,${p.a})`; ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw()
    }
    resize(); if (!reduce) draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [reduce])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        className="absolute -right-40 -top-40 h-[70vmax] w-[70vmax] rounded-full opacity-[0.16] blur-[120px]"
        animate={{ backgroundColor: accent }}
        transition={{ duration: 1.2 }}
      />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  )
}
