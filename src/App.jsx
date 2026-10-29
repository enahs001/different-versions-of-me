import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { identities } from './data/content'
import Background from './components/Background'
import Home from './components/Home'
import IdentityPage from './components/IdentityPage'
import JustMePage from './components/JustMePage'
import ConnectionsMap from './components/ConnectionsMap'
import Finale from './components/Finale'

// Pages are addressed with the URL hash: #student, #connections, #finale …
// (Hash routing works on GitHub Pages with no extra server setup.)
const readHash = () => decodeURIComponent(window.location.hash.slice(1))

export default function App() {
  const [route, setRoute] = useState(readHash)
  const [carried, setCarried] = useState(null) // qualities carried from one role to the next

  useEffect(() => {
    const onHashChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // On every page change: jump to the top and move keyboard focus to the new content
  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 650)
    return () => clearTimeout(t)
  }, [route])

  const go = (to) => {
    window.location.hash = to
  }

  const identity = identities.find((i) => i.id === route)

  let page
  if (identity?.id === 'me') page = <JustMePage identity={identity} go={go} carried={carried} />
  else if (identity) page = <IdentityPage identity={identity} go={go} carried={carried} setCarried={setCarried} />
  else if (route === 'connections') page = <ConnectionsMap go={go} />
  else if (route === 'finale') page = <Finale go={go} />
  else page = <Home go={go} />

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen overflow-x-clip">
        <Background accent={identity?.accent ?? '#a48bfa'} />
        <button
          type="button"
          onClick={() => document.getElementById('main')?.focus()}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-warm focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </button>
        <Nav route={route} go={go} />
        <AnimatePresence mode="wait">
          <motion.main
            key={route || 'home'}
            id="main"
            tabIndex={-1}
            className="outline-none"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {page}
          </motion.main>
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

const NAV_LINKS = [
  { to: '', label: 'Versions' },
  { to: 'connections', label: 'Connections' },
  { to: 'finale', label: 'Take away the titles', short: 'Finale' },
]

function Nav({ route, go }) {
  const onIdentityPage = identities.some((i) => i.id === route)
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div className="absolute inset-0 bg-night/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
      <nav aria-label="Main" className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <button type="button" onClick={() => go('')} className="whitespace-nowrap font-display text-base italic text-warm/85 hover:text-warm">
          <span className="hidden sm:inline">The different versions of me</span>
          <span className="sm:hidden">Versions of me</span>
        </button>
        <ul className="flex items-center gap-1 text-[13px] sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active = route === link.to || (link.to === '' && onIdentityPage)
            return (
              <li key={link.label} className={link.to === '' ? 'hidden sm:block' : ''}>
                <button
                  type="button"
                  onClick={() => go(link.to)}
                  aria-current={route === link.to ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${active ? 'bg-warm/10 text-warm' : 'text-warm/60 hover:text-warm'}`}
                >
                  {link.short ? (
                    <>
                      <span className="hidden sm:inline">{link.label}</span>
                      <span className="sm:hidden">{link.short}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
