import { createContext, useContext } from 'react'

export type Lang = 'pt' | 'en'

export type Localized = Record<Lang, string>

export const dictionary = {
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.skills': { pt: 'Skills', en: 'Skills' },
  'nav.projects': { pt: 'Projetos', en: 'Projects' },
  'nav.experience': { pt: 'Experiência', en: 'Experience' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },

  'hero.available': { pt: 'Disponível para novos projetos', en: 'Available for new projects' },
  'hero.greeting': { pt: 'Olá, eu sou', en: "Hi, I'm" },
  'hero.cta.projects': { pt: 'Ver projetos', en: 'View projects' },
  'hero.cta.contact': { pt: 'Fale comigo', en: 'Get in touch' },
  'hero.scroll': { pt: 'Role para explorar', en: 'Scroll to explore' },

  'about.title': { pt: 'Sobre mim', en: 'About me' },
  'about.kicker': { pt: 'Quem está por trás do código', en: 'Who is behind the code' },
  'about.education': { pt: 'Formação', en: 'Education' },
  'about.languages': { pt: 'Idiomas', en: 'Languages' },

  'skills.title': { pt: 'Habilidades', en: 'Skills' },
  'skills.kicker': { pt: 'Ferramentas do dia a dia', en: 'Everyday toolbox' },
  'skills.soft': { pt: 'Comportamentais', en: 'Soft skills' },

  'projects.title': { pt: 'Projetos', en: 'Projects' },
  'projects.kicker': { pt: 'O que eu venho construindo', en: 'What I have been building' },
  'projects.all': { pt: 'Todos', en: 'All' },
  'projects.code': { pt: 'Código', en: 'Code' },
  'projects.demo': { pt: 'Demo', en: 'Live demo' },
  'projects.more': { pt: 'Ver todos os repositórios', en: 'See all repositories' },

  'experience.title': { pt: 'Experiência', en: 'Experience' },
  'experience.kicker': { pt: 'Trajetória profissional', en: 'Professional path' },
  'experience.current': { pt: 'Atual', en: 'Current' },

  'contact.title': { pt: 'Vamos conversar', en: "Let's talk" },
  'contact.kicker': { pt: 'Contato', en: 'Contact' },
  'contact.text': {
    pt: 'Aberto a oportunidades, freelas e trocas sobre desenvolvimento. Respondo mais rápido por e-mail.',
    en: 'Open to opportunities, freelance work and dev conversations. Email is the fastest way to reach me.',
  },
  'contact.email': { pt: 'Enviar e-mail', en: 'Send email' },
  'contact.copy': { pt: 'Copiar e-mail', en: 'Copy email' },
  'contact.copied': { pt: 'Copiado!', en: 'Copied!' },

  'footer.built': {
    pt: 'Feito com React, TypeScript, Tailwind e Motion.',
    en: 'Built with React, TypeScript, Tailwind and Motion.',
  },
  'footer.top': { pt: 'Voltar ao topo', en: 'Back to top' },

  'a11y.theme': { pt: 'Alternar tema', en: 'Toggle theme' },
  'a11y.lang': { pt: 'Alternar idioma', en: 'Toggle language' },
  'a11y.menu': { pt: 'Abrir menu', en: 'Open menu' },
} satisfies Record<string, Localized>

export type TranslationKey = keyof typeof dictionary

export type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: TranslationKey) => string
  l: (value: Localized) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

export const LANG_STORAGE_KEY = 'portfolio:lang'

export function initialLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  if (stored === 'pt' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n precisa estar dentro de <I18nProvider>')
  return context
}
