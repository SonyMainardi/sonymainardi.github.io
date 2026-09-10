import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  kicker: string
  title: string
  children: ReactNode
}

export function Section({ id, kicker, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            {kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <div className="mt-6 h-px w-full bg-linear-to-r from-brand-500/60 via-accent-500/30 to-transparent" />
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
