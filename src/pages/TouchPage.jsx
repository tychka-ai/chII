import React, { useMemo, useState } from 'react'
import { Hand, Layers3, Waves, MoveRight, TriangleAlert, Cpu, HeartHandshake } from 'lucide-react'
import { SectionIntro, CTA } from '../components/Shared'

const aiPhrases = [
  'линия нормализована',
  'жест отклонён',
  'слишком человечески',
  'система выпрямила след',
  'сердце не найдено',
]

export default function TouchPage() {
  const [ripples, setRipples] = useState([])
  const [aiHits, setAiHits] = useState([])
  const [shake, setShake] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  const currentMessage = useMemo(() => aiPhrases[messageIndex % aiPhrases.length], [messageIndex])

  const makeRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setRipples((prev) => [...prev.slice(-8), { id: crypto.randomUUID(), x, y }])
  }

  const rejectTouch = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setAiHits((prev) => [...prev.slice(-10), { id: crypto.randomUUID(), x, y }])
    setMessageIndex((prev) => prev + 1)
    setShake(true)
    window.clearTimeout(window.__aiShakeTimer)
    window.__aiShakeTimer = window.setTimeout(() => setShake(false), 360)
  }

  return (
    <>
      <section className="shell page-section">
        <SectionIntro
          eyebrow="Глава 2"
          title="Прикосновение"
          text="Цифровой мир может быть тёплым. Но он может быть и холодным. Самое важное отличие — отвечает ли он на прикосновение как материя или отталкивает руку как система."
        />
      </section>

      <section className="shell tactile-grid">
        <div className="texture-card paper-texture">
          <Layers3 size={20} />
          <h3>Бумага</h3>
          <p>Мягкая фактура, тёплый фон и живое зерно делают экран менее стеклянным и более телесным.</p>
        </div>
        <div className="texture-card fabric-texture">
          <Hand size={20} />
          <h3>Ткань</h3>
          <p>Слои, тени и лёгкая непредсказуемость создают впечатление вещи, к которой хочется прикоснуться.</p>
        </div>
        <div className="texture-card wave-texture">
          <Waves size={20} />
          <h3>Сопротивление</h3>
          <p>Скролл и движение могут ощущаться не как безупречный easing, а как инерция, дыхание и живая физика.</p>
        </div>
      </section>

      <section className="shell compare-touch-stage">
        <div className="touch-column human-touch-column" onMouseMove={makeRipple}>
          <div className="compare-head">
            <span className="compare-badge human-badge"><HeartHandshake size={16} /> Человек</span>
            <h2>Здесь жест принимают</h2>
            <p className="lead small">Проведи курсором. Касание рождает круги, как будто поверхность действительно помнит тебя.</p>
          </div>
          <div className="touch-surface human-surface">
            <div className="surface-label">чувствительная поверхность</div>
            {ripples.map((ripple) => (
              <span key={ripple.id} className="ripple" style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }} />
            ))}
          </div>
        </div>

        <div className={`touch-column ai-touch-column ${shake ? 'is-shaking' : ''}`} onMouseMove={rejectTouch}>
          <div className="compare-head">
            <span className="compare-badge ai-badge"><Cpu size={16} /> ИИ</span>
            <h2>Здесь руку выпрямляют</h2>
            <p className="lead small">Попробуй сделать тот же жест. Экран дёргается, след не остаётся, а система будто говорит: «нет, так нельзя».</p>
          </div>
          <div className="touch-surface ai-surface">
            <div className="surface-label">холодный интерфейс</div>
            <div className="ai-warning">
              <TriangleAlert size={18} />
              <strong>{currentMessage}</strong>
              <span>смотрите, как вас заменяет — и даже нет сердца</span>
            </div>
            {aiHits.map((hit) => (
              <span key={hit.id} className="reject-point" style={{ left: `${hit.x}%`, top: `${hit.y}%` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="shell split-section alt">
        <div className="sticky-note">
          <p className="eyebrow">Материальный интерфейс</p>
          <h2>Чем меньше стерильности, тем больше доверия</h2>
          <p>
            Когда экран отвечает мягко, появляется ощущение присутствия. Когда он только исправляет и нормализует,
            возникает дистанция. Именно на этой границе сегодня и различаются человек и машина.
          </p>
          <div className="note-actions"><MoveRight size={16} /> тёплая глубина вместо гладкой пустоты</div>
        </div>
        <div className="material-panel">
          <div className="material-blob blob-a" />
          <div className="material-blob blob-b" />
          <div className="material-blob blob-c" />
          <div className="material-label">живой слой</div>
        </div>
      </section>

      <CTA
        title="Дальше — личные истории"
        text="После прикосновения начинается самое болезненное сравнение: один и тот же момент в человеческой памяти и в сухом языке машины."
        to="/stories"
        label="Открыть «Истории»"
      />
    </>
  )
}
