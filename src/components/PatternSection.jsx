const transformations = [
  ['First-person context', 'Behavioral telemetry', 'Clinical summary'],
  ['986 patient records', 'Risk model', 'Progression scenarios'],
  ['Fragmented grant data', 'Intelligent matching', 'Faster evaluation'],
  ['Screen pixels', 'FEN notation', 'Autonomous move'],
]

export function PatternSection() {
  return (
    <section className="pattern-section section-pad" aria-labelledby="pattern-title">
      <div className="shell">
        <div className="section-kicker" data-reveal>
          <span>00</span>
          <p>The pattern in the work</p>
        </div>
        <div className="pattern-heading" data-reveal>
          <h2 id="pattern-title">
            Complex input.
            <br />
            <em>Useful</em> output.
          </h2>
          <p>
            A chessboard begins as pixels. Patient records begin as numbers. Smart glasses see
            unstructured context. Grant opportunities live across fragmented databases. I build the
            systems in between.
          </p>
        </div>
        <div className="transform-list" data-reveal>
          {transformations.map((items, index) => (
            <div className="transform-row" key={items[0]}>
              <span className="transform-index">0{index + 1}</span>
              {items.map((item, itemIndex) => (
                <div className="transform-step" key={item}>
                  <span>{item}</span>
                  {itemIndex < items.length - 1 && <span className="transform-arrow">→</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
