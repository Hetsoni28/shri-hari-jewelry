'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'

/**
 * Welcome animation — the name, engraved.
 *
 * A gold line draws outward, શ્રી હરિ જ્વેલર્સ rises from behind it, the English
 * name settles as its letter-spacing tightens like an engraving coming into focus,
 * and one glint of gold light crosses the name. Then the name itself flies up and
 * lands on the same name in the header while the white stage collapses into it —
 * the welcome hands over to the site in one continuous motion.
 *
 * Shown once per browser session (repeat loads skip it with no flash — see the inline
 * script in app/layout.tsx), skippable with a tap / click / key, and reduced to a
 * short fade for visitors who prefer less motion.
 */

const GOLD = '#C9A74D'
const GOLD_DEEP = '#B8860B'
const PURPLE = '#8069BF'

type Bezier = [number, number, number, number]
const EASE: Bezier = [0.22, 1, 0.36, 1]
const EASE_MOVE: Bezier = [0.76, 0, 0.24, 1]
const LIFT: Transition = { type: 'spring', stiffness: 150, damping: 20 }

const HOLD_MS = 2600 // when the hand-over starts
const EXIT_S = 1
const SESSION_KEY = 'sh_welcome_seen'

type Phase = 'play' | 'exit' | 'done'
type Exit = { x: number; y: number; scale: number; from: string; to: string } | null

// Lets the home hero start its entrance as the stage collapses
function signalDone() {
  ;(window as Window & { __shLoaderDone?: boolean }).__shLoaderDone = true
  window.dispatchEvent(new Event('sh:loader-done'))
}

