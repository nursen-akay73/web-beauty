import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Star, Clock, Sparkles } from "lucide-react";

export type ServiceDetail = {
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  details: string;
  image: string;
  badge?: string;
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    name: "Lazer Epilasyon",
    tagline: "Soprano Ice — Dünya Standardı",
    description:
      "Soprano Ice teknolojisi ile tüm cilt tiplerinde, dört mevsim uygulanabilen, ağrısız ve kalıcı lazer epilasyon. Royal Güzellik'te FDA onaylı cihazlarla güvenli ve hijyenik ortamda sonuç odaklı tedavi sunuyoruz.",
    benefits: [
      "Ağrısız ve konforlu uygulama",
      "Tüm cilt ve kıl tiplerine uygun",
      "Dört mevsim uygulanabilir",
      "Kalıcı ve uzun süreli sonuç",
      "FDA onaylı, klinik güvenlik",
    ],
    details:
      "Soprano Ice SHR teknolojisi sayesinde kıl köklerini yavaş yavaş ısıtarak etkisizleştirir. Seans sayısı kişiye göre 6-8 arasında değişir.",
    image: "/images/service-laser.png",
    badge: "En Popüler",
  },
  {
    name: "Dermapen",
    tagline: "Mikro İğne ile Cilt Yenileme",
    description:
      "Dermapen, yüzlerce ince iğne içeren özel bir kalemle ciltte mikro kanallar açarak vücudun doğal yenileme mekanizmasını tetikler. Kolajen üretimini artırarak daha genç ve sıkı bir cilt sağlar.",
    benefits: [
      "Kolajen ve elastin üretimini uyarır",
      "Skar ve leke görünümünü azaltır",
      "Gözenek sıkılaştırma",
      "İnce çizgi ve kırışıklık azaltma",
      "Tüm cilt tiplerinde güvenli",
    ],
    details:
      "İşlem öncesi uyuşturucu krem ile konfor maksimuma çıkar. Seans süresi 30-45 dakika, 4-6 seans ile belirgin sonuç elde edilir.",
    image: "/images/service-dermapen.png",
  },
  {
    name: "Yosun Peeling",
    tagline: "Deniz Derinliklerinden Gelen Bakım",
    description:
      "Deniz yosunu özü, iyot ve mineral bakımından zengin içeriğiyle cildi toksinlerden arındırır, derin nemlendirir ve ışıltı kazandırır.",
    benefits: [
      "Derin temizlik ve detoks",
      "Yoğun nem ve mineral desteği",
      "Cilt tonunu eşitler",
      "Hassas ciltlere uygun",
      "Anında ışıltı ve tazelik hissi",
    ],
    details:
      "Özel formüle edilmiş deniz yosunu maskesi 20-30 dakika etki eder. İşlem sonrası cilt belirgin biçimde pürüzsüzleşir ve aydınlanır.",
    image: "/images/service-peeling.png",
  },
  {
    name: "Hydrafacial",
    tagline: "Anlık Parlaklık & Derin Nem",
    description:
      "Hydrafacial; temizlik, peeling, ekstraksiyon ve nem serumlarını tek seansta birleştiren çok adımlı bir tedavidir. Anında görünür aydınlık verir.",
    benefits: [
      "Anlık görünür ışıltı",
      "Gözenek temizliği ve sıkılaştırma",
      "Kolajen sentezini destekler",
      "Tüm cilt tipleri için güvenli",
      "Makyaj sonrası bile uygulanabilir",
    ],
    details:
      "Patentli Vortex-Fusion teknolojisi ile ortalama 45-60 dakika sürer. Hassas ciltlerde bile kızarıklık oluşturmaz.",
    image: "/images/service-hydrafacial.png",
  },
  {
    name: "Botoks",
    tagline: "Dinamik Kırışıklıklara Zarafet",
    description:
      "Onaylı nörotoksin formülasyonları ile dinamik kırışıklıkları gideren, yüz hatlarını yumuşatan ve doğal genç görünüm sunan tıbbi estetik.",
    benefits: [
      "Alın ve gözaltı çizgilerini giderir",
      "Doğal ve gergin olmayan sonuç",
      "Hızlı işlem, sıfır iyileşme süresi",
      "Sonuçlar 4-6 ay kalıcı",
      "Uzman hekim uygulaması",
    ],
    details:
      "Tek kullanımlık ince iğnelerle uygulanan botoks işlemi 15-20 dakika sürer. Etki 3-7 gün içinde başlar.",
    image: "/images/service-botoks.png",
    badge: "Medikal",
  },
  {
    name: "Dolgu",
    tagline: "Hacim & Kontur Sanatı",
    description:
      "Hyalüronik asit bazlı dolgu uygulamaları ile dudak, yanak, çene ve elmacık kemiklerinde hacim artışı ve yüz konturlaması sağlanır.",
    benefits: [
      "Anlık hacim ve dolgunluk",
      "Doğal görünüm, uzun ömürlü sonuç",
      "Dudak, yanak, nazolabial çizgiler",
      "Biyolojik olarak uyumlu formül",
      "Uzman hekim denetiminde uygulama",
    ],
    details:
      "FDA onaylı hyalüronik asit jel ile yapılan uygulamalarda etki 12-18 ay sürer. Şişlik 24-48 saat içinde iner.",
    image: "/images/service-dolgu.png",
    badge: "Medikal",
  },
  {
    name: "Cilt Bakımı",
    tagline: "Kişiselleştirilmiş Medikal Bakım",
    description:
      "Cilt tipinize özel tasarlanmış medikal kalitede cilt bakım protokolleri. Uzman estetisyenlerimiz cildinizi içeriden dışarıya yeniler.",
    benefits: [
      "Cilt tipine özel protokol",
      "Medikal kalite ürün seçimi",
      "Derin nem ve antioksidan desteği",
      "Leke ve ton eşitsizliği tedavisi",
      "Uzun vadeli cilt sağlığı",
    ],
    details:
      "Bakım seansı öncesinde detaylı cilt analizi yapılır. Seanslar 60-90 dakika sürer.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Saç Tasarım",
    tagline: "Kraliyet Dokunuşu",
    description:
      "Saç kesimi, renklendirme, ombre, keratin bakım ve vitamin işlemleri ile saçlarınıza özgün bir stil kazandırıyoruz.",
    benefits: [
      "Kişiye özel stil danışmanlığı",
      "Profesyonel renk uygulamaları",
      "Keratin ve protein bakımı",
      "Hasar onarımı tedavileri",
      "Kalıcı şekillendirme seçenekleri",
    ],
    details:
      "Saç bakım randevularında önce saç analizi yapılır, ardından kişiye özel yöntem belirlenir.",
    image: "/images/service-hair.png",
  },
  {
    name: "Makyaj",
    tagline: "Sanatsal Dokunuş",
    description:
      "Özel günleriniz için porselen makyaj, gelin makyajı ve günlük makyaj. Yüz hatlarınızı öne çıkaran, uzun süre kalıcı profesyonel makyaj.",
    benefits: [
      "Gelin ve özel gün makyajı",
      "Kalıcı ve transfer yapmaz formül",
      "HD fotoğraf uyumlu makyaj",
      "Kişilik ve stil analizine göre",
      "Profesyonel ürün markaları",
    ],
    details:
      "Makyaj randevularında kıyafet ve konsept paylaşmanız önerilir. İşlem süresi 60-90 dakikadır.",
    image: "/images/service-makeup.png",
  },
  {
    name: "Kalıcı Makyaj",
    tagline: "Uyan, Hazır Ol",
    description:
      "Kaş, eyeliner ve dudak konturunda kalıcı makyaj uygulamaları. Özel pigmentler ve steril ekipmanlarla aylarca süren doğal görünüm.",
    benefits: [
      "Kaş, eyeliner, dudak rengi",
      "Doğal ve hafif görünüm",
      "Suya ve tere dayanıklı",
      "6-12 ay kalıcılık",
      "Steril ve hijyenik uygulama",
    ],
    details:
      "İşlem öncesi cilde uyuşturucu krem uygulanır. Pigment seçimi yüz analizi ile yapılır. İşlem 2-3 saat sürer.",
    image: "/images/service-kalici-makyaj.png",
  },
];

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onBook: () => void;
}

