import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, PenTool, Heart, AudioLines, Flame, MousePointer2, Sparkles, Cpu, HandHeart } from 'lucide-react'
import { CTA, QuoteBlock } from '../components/Shared'

const manifesto = [
  'ИИ уже делает почти всё быстро, чисто и безошибочно.',
  'Но он не знает, как дрожит голос перед важными словами.',
  'Не умеет ошибаться так, чтобы в этом было очарование.',
  'Не умеет оставлять след прикосновения, паузы и живой тишины.',
]

const words = ['тепло', 'пауза', 'сбой', 'улыбка', 'дрожь', 'след']

export default function HomePage() {
  const [lines, setLines] = useState([])
  const [heat, setHeat] = useState({ x: 50, y: 50 })
  const [activeWord, setActiveWord] = useState('тепло')

  const heroNoise = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ id: i, width: 20 + ((i * 13) % 60), left: (i * 17) % 100, top: 8 + i * 6 })),
    [],
  )

  const draw = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setLines((prev) => [...prev.slice(-28), { x, y, id: crypto.randomUUID() }])
  }

  const trackHeat = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHeat({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <>
      <section className="hero shell home-hero-compact">
        <div className="hero-copy">
          <p className="eyebrow">Манифест 2026</p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            ИИ уже делает 90% всего.
            <span>Это оставшиеся 10%.</span>
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}>
            Здесь не про борьбу с технологией. Здесь про то, что после скорости, чистоты и генерации всё равно остаётся человек:
            его рука, память, волнение и способность тронуть другого.
          </motion.p>
          <div className="hero-actions">
            <Link className="primary-link" to="/mistakes">
              Открыть главы <ArrowRight size={18} />
            </Link>
            <span className="inline-note">Не про идеальность. Про присутствие.</span>
          </div>
        </div>

        <motion.div className="hero-panel interactive" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08 }} onMouseMove={trackHeat}>
          <div
            className="hero-screen"
            style={{
              background: `radial-gradient(circle at ${heat.x}% ${heat.y}%, rgba(255,239,214,0.9), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.55), transparent 30%), linear-gradient(135deg, rgba(0,0,0,0.06), transparent 50%), var(--panel-strong)`,
            }}
          >
            <div className="scan-lines">
              {heroNoise.map((item) => (
                <span key={item.id} className="noise-line" style={{ width: `${item.width}%`, left: `${item.left}%`, top: `${item.top}%`, animationDelay: `${item.id * 0.08}s` }} />
              ))}
            </div>
            <div className="hero-kinetic">
              <motion.span animate={{ x: [0, 2, -3, 0] }} transition={{ duration: 3.2, repeat: Infinity }}>стерильно</motion.span>
              <motion.span animate={{ x: [0, -2, 3, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>идеально</motion.span>
              <motion.span animate={{ x: [0, 3, -2, 0] }} transition={{ duration: 3.6, repeat: Infinity }}>безошибочно</motion.span>
            </div>
            <div className="screen-copy">
              <span>машина умеет собирать форму</span>
              <strong>человек наполняет её смыслом</strong>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="shell manifesto-grid compact-manifesto">
        <div>
          <p className="eyebrow">Главная мысль</p>
          <h2>Чем умнее ИИ, тем ценнее живой след</h2>
        </div>
        <div className="manifesto-list">
          {manifesto.map((item, index) => (
            <motion.div
              key={item}
              className="manifesto-item"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="shell duality-section">
        <article className="duality-card human-card">
          <div className="duality-badge"><HandHeart size={16} /> Человек</div>
          <h3>Чувствует, сомневается, прикасается</h3>
          <p>На человеческих страницах интерфейс отвечает теплом: след остаётся, ритм сбивается, движение ощущается телесным.</p>
          <Link to="/touch" className="footer-mini-link">Перейти в тёплую сторону</Link>
        </article>
        <article className="duality-card ai-card">
          <div className="duality-badge"><Cpu size={16} /> ИИ</div>
          <h3>Повторяет форму, но не проживает её</h3>
          <p>На страницах про ИИ действия становятся жёстче: система исправляет, выравнивает, гасит жест и будто отталкивает руку.</p>
          <Link to="/stories" className="footer-mini-link">Посмотреть контраст</Link>
        </article>
      </section>

      <section className="shell interaction-lab reduced-lab">
        <div>
          <p className="eyebrow">Живое вмешательство</p>
          <h2>Выбери человеческое качество</h2>
          <p className="lead small">Одно слово меняет настроение сцены. Не поток блоков, а один спокойный жест — чтобы экран дышал свободнее.</p>
          <div className="chip-row">
            {words.map((word) => (
              <button key={word} className={`word-chip ${activeWord === word ? 'active' : ''}`} onClick={() => setActiveWord(word)}>
                {word}
              </button>
            ))}
          </div>
        </div>
        <div className={`presence-stage stage-${activeWord}`}>
          <div className="presence-orb" />
          <div className="presence-copy">
            <span><Flame size={16} /> активное качество</span>
            <strong>{activeWord}</strong>
            <p>Интерфейс становится не просто красивым, а отзывчивым. Как будто по ту сторону есть кто-то живой.</p>
          </div>
        </div>
      </section>

      <section className="shell split-section home-final-split">
        <div>
          <p className="eyebrow">Тихий жест</p>
          <h2>Оставь неидеальный след</h2>
          <p className="lead small">
            Проведи курсором по полю. След появляется мягко и исчезает не сразу — как присутствие, которое не хочется стирать.
          </p>
          <div className="icon-row">
            <span><PenTool size={16} /> Почерк</span>
            <span><Heart size={16} /> Эмоция</span>
            <span><AudioLines size={16} /> Дыхание</span>
            <span><MousePointer2 size={16} /> Реакция</span>
          </div>
        </div>
        <div className="drawing-board" onMouseMove={draw}>
          <div className="board-tip">Здесь след остаётся</div>
          {lines.map((line) => (
            <span key={line.id} className="trail-dot" style={{ left: `${line.x}%`, top: `${line.y}%` }} />
          ))}
        </div>
      </section>

      <section className="shell quote-grid quote-grid-single">
        <QuoteBlock quote="Идеальное перестало удивлять. Теперь удивляет живое." author="Манифест проекта" />
      </section>

      <CTA
        title="Продолжить путь"
        text="Дальше — главы, где контраст между человеком и машиной становится уже не словами, а опытом взаимодействия."
        to="/mistakes"
        label="Смотреть главы"
      />
    </>
  )
}
