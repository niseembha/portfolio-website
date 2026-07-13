import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./LiquidEther.css";

const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform sampler2D uPalette;
uniform int uPaletteCount;
uniform float uAutoIntensity;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 2.03;
    amp *= 0.52;
  }
  return value;
}

vec3 paletteColor(float t) {
  if (uPaletteCount <= 1) {
    return texture2D(uPalette, vec2(0.5, 0.5)).rgb;
  }
  float x = clamp(t, 0.0, 1.0);
  return texture2D(uPalette, vec2(x, 0.5)).rgb;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 centered = (uv - 0.5) * aspect;

  float t = uTime * 0.12;
  vec2 pointer = (uPointer - 0.5) * aspect;
  float pointerWave = exp(-dot(centered - pointer, centered - pointer) * 6.0);
  float strength = pointerWave * uPointerStrength;

  vec2 flow = centered;
  flow.x += 0.16 * sin(flow.y * 6.0 + t * 3.0);
  flow.y += 0.14 * cos(flow.x * 5.0 - t * 2.2);
  flow += normalize(centered - pointer + 0.001) * strength * 0.08;

  float field = fbm(flow * 2.1 + vec2(t, -t * 0.7));
  field += 0.32 * fbm(flow * 4.4 - vec2(t * 1.7, t));
  field += strength * 0.8;
  field = smoothstep(0.38, 1.12, field);

  float edge = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
  float fade = smoothstep(0.0, 0.28, edge);
  float bands = smoothstep(0.18, 0.82, abs(sin((field + centered.x * 0.55 - centered.y * 0.25) * 5.4)));
  float alpha = field * fade * mix(0.16, 0.58, bands) * uAutoIntensity;

  vec3 color = paletteColor(clamp(field + strength * 0.24, 0.0, 1.0));
  gl_FragColor = vec4(color, alpha);
}
`;

function makePaletteTexture(colors) {
  const stops = colors?.length ? colors : ["#111111", "#c8462c"];
  const data = new Uint8Array(stops.length * 4);

  stops.forEach((stop, index) => {
    const color = new THREE.Color(stop);
    data[index * 4] = Math.round(color.r * 255);
    data[index * 4 + 1] = Math.round(color.g * 255);
    data[index * 4 + 2] = Math.round(color.b * 255);
    data[index * 4 + 3] = 255;
  });

  const texture = new THREE.DataTexture(data, stops.length, 1, THREE.RGBAFormat);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const options = { alpha: true, antialias: false };
    const context =
      canvas.getContext("webgl2", options) ||
      canvas.getContext("webgl", options) ||
      canvas.getContext("experimental-webgl", options);

    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function LiquidEther({
  colors = ["#111111", "#c8462c", "#8a857c"],
  mouseForce = 20,
  resolution = 0.5,
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const pointerRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetPointerRef = useRef(new THREE.Vector2(0.5, 0.5));
  const visibleRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    if (!canUseWebGL()) {
      mount.dataset.webgl = "unavailable";
      return undefined;
    }

    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      mount.dataset.webgl = "unavailable";
      return undefined;
    }

    delete mount.dataset.webgl;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.prepend(renderer.domElement);

    const palette = makePaletteTexture(colors);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: pointerRef.current },
      uPointerStrength: { value: 0 },
      uPalette: { value: palette },
      uPaletteCount: { value: colors.length },
      uAutoIntensity: { value: Math.max(0.1, autoIntensity * 0.3) },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let raf = 0;
    let pointerStrength = 0;
    let lastInteraction = 0;

    const resize = () => {
      const width = Math.max(1, Math.floor(mount.clientWidth * resolution));
      const height = Math.max(1, Math.floor(mount.clientHeight * resolution));
      const cssWidth = Math.max(1, mount.clientWidth);
      const cssHeight = Math.max(1, mount.clientHeight);
      renderer.setSize(cssWidth, cssHeight, false);
      uniforms.uResolution.value.set(width, height);
    };

    const setPointer = (clientX, clientY) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerRef.current.set(
        (clientX - rect.left) / rect.width,
        1 - (clientY - rect.top) / rect.height,
      );
      pointerStrength = Math.min(1, mouseForce / 24);
      lastInteraction = performance.now();
    };

    const onPointerMove = (event) => {
      setPointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) setPointer(touch.clientX, touch.clientY);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("touchmove", onTouchMove, { passive: true });

    const animate = () => {
      if (visibleRef.current) {
        const elapsed = clock.getElapsedTime();
        const idle = performance.now() - lastInteraction;

        if (autoDemo && idle > 1400) {
          targetPointerRef.current.set(
            0.5 + Math.cos(elapsed * autoSpeed) * 0.28,
            0.5 + Math.sin(elapsed * autoSpeed * 0.78) * 0.32,
          );
          pointerStrength = Math.max(pointerStrength, 0.28);
        }

        pointerRef.current.lerp(targetPointerRef.current, 0.065);
        pointerStrength *= 0.955;
        uniforms.uPointer.value = pointerRef.current;
        uniforms.uPointerStrength.value = pointerStrength;
        uniforms.uTime.value = elapsed;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    sceneRef.current = {
      renderer,
      material,
      mesh,
      palette,
      resizeObserver,
      intersectionObserver,
      raf,
    };

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("touchmove", onTouchMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      palette.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, [autoDemo, autoIntensity, autoSpeed, colors, mouseForce, resolution]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}
