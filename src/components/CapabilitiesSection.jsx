import { capabilities } from '../data/portfolio.js'

export function CapabilitiesSection() {
  return (
    <section className="capabilities-section section-pad" aria-labelledby="capabilities-title">
      <div className="shell">
        <div className="capability-header" data-reveal>
          <div className="section-kicker section-kicker-dark">
            <span>05</span>
            <p>Working set</p>
          </div>
          <h2 id="capabilities-title">Tools follow the problem.</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((group, index) => (
            <div className="capability-row" data-reveal key={group.label}>
              <div className="capability-label">
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
              </div>
              <p>
                {group.items.map((item, itemIndex) => (
                  <span key={item}>
                    {item}
                    {itemIndex < group.items.length - 1 && <i> / </i>}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
