import React, { useMemo, useState } from 'react'
import { AlertCircle, ScanSearch, PencilLine, Baseline, Orbit, SlidersHorizontal } from 'lucide-react'
import { SectionIntro, Card, CTA } from '../components/Shared'

const items = [
  {
    title: 'Дрожание текста',
    text: 'Заголовки живут не как идеальные векторные формы, а как голос: чуть неровно, чуть телесно, чуть ближе.',
    meta: 'Микроанимация',
    icon: <Baseline size={18} />,
  },
  {
    title: 'Случайные паузы',
    text: 'Элементы появляются не математически ровно, а с человеческими задержками. Это делает интерфейс менее машинным.',
    meta: 'Тайминг',
    icon: <Orbit size={18} />,
  },
  {
    title: 'Неидеальные линии',
    text: 'Границы блоков и декоративные штрихи сохраняют ощущение ручной графики, а не лабораторной стерильности.',
    meta: 'Графика',
    icon: <PencilLine size={18} />,
  },
]

export default function MistakesPage() {
  const [chaos, setChaos] = useState(32)
  const wave = useMemo(() => Array.from({ length: 24 }, (_, i) => 30 + ((i * 13 + chaos) % 64)), [chaos])

  return (
    <>
      <section className="shell page-section">
        <SectionIntro
          eyebrow="Глава 1"
          title="Ошибки, которые мы любим"
          text="В мире автоматизации ошибка стала редкостью. Но именно она часто возвращает интерфейсу человечность, доверие и характер."
        />
        <div className="feature-banner glitch-soft">
          <div>
            <p>Ошибка здесь — не проблема.</p>
            <h2 style={{ transform: `translateX(${chaos / 18}px) rotate(${chaos / 90}deg)` }}>Это доказательство руки, памяти и присутствия.</h2>
          </div>
          <AlertCircle size={42} />
        </div>
      </section>

      <section className="shell cards-grid three-up">
        {items.map((item, index) => (
          <Card key={item.title} {...item} index={index} />
        ))}
      </section>

      <section className="shell imperfection-lab">
        <div>
          <p className="eyebrow">Лаборатория неровности</p>
          <h2>Добавь контролируемый сбой</h2>
          <p className="lead small">Передвинь ползунок. Сайт становится менее стерильным: шевелится заголовок, меняется ритм полос и усиливается ощущение ручной нестабильности.</p>
        </div>
        <div className="imperfection-panel">
          <label className="range-label"><SlidersHorizontal size={16} /> Уровень живого сбоя: <strong>{chaos}%</strong></label>
          <input type="range" min="0" max="100" value={chaos} onChange={(e) => setChaos(Number(e.target.value))} />
          <div className="mistake-preview" style={{ '--chaos': `${chaos / 100}` }}>
            <span className="ghost ghost-a">слишком ровно</span>
            <span className="ghost ghost-b">слишком быстро</span>
            <strong>теперь уже по-человечески</strong>
          </div>
        </div>
      </section>

      <section className="shell waveform-card">
        <div>
          <p className="eyebrow">Живой ритм интерфейса</p>
          <h2>Неровность как визуальный голос</h2>
          <p className="lead small">Идеальная сетка работает. Но живая сетка чувствуется. Поэтому тут есть дыхание, расхождения и мягкие сбои.</p>
        </div>
        <div className="waveform-bars">
          {wave.map((height, index) => (
            <span key={index} style={{ height }} />
          ))}
        </div>
      </section>

      <section className="shell process-grid">
        <article className="number-card">
          <ScanSearch size={20} />
          <span>01</span>
          <h3>Машина убирает шероховатость</h3>
          <p>Она очищает, выравнивает, нормализует, ускоряет. На выходе получается гладкая форма.</p>
        </article>
        <article className="number-card">
          <PencilLine size={20} />
          <span>02</span>
          <h3>Человек возвращает интонацию</h3>
          <p>Он оставляет лишнюю паузу, неровный след, несимметричное решение. Именно там появляется характер.</p>
        </article>
      </section>

      <CTA
        title="Дальше — тактильность"
        text="Следующая глава посвящена тому, как цифровая среда может ощущаться как бумага, ткань, воздух и тепло ладони."
        to="/touch"
        label="Открыть «Прикосновение»"
      />
    </>
  )
}
