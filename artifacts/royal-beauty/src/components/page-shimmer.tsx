import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

let triggerShimmer: (() => void) | null = null;

export function useShimmerTransition() {
  return () => {
    if (triggerShimmer) triggerShimmer();
  };
}

export default function PageShimmer() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    triggerShimmer = () => {
      setActive(true);
      setTimeout(() => setActive(false), 700);
    };
    return () => { triggerShimmer = null; };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="shimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[150] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(212,175,55,0.12) 30%, rgba(212,175,55,0.22) 50%, rgba(212,175,55,0.12) 70%, transparent 100%)",
          }}
        >
          {/* Sweeping gold line */}
          <motion.div
            className="absolute top-0 bottom-0 w-40"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.55) 50%, transparent 100%)",
            }}
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
