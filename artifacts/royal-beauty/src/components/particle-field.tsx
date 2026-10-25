import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  className?: string;
  /** Particles per 10 000 px² of area. */
  density?: number;
}

type Dot = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number; c: string; drift: number };

const COLORS = ["212,175,55", "247,231,161", "200,170,230", "160,120,200"];

/**
 * Faint dust of gold and lilac specks that slowly drift and scatter away from the cursor,
 * after the background of the niche reservations section.
 */
export default function ParticleField({ className = "", density = 1.1 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / 10000) * density);
      dots = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: 0,
          vy: 0,
          r: Math.random() * 1.4 + 0.4,
          c: `rgba(${COLORS[Math.floor(Math.random() * COLORS.length)]},${(Math.random() * 0.45 + 0.2).toFixed(2)})`,
          drift: Math.random() * Math.PI * 2,
        };
      });
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        // Slow wandering home position.
        if (!reduceMotion) {
          d.ox += Math.cos(d.drift + t * 0.0002) * 0.06;
          d.oy += Math.sin(d.drift + t * 0.00015) * 0.06 - 0.03;
          if (d.oy < -4) d.oy = h + 4;
        }
        // Push away from the cursor, spring back home.
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14400) {
          const f = (1 - Math.sqrt(dist2) / 120) * 1.6;
          const len = Math.sqrt(dist2) || 1;
          d.vx += (dx / len) * f;
          d.vy += (dy / len) * f;
        }
        d.vx += (d.ox - d.x) * 0.02;
        d.vy += (d.oy - d.y) * 0.02;
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.c;
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    seed();
    const ro = new ResizeObserver(seed);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
