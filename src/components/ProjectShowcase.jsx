import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/portfolio.js'
import { ArrowUpRight, CloseIcon } from './Icons.jsx'

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
        <img src={project.image} alt={project.alt} loading="lazy" />
        <span className="project-card__index">{project.index}</span>
        {project.award && <span className="project-award">Winner · {project.award}</span>}
        {project.metric && <span className="project-metric">{project.metric}</span>}
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.kicker}</span>
          <span>{project.date}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
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
      className={`project-dialog tone-${project.tone}`}
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
          <img src={project.image} alt={project.alt} />
        </div>
        <div className="project-dialog__content">
          <div>
            <p className="eyebrow">{project.kicker}</p>
            <h2 id={`dialog-${project.id}`}>{project.title}</h2>
            <p className="project-dialog__summary">{project.summary}</p>
          </div>
          <div className="project-dialog__details">
            <p className="detail-label">Inside the build</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
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
            <span>01</span>
            <p>Selected systems</p>
          </div>
          <h2 id="projects-title">Built where the stakes get real.</h2>
          <div className="section-heading__aside">
            <p>
              A focused selection across clinical AI, healthcare research, and grant access. Open
              each one for the thinking behind the build.
            </p>
            <a className="archive-link" href="#/projects">
              View all projects <ArrowUpRight size={18} />
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
