import { useState } from 'react'
import { links } from '../data/portfolio.js'
import { ArrowDown, ArrowUpRight } from './Icons.jsx'
import { CursorRobot } from './CursorRobot.jsx'
import { SignalResolve } from './SignalResolve.jsx'

export function Hero() {
  const [resolved, setResolved] = useState(false)

  return (
    <section className={`hero ${resolved ? 'is-resolved' : ''}`} id="top" aria-labelledby="hero-heading">
      <SignalResolve onResolved={() => setResolved(true)} />
      <CursorRobot />
      <div className="hero-meta" aria-hidden="true">
        <span>Niseem Bhattacharya</span>
        <span>Dallas, TX · Class of 2027</span>
      </div>
      <div className="hero-wordmark-fallback" aria-hidden="true">
        NISEEM
      </div>
      <div className="hero-resolved-line" aria-live="polite">
        {resolved ? 'Signal resolved — Niseem Bhattacharya' : ''}
      </div>
      <div className="hero-copy shell">
        <div>
          <p className="eyebrow">Student engineer · AI + impact</p>
          <h1 id="hero-heading">I build the layer between signal and action.</h1>
        </div>
        <div className="hero-intro">
          <p>
            AI, machine learning, and full-stack systems across healthcare, research, automation,
            and community impact.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#projects">
              Explore projects <ArrowDown size={16} />
            </a>
            <a className="button button-ghost" href={links.resume} target="_blank" rel="noreferrer">
              Open résumé <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true">
        <span>Portfolio / 2026</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
