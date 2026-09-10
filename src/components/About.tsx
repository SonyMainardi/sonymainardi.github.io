import { motion } from 'motion/react'
import { GraduationCap, Languages as LanguagesIcon } from 'lucide-react'
import { education, languages, profile } from '../data/content'
import { useI18n } from '../lib/i18n'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  const { t, l } = useI18n()

  return (
    <Section id="about" kicker={t('about.kicker')} title={t('about.title')}>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal from="left">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.pt}>{l(paragraph)}</p>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5">
          <Reveal from="right" delay={0.05}>
            <article className="card rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <GraduationCap size={18} className="text-brand-500 dark:text-brand-400" />
                {t('about.education')}
              </h3>
              <ul className="mt-4 space-y-3">
                {education.map((item) => (
                  <li key={item.title.pt} className="border-l-2 border-brand-500/40 pl-3">
                    <p className="font-medium">{l(item.title)}</p>
                    <p className="text-sm text-muted">{l(item.detail)}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal from="right" delay={0.12}>
            <article className="card rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <LanguagesIcon size={18} className="text-accent-500" />
                {t('about.languages')}
              </h3>
              <ul className="mt-4 space-y-4">
                {languages.map((item) => (
                  <li key={item.name.pt}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-medium">{l(item.name)}</span>
                      <span className="text-muted">{l(item.level)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-linear-to-r from-brand-500 to-accent-500"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
