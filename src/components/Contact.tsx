import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Copy, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/content'
import { useI18n } from '../lib/i18n'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard
      .writeText(profile.email)
      .then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => setCopied(false))
  }

  return (
    <Section id="contact" kicker={t('contact.kicker')} title={t('contact.title')}>
      <Reveal>
        <div className="card relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">{t('contact.text')}</p>

            <p className="mt-6 font-mono text-xl font-medium sm:text-2xl">
              <span className="gradient-text">{profile.email}</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand-600 to-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} />
                {t('contact.email')}
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-hair px-5 py-3 text-sm font-semibold transition-colors hover:bg-brand-500/10"
              >
                <motion.span
                  key={copied ? 'copied' : 'copy'}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="grid place-items-center"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </motion.span>
                {copied ? t('contact.copied') : t('contact.copy')}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid size-11 place-items-center rounded-xl border border-hair transition-colors hover:bg-brand-500/10"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-11 place-items-center rounded-xl border border-hair transition-colors hover:bg-brand-500/10"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
