import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Sparkles, X } from "lucide-react";

interface SkincareStoryProps {
  open: boolean;
  onClose: () => void;
  onBook: () => void;
  onDetails: () => void;
}

const stats = [
  { value: 28, suffix: " Gün", label: "Cildin kendini yenileme döngüsü" },
  { value: 2, suffix: " m²", label: "Vücudun en büyük organı" },
  { value: 7, suffix: "/24", label: "Sizi dış etkenlere karşı korur" },
];

const reasons = [
  {
    icon: <ShieldCheck size={18} />,
    title: "Koruyucu Kalkan",
    text: "Cilt; güneş, kirlilik ve mikroplara karşı ilk savunma hattınızdır. Bakımlı bir cilt bariyeri bu görevi çok daha güçlü yerine getirir.",
  },
  {
    icon: <Droplets size={18} />,
    title: "Nem Dengesi",
    text: "Nemini kaybeden cilt matlaşır, ince çizgiler belirginleşir. Düzenli bakım nem dengesini koruyarak esnekliği ve ışıltıyı sürdürür.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Erken Önlem",
    text: "Leke, sivilce izi ve kırışıklıklar oluştuktan sonra değil, oluşmadan önce ilgilenmek; daha kalıcı ve doğal sonuçlar sağlar.",
  },
];

const marqueeItems = ["Hydrafacial", "Dermapen", "Medikal Peeling", "Altın Maske", "Cilt Analizi", "Nem Bakımı"];

// Organic right edge of the left panel. Both paths share the same command list so they can morph.
const EDGE_FLAT = "M0,0 L60,0 C60,180 60,320 60,500 C60,680 60,820 60,1000 L0,1000 Z";
const EDGE_WAVE = "M0,0 L95,0 C30,180 150,320 70,500 C-5,680 120,820 45,1000 L0,1000 Z";

function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      delay: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, start, reduceMotion]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

/** Decorative zig-zag textured circle, like the Razna spa landing page. */
function ZigzagCircle({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8'%3E%3Cpath d='M0 6 L4 2 L8 6 L12 2 L16 6' fill='none' stroke='%23D4AF37' stroke-width='0.9' opacity='0.55'/%3E%3C/svg%3E\")",
        backgroundSize: "16px 8px",
      }}
    />
  );
}

const ease = [0.22, 0.61, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease },
});

