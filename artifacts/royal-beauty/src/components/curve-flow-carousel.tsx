import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface CurveFlowItem {
  image: string;
  title: string;
  caption: string;
}

interface CurveFlowCarouselProps {
  items: CurveFlowItem[];
  /** Card width in px (height follows the 3:4 aspect). */
  cardWidth?: number;
  gap?: number;
  /** Auto-scroll speed in px per second. */
  speed?: number;
  /** Fraction of the half-width that stays flat around the center (0..1). */
  flatCenter?: number;
  /** Max rotation at the edges, in degrees. */
  edgeCurve?: number;
}

/**
 * Infinite carousel laid out on a curved path: cards stay flat in the middle and
 * bend away toward the edges. Auto-scrolls (pauses on hover), drags with momentum,
 * and stretches with a gold/violet colour fringe the faster it moves.
 */
export default function CurveFlowCarousel({
  items,
  cardWidth = 280,
  gap = 28,
  speed = 40,
  flatCenter = 0.22,
  edgeCurve = 38,
}: CurveFlowCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState(cardWidth);

  const state = useRef({
    offset: 0,
    velocity: 0, // px per frame, smoothed — drives distortion
    hovering: false,
    dragging: false,
    lastX: 0,
    lastT: 0,
    dragVelocity: 0, // px per ms while dragging
    momentum: 0, // px per ms after release
    target: null as number | null, // offset to glide to after a click
    moved: 0,
  });

  // Smaller cards on phones.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth < 640 ? Math.round(cardWidth * 0.72) : cardWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardWidth]);

  const step = width + gap;
  const period = step * items.length;

  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const s = state.current;

    const frame = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      const before = s.offset;

      if (s.target !== null) {
        const diff = s.target - s.offset;
        s.offset += diff * Math.min(1, dt * 0.008);
        if (Math.abs(diff) < 0.5) {
          s.offset = s.target;
          s.target = null;
        }
      } else if (!s.dragging) {
        if (Math.abs(s.momentum) > 0.01) {
          s.offset += s.momentum * dt;
          s.momentum *= Math.pow(0.94, dt / 16);
        } else if (!s.hovering && !reduceMotion) {
          s.offset += (speed * dt) / 1000;
        }
      }

      const frameVelocity = s.offset - before;
      s.velocity += (frameVelocity - s.velocity) * 0.2;
      layout();
      raf = requestAnimationFrame(frame);
    };

    const layout = () => {
      const vw = viewportRef.current?.clientWidth ?? 0;
      const half = vw / 2;
      const v = s.velocity;
      const skew = Math.max(-12, Math.min(12, v * 0.9));
      const fringe = Math.min(Math.abs(v) * 0.6, 7);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Position relative to the viewport center, wrapped into one period.
        let x = i * step - s.offset;
        x = ((x % period) + period) % period;
        if (x > period / 2) x -= period;

        const norm = half ? x / half : 0;
        const abs = Math.abs(norm);
        const t = Math.sign(norm) * Math.max(0, abs - flatCenter) / (1 - flatCenter);
        const ta = Math.min(Math.abs(t), 1.4);

        const rotateY = -Math.sign(t) * Math.min(ta, 1) * edgeCurve;
        const z = -ta * ta * 220;
        const y = ta * ta * 46;
        const scale = 1 - Math.min(ta, 1) * 0.12;
        const opacity = abs > 1.15 ? Math.max(0, 1 - (abs - 1.15) * 3) : 1;

        el.style.transform =
          `translate3d(${x - width / 2}px, ${y}px, ${z}px) rotateY(${rotateY}deg) skewX(${-skew}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(1000 - Math.round(Math.abs(x)));
        el.style.filter = fringe > 0.3
          ? `drop-shadow(${fringe}px 0 0 rgba(212,175,55,0.55)) drop-shadow(${-fringe}px 0 0 rgba(140,60,200,0.5))`
          : "none";
      });
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [step, period, width, speed, flatCenter, edgeCurve, reduceMotion]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    s.dragging = true;
    s.target = null;
    s.momentum = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.dragVelocity = 0;
    s.moved = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    s.offset -= dx;
    s.moved += Math.abs(dx);
    s.dragVelocity = -dx / Math.max(1, now - s.lastT);
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.momentum = Math.max(-3, Math.min(3, s.dragVelocity));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    // Only take over horizontal trackpad gestures; vertical wheel keeps scrolling the page.
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const s = state.current;
    s.target = null;
    s.offset += e.deltaX;
  };

  const focusCard = (i: number) => {
    const s = state.current;
    if (s.moved > 6) return; // it was a drag, not a click
    // Nearest offset (accounting for wrap) that puts card i in the center.
    const base = i * step;
    const k = Math.round((s.offset - base) / period);
    s.momentum = 0;
    s.target = base + k * period;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const s = state.current;
    const from = s.target ?? s.offset;
    const snapped = Math.round(from / step) * step;
    s.momentum = 0;
    s.target = snapped + (e.key === "ArrowRight" ? step : -step);
  };

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cilt bakımı galerisi"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      onPointerEnter={() => (state.current.hovering = true)}
      onPointerLeave={() => (state.current.hovering = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 rounded-xl"
      style={{ height: Math.round(width * 4 / 3) + 110, perspective: 1200 }}
    >
      <div className="absolute left-1/2 top-6 [transform-style:preserve-3d]">
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => focusCard(i)}
            className="absolute top-0 left-0 will-change-transform"
            style={{ width }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3 / 4", boxShadow: "0 24px 50px rgba(15,3,22,0.5)" }}
            >
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(45,11,63,0.92) 0%, rgba(45,11,63,0.15) 45%, transparent 70%)" }}
              />
              <div className="absolute left-0 right-0 bottom-0 p-5">
                <div className="h-[1px] w-8 mb-3" style={{ backgroundColor: "#D4AF37" }} />
                <h3 className="font-serif text-xl text-white mb-1">{item.title}</h3>
                <p className="text-white/65 text-xs font-light leading-relaxed">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
