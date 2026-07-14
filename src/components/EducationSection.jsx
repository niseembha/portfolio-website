import { education } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

export function EducationGrid({ items = education }) {
  return (
    <div className="education-grid">
      {items.map((item, index) => (
        <a
          className="education-card"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          key={item.title}
          data-reveal
        >
          <div className="education-card__media">
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className="education-card__body">
            <p>{item.label}</p>
            <h3>{item.title}</h3>
            <span>{item.text}</span>
            <div className="education-link">
              {index === 0 ? 'Visit school' : 'View certificate'} <ArrowUpRight size={16} />
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export function EducationSection() {
  return (
    <section className="education-section section-pad" id="education" aria-labelledby="education-title">
      <div className="shell">
        <div className="section-heading education-heading" data-reveal>
          <div className="section-kicker">
            <span>04</span>
            <p>Learning loop</p>
          </div>
          <h2 id="education-title">Learn. Test. Build again.</h2>
          <div className="section-heading__aside">
            <p>
              A foundation in rigorous coursework, strengthened by putting new ideas directly into
              working systems.
            </p>
            <a className="archive-link" href="#/education">
              View all education <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <EducationGrid />
      </div>
    </section>
  )
}