export default function SkincareStory({ open, onClose, onBook, onDetails }: SkincareStoryProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Portal to <body>: the section wrappers use transforms, which would trap `position: fixed`.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="skincare-story-title"
          className="fixed inset-0 z-[120] overflow-hidden"
          style={{ backgroundColor: "#2D0B3F" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.25 } }}
          transition={{ duration: 0.35 }}
        >
          {/* Right: full-bleed photo with a slow zoom-out */}
          <motion.img
            src="/images/service-skincare.png"
            alt="Cilt bakımı uygulaması"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 40%, rgba(45,11,63,0.35) 100%)" }} />

          {/* Inset photo, bottom right */}
          <motion.div
            className="hidden lg:block absolute right-10 bottom-24 w-56 xl:w-64 aspect-[4/3] rounded-sm overflow-hidden border-4"
            style={{ borderColor: "#F5F5F5", boxShadow: "0 20px 50px rgba(20,4,30,0.45)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ delay: 1, duration: 0.9, ease }}
          >
            <img src="/images/gallery-3.png" alt="Premium cilt bakım ürünleri" className="w-full h-full object-cover" />
          </motion.div>

          {/* Close */}
          <motion.button
            ref={closeRef}
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-5 right-5 z-30 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6 }}
          >
            <X size={22} />
          </motion.button>

          {/* Left: panel with a wavy edge that slides in */}
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-full lg:w-[52%] xl:w-[48%]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.6, ease: [0.55, 0, 0.75, 0.2] } }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="relative h-full" style={{ backgroundColor: "#F5F5F5" }}>
              {/* Wavy edge (desktop) */}
              <svg
                className="hidden lg:block absolute top-0 left-full h-full w-[110px] -ml-px"
                viewBox="0 0 150 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  fill="#F5F5F5"
                  initial={{ d: EDGE_FLAT }}
                  animate={{ d: EDGE_WAVE }}
                  transition={{ delay: 0.5, duration: 1.2, ease }}
                />
              </svg>

              <ZigzagCircle className="w-36 h-36 top-10 right-6 lg:-right-10" delay={0.9} />
              <ZigzagCircle className="hidden lg:block w-24 h-24 top-[48%] right-[3%]" delay={1.1} />
              <ZigzagCircle className="hidden lg:block w-36 h-36 bottom-24 right-[6%]" delay={1.3} />

              <div className="relative h-full overflow-y-auto overscroll-contain px-7 sm:px-12 xl:px-16 pt-10 pb-28">
                <motion.div {...rise(0.35)} className="flex items-center gap-3 mb-8">
                  <span className="font-serif text-2xl text-primary">
                    Royal <span className="text-accent italic">Güzellik</span>
                  </span>
                </motion.div>

                <motion.div {...rise(0.45)} className="flex items-center gap-3 mb-5">
                  <div className="h-[1px] w-8" style={{ backgroundColor: "#D4AF37" }} />
                  <span className="uppercase tracking-[0.25em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                    Cilt Bakımı
                  </span>
                </motion.div>

                <motion.h2
                  id="skincare-story-title"
                  {...rise(0.55)}
                  className="font-serif text-4xl sm:text-5xl xl:text-6xl text-primary leading-[1.05] mb-6 max-w-lg"
                >
                  Cildiniz, Size <span className="italic text-accent">Ömür Boyu</span> Eşlik Eder
                </motion.h2>

                <motion.p {...rise(0.65)} className="text-primary/70 font-light leading-relaxed mb-8 max-w-md">
                  Cilt bakımı bir lüks değil, sağlığın bir parçasıdır. Her gün güneşe, kirliliğe ve strese karşı
                  sizi koruyan cildiniz; doğru ve düzenli bakımla daha sağlıklı, daha dengeli ve daha ışıltılı
                  görünür. Kendinizi iyi hissetmeniz, aynadaki yansımanızla başlar.
                </motion.p>

                <motion.div {...rise(0.75)} className="flex flex-wrap gap-3 mb-10">
                  <button
                    onClick={onBook}
                    className="royal-btn btn-randevu-shimmer flex items-center gap-2 px-7 py-4 uppercase tracking-wider text-xs font-semibold"
                    style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                  >
                    Randevu Al <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={onDetails}
                    className="royal-btn px-7 py-4 uppercase tracking-wider text-xs font-semibold border transition-colors hover:bg-primary/5"
                    style={{ borderColor: "rgba(59,10,69,0.25)", color: "#3B0A45" }}
                  >
                    Uygulamaları İncele
                  </button>
                </motion.div>

                <motion.div {...rise(0.85)} className="h-[1px] w-16 mb-8" style={{ backgroundColor: "#D4AF37" }} />

                <motion.h3 {...rise(0.9)} className="font-serif text-2xl text-primary mb-5">
                  Cildiniz Hakkında
                </motion.h3>
                <motion.div {...rise(0.95)} className="flex flex-wrap items-start gap-x-6 gap-y-4 mb-10">
                  {stats.map((s, i) => (
                    <div key={s.label} className="flex items-start gap-6">
                      {i > 0 && <span className="hidden sm:block h-10 w-px mt-1" style={{ backgroundColor: "rgba(59,10,69,0.2)" }} />}
                      <div>
                        <div className="font-serif text-4xl sm:text-5xl leading-none text-primary">
                          <CountUp to={s.value} suffix={s.suffix} start={open} />
                        </div>
                        <div className="text-xs text-primary/55 mt-2 max-w-[9rem] leading-snug">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <ul className="space-y-6 max-w-md">
                  {reasons.map((r, i) => (
                    <motion.li key={r.title} {...rise(1.05 + i * 0.1)} className="flex gap-4">
                      <span
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(212,175,55,0.14)", color: "#B8922E" }}
                      >
                        {r.icon}
                      </span>
                      <div>
                        <h4 className="font-serif text-lg text-primary mb-1">{r.title}</h4>
                        <p className="text-sm text-primary/65 font-light leading-relaxed">{r.text}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Marquee of treatments along the bottom */}
              <motion.div
                className="absolute left-0 right-0 bottom-0 h-16 flex items-center overflow-hidden border-t"
                style={{ backgroundColor: "#F5F5F5", borderColor: "rgba(59,10,69,0.08)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <div className="story-marquee flex shrink-0 gap-10 pr-10">
                  {[...marqueeItems, ...marqueeItems].map((m, i) => (
                    <span key={i} className="flex items-center gap-3 text-sm text-primary/70 whitespace-nowrap">
                      <span style={{ color: "#D4AF37" }}>✦</span>
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
