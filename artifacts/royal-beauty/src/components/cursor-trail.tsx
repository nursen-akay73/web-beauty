import { useEffect, useRef } from "react";

const POINTS = 16;

/**
 * A soft lilac-to-gold ribbon that trails the mouse and shrinks back into
 * the cursor when it stops, after marvelous-suggestions-158001.framer.app.
 * Mouse only; touch screens have no cursor to follow.
 */
export default function CursorTrail() {
  const pathRef = useRef<SVGPathElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const grad = gradRef.current;
    if (!path || !grad) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const pointer = { x: 0, y: 0 };
    let points: { x: number; y: number }[] = [];
    let raf = 0;
    let running = false;

    const frame = () => {
      // The head snaps to the cursor; every point after it eases toward the one before.
      points[0].x = pointer.x;
      points[0].y = pointer.y;
      for (let i = 1; i < POINTS; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.42;
        points[i].y += (points[i - 1].y - points[i].y) * 0.42;
      }

      const tail = points[POINTS - 1];
      const length = Math.hypot(pointer.x - tail.x, pointer.y - tail.y);
      if (length < 0.5) {
        path.setAttribute("d", "");
        running = false;
        return;
      }

      // Smooth curve through the midpoints, with each point as the control.
      let d = `M${points[0].x},${points[0].y}`;
      for (let i = 1; i < POINTS - 1; i++) {
        const mx = (points[i].x + points[i + 1].x) / 2;
        const my = (points[i].y + points[i + 1].y) / 2;
        d += ` Q${points[i].x},${points[i].y} ${mx},${my}`;
      }
      path.setAttribute("d", d);
      grad.setAttribute("x1", String(tail.x));
      grad.setAttribute("y1", String(tail.y));
      grad.setAttribute("x2", String(pointer.x));
      grad.setAttribute("y2", String(pointer.y));
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!points.length) points = Array.from({ length: POINTS }, () => ({ x: e.clientX, y: e.clientY }));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="fixed inset-0 z-[100] w-screen h-screen pointer-events-none"
      style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.45))" }}
    >
      <defs>
        <linearGradient ref={gradRef} id="cursor-trail-gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6A0DAD" stopOpacity="0" />
          <stop offset="45%" stopColor="#B07FD8" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke="url(#cursor-trail-gradient)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
