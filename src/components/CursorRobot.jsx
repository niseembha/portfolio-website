import { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function CursorRobot() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const hero = stage.closest('.hero')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      stage.style.setProperty('--look-x', currentX.toFixed(3))
      stage.style.setProperty('--look-y', currentY.toFixed(3))
      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const onPointerMove = (event) => {
      if (reducedQuery.matches || event.pointerType === 'touch') return
      const rect = hero.getBoundingClientRect()
      targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1)
      targetY = clamp(((event.clientY - rect.top) / rect.height - 0.56) * 2.4, -1, 1)
      if (!frame) frame = requestAnimationFrame(render)
    }

    const reset = () => {
      targetX = 0
      targetY = 0
      if (!frame) frame = requestAnimationFrame(render)
    }

    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div className="robot-stage" ref={stageRef} aria-hidden="true">
      <div className="robot-orbit robot-orbit-one" />
      <div className="robot-orbit robot-orbit-two" />
      <div className="robot-shadow" />
      <div className="robot-wrap">
        <div className="robot-antenna">
          <span />
        </div>
        <div className="robot-head">
          <div className="robot-face">
            <div className="robot-eye"><span /></div>
            <div className="robot-eye"><span /></div>
          </div>
          <div className="robot-ear robot-ear-left" />
          <div className="robot-ear robot-ear-right" />
        </div>
        <div className="robot-neck" />
        <div className="robot-body">
          <div className="robot-core"><span /></div>
          <div className="robot-readout">NB / 27</div>
        </div>
        <div className="robot-arm robot-arm-left" />
        <div className="robot-arm robot-arm-right" />
      </div>
      <p className="robot-hint"><span /> Move your cursor — it’s watching</p>
    </div>
  )
}
