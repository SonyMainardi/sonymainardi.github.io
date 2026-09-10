import { motion } from 'motion/react'
import { Briefcase } from 'lucide-react'
import { experiences } from '../data/content'
import { useI18n } from '../lib/i18n'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  const { t, l } = useI18n()

  return (
    <Section id="experience" kicker={t('experience.kicker')} title={t('experience.title')}>
      <div className="relative">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-linear-to-b from-brand-500 via-accent-500 to-transparent sm:block"
        />

        <ol className="space-y-8">
          {experiences.map((item, index) => (
            <li key={`${item.role.pt}-${index}`} className="relative sm:pl-12">
              <span className="absolute left-0 top-6 hidden size-8 place-items-center rounded-full border border-hair bg-[var(--bg)] sm:grid">
                <Briefcase size={14} className="text-brand-600 dark:text-brand-400" />
              </span>

              <Reveal from="left" delay={index * 0.08}>
                <article className="card rounded-2xl p-6 transition-colors hover:border-brand-500/40">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-semibold">{l(item.role)}</h3>
                    {item.current && (
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {t('experience.current')}
                      </span>
                    )}
                    {item.promoted && (
                      <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:text-brand-400">
                        {t('experience.promoted')}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    {l(item.company)}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{l(item.period)}</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">{l(item.description)}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-hair px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
