import { motion } from "framer-motion";
import CurveFlowCarousel, { type CurveFlowItem } from "@/components/curve-flow-carousel";

const rituals: CurveFlowItem[] = [
  {
    image: "/images/service-hydrafacial.png",
    title: "Hydrafacial",
    caption: "Derinlemesine temizlik ve yoğun nem ile anında canlanan cilt.",
  },
  {
    image: "/images/gallery-1.png",
    title: "Cilt Analizi",
    caption: "Gözenek, nem ve leke haritası ile size özel bakım planı.",
  },
  {
    image: "/images/service-skincare.png",
    title: "Altın Maske",
    caption: "Cildin ışıltısını ve canlılığını geri kazandıran lüks bakım.",
  },
  {
    image: "/images/service-peeling.png",
    title: "Medikal Peeling",
    caption: "Ölü hücrelerden arınmış, pürüzsüz ve eşit tonlu cilt dokusu.",
  },
  {
    image: "/images/gallery-3.png",
    title: "Profesyonel Ürünler",
    caption: "Cilt tipinize göre seçilen premium bakım ürünleri.",
  },
  {
    image: "/images/left-skincare.png",
    title: "Nem Bakımı",
    caption: "Kuruyan ve hassas ciltler için yoğun nem desteği.",
  },
  {
    image: "/images/gallery-2.png",
    title: "Göz Çevresi Bakımı",
    caption: "İnce çizgiler ve yorgun görünüme karşı hedefli bakım.",
  },
];

export default function SkincareFlow() {
  return (
    <section id="skincare-rituals" className="relative py-24 md:py-28 overflow-hidden" style={{ backgroundColor: "#2D0B3F" }}>
      <div className="container mx-auto px-6 md:px-12 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-10" style={{ backgroundColor: "#D4AF37" }} />
          <span className="uppercase tracking-[0.25em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
            Cilt Bakımı Ritüelleri
          </span>
          <div className="h-[1px] w-10" style={{ backgroundColor: "#D4AF37" }} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-white mb-5"
        >
          Işıltınızın <span className="italic gold-shimmer">Sırrı</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Analizden bakıma, cildinize iyi gelen her adım. Kaydırarak keşfedin.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <CurveFlowCarousel items={rituals} />
      </motion.div>
    </section>
  );
}
