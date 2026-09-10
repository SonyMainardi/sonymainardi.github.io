import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './cv.css'
import { Resume } from './components/Resume'
import { I18nProvider } from './lib/I18nProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <Resume />
    </I18nProvider>
  </StrictMode>,
)
