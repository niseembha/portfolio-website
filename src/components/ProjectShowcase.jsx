import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/portfolio.js'
import { ArrowUpRight, CloseIcon } from './Icons.jsx'

function AppScreenViewer({ project, onClose }) {
  const dialogRef = useRef(null)
  const touchStart = useRef(null)
  const [index, setIndex] = useState(0)
  const screen = project.screenshots[index]
  const navigate = (step) => setIndex((current) => (current + step + project.screenshots.length) % project.screenshots.length)

  useEffect(() => {
    const dialog = dialogRef.current
    const alreadyLocked = document.body.classList.contains('dialog-open')
    dialog.showModal()
    document.body.classList.add('dialog-open')
    return () => {
      if (!alreadyLocked) document.body.classList.remove('dialog-open')
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="app-screen-viewer"
      aria-labelledby="app-screen-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close() }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          navigate(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <div className="app-screen-viewer__panel">
        <div className="app-screen-viewer__header">
          <h2 id="app-screen-title">{project.title} · App screens</h2>
          <form method="dialog">
            <button type="submit" aria-label="Close app screens" autoFocus><CloseIcon /></button>
          </form>
        </div>
        <figure
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return
            const distance = touchStart.current - event.changedTouches[0].clientX
            if (Math.abs(distance) > 50) navigate(distance > 0 ? 1 : -1)
            touchStart.current = null
          }}
        >
          <img src={screen.image} alt={screen.alt} />
          <figcaption aria-live="polite">{screen.caption}</figcaption>
        </figure>
        <div className="app-screen-viewer__controls">
          <button type="button" onClick={() => navigate(-1)} aria-label="Previous app screen">← Previous</button>
          <span aria-live="polite">{index + 1} / {project.screenshots.length}</span>
          <button type="button" onClick={() => navigate(1)} aria-label="Next app screen">Next →</button>
        </div>
      </div>
    </dialog>
  )
}

function ProjectSupportingVisuals({ project }) {
  const [showScreens, setShowScreens] = useState(false)

  return (
    <div className="app-showcase">
      <dl className="project-stats" aria-label="Research and model evaluation metrics">
        {project.stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <button className="app-screens-link" type="button" aria-haspopup="dialog" onClick={() => setShowScreens(true)}>
        View app screens <ArrowUpRight size={15} />
      </button>
      {showScreens && <AppScreenViewer project={project} onClose={() => setShowScreens(false)} />}
    </div>
  )
}

function ResearchFigures({ figures, label }) {
  return (
    <div className="research-figures" role="group" aria-label={label}>
      {figures.map((figure) => (
        <figure key={figure.image}>
          <p className="detail-label">{figure.label}</p>
          <img src={figure.image} alt={figure.alt} loading="lazy" />
          <figcaption>{figure.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function ProjectHero({ project }) {
  return project.comparison
    ? <ResearchFigures figures={project.comparison} label="RF chirp detection at higher and lower signal-to-noise ratios" />
    : <img src={project.image} alt={project.alt} loading="lazy" />
}

export function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--card-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current.style.setProperty('--card-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <article
      ref={cardRef}
      className={`project-card project-${project.id} tone-${project.tone}`}
      onPointerMove={handlePointerMove}
      data-reveal
    >
      <div className="project-card__media">
        <ProjectHero project={project} />
        <span className="project-card__index">{project.index}</span>
        {project.award && <span className="project-award">Winner · {project.award}</span>}
        {project.metric && <span className="project-metric">{project.metric}</span>}
        <button
          className="project-image-link"
          type="button"
          aria-label={`Explore ${project.title}`}
          aria-haspopup="dialog"
          onClick={() => onOpen(project)}
        />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.kicker}</span>
          <span>{project.date}</span>
        </div>
        <h3>{project.title}</h3>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        <p>{project.summary}</p>
        {project.affiliation && <p className="project-affiliation">{project.affiliation}</p>}
        <div className="project-card__footer">
          <ul aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <button className="project-open" type="button" onClick={() => onOpen(project)}>
            Explore system <ArrowUpRight size={18} />
          </button>
        </div>
        {project.screenshots && <ProjectSupportingVisuals project={project} />}
      </div>
    </article>
  )
}

export function ProjectDialog({ project, onClose, total = projects.length }) {
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
      className={`project-dialog project-${project.id} tone-${project.tone}`}
      ref={dialogRef}
      onClose={onClose}
      onClick={closeOnBackdrop}
      aria-labelledby={`dialog-${project.id}`}
    >
      <div className="project-dialog__panel">
        <div className="project-dialog__topline">
          <span>{project.index} / {String(total).padStart(2, '0')}</span>
          <form method="dialog">
            <button type="submit" aria-label={`Close ${project.title} details`}>
              <CloseIcon />
            </button>
          </form>
        </div>
        <div className="project-dialog__media">
          <ProjectHero project={project} />
        </div>
        <div className="project-dialog__content">
          <div>
            <p className="eyebrow">{project.kicker}</p>
            <h2 id={`dialog-${project.id}`}>{project.title}</h2>
            {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
            <p className="project-dialog__summary">{project.summary}</p>
            {project.affiliation && <p className="project-affiliation">{project.affiliation}</p>}
            {project.progression && <p className="research-progression">{project.progression}</p>}
          </div>
          <div className="project-dialog__details">
            <p className="detail-label">Inside the build</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            {project.screeningNote && <p className="screening-note">{project.screeningNote}</p>}
            {project.researchNote && <p className="research-note">{project.researchNote}</p>}
            {(project.screenshots || project.comparison) && <ul className="project-tech" aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
            {project.links.length > 0 ? (
              <div className="dialog-links">
                {project.links.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.label} <ArrowUpRight size={17} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="no-public-link">Private build · No public project link</p>
            )}
          </div>
        </div>
        {project.screenshots && <ProjectSupportingVisuals project={project} />}
        {project.supportingFigures && <div className="research-support"><p className="detail-label">From clean signal to noisy detection</p><ResearchFigures figures={project.supportingFigures} label="Clean and noisy chirps in the time domain" /></div>}
      </div>
    </dialog>
  )
}

export function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(null)
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section className="projects-section section-pad" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div className="section-kicker">
            <span>02</span>
            <p>Selected systems</p>
          </div>
          <h2 id="projects-title">Built where the stakes get real.</h2>
          <div className="section-heading__aside">
            <p>
              A focused selection across clinical AI, healthcare research, and electrical engineering. Open
              each one for the thinking behind the build.
            </p>
            <a className="archive-link" href="#/projects">
              All projects <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard project={project} onOpen={setActiveProject} key={project.id} />
          ))}
        </div>
      </div>
      {activeProject && (
        <ProjectDialog
          project={activeProject}
          total={featuredProjects.length}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}
