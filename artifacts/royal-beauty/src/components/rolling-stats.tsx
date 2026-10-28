import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Where the count starts, so the last digits roll over on the way up (999 → 1.000). */
  from: number;
};

// GEÇİCİ SAYILAR: salonun gerçek rakamları gelene kadar yer tutucu. Canlıda gerçekleriyle değiştirin.
const STATS: Stat[] = [
  { value: 2500, from: 2380, suffix: "+", label: "Mutlu danışan" },
  { value: 12000, from: 11920, suffix: "+", label: "Tamamlanan seans" },
  { value: 98, from: 90, prefix: "%", label: "Memnun ayrılan" },
  { value: 4.9, from: 4.1, decimals: 1, prefix: "★", label: "Ortalama puan" },
];

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

/** One digit as a strip of 0–9 that slides to the current number. */
function Digit({ d }: { d: number }) {
  return (
    <span
      className="relative inline-block h-[1.2em] w-[1ch] overflow-hidden align-bottom"
      style={{ maskImage: "linear-gradient(transparent, #000 18%, #000 82%, transparent)" }}
    >
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateY(-${d * 10}%)` }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="h-[1.2em] leading-[1.2em] text-center">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollingNumber({ stat, start }: { stat: Stat; start: boolean }) {
  const [current, setCurrent] = useState(stat.from);

  useEffect(() => {
    if (!start) return;
    const steps = 24;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const k = 1 - Math.pow(1 - i / steps, 3);
      setCurrent(stat.from + (stat.value - stat.from) * k);
      if (i >= steps) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [start, stat]);

  const text = current.toLocaleString("tr-TR", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });
  // Key characters from the right, so a new leading digit slides in without
  // the others jumping columns.
  const chars = text.split("");

  return (
    <span className="inline-flex items-end tabular-nums lining-nums leading-[1.2em]" aria-hidden="true">
      {stat.prefix && <span className="mr-1" style={{ color: "#D4AF37" }}>{stat.prefix}</span>}
      {chars.map((c, i) => {
        const key = chars.length - i;
        return /\d/.test(c) ? <Digit key={key} d={Number(c)} /> : <span key={key}>{c}</span>;
      })}
      {stat.suffix && <span style={{ color: "#D4AF37" }}>{stat.suffix}</span>}
    </span>
  );
}

/** Row of counters whose digits roll up like an odometer when scrolled into view. */
export default function RollingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="mt-24 md:mt-32 border-t pt-14 md:pt-16" style={{ borderColor: "rgba(212,175,55,0.25)" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="text-center"
          >
            <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-none">
              <span className="sr-only">
                {stat.prefix}
                {stat.value.toLocaleString("tr-TR")}
                {stat.suffix}
              </span>
              <RollingNumber stat={stat} start={inView} />
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/55">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
