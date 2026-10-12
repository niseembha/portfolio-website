import { education, honors } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

function SchoolAcademics({ item }) {
  return (
    <article className="school-academics" data-reveal aria-label={`${item.title} academics`}>
      <div className="school-academics__intro">
        <a className="school-image-link image-destination" href={item.href} target="_blank" rel="noreferrer" aria-label={`Visit ${item.title}`}>
          <img src={item.image} alt={item.alt} loading="lazy" />
        </a>
        <p className="detail-label">{item.label} · {item.location}</p>
        <h3>{item.title}</h3>
        <p className="school-coursework">{item.text}</p>
        {item.activity && <p className="school-coursework">{item.activity}</p>}
        <a className="education-link" href={item.href} target="_blank" rel="noreferrer">
          Visit school <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="school-academics__details">
        <div className="academic-sat">
          <h4 className="detail-label">SAT · Superscore</h4>
          <p className="academic-score">{item.sat.total}</p>
          <p>{item.sat.readingWriting} Reading &amp; Writing · {item.sat.math} Math</p>
        </div>
        <div className="academic-ap">
          <h4 className="detail-label">AP exam scores</h4>
          <dl>
            {item.apScores.map(({ course, score }) => (
              <div key={course}><dt>{course}</dt><dd>{score}</dd></div>
            ))}
          </dl>
          <p className="academic-note">{item.apNote}</p>
        </div>
        <div className="academic-recognition">
          <h4 className="detail-label">Academic recognition · Greenhill School</h4>
          {item.recognition.map((recognition) => <p key={recognition}>{recognition}</p>)}
        </div>
      </div>
    </article>
  )
}

export function HonorsRecognition() {
  return (
    <section className="honors-recognition" aria-labelledby="honors-title">
      <div className="honors-heading" data-reveal>
        <p className="detail-label">External awards</p>
        <h2 id="honors-title">Honors &amp; Recognition</h2>
      </div>
      <ol className="honors-list">
        {honors.map((honor, index) => (
          <li key={honor.title} data-reveal>
            <span className="honor-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{honor.title}</h3><p>{honor.context}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function EducationGrid({ items = education }) {
  return (
    <div className="education-grid">
      {items.map((item, index) => item.sat ? <SchoolAcademics item={item} key={item.title} /> : (
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
        <HonorsRecognition />
      </div>
    </section>
  )
}
