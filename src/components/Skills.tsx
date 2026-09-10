import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { skillGroups, softSkills } from '../data/content'
import { useI18n } from '../lib/i18n'
import { staggerContainer, staggerItem } from '../lib/motion'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  const { t, l } = useI18n()

  return (
    <Section id="skills" kicker={t('skills.kicker')} title={t('skills.title')}>
      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title.pt} delay={groupIndex * 0.08}>
            <article className="card group h-full rounded-2xl p-6 transition-colors hover:border-brand-500/40">
              <h3 className="font-display text-lg font-semibold">{l(group.title)}</h3>

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.li key={item} variants={staggerItem}>
                    <span className="inline-block rounded-lg border border-hair bg-brand-500/5 px-3 py-1.5 font-mono text-xs transition-colors hover:bg-brand-500/15">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <article className="card mt-5 rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles size={18} className="text-accent-500" />
            {t('skills.soft')}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <li
                key={skill.pt}
                className="rounded-full border border-hair px-3.5 py-1.5 text-sm text-muted"
              >
                {l(skill)}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  )
}
