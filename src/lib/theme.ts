import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeValue | null>(null)

export const THEME_STORAGE_KEY = 'portfolio:theme'

export function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return context
}
