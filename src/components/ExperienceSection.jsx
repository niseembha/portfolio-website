import { useEffect, useRef, useState } from 'react'
import { experience } from '../data/portfolio.js'
import { ArrowUpRight, CloseIcon } from './Icons.jsx'

export function ExperienceDialog({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('dialog-open')
    return () => document.body.classList.remove('dialog-open')
  }, [])

  const closeOnBackdrop = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      className="project-dialog experience-dialog"
      ref={dialogRef}
      onClose={onClose}
      onClick={closeOnBackdrop}
      aria-labelledby={`experience-dialog-${item.id}`}
    >
      <div className="project-dialog__panel">
        <div className="project-dialog__topline">
          <span>{item.program} · {item.date}</span>
          <form method="dialog">
            <button type="submit" aria-label={`Close ${item.company} research details`}>
              <CloseIcon />
            </button>
          </form>
        </div>

        <div className="experience-dialog__hero">
          <img src={item.detail.hero.image} alt={item.detail.hero.alt} />
          <p>Research poster session · UT Southwestern Medical Center</p>
        </div>

        <div className="experience-dialog__intro">
          <div>
            <p className="eyebrow">{item.detail.eyebrow}</p>
            <h2 id={`experience-dialog-${item.id}`}>{item.detail.title}</h2>
            <p className="experience-dialog__overview">{item.detail.overview}</p>
          </div>
          <dl className="experience-dialog__facts">
            <div>
              <dt>Role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Lab</dt>
              <dd>{item.lab}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{item.place}</dd>
            </div>
          </dl>
        </div>

        <section className="experience-dialog__research" aria-labelledby="research-arc-title">
          <p className="detail-label" id="research-arc-title">Research arc</p>
          <div className="experience-dialog__steps">
            {item.detail.sections.map((section, index) => (
              <article key={section.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{section.label}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-dialog__results" aria-labelledby="results-title">
          <div className="experience-dialog__results-heading">
            <div>
              <p className="detail-label">Results</p>
              <h3 id="results-title">Computational candidates, ready for experimental testing.</h3>
            </div>
            <p>
              These figures describe predicted designs and docking hits—not experimentally validated
              binders or a clinical treatment.
            </p>
          </div>
          <div className="experience-dialog__metrics">
            {item.detail.results.map((result) => (
              <div key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>
          <ul className="experience-dialog__tools" aria-label="Research tools">
            {item.detail.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </section>

        <section className="experience-dialog__communication" aria-labelledby="communication-title">
          <div className="experience-dialog__section-heading">
            <p className="detail-label">Research communication</p>
            <h3 id="communication-title">From reproducible workflows to scientific Q&amp;A.</h3>
            <p>
              Presented the project at the STARS research poster session after documenting both
              protein-design workflows for future researchers in the lab.
            </p>
          </div>
          <div className="experience-dialog__gallery">
            <figure>
              <img
                src={item.detail.presentation.image}
                alt={item.detail.presentation.alt}
                loading="lazy"
              />
              <figcaption>Presenting the project during the STARS poster session.</figcaption>
            </figure>
            <figure className="experience-dialog__poster">
              <a
                href={item.detail.poster.image}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the full STARS research poster in a new tab"
              >
                <img src={item.detail.poster.image} alt={item.detail.poster.alt} loading="lazy" />
              </a>
              <figcaption>
                The final research poster. <a href={item.detail.poster.image} target="_blank" rel="noreferrer">Open full size <ArrowUpRight size={14} /></a>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </dialog>
  )
}

export function ExperienceList({ items = experience }) {
  const [activeExperience, setActiveExperience] = useState(null)

  return (
    <>
      <div className="experience-list">
        {items.map((item, index) => (
          <article className={`experience-item experience-${item.id}`} data-reveal key={item.id}>
            <div className="experience-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="experience-logo">
              {item.detail ? (
                <button className="image-destination" type="button" aria-label={`Explore ${item.company} research`} aria-haspopup="dialog" onClick={() => setActiveExperience(item)}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </button>
              ) : item.href ? (
                <a className="image-destination" href={item.href} target="_blank" rel="noreferrer" aria-label={`Visit ${item.company}`}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </a>
              ) : <img src={item.image} alt={item.alt} loading="lazy" />}
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
                <div className="experience-actions">
                  {item.detail && (
                    <button className="experience-open" type="button" onClick={() => setActiveExperience(item)}>
                      Explore research <ArrowUpRight size={16} />
                    </button>
                  )}
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Visit ${item.company}`}>
                      Visit company <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {activeExperience && (
        <ExperienceDialog item={activeExperience} onClose={() => setActiveExperience(null)} />
      )}
    </>
  )
}

export function ExperienceSection() {
  return (
    <section className="experience-section section-pad" id="experience" aria-labelledby="experience-title">
      <div className="shell experience-layout">
        <div className="experience-intro" data-reveal>
          <div className="section-kicker section-kicker-dark">
            <span>01</span>
            <p>Experience</p>
          </div>
          <h2 id="experience-title">Where systems met real constraints.</h2>
          <p>
            Research and production work across computational biology, AI, and data systems—turning
            ambiguous questions into reproducible technical workflows.
          </p>
          <a className="archive-link archive-link-dark" href="#/experience">
            All work experiences <ArrowUpRight size={18} />
          </a>
        </div>
        <ExperienceList items={experience} />
      </div>
    </section>
  )
}
