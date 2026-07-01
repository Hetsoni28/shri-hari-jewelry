'use client'
import { motion } from 'framer-motion'

// Deterministic positions — no Math.random() (avoids SSR hydration mismatch)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 13) % 100}%`,
  top:  `${(i * 53 + 7)  % 100}%`,
  size: i % 4 === 0 ? 2 : 1,
  // Alternate between brand purple and gold particles — not just gold
  color: i % 3 === 0 ? 'rgba(201,167,77,0.35)' : 'rgba(128,105,191,0.25)',
  opacity: 0.2 + (i % 4) * 0.08,
  delay: (i * 0.28) % 3.5,
  duration: 5 + (i % 5),
  dx: ((i * 17 + 5) % 20) - 10,
  dy: ((i * 23 + 11) % 20) - 10,
}))

export default function GoldenParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top:  p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0, p.opacity, 0],
            x: [0, p.dx, 0],
            y: [0, p.dy, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
