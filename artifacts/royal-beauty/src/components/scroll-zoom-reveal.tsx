import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollZoomRevealProps {
  before: string;
  after: string;
  /** Film shown inside the pill, and what sits over it once it fills the screen. */
  video: string;
  poster: string;
  onPillClick: () => void;
  children: ReactNode;
}

/**
 * "Word [pill] word" line that pins while you scroll: the pill grows into a
 * full-screen film and pushes the words aside, after scrollzoomreveal.framer.website.
 */
export default function ScrollZoomReveal({ before, after, video, poster, onPillClick, children }: ScrollZoomRevealProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 1200, h: 700 });
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const measure = () => setBox({ w: window.innerWidth - 32, h: window.innerHeight - 32 });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pill size at rest, in pixels, before it grows to the whole box.
  const startW = box.w < 640 ? box.w * 0.22 : Math.min(box.w * 0.3, 300);
  const startH = Math.min(startW * 0.42, 120);
  const grow = useTransform(scrollYProgress, [0.05, 0.75], [0, 1], { clamp: true });
  const halfW = useTransform(grow, (g) => (startW + (box.w - startW) * g) / 2);
  const clipPath = useTransform(grow, (g) => {
    const w = startW + (box.w - startW) * g;
    const h = startH + (box.h - startH) * g;
    const x = (box.w - w) / 2;
    const y = (box.h - h) / 2;
    const r = 999 - (999 - 32) * Math.min(1, g * 1.6);
    return `inset(${y}px ${x}px ${y}px ${x}px round ${r}px)`;
  });
  // Each word sits just outside the pill and is pushed out as the pill grows.
  const outside = useTransform(halfW, (v) => `calc(50% + ${v + 18}px)`);
  const overlay = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const videoScale = useTransform(grow, [0, 1], [1.35, 1]);

  return (
    <div ref={trackRef} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 font-serif text-[1.6rem] sm:text-5xl md:text-8xl whitespace-nowrap"
          style={{ right: outside, color: "#3B0A45" }}
        >
          {before}
        </motion.span>
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 font-serif italic text-[1.6rem] sm:text-5xl md:text-8xl whitespace-nowrap"
          style={{ left: outside, color: "#B8922E" }}
        >
          {after}
        </motion.span>

        <motion.div className="absolute inset-4 overflow-hidden" style={{ clipPath }}>
          <button
            type="button"
            onClick={onPillClick}
            aria-label={`${before} ${after}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <motion.video
              src={video}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="h-full w-full object-cover"
              style={{ scale: videoScale }}
            />
          </button>
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: overlay,
              background: "linear-gradient(to top, rgba(59,10,69,0.8) 0%, rgba(59,10,69,0.2) 45%, transparent 70%)",
            }}
          />
          <motion.div className="absolute inset-x-6 md:inset-x-10 bottom-6 md:bottom-10" style={{ opacity: overlay }}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
