'use client'
import { useState, useEffect } from 'react'

export function usePageLoader(duration = 3600) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(t)
  }, [duration])
  return visible
}
