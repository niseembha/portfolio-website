import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const mix = (start, end, amount) => start + (end - start) * amount
const smoothstep = (edge0, edge1, value) => {
  const amount = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return amount * amount * (3 - 2 * amount)
}
const seeded = (value) => {
  const raw = Math.sin(value * 91.345 + 12.731) * 43758.545
  return raw - Math.floor(raw)
}

const parseHexColor = (value) => {
  const hex = value.trim().replace('#', '')
  const expanded = hex.length === 3 ? [...hex].map((character) => character + character).join('') : hex
  return [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16))
}

const colorWithAlpha = (color, alpha) => `rgba(${color.join(', ')}, ${alpha})`
const mixColor = (start, end, amount) => start.map((channel, index) =>
  Math.round(mix(channel, end[index], amount)),
)

const readVisualPalette = () => {
  const styles = getComputedStyle(document.documentElement)
  const read = (token) => parseHexColor(styles.getPropertyValue(token))
  return {
    raw: read('--visual-signal-raw'),
    resolved: read('--visual-signal-resolved'),
    waveStart: read('--visual-signal-wave-start'),
    wavePeak: read('--visual-signal-wave-peak'),
    blade: read('--visual-signal-blade'),
  }
}

function valueText(value) {
  if (value < 10) return 'Raw signal'
  if (value < 45) return `${value} percent resolved`
  if (value < 90) return `Signal ${value} percent resolved`
  if (value < 100) return 'Almost resolved'
  return 'Niseem resolved into real-world impact'
}

