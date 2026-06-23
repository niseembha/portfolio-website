import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function TextPressure({
  text = "Compressa",
  fontFamily = "Roboto Flex",
  fontUrl = "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#111111",
  strokeColor = "#c8462c",
  className = "",
  minFontSize = 24,
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = useMemo(() => text.split(""), [text]);
  const usesCssFontImport =
    fontUrl &&
    (fontUrl.includes("fonts.googleapis.com") || /\.css(?:[?#].*)?$/i.test(fontUrl));

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      cursorRef.current.x = touch.clientX;
      cursorRef.current.y = touch.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    setFontSize(Math.max(containerW / (chars.length / 2), minFontSize));
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener("resize", debouncedSetSize);
    return () => window.removeEventListener("resize", debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    if (reducedMotionRef.current) return undefined;

    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const distance = dist(mouseRef.current, charCenter);
          const wdth = width ? Math.floor(getAttr(distance, maxDist, 5, 200)) : 100;
          const wght = weight
            ? Math.floor(getAttr(distance, maxDist, 100, 900))
            : 400;
          const italVal = italic ? getAttr(distance, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha
            ? getAttr(distance, maxDist, 0, 1).toFixed(2)
            : 1;
          const nextSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== nextSettings) {
            span.style.fontVariationSettings = nextSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(
    () => (
      <style>{`
        ${
          fontUrl && usesCssFontImport
            ? `@import url('${fontUrl}');`
            : ""
        }
        ${
          fontUrl && !usesCssFontImport
            ? `@font-face {
              font-family: '${fontFamily}';
              src: url('${fontUrl}');
              font-style: normal;
              font-display: swap;
            }`
            : ""
        }

        .text-pressure--flex {
          display: flex;
          justify-content: space-between;
        }

        .text-pressure--stroke span {
          position: relative;
          color: ${textColor};
        }

        .text-pressure--stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    ),
    [fontFamily, fontUrl, strokeColor, textColor, usesCssFontImport],
  );

  const dynamicClassName = [
    className,
    flex ? "text-pressure--flex" : "",
    stroke ? "text-pressure--stroke" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className="text-pressure">
      {styleElement}
      <h2
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: "uppercase",
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: "inline-block",
              color: stroke ? undefined : textColor,
            }}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default TextPressure;
