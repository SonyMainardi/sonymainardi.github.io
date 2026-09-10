import { motion, useScroll, useSpring } from 'motion/react'
import { About } from './components/About'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { I18nProvider } from './lib/I18nProvider'
import { ThemeProvider } from './lib/ThemeProvider'
import { Skills } from './components/Skills'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-brand-500 to-accent-500"
    />
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ScrollProgress />
        <Background />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  )
}
