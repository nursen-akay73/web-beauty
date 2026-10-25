import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SplitRevealProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  /** Extra layer drawn on top of the "before" image (e.g. analysis markers). */
  beforeOverlay?: ReactNode;
  beforeImageClassName?: string;
  /** Divider start position, 0–100 (%). */
  startPosition?: number;
  className?: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export default function SplitReveal({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  beforeOverlay,
  beforeImageClassName = "",
  startPosition = 50,
  className = "",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(startPosition);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  // Hint that the divider is draggable: a short sweep the first time it scrolls into view.
  useEffect(() => {
    if (!inView || reduceMotion || touched.current) return;
    const controls = animate(startPosition, [startPosition, 28, 72, startPosition], {
      duration: 2.2,
      ease: "easeInOut",
      delay: 0.4,
      onUpdate: (v) => {
        if (!touched.current) setPosition(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, startPosition]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = position - step;
    if (e.key === "ArrowRight") next = position + step;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    touched.current = true;
    setPosition(clamp(next));
  };

  return (
    <div
      ref={containerRef}
      className={`split-reveal relative select-none overflow-hidden rounded-2xl touch-pan-y ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (full) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before (clipped to the left of the divider) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover ${beforeImageClassName}`}
        />
        {beforeOverlay}
      </div>

      {/* Labels */}
      <span
        className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-md transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(45,11,63,0.65)",
          color: "#D4AF37",
          opacity: position > 12 ? 1 : 0,
        }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-md transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          color: "#3B0A45",
          opacity: position < 88 ? 1 : 0,
        }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="h-full w-[2px] mx-auto"
          style={{
            background: "linear-gradient(to bottom, #f7e7a1, #D4AF37 50%, #f7e7a1)",
            boxShadow: "0 0 12px rgba(212,175,55,0.6)",
          }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel} karşılaştırması`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className={`pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            dragging ? "scale-110" : "hover:scale-105"
          }`}
          style={{
            background: "linear-gradient(135deg, #f7e7a1 0%, #D4AF37 45%, #b8922e 100%)",
            boxShadow: "0 4px 18px rgba(45,11,63,0.35), 0 0 0 4px rgba(255,255,255,0.35)",
            color: "#3B0A45",
          }}
        >
          <ChevronLeft size={16} strokeWidth={2.5} className="-mr-1" />
          <ChevronRight size={16} strokeWidth={2.5} className="-ml-1" />
        </div>
      </div>
    </div>
  );
}
