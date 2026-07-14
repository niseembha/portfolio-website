import { links, profileImage } from '../data/portfolio.js'
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from './Icons.jsx'

export function AboutContact() {
  return (
    <>
      <section className="about-section section-pad" id="about" aria-labelledby="about-title">
        <div className="shell about-layout">
          <div className="about-portrait" data-reveal>
            <div className="portrait-frame">
              <img src={profileImage} alt="Niseem Bhattacharya" loading="lazy" />
              <span aria-hidden="true">NB / 26</span>
            </div>
            <p>Dallas, Texas</p>
          </div>
          <div className="about-copy" data-reveal>
            <div className="section-kicker">
              <span>06</span>
              <p>A little more human</p>
            </div>
            <h2 id="about-title">Curious enough to start. Persistent enough to finish.</h2>
            <div className="about-columns">
              <p>
                I’m Niseem Bhattacharya, a student engineer who likes turning unfamiliar problems
                into useful technology. The common thread is curiosity: understanding how a system
                works, then seeing how far I can push it.
              </p>
              <p>
                Off-screen, I’m usually watching a movie, gaming, getting food with friends, or
                playing basketball or golf. I’m always looking for the next hard problem—and the
                right people to tackle it with.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true">
          <span>BUILD · QUESTION · LEARN · SHIP · </span>
        </div>
        <div className="shell contact-inner" data-reveal>
          <p className="eyebrow">Have an ambitious idea?</p>
          <h2 id="contact-title">Let’s make it useful.</h2>
          <a className="contact-email" href={links.email}>
            niseem2008@gmail.com <ArrowUpRight size={36} />
          </a>
          <div className="contact-links">
            <a href={links.github} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={links.email}>
              <MailIcon /> Email
            </a>
            <a href={links.resume} target="_blank" rel="noreferrer">
              Résumé <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
