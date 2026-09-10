import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ExternalLink, Star } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { profile, projects } from '../data/content'
import { useI18n } from '../lib/i18n'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  const { t, l } = useI18n()
  const [filter, setFilter] = useState<string>('all')

  const tags = useMemo(() => {
    const unique = new Set<string>()
    for (const project of projects) {
      for (const tag of project.tags) unique.add(tag)
    }
    return ['all', ...[...unique].sort()]
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  return (
    <Section id="projects" kicker={t('projects.kicker')} title={t('projects.title')}>
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = filter === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                className={`relative rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-transparent text-white'
                    : 'border-hair text-muted hover:text-[var(--fg)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-brand-600 to-accent-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tag === 'all' ? t('projects.all') : tag}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="card group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:border-brand-500/40"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{project.name}</h3>
                {project.featured && (
                  <span title="destaque" className="text-accent-500">
                    <Star size={15} fill="currentColor" />
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {l(project.description)}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-brand-500/10 px-2 py-1 font-mono text-[11px] text-brand-600 dark:text-brand-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-4 border-t border-hair pt-4 text-sm">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-brand-500"
                >
                  <GithubIcon size={15} />
                  {t('projects.code')}
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-accent-500"
                  >
                    <ExternalLink size={15} />
                    {t('projects.demo')}
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-hair bg-[var(--card)] px-5 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-brand-500/10"
          >
            {t('projects.more')}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
