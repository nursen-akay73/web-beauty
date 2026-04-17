import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    image: "/images/hero.png",
    title: "Güzelliğinizi",
    italic: "Kraliyet",
    subtitle: "İhtişamıyla Taçlandırın",
    caption: "Leyla Akay vizyonuyla, Soprano Ice teknolojisi ve profesyonel dokunuşların buluştuğu İstanbul'un en seçkin güzellik merkezi.",
    overlayOpacity: "0.72",
  },
  {
    image: "/images/hero-faces.jpeg",
    title: "Güzelliğinizi",
    italic: "Keşfedin,",
    subtitle: "Kendinizi Hissedin",
    caption: "Her yüzün kendine has güzelliği vardır. Biz o güzelliği ortaya çıkarıyoruz.",
    overlayOpacity: "0.60",
  },
  {
    image: "/images/service-skincare.png",
    title: "Cildinizde",
    italic: "Işıltı,",
    subtitle: "Ruhunuzda Zarafet",
    caption: "Hydrafacial'dan Dermapen'e, medikal cilt bakımından altın maskeye kadar geniş tedavi yelpazesiyle.",
    overlayOpacity: "0.72",
  },
  {
    image: "/images/service-laser.png",
    title: "Soprano Ice",
    italic: "Lazer",
    subtitle: "ile Kusursuz Cilt",
    caption: "Dört mevsim, her cilt tipinde ağrısız ve kalıcı çözüm — dünyada standart belirleyen teknoloji.",
    overlayOpacity: "0.72",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <img
            src={heroSlides[current].image}
            alt="Royal Güzellik"
            className="w-full h-full object-cover ken-burns"
          />
          {/* Dark purple overlay — opacity driven per-slide */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(45,11,63,${heroSlides[current].overlayOpacity}) 0%, rgba(59,10,69,${parseFloat(heroSlides[current].overlayOpacity) - 0.15}) 50%, rgba(45,11,63,${heroSlides[current].overlayOpacity}) 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B3F] via-[#3B0A45]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative gold vertical lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden lg:block z-10" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden lg:block z-10" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-[#D4AF37]/70" />
          <span className="text-[#D4AF37] uppercase tracking-[0.35em] text-xs font-semibold">
            Premium Güzellik Deneyimi
          </span>
          <div className="h-[1px] w-12 bg-[#D4AF37]/70" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight max-w-5xl mb-8 drop-shadow-lg"
          >
            {heroSlides[current].title}{" "}
            <span className="italic gold-shimmer">{heroSlides[current].italic}</span>
            <br />
            {heroSlides[current].subtitle}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`caption-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-white/75 md:text-lg max-w-2xl font-light leading-relaxed mb-12"
          >
            {heroSlides[current].caption}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Button
            onClick={() => scrollTo("#contact")}
            size="lg"
            style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
            className="hover:opacity-90 rounded-none px-14 py-7 uppercase tracking-widest text-sm font-bold transition-all duration-400 hover:scale-105 shadow-lg"
          >
            Randevu Oluştur
          </Button>
          <Button
            onClick={() => scrollTo("#services")}
            variant="outline"
            size="lg"
            className="bg-transparent border-white/40 text-white hover:bg-white hover:text-[#3B0A45] rounded-none px-12 py-7 uppercase tracking-widest text-sm transition-all duration-400"
          >
            Hizmetleri Keşfet
          </Button>
        </motion.div>

        {/* Slide dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex gap-3"
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-400"
              aria-label={`Slayt ${i + 1}`}
            >
              <div
                className="h-[2px] transition-all duration-400 rounded-full"
                style={{
                  width: i === current ? "40px" : "16px",
                  backgroundColor: i === current ? "#D4AF37" : "rgba(255,255,255,0.35)",
                }}
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest font-light">
          Aşağı Kaydır
        </span>
        <div className="w-[1px] h-14 bg-white/20 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 absolute top-0"
            style={{ backgroundColor: "#D4AF37" }}
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
