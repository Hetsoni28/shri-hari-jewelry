'use client'
import { motion } from 'framer-motion'

export default function LoadingRing() {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.9, duration: 0.5 }}
    >
      {/* Three tiny diamonds — alternating purple and gold to match brand */}
      {[
        { color: '#8069BF', delay: 0 },
        { color: '#C9A74D', delay: 0.22 },
        { color: '#8069BF', delay: 0.44 },
      ].map((d, i) => (
        <motion.div
          key={i}
          style={{
            width: 5,
            height: 5,
            backgroundColor: d.color,
            rotate: 45,
            willChange: 'opacity',
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.1,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}
