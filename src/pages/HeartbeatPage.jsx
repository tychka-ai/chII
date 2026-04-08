import React, { useEffect, useMemo, useState } from 'react'
import { HeartPulse, Mic, TimerReset, PencilLine, Hand } from 'lucide-react'
import { SectionIntro } from '../components/Shared'

export default function HeartbeatPage() {
  const [bpm, setBpm] = useState(76)
  const [strokes, setStrokes] = useState([])
  const [taps, setTaps] = useState([])

  useEffect(() => {
    const id = setInterval(() => {
      setBpm((prev) => Math.max(64, Math.min(108, prev + Math.floor(Math.random() * 7) - 3)))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const graph = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({ id: i, height: 14 + ((i * 17 + bpm) % 58) })),
    [bpm],
  )

  const draw = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setStrokes((prev) => [...prev.slice(-50), { x, y, id: crypto.randomUUID() }])
  }

  const tapBeat = () => {
    const now = Date.now()
    setTaps((prev) => {
      const next = [...prev.filter((t) => now - t < 4000), now]
      if (next.length >= 2) {
        const intervals = next.slice(1).map((t, i) => t - next[i])
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
        setBpm(Math.max(50, Math.min(140, Math.round(60000 / avg))))
      }
      return next
    })
  }

  return (
    <>
      <section className="shell page-section">
        <SectionIntro
          eyebrow="Глава 4"
          title="Пульс"
          text="Даже если датчики и камера отключены, сайт может напоминать о самом важном: у живого всегда есть ритм, сбивка и дыхание."
        />
      </section>

      <section className="shell heartbeat-layout">
        <div className="heartbeat-card big">
          <div className="heartbeat-circle" style={{ animationDuration: `${60 / bpm}s` }}>
            <HeartPulse size={40} />
          </div>
          <div>
            <p className="eyebrow">Имитация пульса</p>
            <h2>{bpm} BPM</h2>
            <p>Ритм слегка меняется каждые несколько секунд, чтобы интерфейс не ощущался заранее рассчитанным.</p>
          </div>
        </div>
        <div className="heartbeat-stack">
          <article className="heartbeat-card">
            <Mic size={18} />
            <h3>Настоящий звук</h3>
            <p>Шуршание бумаги, вдох, смех, тишина и скрип карандаша звучат убедительнее любой синтетики.</p>
          </article>
          <article className="heartbeat-card">
            <TimerReset size={18} />
            <h3>Случайный ритм</h3>
            <p>Небольшая вариативность делает каждую сессию чуть другой. Именно так цифровое перестаёт быть бездушным.</p>
          </article>
        </div>
      </section>

      <section className="shell tap-lab">
        <div>
          <p className="eyebrow">Взаимодействие</p>
          <h2>Отстучи свой ритм</h2>
          <p className="lead small">Нажимай по панели несколько раз подряд. Сайт поймает темп и перестроит пульс под пользователя.</p>
        </div>
        <button className="tap-panel" onClick={tapBeat}>
          <Hand size={18} />
          Коснись экрана
        </button>
      </section>

      <section className="shell pulse-graph-card">
        <p className="eyebrow">Ритм экрана</p>
        <div className="pulse-graph">
          {graph.map((item) => (
            <span key={item.id} style={{ height: item.height }} />
          ))}
        </div>
      </section>

      <section className="shell final-canvas">
        <div>
          <p className="eyebrow">Manifesto</p>
          <h2>Создай сегодня что-то неидеальное</h2>
          <p className="lead small">
            Пусть это будет кривой набросок, честный абзац, неровная кнопка или письмо, написанное не по шаблону.
          </p>
          <div className="icon-row">
            <span><PencilLine size={16} /> Рисуй</span>
            <span><HeartPulse size={16} /> Дыши</span>
          </div>
        </div>
        <div className="blank-sheet" onMouseMove={draw}>
          <span>Белый лист</span>
          <strong>Твоё человеческое начинается здесь.</strong>
          {strokes.map((line) => (
            <span key={line.id} className="mini-stroke" style={{ left: `${line.x}%`, top: `${line.y}%` }} />
          ))}
        </div>
      </section>
    </>
  )
}