export function SignalResolve({ onResolved }) {
  const canvasRef = useRef(null)
  const apiRef = useRef(null)
  const resolvedCallbackRef = useRef(onResolved)
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 100
      : 4,
  )

  resolvedCallbackRef.current = onResolved

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = reducedQuery.matches
    let slices = []
    let frame = 0
    let resizeFrame = 0
    let width = 1
    let height = 1
    let wordTop = 0
    let wordHeight = 1
    let current = reduced ? 1 : 0.04
    let target = current
    let velocity = 0
    let lastTime = performance.now()
    let completionStarted = reduced ? performance.now() - 2000 : 0
    let completionAnnounced = reduced
    let visible = true
    let breathing = !reduced
    let idleUntil = performance.now() + 8000
    let visualPalette = readVisualPalette()

    const buildSlices = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        width < 700 ? 1.25 : 1.6,
        2600 / width,
        1800 / height,
      )
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const maskContext = mask.getContext('2d', { willReadFrequently: true })
      let fontSize = Math.min(width * 0.205, height * 0.35)
      maskContext.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
      let metrics = maskContext.measureText('NISEEM')
      if (metrics.width > width * 0.93) {
        fontSize *= (width * 0.93) / metrics.width
        maskContext.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
        metrics = maskContext.measureText('NISEEM')
      }

      const left = (width - metrics.width) / 2
      wordTop = height < 700 ? height * 0.2 : height * 0.22
      wordHeight = fontSize * 1.04
      maskContext.fillStyle = '#fff'
      maskContext.textBaseline = 'top'
      maskContext.fillText('NISEEM', left, wordTop)
      const pixels = maskContext.getImageData(0, 0, width, height).data
      const rowGap = width < 650 ? 7 : width > 1800 ? 4 : 5
      const nextSlices = []
      let row = 0

      for (let y = Math.floor(wordTop); y < Math.ceil(wordTop + wordHeight); y += rowGap) {
        let runStart = -1
        for (let x = Math.max(0, Math.floor(left - 2)); x <= Math.min(width - 1, Math.ceil(left + metrics.width + 2)); x += 1) {
          const opaque = pixels[(y * width + x) * 4 + 3] > 80
          if (opaque && runStart < 0) runStart = x
          const atEnd = x === Math.min(width - 1, Math.ceil(left + metrics.width + 2))
          if (runStart >= 0 && (!opaque || atEnd)) {
            const end = opaque && atEnd ? x + 1 : x
            const segmentWidth = Math.max(1, end - runStart)
            const random = seeded(row * 17.17 + runStart * 0.037)
            const rowShift =
              Math.sin(row * 0.73) * width * 0.085 + Math.cos(row * 0.19 + 1.8) * width * 0.035
            nextSlices.push({
              x: runStart,
              y,
              width: segmentWidth,
              height: Math.max(2, rowGap * 0.68),
              rawX: runStart + rowShift + (random - 0.5) * width * 0.035,
              rawY:
                y +
                Math.sin(runStart * 0.018 + row * 0.41) * Math.min(30, height * 0.038) +
                (random - 0.5) * 13,
              rawWidth: segmentWidth * mix(0.72, 1.5, random),
              center: clamp((runStart + segmentWidth / 2 - left) / metrics.width, 0, 1),
              phase: random * Math.PI * 2,
            })
            runStart = -1
          }
        }
        row += 1
      }
      slices = nextSlices
    }

    const draw = (time) => {
      frame = 0
      if (!visible) return
      const elapsed = Math.min(34, time - lastTime) / 16.667
      lastTime = time

      if (!reduced) {
        const stiffness = 0.095
        const damping = 0.76
        velocity += (target - current) * stiffness * elapsed
        velocity *= Math.pow(damping, elapsed)
        current += velocity * elapsed
        if (Math.abs(target - current) < 0.0004 && Math.abs(velocity) < 0.0004) {
          current = target
          velocity = 0
        }
      } else {
        current = 1
      }

      if (current > 0.992 && target > 0.99 && !completionStarted) {
        completionStarted = time
      }
      if (current < 0.9) {
        completionStarted = 0
        completionAnnounced = false
      }
      if (completionStarted && !completionAnnounced && time - completionStarted > 360) {
        completionAnnounced = true
        resolvedCallbackRef.current?.()
      }

      context.clearRect(0, 0, width, height)
      const t = time * 0.001
      const activeBreathing = breathing && time < idleUntil
      const waveAge = completionStarted ? (time - completionStarted) / 900 : -1
      const wavePosition = waveAge < 0 ? -1 : waveAge * 1.25 - 0.08

      context.save()
      context.globalCompositeOperation = 'lighter'
      for (const slice of slices) {
        const local = smoothstep(slice.center - 0.075, slice.center + 0.075, current)
        const eased = 1 - Math.pow(1 - local, 3)
        const idle = activeBreathing ? Math.sin(t * 0.62 + slice.phase) * (1 - eased) * 1.8 : 0
        const waveDistance = Math.abs(slice.center - wavePosition)
        const inWave = waveAge >= 0 && waveAge <= 1.15 ? Math.max(0, 1 - waveDistance / 0.085) : 0
        const snap = inWave * Math.sin(waveAge * Math.PI * 4) * 4
        const x = mix(slice.rawX, slice.x, eased) + snap
        const y = mix(slice.rawY, slice.y, eased) + idle
        const drawWidth = Math.max(1, mix(slice.rawWidth, slice.width, eased))

        if (inWave > 0.05) {
          context.fillStyle = colorWithAlpha(
            mixColor(visualPalette.waveStart, visualPalette.wavePeak, inWave),
            mix(0.82, 1, inWave),
          )
        } else if (local > 0.55) {
          context.fillStyle = colorWithAlpha(visualPalette.resolved, mix(0.7, 0.98, local))
        } else {
          context.fillStyle = colorWithAlpha(visualPalette.raw, mix(0.24, 0.5, 1 - local))
        }
        context.fillRect(x, y, drawWidth, slice.height)
      }
      context.restore()

      if (!reduced) {
        const bladeX = width * (0.045 + clamp(current, 0, 1) * 0.91)
        const bladeGradient = context.createLinearGradient(0, wordTop - 42, 0, wordTop + wordHeight + 42)
        bladeGradient.addColorStop(0, colorWithAlpha(visualPalette.blade, 0))
        bladeGradient.addColorStop(0.18, colorWithAlpha(visualPalette.blade, 0.85))
        bladeGradient.addColorStop(0.82, colorWithAlpha(visualPalette.blade, 0.85))
        bladeGradient.addColorStop(1, colorWithAlpha(visualPalette.blade, 0))
        context.strokeStyle = bladeGradient
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(bladeX, wordTop - 42)
        context.lineTo(bladeX, wordTop + wordHeight + 42)
        context.stroke()
        context.fillStyle = colorWithAlpha(visualPalette.blade, 1)
        context.fillRect(bladeX - 2, wordTop - 1, 4, 4)
      }

      const stillMoving = Math.abs(target - current) > 0.0004 || Math.abs(velocity) > 0.0004
      const payoffActive = waveAge >= 0 && waveAge < 1.2
      if (visible && (activeBreathing || stillMoving || payoffActive)) frame = requestAnimationFrame(draw)
    }

    const requestDraw = () => {
      if (!frame && visible) {
        lastTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    apiRef.current = {
      setTarget(next) {
        target = clamp(next, 0, 1)
        breathing = !reduced && target < 0.995
        idleUntil = performance.now() + 2500
        requestDraw()
      },
    }

    const resize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        buildSlices()
        requestDraw()
      })
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) requestDraw()
        else {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0.01 },
    )
    const resizeObserver = new ResizeObserver(resize)
    const onReducedChange = (event) => {
      reduced = event.matches
      if (reduced) {
        target = 1
        current = 1
        velocity = 0
        breathing = false
        setValue(100)
      }
      requestDraw()
    }
    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible' && canvas.getBoundingClientRect().bottom > 0
      if (visible) requestDraw()
    }
    const themeObserver = new MutationObserver(() => {
      visualPalette = readVisualPalette()
      requestDraw()
    })

    buildSlices()
    resizeObserver.observe(canvas)
    visibilityObserver.observe(canvas)
    reducedQuery.addEventListener('change', onReducedChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    requestDraw()

    return () => {
      apiRef.current = null
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      reducedQuery.removeEventListener('change', onReducedChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      themeObserver.disconnect()
    }
  }, [])

  const handleChange = (event) => {
    const next = Number(event.target.value)
    setValue(next)
    apiRef.current?.setTarget(next / 100)
  }

  return (
    <div className="signal-resolve" style={{ '--resolve': value / 100 }}>
      <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />
      <div className="resolver-ui">
        <div className="resolver-labels" aria-hidden="true">
          <span>Raw signal</span>
          <span>Real-world impact</span>
        </div>
        <div className="resolver-track-wrap">
          <span className="resolver-progress" aria-hidden="true" />
          <span className="resolver-handle" aria-hidden="true">
            <span>Drag</span>
          </span>
          <input
            className="resolver-input"
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleChange}
            aria-label="Resolve the Niseem wordmark"
            aria-valuetext={valueText(value)}
          />
        </div>
        <div className="resolver-instruction" aria-hidden="true">
          <span className="resolver-drag-copy"><i /> Click + drag to reveal my name</span>
          <output>{String(value).padStart(3, '0')}%</output>
        </div>
      </div>
    </div>
  )
}
