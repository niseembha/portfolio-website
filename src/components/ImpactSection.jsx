import { tableOfHopeImage } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

export function ImpactSection() {
  return (
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="impact-grid" aria-hidden="true" />
      <div className="shell impact-inner">
        <div className="impact-top" data-reveal>
          <div className="section-kicker section-kicker-impact">
            <span>03</span>
            <p>Beyond the screen</p>
          </div>
          <img src={tableOfHopeImage} alt="Table of Hope Dallas seal" loading="lazy" />
        </div>
        <div className="impact-statement" data-reveal>
          <p>Some problems need code.</p>
          <h2 id="impact-title">Others need people around a table.</h2>
        </div>
        <div className="impact-bottom" data-reveal>
          <div className="impact-story">
            <p>
              In 2025, I co-founded Table of Hope Dallas around a simple idea: prepare fresh meals,
              deliver them with care, and bring more people into the work. I also designed and
              launched the organization’s public website.
            </p>
            <a href="https://tableofhopedallas.org/" target="_blank" rel="noreferrer">
              Visit Table of Hope <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="impact-stats" aria-label="Table of Hope community impact">
            <div>
              <strong>1,000+</strong>
              <span>meals prepared & distributed with volunteers</span>
            </div>
            <div>
              <strong>$4,000+</strong>
              <span>raised to support operations & outreach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
