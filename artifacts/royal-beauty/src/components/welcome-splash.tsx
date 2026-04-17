import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#2D0B3F" }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Sparkle particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: "#D4AF37",
                left: `${15 + (i % 6) * 14}%`,
                top: `${20 + Math.floor(i / 6) * 50}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.12,
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          ))}

          {/* Logo lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-16" style={{ backgroundColor: "#D4AF37" }} />
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs font-semibold uppercase"
              style={{ color: "#D4AF37" }}
            >
              Premium Güzellik
            </motion.span>
            <div className="h-[1px] w-16" style={{ backgroundColor: "#D4AF37" }} />
          </motion.div>

          {/* Welcome text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/60 text-sm uppercase tracking-[0.4em] font-light mb-4"
          >
            Hoş Geldiniz
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="font-serif text-5xl md:text-7xl text-white text-center leading-tight"
          >
            Royal{" "}
            <motion.span
              className="italic gold-shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              Güzellik
            </motion.span>
          </motion.h1>

          {/* Fade-out progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ backgroundColor: "#D4AF37" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "linear", delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