export default function LuxuryLoader() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('play')
  const [exitPlan, setExitPlan] = useState<Exit>(null)
  const exiting = useRef(false)
  const nameRef = useRef<HTMLSpanElement>(null)

  const startExit = useCallback(() => {
    if (exiting.current) return
    exiting.current = true
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* private mode — it will simply play again next load */
    }

    // Plan the flight of the name to the same name in the header
    const name = nameRef.current?.getBoundingClientRect()
    const target = document.querySelector('header [data-brand-name]')?.getBoundingClientRect()
    if (name) {
      const nx = name.left + name.width / 2
      const ny = name.top + name.height / 2
      const hasTarget = !!target && target.width > 0
      const tx = hasTarget ? target!.left + target!.width / 2 : nx
      const ty = hasTarget ? target!.top + target!.height / 2 : 0
      const cover = Math.hypot(Math.max(nx, innerWidth - nx), Math.max(ny, innerHeight - ny))
      setExitPlan({
        x: tx - nx,
        y: ty - ny,
        scale: hasTarget ? target!.width / name.width : 0.5,
        from: `circle(${Math.ceil(cover)}px at ${nx}px ${ny}px)`,
        to: `circle(0px at ${tx}px ${ty}px)`,
      })
    }

    signalDone()
    setPhase('exit')
  }, [])

  useEffect(() => {
    // Already welcomed this session: the inline script has hidden the overlay before
    // first paint, so just release the page.
    if (document.documentElement.dataset.welcome === 'seen') {
      exiting.current = true
      const t = setTimeout(() => {
        signalDone()
        setPhase('done')
      }, 0)
      return () => clearTimeout(t)
    }

    document.body.style.overflow = 'hidden'
    const t = setTimeout(startExit, reduceMotion ? 800 : HOLD_MS)
    const skip = () => startExit()
    window.addEventListener('keydown', skip)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', skip)
      document.body.style.overflow = ''
    }
  }, [reduceMotion, startExit])

  if (phase === 'done') return null

  const exit = phase === 'exit'
  const hero = exit && exitPlan && !reduceMotion
  const finish = () => {
    document.body.style.overflow = ''
    setPhase('done')
  }

  const at = (delay: number, duration = 0.6, ease: Bezier = EASE): Transition =>
    reduceMotion ? { duration: 0 } : { delay, duration, ease }
  const spring = (delay: number, s: Transition = LIFT): Transition => (reduceMotion ? { duration: 0 } : { ...s, delay })

  return (
    <div
      className="sh-welcome fixed inset-0 z-[9999] select-none"
      style={{ pointerEvents: exit ? 'none' : 'auto', cursor: 'pointer' }}
      role="status"
      aria-label="Welcome to Shri Hari Jewellers"
      onClick={startExit}
    >
      {/* ── The stage: white, collapsing into the header name on exit ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: '#FFFFFF' }}
        initial={false}
        animate={hero ? { clipPath: [exitPlan.from, exitPlan.to] } : exit ? { opacity: 0 } : {}}
        transition={hero ? { duration: EXIT_S, ease: EASE_MOVE } : { duration: 0.35 }}
        onAnimationComplete={() => exit && finish()}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 48%, rgba(201,167,77,0.09) 0%, rgba(201,167,77,0.02) 45%, transparent 75%)' }}
        />
      </motion.div>

      {/* ── The name ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* Gujarati vowel signs reach above the line box — the mask gets extra room and
              the name starts well below it, so no marks peek out before the reveal */}
          {/* (the mask is lifted for the hand-over so the flying name isn't clipped) */}
          <span className={`block px-2 py-3 ${exit ? 'overflow-visible' : 'overflow-hidden'}`}>
            <motion.span
              ref={nameRef}
              className="block text-[40px] font-bold leading-[1.4] sm:text-[60px]"
              // One glint of gold light crosses the name (gradient clipped to the text)
              style={{
                backgroundImage: `linear-gradient(100deg, ${PURPLE} 0%, ${PURPLE} 42%, #E9D49A 50%, ${PURPLE} 58%, ${PURPLE} 100%)`,
                backgroundSize: '260% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              initial={reduceMotion ? false : { y: '150%', backgroundPosition: '100% 0%' }}
              animate={
                hero
                  ? { x: exitPlan.x, y: exitPlan.y, scale: exitPlan.scale, opacity: [1, 1, 0] }
                  : exit
                    ? { opacity: 0 }
                    : { y: '0%', backgroundPosition: '0% 0%' }
              }
              transition={
                hero
                  ? { duration: EXIT_S, ease: EASE_MOVE, opacity: { duration: EXIT_S, times: [0, 0.85, 1] } }
                  : exit
                    ? { duration: 0.3 }
                    : reduceMotion
                      ? { duration: 0 }
                      : { y: { ...LIFT, delay: 0.4 }, backgroundPosition: { delay: 1.5, duration: 1.1, ease: [0.45, 0, 0.25, 1] } }
              }
            >
              શ્રી હરિ જ્વેલર્સ
            </motion.span>
          </span>

          <motion.div
            className="flex flex-col items-center"
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: exit ? 0.25 : 0 }}
          >
            {/* The gold line the name rises from */}
            <motion.span
              aria-hidden="true"
              className="block h-px w-40 sm:w-56"
              style={{ background: `linear-gradient(to right, transparent, ${GOLD} 20%, ${GOLD} 80%, transparent)` }}
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={at(0.15, 0.9, [0.65, 0, 0.35, 1])}
            />

            <motion.p
              className="mt-5 font-label text-[11px] font-semibold uppercase sm:text-[13px]"
              style={{ color: '#3B3448' }}
              initial={reduceMotion ? false : { opacity: 0, letterSpacing: '0.85em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={at(1.0, 1.1)}
            >
              Shree Hari Jewellers
            </motion.p>

            <motion.p
              className="mt-2.5 font-label text-[9px] uppercase tracking-[0.34em] sm:text-[10px]"
              style={{ color: GOLD_DEEP }}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring(1.3)}
            >
              Padrawala · Mogar · Anand · Since 2001
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Quiet skip hint */}
      {!reduceMotion && (
        <motion.p
          className="pointer-events-none absolute inset-x-0 bottom-7 text-center font-label text-[10px] uppercase tracking-[0.3em]"
          style={{ color: '#B5AFBF' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: exit ? 0 : 1 }}
          transition={{ delay: exit ? 0 : 1, duration: exit ? 0.2 : 0.5 }}
        >
          Tap to skip
        </motion.p>
      )}
    </div>
  )
}
