import type { ReactNode } from 'react'
import { ArrowLeft, Printer } from 'lucide-react'
import {
  education,
  experiences,
  languages,
  profile,
  projects,
  repoUrl,
  skillGroups,
  softSkills,
} from '../data/content'
import { useI18n } from '../lib/i18n'

const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-[#6d28d9] print-exact">
        {title}
      </h2>
      <div className="mt-1.5 h-px w-full bg-[#dcdce8] print-exact" />
      <div className="mt-3">{children}</div>
    </section>
  )
}

export function Resume() {
  const { t, l, lang, toggleLang } = useI18n()
  const featured = projects.filter((project) => project.featured)

  return (
    <div className="min-h-svh px-4 py-8 print:p-0">
      <div className="mx-auto mb-5 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <a
          href="./"
          className="inline-flex items-center gap-2 rounded-lg border border-[#d4d4e2] bg-white px-4 py-2 text-sm font-semibold text-[#14141f] transition-colors hover:bg-[#f2f0ff]"
        >
          <ArrowLeft size={15} />
          {t('cv.back')}
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('a11y.lang')}
            className="rounded-lg border border-[#d4d4e2] bg-white px-3 py-2 font-mono text-xs font-semibold uppercase text-[#14141f] transition-colors hover:bg-[#f2f0ff]"
          >
            {lang === 'pt' ? 'PT' : 'EN'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand-600 to-accent-700 px-4 py-2 text-sm font-semibold text-white"
          >
            <Printer size={15} />
            {t('cv.print')}
          </button>
        </div>
      </div>

      <article className="sheet mx-auto max-w-[210mm] rounded-2xl p-10 text-[13px] leading-relaxed print:rounded-none print:p-0">
        <header className="border-b-2 border-[#6d28d9] pb-4 print-exact">
          <h1 className="font-display text-[30px] font-extrabold leading-tight tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-0.5 font-display text-[15px] font-semibold text-[#4b4b63]">
            {l(profile.role)}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#4b4b63]">
            <li>{l(profile.location)}</li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedin}>{shortUrl(profile.linkedin)}</a>
            </li>
            <li>
              <a href={profile.github}>{shortUrl(profile.github)}</a>
            </li>
            <li>
              <a href={profile.website}>{shortUrl(profile.website)}</a>
            </li>
          </ul>
        </header>

        <Block title={t('cv.summary')}>
          <div className="space-y-2 text-[#33334a]">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.pt}>{l(paragraph)}</p>
            ))}
          </div>
        </Block>

        <Block title={t('cv.experience')}>
          <ol className="space-y-4">
            {experiences.map((item, index) => (
              <li key={`${item.role.pt}-${index}`} className="avoid-break">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-[14px] font-semibold">
                    {l(item.role)}
                    {item.promoted && (
                      <span className="ml-2 font-sans text-[11px] font-medium text-[#6d28d9] print-exact">
                        {t('experience.promoted')}
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-[11px] text-[#5b5b70]">{l(item.period)}</span>
                </div>
                <p className="text-[12px] font-medium text-[#6d28d9] print-exact">
                  {l(item.company)}
                </p>
                <p className="mt-1 text-[#33334a]">{l(item.description)}</p>
                <p className="mt-1 font-mono text-[11px] text-[#5b5b70]">{item.stack.join(' · ')}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block title={t('cv.skills')}>
          <ul className="space-y-1.5">
            {skillGroups.map((group) => (
              <li key={group.title.pt} className="flex flex-wrap gap-x-2">
                <span className="font-semibold">{l(group.title)}:</span>
                <span className="text-[#33334a]">{group.items.join(', ')}</span>
              </li>
            ))}
            <li className="flex flex-wrap gap-x-2">
              <span className="font-semibold">{t('cv.soft')}:</span>
              <span className="text-[#33334a]">
                {softSkills.map((skill) => l(skill)).join(', ')}
              </span>
            </li>
          </ul>
        </Block>

        <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
          <Block title={t('cv.education')}>
            <ul className="space-y-2">
              {education.map((item) => (
                <li key={item.title.pt} className="avoid-break">
                  <p className="font-medium">{l(item.title)}</p>
                  <p className="text-[12px] text-[#5b5b70]">{l(item.detail)}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={t('cv.languages')}>
            <ul className="space-y-2">
              {languages.map((item) => (
                <li key={item.name.pt} className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{l(item.name)}</span>
                  <span className="text-[12px] text-[#5b5b70]">{l(item.level)}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <Block title={t('cv.projects')}>
          <ul className="space-y-2.5">
            {featured.map((project) => (
              <li key={project.slug} className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-[13px] font-semibold">{project.name}</h3>
                  <a href={repoUrl(project.slug)} className="font-mono text-[11px] text-[#5b5b70]">
                    {shortUrl(repoUrl(project.slug))}
                  </a>
                </div>
                <p className="text-[#33334a]">{l(project.description)}</p>
              </li>
            ))}
          </ul>
        </Block>
      </article>
    </div>
  )
}
