import { experience } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

export function ExperienceList({ items = experience }) {
  return (
    <div className="experience-list">
      {items.map((item, index) => (
        <article className="experience-item" data-reveal key={item.company}>
          <div className="experience-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="experience-logo">
            <img src={item.image} alt={item.alt} loading="lazy" />
          </div>
          <div className="experience-main">
            <div className="experience-title-row">
              <div>
                <p>{item.role}</p>
                <h3>{item.company}</h3>
              </div>
              <div className="experience-date">
                <span>{item.date}</span>
                <span>{item.place}</span>
              </div>
            </div>
            <p className="experience-summary">{item.summary}</p>
            <div className="experience-footer">
              <ul>
                {item.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Visit ${item.company}`}>
                Visit company <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section className="experience-section section-pad" id="experience" aria-labelledby="experience-title">
      <div className="shell experience-layout">
        <div className="experience-intro" data-reveal>
          <div className="section-kicker section-kicker-dark">
            <span>02</span>
            <p>Experience</p>
          </div>
          <h2 id="experience-title">Where systems met real constraints.</h2>
          <p>
            Production-minded work with messy data, overlapping sources, authenticated access, and
            users who needed answers—not demos.
          </p>
          <a className="archive-link archive-link-dark" href="#/experience">
            View all experience <ArrowUpRight size={18} />
          </a>
        </div>
        <ExperienceList />
      </div>
    </section>
  )
}
