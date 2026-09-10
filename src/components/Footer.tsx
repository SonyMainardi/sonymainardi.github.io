import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'
import { useI18n } from '../lib/i18n'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hair py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-center text-sm text-muted sm:text-left">
          © {year} {profile.name}. {t('footer.built')}
        </p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-xl border border-hair px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-500/10"
        >
          <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
          {t('footer.top')}
        </a>
      </div>
    </footer>
  )
}
