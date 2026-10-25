import { motion } from "framer-motion";
import { Droplets, ScanFace, Sparkles, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitReveal from "@/components/split-reveal";
import { useShimmerTransition } from "@/components/page-shimmer";

const metrics = [
  {
    icon: <ScanFace size={18} />,
    title: "Gözenek & Doku",
    desc: "Gözenek yoğunluğu ve cilt yüzeyinin pürüzsüzlüğü detaylı olarak incelenir.",
  },
  {
    icon: <Droplets size={18} />,
    title: "Nem & Sebum",
    desc: "Cildinizin nem dengesi ve yağlanma bölgeleri belirlenir.",
  },
  {
    icon: <SunMedium size={18} />,
    title: "Leke & Pigmentasyon",
    desc: "Güneş lekeleri ve ton eşitsizlikleri gözle görülmeyen detaylarıyla haritalanır.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "İnce Çizgi & Elastikiyet",
    desc: "Göz çevresi ve mimik bölgelerindeki ince çizgiler değerlendirilir.",
  },
];

// Marker positions are tuned to /images/gallery-1.png.
const markers = [
  { x: 40, y: 38, label: "İnce çizgi" },
  { x: 22, y: 68, label: "Gözenek" },
  { x: 66, y: 22, label: "Nem" },
  { x: 64, y: 80, label: "Sebum" },
];

function AnalysisOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Tint + scan grid */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(59,10,69,0.35)", mixBlendMode: "multiply" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="skin-scan-line absolute left-0 right-0 h-16" />

      {markers.map((m) => (
        <div
          key={m.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <span className="skin-marker relative block w-5 h-5 rounded-full border-2" style={{ borderColor: "#D4AF37" }}>
            <span className="absolute inset-[5px] rounded-full" style={{ backgroundColor: "#f7e7a1" }} />
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.15em] font-semibold whitespace-nowrap"
            style={{ backgroundColor: "rgba(45,11,63,0.75)", color: "#f7e7a1" }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SkinAnalysis() {
  const shimmer = useShimmerTransition();

  const goToContact = () => {
    shimmer();
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  return (
    <section id="skin-analysis" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-2 lg:order-1"
          >
            <SplitReveal
              beforeSrc="/images/gallery-1.png"
              afterSrc="/images/gallery-1.png"
              beforeAlt="Cilt analizi tarama görünümü"
              afterAlt="Doğal cilt görünümü"
              beforeLabel="Analiz"
              afterLabel="Doğal Görünüm"
              beforeImageClassName="grayscale contrast-150 brightness-90"
              beforeOverlay={<AnalysisOverlay />}
              className="aspect-[4/3] w-full shadow-2xl"
            />
            <p className="mt-3 text-xs font-light text-primary/50 text-center">
              Görsel temsilidir · Ayırıcıyı sürükleyerek karşılaştırın
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8" style={{ backgroundColor: "#D4AF37" }} />
              <span className="uppercase tracking-[0.25em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                Cilt Analizi
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-6">
              Cildinizi <span className="italic text-accent">Tanıyarak</span> Başlıyoruz
            </h2>
            <p className="text-primary/70 font-light leading-relaxed mb-10 max-w-xl">
              Her bakım, cildinizin ihtiyacını doğru anlamakla başlar. Uzmanlarımız cilt analizi ile
              cildinizin bugünkü durumunu detaylı olarak değerlendirir ve size özel bakım planınızı bu
              sonuçlara göre oluşturur.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {metrics.map((m) => (
                <li key={m.title} className="flex gap-4">
                  <span
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(212,175,55,0.12)", color: "#D4AF37" }}
                  >
                    {m.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-1">{m.title}</h3>
                    <p className="text-sm text-primary/60 font-light leading-relaxed">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              onClick={goToContact}
              className="royal-btn bg-accent hover:bg-accent/90 text-primary-foreground uppercase tracking-wider text-xs px-8 py-6 font-semibold"
            >
              Cilt Analizi Randevusu Al
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