export default function ServiceModal({ service, onClose, onBook }: ServiceModalProps) {
  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: "rgba(10,2,20,0.72)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* LEFT image panel — slides in from left, desktop only */}
          <motion.div
            key="left-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 38, mass: 0.85 }}
            className="fixed top-0 left-0 bottom-0 z-[110] hidden lg:flex flex-col items-center justify-center overflow-hidden"
            style={{
              width: "min(480px, 45vw)",
              backgroundColor: "#1a0828",
              boxShadow: "8px 0 60px rgba(59,10,69,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Gold right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom, #D4AF37 0%, #6A0DAD 50%, #D4AF37 100%)" }} />

            {/* Background tint */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(106,13,173,0.2) 0%, transparent 70%)" }} />

            {/* Staircase image frames */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Frame 3 — bottom-right (furthest back) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.3, x: 24, y: 24 }}
                transition={{ delay: 0.05, duration: 0.7, ease: "easeOut" }}
                className="absolute overflow-hidden"
                style={{ width: "72%", height: "62%", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <img src={service.image} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(0.6)" }} />
              </motion.div>

              {/* Frame 2 — middle */}
              <motion.div
                initial={{ opacity: 0, x: 15, y: 15 }}
                animate={{ opacity: 0.6, x: 12, y: 12 }}
                transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
                className="absolute overflow-hidden"
                style={{ width: "72%", height: "62%", border: "1px solid rgba(212,175,55,0.35)" }}
              >
                <img src={service.image} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.55) saturate(0.75)" }} />
              </motion.div>

              {/* Frame 1 — front (main image) */}
              <motion.div
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
                className="absolute overflow-hidden"
                style={{ width: "72%", height: "62%", border: "2px solid rgba(212,175,55,0.6)" }}
              >
                <motion.img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25, duration: 1.2, ease: "easeOut" }}
                  style={{ filter: "brightness(0.7) saturate(0.9)" }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(59,10,69,0.55) 0%, transparent 55%)" }} />
              </motion.div>

              {/* Gold corner accents */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="absolute"
                style={{ width: "72%", height: "62%" }}
              >
                {/* Top-left corner */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "#D4AF37" }} />
                {/* Bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "#D4AF37" }} />
              </motion.div>

              {/* Bottom label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-12 left-0 right-0 text-center"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: "#D4AF37" }}>Royal Güzellik</p>
                <p className="font-serif text-white/80 text-lg">{service.name}</p>
              </motion.div>

              {/* Top label */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-10 left-0 right-0 flex justify-center"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8" style={{ backgroundColor: "rgba(212,175,55,0.4)" }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#D4AF37" }} />
                  <div className="h-[1px] w-8" style={{ backgroundColor: "rgba(212,175,55,0.4)" }} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Drawer — slides in from right */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 38, mass: 0.85 }}
            className="fixed top-0 right-0 bottom-0 z-[110] flex flex-col"
            style={{ width: "min(480px, 100vw)", boxShadow: "-8px 0 60px rgba(59,10,69,0.45)" }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Gold left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom, #D4AF37 0%, #6A0DAD 50%, #D4AF37 100%)" }} />

            {/* Hero image — top portion */}
            <div className="relative shrink-0 overflow-hidden" style={{ height: "240px" }}>
              <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                style={{ filter: "brightness(0.55) saturate(0.85)" }}
              />
              {/* Bottom gradient fade into drawer bg */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #1a0828 100%)" }} />
              {/* Top gradient */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(59,10,69,0.5) 0%, transparent 40%)" }} />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "rgba(10,2,20,0.4)" }}
              >
                <X size={15} />
              </button>

              {/* Badge */}
              {service.badge && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-5 left-6 flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                >
                  <Star size={9} fill="currentColor" /> {service.badge}
                </motion.div>
              )}

              {/* Service title overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-7 pb-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-[1px] w-4" style={{ backgroundColor: "#D4AF37" }} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "#D4AF37" }}>
                      Royal Güzellik
                    </span>
                  </div>
                  <h2 className="font-serif text-white text-[28px] leading-tight">{service.name}</h2>
                  <p className="text-[11px] uppercase tracking-widest mt-1" style={{ color: "#D4AF37" }}>{service.tagline}</p>
                </motion.div>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="flex-1 overflow-y-auto px-7 py-6"
              style={{
                backgroundColor: "#F5F5F5",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
                overscrollBehavior: "contain",
              }}
            >
              {/* Gold separator */}
              <div className="h-[1px] mb-5" style={{ background: "linear-gradient(90deg, #D4AF37 0%, transparent 70%)" }} />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm font-light leading-relaxed mb-6"
                style={{ color: "#555" }}
              >
                {service.description}
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="mb-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={12} style={{ color: "#D4AF37" }} />
                  <h3 className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>Faydaları</h3>
                </div>
                <div className="space-y-2.5">
                  {service.benefits.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 + i * 0.06 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                      <span className="text-sm font-light leading-snug" style={{ color: "#444" }}>{b}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Details box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="p-5 mb-2"
                style={{ backgroundColor: "rgba(59,10,69,0.06)", borderLeft: "3px solid #D4AF37" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={12} style={{ color: "#6A0DAD" }} />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>
                    Uygulama Detayları
                  </h4>
                </div>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#666" }}>{service.details}</p>
              </motion.div>
            </div>

            {/* CTA footer */}
            <div
              className="shrink-0 px-7 py-5"
              style={{ backgroundColor: "#F5F5F5", borderTop: "1px solid rgba(212,175,55,0.25)" }}
            >
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                onClick={() => { onClose(); setTimeout(onBook, 300); }}
                className="royal-btn btn-randevu-shimmer w-full flex items-center justify-center gap-3 py-4 text-sm font-bold uppercase tracking-widest"
                style={{ backgroundColor: "#3B0A45", color: "#D4AF37" }}
              >
                Bu Hizmet İçin Randevu Al <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
