import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

const offsets = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({ children, delay = 0, from = 'up', className }: RevealProps) {
  const offset = offsets[from]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
