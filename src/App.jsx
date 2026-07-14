import { useEffect, useState } from 'react'
import { AboutContact } from './components/AboutContact.jsx'
import { EducationArchive, ExperienceArchive, ProjectsArchive } from './components/ArchivePages.jsx'
import { CapabilitiesSection } from './components/CapabilitiesSection.jsx'
import { EducationSection } from './components/EducationSection.jsx'
import { ExperienceSection } from './components/ExperienceSection.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { ImpactSection } from './components/ImpactSection.jsx'
import { PatternSection } from './components/PatternSection.jsx'
import { ProjectShowcase } from './components/ProjectShowcase.jsx'
import { ScrollProgress } from './components/ScrollProgress.jsx'
import { useReveal } from './hooks/useReveal.js'

const getRoute = () => {
  if (window.location.hash.startsWith('#/projects')) return 'projects'
  if (window.location.hash.startsWith('#/experience')) return 'experience'
  if (window.location.hash.startsWith('#/education')) return 'education'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  useReveal(route)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    const titles = {
      home: 'Niseem Bhattacharya — AI, Systems & Impact',
      projects: 'All Projects — Niseem Bhattacharya',
      experience: 'All Experience — Niseem Bhattacharya',
      education: 'All Education — Niseem Bhattacharya',
    }
    document.title = titles[route]

    if (route !== 'home') {
      window.scrollTo(0, 0)
      return
    }

    const targetId = window.location.hash.slice(1)
    if (!targetId || targetId.startsWith('/')) return
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })
  }, [route])

  const page = route === 'projects'
    ? <ProjectsArchive />
    : route === 'experience'
      ? <ExperienceArchive />
      : route === 'education'
        ? <EducationArchive />
      : (
        <>
          <Hero />
          <PatternSection />
          <ProjectShowcase />
          <ExperienceSection />
          <ImpactSection />
          <EducationSection />
          <CapabilitiesSection />
          <AboutContact />
        </>
      )

  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" key={route}>{page}</main>
      <Footer />
    </>
  )
}
