import { motion, useScroll, useTransform } from 'motion/react'

export function Background() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div
          className="aurora-blob left-[-10%] top-[-15%] h-[36rem] w-[36rem] bg-brand-500"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="aurora-blob right-[-15%] top-[10%] h-[30rem] w-[30rem] bg-accent-500"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="aurora-blob bottom-[-20%] left-[25%] h-[32rem] w-[32rem] bg-brand-400"
          style={{ animationDelay: '-12s' }}
        />
      </motion.div>

      <div className="grid-lines absolute inset-0" />
    </div>
  )
}
