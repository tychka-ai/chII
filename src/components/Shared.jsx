import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function SectionIntro({ eyebrow, title, text, action }) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        {title}
      </motion.h1>
      <motion.p className="lead" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }}>
        {text}
      </motion.p>
      {action && (
        <Link className="primary-link" to={action.to}>
          {action.label}
        </Link>
      )}
    </div>
  )
}

export function Card({ title, text, index = 0, meta, icon }) {
  return (
    <motion.article
      className="glass-card"
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
    >
      {icon && <div className="card-icon">{icon}</div>}
      {meta && <p className="card-meta">{meta}</p>}
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  )
}

export function QuoteBlock({ quote, author }) {
  return (
    <motion.blockquote className="quote-block" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}>
      <p>“{quote}”</p>
      <footer>{author}</footer>
    </motion.blockquote>
  )
}

export function CTA({ title, text, to, label }) {
  return (
    <section className="cta-box shell">
      <div>
        <p className="eyebrow">Следующий шаг</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link to={to} className="primary-link">
        {label} <ArrowRight size={16} />
      </Link>
    </section>
  )
}
