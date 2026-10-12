import hornetHacksLogo from '../../assets/hornet-hacks.png'
import { tableOfHopeImage } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

export function ImpactSection() {
  return (
    <section className="impact-section initiatives-section" id="leadership" aria-labelledby="impact-title">
      <div className="impact-grid" aria-hidden="true" />
      <div className="shell initiatives-inner">
        <div className="initiatives-heading" data-reveal>
          <div className="section-kicker section-kicker-impact">
            <span>03</span>
            <p>Leadership &amp; Initiatives</p>
          </div>
          <h2 id="impact-title">Building with people.</h2>
          <p>Organizations and events I help found, organize, and lead.</p>
        </div>

        <article className="initiative initiative-hornethacks" data-reveal aria-labelledby="hornethacks-title">
          <a className="initiative-brand image-destination" href="https://hornethacks.com" target="_blank" rel="noreferrer" aria-label="Visit HornetHacks">
            <img src={hornetHacksLogo} alt="HornetHacks geometric bee logo in mint green and white" loading="lazy" />
          </a>
          <div className="initiative-content">
            <p className="detail-label">Hackathon · Leadership · Community</p>
            <h3 id="hornethacks-title">HornetHacks</h3>
            <p className="initiative-role">Founder / Lead Organizer</p>
            <p className="initiative-description">
              Planning and leading a student-run hackathon for the DFW high-school community,
              coordinating sponsorships, operations, logistics, participant planning, outreach,
              website development, and overall event organization.
            </p>
            <p className="initiative-approval">MLH Hack Day Approved</p>
            <div className="initiative-sponsors">
              <p className="detail-label">Sponsors &amp; Support</p>
              <ul aria-label="HornetHacks sponsors and support">
                <li>Google Gemini</li><li>MLH</li><li>DigitalOcean</li>
              </ul>
            </div>
            <a className="initiative-link" href="https://hornethacks.com" target="_blank" rel="noreferrer">
              Visit HornetHacks <ArrowUpRight size={17} />
            </a>
          </div>
        </article>

        <article className="initiative initiative-tableofhope" data-reveal aria-labelledby="tableofhope-title">
          <div className="initiative-service-brand">
            <a className="image-destination" href="https://tableofhopedallas.org/" target="_blank" rel="noreferrer" aria-label="Visit Table of Hope">
              <img src={tableOfHopeImage} alt="Table of Hope Dallas seal" loading="lazy" />
            </a>
            <div className="impact-stats" aria-label="Table of Hope community impact">
              <div><strong>10,000</strong><span>meals prepared &amp; distributed with volunteers</span></div>
              <div><strong>$7k</strong><span>raised to support operations &amp; outreach</span></div>
            </div>
          </div>
          <div className="initiative-content">
            <p className="detail-label">Nonprofit · Leadership · Community Service</p>
            <h3 id="tableofhope-title">Table of Hope</h3>
            <p className="initiative-role">Co-Founder</p>
            <p className="initiative-description">
              Co-founded Table of Hope Dallas to bring fresh meals to underserved communities.
              Organizing service efforts and coordinating a volunteer team to prepare and deliver
              meals with care, while raising funds to sustain the work. I also designed and launched
              the organization’s public website to support its service mission.
            </p>
            <a className="initiative-link" href="https://tableofhopedallas.org/" target="_blank" rel="noreferrer">
              Visit Table of Hope <ArrowUpRight size={17} />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
