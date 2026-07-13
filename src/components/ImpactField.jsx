import { useEffect, useRef, useState } from "react";
import "./ImpactField.css";

const TAU = Math.PI * 2;
const MODES = [
  { id: "build", label: "Build", number: "01" },
  { id: "connect", label: "Connect", number: "02" },
  { id: "impact", label: "Impact", number: "03" },
];

function seeded(index, offset = 0) {
  const value = Math.sin(index * 9283.31 + offset * 77.17) * 43758.5453;
  return value - Math.floor(value);
}

function createNodes(width, height, compact) {
  const count = compact ? 36 : Math.min(82, Math.max(58, Math.floor(width / 12)));
  return Array.from({ length: count }, (_, index) => {
    const x = (0.05 + seeded(index, 1) * 0.9) * width;
    const y = (0.08 + seeded(index, 2) * 0.84) * height;
    return {
      x,
      y,
      homeX: x,
      homeY: y,
      vx: 0,
      vy: 0,
      size: index % 13 === 0 ? 3.2 : index % 5 === 0 ? 2 : 1.15,
      signal: index % 11 === 0,
      phase: seeded(index, 4) * TAU,
    };
  });
}

export default function ImpactField() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mode: "build",
    pointer: { x: 0, y: 0, active: false, down: false, charge: 0 },
    pulses: [],
    trails: [],
  });
  const [mode, setMode] = useState("build");
  const [isCharging, setIsCharging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const state = stateRef.current;
    let nodes = [];
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let lastTime = performance.now();
    let visible = true;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height, coarsePointer || width < 620);
      if (!state.pointer.active) {
        state.pointer.x = width * 0.66;
        state.pointer.y = height * 0.46;
      }
    };

    const addPulse = (x, y, strength = 1) => {
      state.pulses.push({ x, y, radius: 8, alpha: 0.9, strength });
      if (state.pulses.length > 5) state.pulses.shift();
    };

    const updatePointer = (event) => {
      const rect = root.getBoundingClientRect();
      state.pointer.x = event.clientX - rect.left;
      state.pointer.y = event.clientY - rect.top;
      state.pointer.active = true;
      state.trails.push({
        x: state.pointer.x,
        y: state.pointer.y,
        alpha: 0.42,
      });
      if (state.trails.length > 18) state.trails.shift();
      root.style.setProperty("--field-x", `${(state.pointer.x / width) * 100}%`);
      root.style.setProperty("--field-y", `${(state.pointer.y / height) * 100}%`);
    };

    const onPointerDown = (event) => {
      updatePointer(event);
      root.setPointerCapture?.(event.pointerId);
      state.pointer.down = true;
      state.pointer.charge = 0;
      setIsCharging(true);
      setHasInteracted(true);
    };

    const releasePointer = (event) => {
      if (!state.pointer.down) return;
      if (event?.clientX != null) updatePointer(event);
      const strength = 0.8 + state.pointer.charge * 1.8;
      addPulse(state.pointer.x, state.pointer.y, strength);
      state.pointer.down = false;
      state.pointer.charge = 0;
      setIsCharging(false);
    };

    const onPointerLeave = () => {
      if (!state.pointer.down) state.pointer.active = false;
    };

    const draw = (now) => {
      const dt = Math.min(2, (now - lastTime) / 16.667);
      lastTime = now;
      context.clearRect(0, 0, width, height);

      const pointer = state.pointer;
      const modeId = state.mode;
      const time = now * 0.001;
      const animate = !reducedMotion.matches;
      if (!pointer.active && animate) {
        pointer.x = width * (0.62 + Math.cos(time * 0.38) * 0.18);
        pointer.y = height * (0.48 + Math.sin(time * 0.51) * 0.22);
      }
      if (pointer.down) pointer.charge = Math.min(1, pointer.charge + 0.012 * dt);

      state.trails.forEach((trail) => {
        trail.alpha *= 0.9;
        context.beginPath();
        context.arc(trail.x, trail.y, 1.35, 0, TAU);
        context.fillStyle = `rgba(200, 70, 44, ${trail.alpha})`;
        context.fill();
      });
      state.trails = state.trails.filter((trail) => trail.alpha > 0.025);

      const influence = modeId === "connect" ? 190 : modeId === "impact" ? 240 : 155;
      nodes.forEach((node, index) => {
        if (animate) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.max(16, Math.hypot(dx, dy));
          const force = Math.max(0, 1 - distance / influence);
          const direction = modeId === "build" ? -1 : 1;

          if (pointer.down) {
            node.vx += (dx / distance) * force * (0.16 + pointer.charge * 0.5) * dt;
            node.vy += (dy / distance) * force * (0.16 + pointer.charge * 0.5) * dt;
          } else if (modeId === "impact") {
            node.vx += (-dy / distance) * force * 0.16 * dt;
            node.vy += (dx / distance) * force * 0.16 * dt;
          } else {
            node.vx += (dx / distance) * force * 0.12 * direction * dt;
            node.vy += (dy / distance) * force * 0.12 * direction * dt;
          }

          state.pulses.forEach((pulse) => {
            const pdx = node.x - pulse.x;
            const pdy = node.y - pulse.y;
            const pd = Math.max(5, Math.hypot(pdx, pdy));
            const edge = Math.abs(pd - pulse.radius);
            if (edge < 34) {
              const kick = (1 - edge / 34) * pulse.strength;
              node.vx += (pdx / pd) * kick * 0.7;
              node.vy += (pdy / pd) * kick * 0.7;
            }
          });

          node.vx += (node.homeX - node.x) * 0.0024 * dt;
          node.vy += (node.homeY - node.y) * 0.0024 * dt;
          node.vx += Math.cos(time * 0.7 + node.phase) * 0.002;
          node.vy += Math.sin(time * 0.6 + node.phase) * 0.002;
          node.vx *= Math.pow(0.93, dt);
          node.vy *= Math.pow(0.93, dt);
          node.x += node.vx * dt;
          node.y += node.vy * dt;
        }

        for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
          const other = nodes[otherIndex];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          const maxDistance = modeId === "connect" ? 142 : 104;
          if (distance < maxDistance) {
            const pointerDistance = Math.min(
              Math.hypot(node.x - pointer.x, node.y - pointer.y),
              Math.hypot(other.x - pointer.x, other.y - pointer.y),
            );
            const nearPointer = Math.max(0, 1 - pointerDistance / 210);
            const alpha = (1 - distance / maxDistance) * (0.17 + nearPointer * 0.42);
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = nearPointer > 0.28
              ? `rgba(200, 70, 44, ${alpha})`
              : `rgba(31, 29, 26, ${alpha})`;
            context.lineWidth = nearPointer > 0.45 ? 1.15 : 0.7;
            context.stroke();
          }
        }
      });

      nodes.forEach((node) => {
        const proximity = Math.max(0, 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / 180);
        const radius = node.size + proximity * (node.signal ? 4 : 2.2);
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, TAU);
        context.fillStyle = node.signal || proximity > 0.58 ? "#c8462c" : "#1f1d1a";
        context.fill();
        if (node.signal && proximity > 0.25) {
          context.beginPath();
          context.arc(node.x, node.y, radius + 5 + proximity * 4, 0, TAU);
          context.strokeStyle = `rgba(200, 70, 44, ${proximity * 0.32})`;
          context.stroke();
        }
      });

      state.pulses.forEach((pulse) => {
        pulse.radius += (3.4 + pulse.strength * 1.6) * dt;
        pulse.alpha *= Math.pow(0.965, dt);
        context.beginPath();
        context.arc(pulse.x, pulse.y, pulse.radius, 0, TAU);
        context.strokeStyle = `rgba(200, 70, 44, ${pulse.alpha})`;
        context.lineWidth = 1.4;
        context.stroke();
      });
      state.pulses = state.pulses.filter((pulse) => pulse.alpha > 0.035);

      const chargeRadius = 21 + pointer.charge * 34;
      context.beginPath();
      context.arc(pointer.x, pointer.y, chargeRadius, 0, TAU);
      context.strokeStyle = `rgba(200, 70, 44, ${pointer.active ? 0.72 : 0.32})`;
      context.lineWidth = 1.2;
      context.stroke();
      context.beginPath();
      context.arc(pointer.x, pointer.y, 4 + pointer.charge * 6, 0, TAU);
      context.fillStyle = "#c8462c";
      context.fill();

      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion.matches) {
        cancelAnimationFrame(frame);
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    });
    const resizeObserver = new ResizeObserver(resize);
    const motionChange = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    };

    resizeObserver.observe(root);
    observer.observe(root);
    resize();
    root.addEventListener("pointermove", updatePointer);
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointerup", releasePointer);
    root.addEventListener("pointercancel", releasePointer);
    root.addEventListener("pointerleave", onPointerLeave);
    reducedMotion.addEventListener?.("change", motionChange);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      root.removeEventListener("pointermove", updatePointer);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointerup", releasePointer);
      root.removeEventListener("pointercancel", releasePointer);
      root.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener?.("change", motionChange);
    };
  }, []);

  const selectMode = (nextMode) => {
    setMode(nextMode);
    setHasInteracted(true);
    const root = rootRef.current;
    const state = stateRef.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      state.pulses.push({
        x: state.pointer.active ? state.pointer.x : rect.width * 0.68,
        y: state.pointer.active ? state.pointer.y : rect.height * 0.48,
        radius: 8,
        alpha: 0.9,
        strength: 1.35,
      });
    }
  };

  const handleKeyDown = (event) => {
    const currentIndex = MODES.findIndex((item) => item.id === mode);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + MODES.length) % MODES.length;
      selectMode(MODES[nextIndex].id);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setHasInteracted(true);
      const root = rootRef.current;
      const state = stateRef.current;
      if (root) {
        const rect = root.getBoundingClientRect();
        state.pulses.push({
          x: state.pointer.active ? state.pointer.x : rect.width * 0.66,
          y: state.pointer.active ? state.pointer.y : rect.height * 0.46,
          radius: 8,
          alpha: 0.9,
          strength: 1.5,
        });
      }
    }
  };

  return (
    <div
      className={`impact-field impact-field--${mode}${isCharging ? " is-charging" : ""}`}
      ref={rootRef}
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Interactive idea field. Move to bend the network, press and hold to charge, then release to create an impact wave."
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="impact-field__grid" aria-hidden="true" />

      <div className="impact-field__header">
        <span>Live experiment / 001</span>
        <span className="impact-field__status"><i /> Signal online</span>
      </div>

      <div className="impact-field__readout" aria-live="polite">
        <span>{isCharging ? "Charging signal" : hasInteracted ? "Field responding" : "Make an impact"}</span>
        <strong>{isCharging ? "HOLD" : mode.toUpperCase()}</strong>
      </div>

      <div className="impact-field__instructions" aria-hidden="true">
        <span>Move</span> bend the field <b>·</b> <span>Hold</span> charge <b>·</b> <span>Release</span> impact
      </div>

      <div className="impact-field__modes" aria-label="Field behavior">
        {MODES.map((item) => (
          <button
            type="button"
            key={item.id}
            className={mode === item.id ? "is-active" : ""}
            onClick={(event) => {
              event.stopPropagation();
              selectMode(item.id);
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <small>{item.number}</small>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
