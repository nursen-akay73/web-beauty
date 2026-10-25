import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LayeredCardProps {
  image: string;
  imageAlt: string;
  /** Card body content; it floats above the image layer on hover. */
  children: ReactNode;
  onClick?: () => void;
  /** Max tilt in degrees. */
  tilt?: number;
  className?: string;
}

const spring = { stiffness: 180, damping: 18, mass: 0.6 };

/**
 * A card whose layers sit at different Z depths. It tilts toward the cursor and
 * the layer farther from the pointer goes slightly out of focus (tilt-shift).
 */
export default function LayeredCard({
  image,
  imageAlt,
  children,
  onClick,
  tilt = 12,
  className = "",
}: LayeredCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Pointer position inside the card, 0..1. Rest at the center.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const sHover = useSpring(hover, spring);

  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt]);
  const imageZ = useTransform(sHover, [0, 1], [0, 40]);
  const bodyZ = useTransform(sHover, [0, 1], [0, 70]);

  // Focus follows the pointer: top half → image sharp, bottom half → text sharp.
  const imageBlur = useTransform([sy, sHover], ([y, h]: number[]) => Math.max(0, (y - 0.55) * 5) * h);
  const bodyBlur = useTransform([sy, sHover], ([y, h]: number[]) => Math.max(0, (0.45 - y) * 4) * h);
  const imageFilter = useMotionTemplate`blur(${imageBlur}px)`;
  const bodyFilter = useMotionTemplate`blur(${bodyBlur}px)`;

  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareOpacity = useTransform(sHover, [0, 1], [0, 0.55]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,240,200,0.35), transparent 55%)`;

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onPointerEnter = () => hover.set(1);
  const onPointerLeave = () => {
    hover.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        className="layered-card group relative h-full cursor-pointer rounded-2xl border p-3 [transform-style:preserve-3d]"
        style={{
          rotateX,
          rotateY,
          backgroundColor: "rgba(255,255,255,0.06)",
          borderColor: "rgba(212,175,55,0.28)",
        }}
      >
        {/* Image layer */}
        <motion.div
          className="relative aspect-square overflow-hidden rounded-xl"
          style={{
            z: imageZ,
            filter: imageFilter,
            boxShadow: "0 18px 40px rgba(20,4,30,0.45)",
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-20"
            style={{ backgroundColor: "rgba(59,10,69,0.4)" }}
          />
        </motion.div>

        {/* Body layer */}
        <motion.div
          className="relative px-4 pt-6 pb-4"
          style={{ z: bodyZ, filter: bodyFilter }}
        >
          {children}
        </motion.div>

        {/* Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glare, opacity: glareOpacity }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#D4AF37] transition-colors duration-500" />
      </motion.div>
    </div>
  );
}
