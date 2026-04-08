import React, { useMemo, useState } from 'react'
import { BookOpenText, MessageCircleHeart, Quote, Cpu, Heart } from 'lucide-react'
import { SectionIntro, CTA } from '../components/Shared'

const stories = [
  {
    human: 'Я долго стоял у двери больницы и не мог войти. Не потому что боялся диагноза, а потому что внутри был человек, перед которым мне нужно было впервые заплакать.',
    ai: 'Пользователь испытывал тревожность перед посещением больницы и эмоциональное напряжение в связи с предстоящей встречей.',
  },
  {
    human: 'Она смеялась так громко, что я сразу понял: вот это и есть дом, даже если мы ещё совсем чужие.',
    ai: 'Смех собеседницы вызвал у автора ощущение комфорта и повышенного уровня эмоциональной безопасности.',
  },
]

export default function StoriesPage() {
  const [blend, setBlend] = useState(20)
  const current = useMemo(() => {
    if (blend < 33) return stories[0]
    if (blend < 66) return stories[1]
    return {
      human: 'Я помню не сам разговор, а то, как он замолчал посреди фразы и сжал кружку двумя руками. Именно тогда я понял, что ему страшно.',
      ai: 'Автор зафиксировал невербальные сигналы собеседника и интерпретировал их как проявление тревожности.',
    }
  }, [blend])

  return (
    <>
      <section className="shell page-section">
        <SectionIntro
          eyebrow="Глава 3"
          title="Истории, которые можем рассказать только мы"
          text="ИИ может пересказать событие, но ему недоступен внутренний вес момента. Он знает структуру текста, но не то, как память внезапно сжимает горло."
        />
      </section>

      <section className="shell stories-list">
        {stories.map((story, index) => (
          <article className="story-compare" key={index}>
            <div className="story-side human-story">
              <div className="story-head">
                <MessageCircleHeart size={18} />
                <span>Человеческая версия</span>
              </div>
              <p>{story.human}</p>
            </div>
            <div className="story-side ai-story">
              <div className="story-head">
                <BookOpenText size={18} />
                <span>Версия ИИ</span>
              </div>
              <p>{story.ai}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="shell emotional-bridge">
        <article className="bridge-card bridge-human">
          <span className="compare-badge human-badge"><Heart size={16} /> Человек</span>
          <h3>Запоминает лишнее</h3>
          <p>Не сам факт, а смех. Не тему разговора, а дрожь руки на кружке. Именно эти «лишние» детали и делают историю настоящей.</p>
        </article>
        <article className="bridge-card bridge-ai">
          <span className="compare-badge ai-badge"><Cpu size={16} /> ИИ</span>
          <h3>Оставляет только каркас</h3>
          <p>Содержание сохранено, но боль, неловкость, близость и случайная красота из текста уходят. Остаётся правильно — и пусто.</p>
        </article>
      </section>

      <section className="shell rewrite-lab">
        <div>
          <p className="eyebrow">Реакция на пользователя</p>
          <h2>Сдвигай ползунок от формы к чувству</h2>
          <p className="lead small">Чем правее ползунок, тем меньше сухого описания и тем больше памяти, телесности и интонации. Так текст словно возвращает себе сердце.</p>
          <input type="range" min="0" max="100" value={blend} onChange={(e) => setBlend(Number(e.target.value))} />
        </div>
        <div className="rewrite-preview">
          <div className="rewrite-layer ai-layer" style={{ opacity: 1 - blend / 100 }}>
            <span>форма</span>
            <p>{current.ai}</p>
          </div>
          <div className="rewrite-layer human-layer" style={{ opacity: 0.28 + blend / 100 }}>
            <span>чувство</span>
            <p>{current.human}</p>
          </div>
        </div>
      </section>

      <section className="shell stories-highlight">
        <Quote size={28} />
        <div>
          <p className="eyebrow">Главная мысль</p>
          <h2>У машины есть словарь. У человека — память.</h2>
          <p className="lead small">Поэтому подлинная история почти всегда ломает ритм, уходит в сторону и оставляет странные детали. В этом и есть её сила.</p>
        </div>
      </section>

      <CTA
        title="Финальная глава — пульс"
        text="После истории остаётся самое простое и самое важное: дыхание, ритм, живая задержка и ощущение, что по ту сторону экрана кто-то действительно есть."
        to="/heartbeat"
        label="Открыть «Пульс»"
      />
    </>
  )
}
