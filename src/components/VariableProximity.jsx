import { motion } from "motion/react";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import "./VariableProximity.css";

const MotionSpan = motion.span;

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (event) =>
      updatePosition(event.clientX, event.clientY);
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const parseSettings = (settingsStr) =>
  new Map(
    settingsStr
      .split(",")
      .map((setting) => setting.trim())
      .map((setting) => {
        const [name, value] = setting.split(" ");
        return [name.replace(/['"]/g, ""), parseFloat(value)];
      }),
  );

const VariableProximity = forwardRef(function VariableProximity(
  {
    label,
    fromFontVariationSettings = "'wght' 400, 'wdth' 100",
    toFontVariationSettings = "'wght' 750, 'wdth' 115",
    containerRef,
    radius = 80,
    falloff = "linear",
    className = "",
    onClick,
    style,
    ...restProps
  },
  ref,
) {
  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const parsedSettings = useMemo(() => {
    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateFalloff = (distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    if (falloff === "exponential") return norm ** 2;
    if (falloff === "gaussian") {
      return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    }
    return norm;
  };

  useAnimationFrame(() => {
    if (reducedMotionRef.current || !containerRef?.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
      const distance = Math.sqrt(
        (x - letterCenterX) ** 2 + (y - letterCenterY) ** 2,
      );

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue =
            fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`.trim()}
      onClick={onClick}
      style={{ display: "inline", ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span className="variable-proximity__word" key={`${word}-${wordIndex}`}>
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;
            return (
              <MotionSpan
                className="variable-proximity__letter"
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentLetterIndex] ??
                    fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </MotionSpan>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span aria-hidden="true" style={{ display: "inline-block" }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

export default VariableProximity;
