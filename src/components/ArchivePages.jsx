import { useState } from 'react'
import { education, experience, projects } from '../data/portfolio.js'
import { EducationGrid } from './EducationSection.jsx'
import { ArrowUpRight } from './Icons.jsx'
import { ExperienceList } from './ExperienceSection.jsx'
import { ProjectCard, ProjectDialog } from './ProjectShowcase.jsx'

function ArchiveHero({ index, eyebrow, title, summary, count, countLabel, backHref }) {
  return (
    <section className="archive-hero" id="top">
      <div className="archive-hero__grid" aria-hidden="true" />
      <div className="shell archive-hero__inner">
        <a className="archive-back" href={backHref}>
          <ArrowUpRight size={16} /> Back to selected
        </a>
        <div className="archive-hero__heading">
          <div className="section-kicker section-kicker-dark">
            <span>{index}</span>
            <p>{eyebrow}</p>
          </div>
          <h1>{title}</h1>
        </div>
        <div className="archive-hero__foot">
          <p>{summary}</p>
          <div className="archive-count">
            <strong>{String(count).padStart(2, '0')}</strong>
            <span>{countLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectsArchive() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <>
      <ArchiveHero
        index="01"
        eyebrow="Project archive"
        title={<>All projects.<br /><em>No filler.</em></>}
        summary="A growing archive of systems, experiments, research, and tools—featured work and the useful builds in between."
        count={projects.length}
        countLabel="Projects documented"
        backHref="#projects"
      />
      <section className="archive-projects section-pad" aria-label="All projects">
        <div className="shell">
          <div className="archive-section-label">
            <span>Index / {String(projects.length).padStart(2, '0')}</span>
            <span>Newest and featured first</span>
          </div>
          <div className="project-grid archive-project-grid">
            {projects.slice().sort((a, b) => Number(a.index) - Number(b.index)).map((project) => (
              <ProjectCard project={project} onOpen={setActiveProject} key={project.id} />
            ))}
          </div>
        </div>
        {activeProject && (
          <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </section>
    </>
  )
}

export function ExperienceArchive() {
  return (
    <>
      <ArchiveHero
        index="02"
        eyebrow="Experience archive"
        title={<>All experience.<br /><em>Real constraints.</em></>}
        summary="Every role, collaboration, and production environment that shaped how I turn ambiguous problems into reliable systems."
        count={experience.length}
        countLabel="Roles documented"
        backHref="#experience"
      />
      <section className="experience-section archive-experience section-pad" aria-label="All experience">
        <div className="shell archive-experience__layout">
          <div className="archive-section-label archive-section-label-dark">
            <span>Timeline / {String(experience.length).padStart(2, '0')}</span>
            <span>Most recent first</span>
          </div>
          <ExperienceList items={experience} />
        </div>
      </section>
    </>
  )
}

export function EducationArchive() {
  return (
    <>
      <ArchiveHero
        index="04"
        eyebrow="Education archive"
        title={<>All education.<br /><em>Always building.</em></>}
        summary="The schools, programs, and focused courses behind the technical foundation—and the projects used to put each lesson into practice."
        count={education.length}
        countLabel="Programs documented"
        backHref="#education"
      />
      <section className="education-section archive-education section-pad" aria-label="All education">
        <div className="shell">
          <div className="archive-section-label">
            <span>Learning index / {String(education.length).padStart(2, '0')}</span>
            <span>School, programs, and certificates</span>
          </div>
          <EducationGrid items={education} />
        </div>
      </section>
    </>
  )
}
