import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import { useShimmerTransition } from "@/components/page-shimmer";

const heroSlides = [
  {
    image: "/images/hero.png",
    title: "Güzelliğinizi",
    italic: "Kraliyet",
    subtitle: "İhtişamıyla Taçlandırın",
    caption:
      "Leyla Akay vizyonuyla, Soprano Ice teknolojisi ve profesyonel dokunuşların buluştuğu İstanbul'un en seçkin güzellik merkezi.",
    overlayOpacity: "0.72",
    objectFit: "cover" as const,
    objectPosition: "center",
  },
  {
    image: "/images/hero-faces.jpeg",
    title: "Güzelliğinizi",
    italic: "Keşfedin,",
    subtitle: "Kendinizi Hissedin",
    caption:
      "Her yüzün kendine has güzelliği vardır. Biz o güzelliği ortaya çıkarıyoruz.",
    overlayOpacity: "0.45",
    objectFit: "contain" as const,
    objectPosition: "center",
  },
  {
    image: "/images/service-skincare.png",
    title: "Cildinizde",
    italic: "Işıltı,",
    subtitle: "Ruhunuzda Zarafet",
    caption:
      "Hydrafacial'dan Dermapen'e, medikal cilt bakımından altın maskeye kadar geniş tedavi yelpazesiyle.",
    overlayOpacity: "0.72",
    objectFit: "cover" as const,
    objectPosition: "center",
  },
  {
    image: "/images/service-laser.png",
    title: "Soprano Ice",
    italic: "Lazer",
    subtitle: "ile Kusursuz Cilt",
    caption:
      "Dört mevsim, her cilt tipinde ağrısız ve kalıcı çözüm — dünyada standart belirleyen teknoloji.",
    overlayOpacity: "0.72",
    objectFit: "cover" as const,
    objectPosition: "center",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const shimmer = useShimmerTransition();

  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [lightboxOpen]);

  const scrollTo = (id: string) => {
    shimmer();
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  const goToSlide = (i: number) => {
    shimmer();
    setTimeout(() => setCurrent(i), 120);
  };

  const slide = heroSlides[current];

  return (
    <>
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 z-0 cursor-pointer group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            onClick={() => setLightboxOpen(true)}
            title="Görseli büyütmek için tıkla"
          >
            {/* Background color for contain images */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: slide.objectFit === "contain" ? "#2D0B3F" : "transparent" }}
            />
            <img
              src={slide.image}
              alt="Royal Güzellik"
              className={`w-full h-full ${slide.objectFit === "contain" ? "object-contain" : "object-cover ken-burns"}`}
              style={{ objectPosition: slide.objectPosition }}
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, rgba(45,11,63,${slide.overlayOpacity}) 0%, rgba(59,10,69,${Math.max(0, parseFloat(slide.overlayOpacity) - 0.15)}) 50%, rgba(45,11,63,${slide.overlayOpacity}) 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B3F] via-[#3B0A45]/40 to-transparent" />

            {/* Zoom hint on hover */}
            <div className="absolute top-24 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-sm z-20">
              <ZoomIn size={14} style={{ color: "#D4AF37" }} />
              <span className="text-xs text-white/80 tracking-wider">Büyüt</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative gold vertical lines */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden lg:block z-10" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden lg:block z-10" />

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center mt-20 pointer-events-none">
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
              {slide.title}{" "}
              <span className="italic gold-shimmer">{slide.italic}</span>
              <br />
              {slide.subtitle}
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
              {slide.caption}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 pointer-events-auto"
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
            className="mt-12 flex gap-3 pointer-events-auto"
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="transition-all duration-400"
                aria-label={`Slayt ${i + 1}`}
              >
                <div
                  className="h-[2px] transition-all duration-400 rounded-full"
                  style={{
                    width: i === current ? "40px" : "16px",
                    backgroundColor:
                      i === current ? "#D4AF37" : "rgba(255,255,255,0.35)",
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[160] flex items-center justify-center"
            style={{ backgroundColor: "rgba(20,5,30,0.96)" }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Gold border frame */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl max-h-[90vh] w-full mx-6 p-1"
              style={{ border: "1px solid rgba(212,175,55,0.5)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={heroSlides[current].image}
                alt="Royal Güzellik"
                className="w-full h-full object-contain"
                style={{ maxHeight: "85vh" }}
              />
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "#D4AF37" }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: "#D4AF37" }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: "#D4AF37" }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "#D4AF37" }} />
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{ border: "1px solid rgba(212,175,55,0.4)" }}
            >
              <X size={22} style={{ color: "#D4AF37" }} />
            </button>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-[#D4AF37] transition-colors text-3xl font-thin"
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-[#D4AF37] transition-colors text-3xl font-thin"
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((c) => (c + 1) % heroSlides.length);
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
