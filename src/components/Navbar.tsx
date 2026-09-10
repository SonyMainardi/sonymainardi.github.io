import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useI18n, type TranslationKey } from '../lib/i18n'
import { useTheme } from '../lib/theme'

const links: { id: string; key: TranslationKey }[] = [
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'contact', key: 'nav.contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    for (const link of links) {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return active
}

export function Navbar() {
  const { t, lang, toggleLang } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const media = window.matchMedia('(min-width: 768px)')
    const close = () => setOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', close)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', close)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        aria-label={t('a11y.nav')}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 transition-all duration-300 sm:px-8 ${
          scrolled
            ? 'mt-3 rounded-2xl border border-hair bg-[var(--card)] backdrop-blur-xl sm:mx-auto sm:w-[min(72rem,calc(100%-2rem))]'
            : 'mt-0 border border-transparent'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 font-display text-sm font-bold">
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-brand-600 to-accent-700 text-white">
            SM
          </span>
          <span className="hidden sm:inline">Sony Mainardi</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className="relative block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--fg)]"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-brand-500/12 ring-1 ring-brand-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${active === link.id ? 'text-[var(--fg)]' : ''}`}>
                  {t(link.key)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('a11y.lang')}
            className="rounded-lg border border-hair px-2.5 py-1.5 font-mono text-xs font-semibold uppercase transition-colors hover:bg-brand-500/10"
          >
            {lang === 'pt' ? 'PT' : 'EN'}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('a11y.theme')}
            className="grid size-9 place-items-center rounded-lg border border-hair transition-colors hover:bg-brand-500/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="grid place-items-center"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t('a11y.close') : t('a11y.menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-9 place-items-center rounded-lg border border-hair transition-colors hover:bg-brand-500/10 md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            id="mobile-menu"
            className="mx-4 mt-2 rounded-2xl border border-hair bg-[var(--card)] p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-brand-500/10"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
