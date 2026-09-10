import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, FileText, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/content'
import { useI18n } from '../lib/i18n'

const rotatingStack = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Java']

export function Hero() {
  const { t, l } = useI18n()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % rotatingStack.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="top" className="relative flex min-h-svh items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-hair bg-[var(--card)] px-3 py-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t('hero.available')}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 font-mono text-sm text-muted"
          >
            {t('hero.greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl font-semibold sm:text-2xl"
          >
            <span>{l(profile.role)}</span>
            <span className="text-muted">/</span>
            <span className="relative inline-grid h-8 min-w-[7.5rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingStack[index]}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="col-start-1 row-start-1 font-mono text-lg text-brand-600 dark:text-brand-400 sm:text-xl"
                >
                  {rotatingStack[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {l(profile.headline)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand-600 to-accent-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5"
            >
              {t('hero.cta.projects')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-hair bg-[var(--card)] px-5 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-brand-500/10"
            >
              {t('hero.cta.contact')}
            </a>
            <a
              href="./cv.html"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition-colors hover:text-[var(--fg)]"
            >
              <FileText size={16} />
              {t('hero.cta.resume')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} />
              {l(profile.location)}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="E-mail"
                className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs md:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-full bg-linear-to-br from-brand-500/30 to-accent-500/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-hair bg-[var(--card)] p-2 backdrop-blur">
              <img
                src={profile.photo}
                alt={t('a11y.avatar')}
                loading="eager"
                className="aspect-square w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit items-center gap-2 font-mono text-xs text-muted sm:flex"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid place-items-center"
        >
          <ArrowDown size={14} />
        </motion.span>
        {t('hero.scroll')}
      </motion.a>
    </section>
  )
}
