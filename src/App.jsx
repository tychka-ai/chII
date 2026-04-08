import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight, MoonStar, SunMedium, Sparkles, WandSparkles } from 'lucide-react'
import HomePage from './pages/HomePage'
import MistakesPage from './pages/MistakesPage'
import TouchPage from './pages/TouchPage'
import StoriesPage from './pages/StoriesPage'
import HeartbeatPage from './pages/HeartbeatPage'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/mistakes', label: 'Ошибки' },
  { to: '/touch', label: 'Прикосновение' },
  { to: '/stories', label: 'Истории' },
  { to: '/heartbeat', label: 'Пульс' },
]

function AmbientBackground({ mode }) {
  const particles = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: 80 + ((i * 23) % 120),
      left: `${(i * 11 + 7) % 100}%`,
      top: `${(i * 17 + 9) % 100}%`,
      delay: i * 0.4,
      duration: 9 + (i % 4) * 2,
    })),
    [],
  )

  return (
    <div className={`ambient-layer ambient-${mode}`} aria-hidden="true">
      <div className="ambient-grid" />
      {particles.map((item) => (
        <motion.span
          key={item.id}
          className="ambient-orb"
          style={{ width: item.size, height: item.size, left: item.left, top: item.top }}
          animate={{ y: [0, -16, 12, 0], x: [0, 8, -10, 0], rotate: [0, 4, -3, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function Header({ mode, toggleMode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link to="/" className="brand">
          <span className="brand-mark">Ч/ИИ</span>
          <span className="brand-text-wrap">
            <span className="brand-text">Человек после ИИ</span>
            <span className="brand-subtext">манифест живого дизайна</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="mode-switch" onClick={toggleMode} aria-label="Переключить режим">
            {mode === 'human' ? <MoonStar size={18} /> : <SunMedium size={18} />}
            <span>{mode === 'human' ? 'AI-mode' : 'Human-mode'}</span>
          </button>
          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="Меню">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-wrap">
          <div className="shell mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">100% hand-coded & hand-drawn</p>
          <h3>Несовершенство — не сбой, а доказательство жизни.</h3>
        </div>
        <div className="footer-links">
          <Link to="/mistakes">Ошибки</Link>
          <Link to="/touch">Прикосновение</Link>
          <Link to="/stories">Истории</Link>
          <Link to="/heartbeat">Пульс</Link>
        </div>
        <div className="footer-actions">
          <Link to="/stories" className="footer-mini-link"><Sparkles size={14} /> Живые истории</Link>
          <a className="footer-cta" href="#top">
            Наверх <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

function RouteTransitions() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
          <Route path="/touch" element={<TouchPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/heartbeat" element={<HeartbeatPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [mode, setMode] = useState('human')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  const toggleMode = () => setMode((v) => (v === 'human' ? 'ai' : 'human'))
  const className = useMemo(() => `app-shell mode-${mode}`, [mode])

  return (
    <div className={className} id="top">
      <AmbientBackground mode={mode} />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header mode={mode} toggleMode={toggleMode} />
      <div className="mode-pill shell">
        <span><WandSparkles size={14} /> {mode === 'human' ? 'Human-mode: тёплый, живой, тактильный' : 'AI-mode: холодный, стерильный, безошибочный'}</span>
      </div>
      <main>
        <RouteTransitions />
      </main>
      <Footer />
    </div>
  )
}
