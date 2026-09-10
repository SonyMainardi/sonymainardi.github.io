import { useI18n } from '../lib/i18n'

export function SkipLink() {
  const { t } = useI18n()

  return (
    <a
      href="#main"
      className="sr-only left-4 top-4 z-[70] rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed"
    >
      {t('a11y.skip')}
    </a>
  )
}
