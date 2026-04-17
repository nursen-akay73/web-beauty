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
    image: "/images/service-skincare.png",
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
    image: "/images/service-skincare.png",
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
    image: "/images/service-skincare.png",
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
    image: "/images/service-skincare.png",
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
    image: "/images/service-skincare.png",
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
    image: "/images/service-makeup.png",
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: "rgba(10,2,20,0.88)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* 3D Cube wrapper — perspective container */}
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none"
            style={{ perspective: "1400px" }}
          >
            {/* The cube face that rotates in */}
            <motion.div
              key={service.name}
              className="relative pointer-events-auto"
              style={{
                width: "min(680px, 94vw)",
                maxHeight: "90vh",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: -90, opacity: 0, scale: 0.85, z: -200 }}
              animate={{ rotateY: 0,  opacity: 1, scale: 1,    z: 0 }}
              exit={{   rotateY:  90, opacity: 0, scale: 0.85, z: -200 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.9,
              }}
            >
              {/* Cube "depth" shadow — simulates 3D thickness */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow:
                    "8px 8px 0 0 rgba(212,175,55,0.18), 16px 16px 0 0 rgba(59,10,69,0.25), -2px -2px 40px rgba(212,175,55,0.08)",
                  zIndex: -1,
                }}
              />

              {/* Main panel */}
              <div
                className="flex flex-col overflow-hidden"
                style={{
                  backgroundColor: "#F5F5F5",
                  maxHeight: "90vh",
                  border: "1px solid rgba(212,175,55,0.35)",
                }}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Gold-purple top bar */}
                <div className="h-1.5 shrink-0" style={{ background: "linear-gradient(90deg, #3B0A45 0%, #D4AF37 45%, #6A0DAD 100%)" }} />

                {/* Hero image */}
                <div className="relative h-44 shrink-0 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{ filter: "brightness(0.65) saturate(0.9)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #F5F5F5 0%, rgba(245,245,245,0.05) 60%, transparent 100%)" }} />

                  {/* Badge */}
                  {service.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45, type: "spring", stiffness: 300 }}
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                    >
                      <Star size={10} fill="currentColor" /> {service.badge}
                    </motion.div>
                  )}

                  {/* Close */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/20"
                    style={{ border: "1px solid rgba(255,255,255,0.4)" }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Scrollable body */}
                <div
                  className="overflow-y-auto flex-1 px-7 py-5"
                  style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y", overscrollBehavior: "contain" }}
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-[1px] w-5" style={{ backgroundColor: "#D4AF37" }} />
                      <span className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: "#D4AF37" }}>
                        Royal Güzellik
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl mb-1" style={{ color: "#3B0A45" }}>{service.name}</h2>
                    <p className="text-[11px] uppercase tracking-widest font-semibold mb-4" style={{ color: "#6A0DAD" }}>
                      {service.tagline}
                    </p>
                    <div className="h-[1px] mb-4" style={{ background: "linear-gradient(90deg, #D4AF37 0%, transparent 70%)" }} />
                    <p className="text-sm font-light leading-relaxed mb-5" style={{ color: "#555" }}>
                      {service.description}
                    </p>
                  </motion.div>

                  {/* Two-column layout: benefits + details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Benefits */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={13} style={{ color: "#D4AF37" }} />
                        <h3 className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>
                          Faydaları
                        </h3>
                      </div>
                      <div className="space-y-2.5">
                        {service.benefits.map((b, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + i * 0.07 }}
                            className="flex items-start gap-2.5"
                          >
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                            <span className="text-xs font-light leading-snug" style={{ color: "#444" }}>{b}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.38, duration: 0.5 }}
                      className="p-4 self-start"
                      style={{ backgroundColor: "rgba(59,10,69,0.05)", borderLeft: "3px solid #D4AF37" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={12} style={{ color: "#6A0DAD" }} />
                        <h4 className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>
                          Uygulama Detayları
                        </h4>
                      </div>
                      <p className="text-xs font-light leading-relaxed" style={{ color: "#666" }}>
                        {service.details}
                      </p>
                    </motion.div>
                  </div>

                  {/* Decorative diamond divider */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    className="flex items-center gap-3 mb-5"
                  >
                    <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(212,175,55,0.3)" }} />
                    <div className="w-2 h-2 rotate-45" style={{ backgroundColor: "#D4AF37" }} />
                    <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(212,175,55,0.3)" }} />
                  </motion.div>
                </div>

                {/* CTA footer */}
                <div className="shrink-0 px-7 pb-6 pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    onClick={() => { onClose(); setTimeout(onBook, 300); }}
                    className="royal-btn w-full flex items-center justify-center gap-3 py-4 text-sm font-bold uppercase tracking-widest"
                    style={{ backgroundColor: "#3B0A45", color: "#D4AF37" }}
                  >
                    Bu Hizmet İçin Randevu Al <ArrowRight size={16} />
                  </motion.button>
                  <p className="text-center text-[11px] mt-2.5 font-light" style={{ color: "#aaa" }}>
                    Ücretsiz danışma için WhatsApp'tan da ulaşabilirsiniz.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
