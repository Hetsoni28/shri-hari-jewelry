import type { Variants } from 'framer-motion'

export const BRAND_GOLD = '#C9A84C'
export const CHAMPAGNE = '#E8D7A5'

export const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }
  }
}

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }
  })
}

export const subtitleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay }
  })
}

export const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }
  })
}
