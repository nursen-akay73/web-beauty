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
      "Soprano Ice SHR (Süper Hızlı Atış) teknolojisi sayesinde kıl köklerini yavaş yavaş ısıtarak melanin bazlı ya da fotoakustik hasara gerek kalmadan kökü etkisizleştirir. Seans sayısı kişiye göre 6-8 arasında değişir.",
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
      "İşlem öncesi uygulanan uyuşturucu krem ile konfor maksimuma çıkar. Seans süresi 30-45 dakika olup, 4-6 seans ile belirgin sonuçlar elde edilir. Kızarıklık 24-48 saat içinde tamamen geçer.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Yosun Peeling",
    tagline: "Deniz Derinliklerinden Gelen Bakım",
    description:
      "Deniz yosunu özü, iyot ve mineral bakımından zengin içeriğiyle cildi toksinlerden arındırır, derin nemlendirir ve ışıltı kazandırır. Hassas ciltler için de idealdir.",
    benefits: [
      "Derin temizlik ve detoks",
      "Yoğun nem ve mineral desteği",
      "Cilt tonunu eşitler",
      "Hassas ciltlere uygun",
      "Anında ışıltı ve tazelik hissi",
    ],
    details:
      "Özel formüle edilmiş deniz yosunu maskesi 20-30 dakika boyunca etki eder. İşlem sonrası cilt belirgin biçimde pürüzsüzleşir ve aydınlanır. Aylık tekrar önerilir.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Hydrafacial",
    tagline: "Anlık Parlaklık & Derin Nem",
    description:
      "Hydrafacial; temizlik, peeling, ekstraksiyon ve nem serumlarını tek seansta birleştiren çok adımlı bir tedavidir. İşlem sonrası anında görünür bir aydınlık ve dolgunluk hissi verir.",
    benefits: [
      "Anlık görünür ışıltı",
      "Gözenek temizliği ve sıkılaştırma",
      "Kolajen sentezini destekler",
      "Tüm cilt tipleri için güvenli",
      "Makyaj sonrası bile uygulanabilir",
    ],
    details:
      "Patentli Vortex-Fusion teknolojisi ile uygulanan bu işlem ortalama 45-60 dakika sürer. Hassas ciltlerde bile kızarıklık veya rahatsızlık oluşturmaz. Haftada bir kez uygulanabilir.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Botoks",
    tagline: "Dinamik Kırışıklıklara Zarafet",
    description:
      "Onaylı nörotoksin formülasyonları ile dinamik kırışıklıkları gideren, yüz hatlarını yumuşatan ve doğal bir genç görünüm sunan tıbbi estetik uygulaması.",
    benefits: [
      "Alın ve gözaltı çizgilerini giderir",
      "Doğal ve gergin olmayan sonuç",
      "Hızlı işlem, sıfır iyileşme süresi",
      "Sonuçlar 4-6 ay kalıcı",
      "Uzman hekim uygulaması",
    ],
    details:
      "Tek kullanımlık ince iğnelerle uygulanan botoks işlemi 15-20 dakika sürer. Etki 3-7 gün içinde başlar, 2 hafta içinde tam sonuç görülür. Doğal mimiklerinizi koruyan miktarlarla uygulanır.",
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
      "FDA onaylı hyalüronik asit jel ile yapılan uygulamalarda lokal anestezi kremi konfor sağlar. Etki 12-18 ay sürer. Sonuçlar hemen görülür, şişlik 24-48 saat içinde iner.",
    image: "/images/service-skincare.png",
    badge: "Medikal",
  },
  {
    name: "Cilt Bakımı",
    tagline: "Kişiselleştirilmiş Medikal Bakım",
    description:
      "Cilt tipinize ve ihtiyaçlarınıza özel tasarlanmış medikal kalitede cilt bakım protokolleri. Uzman estetisyenlerimiz en doğru ürünleri ve yöntemleri seçerek cildinizi içeriden dışarıya yeniler.",
    benefits: [
      "Cilt tipine özel protokol",
      "Medikal kalite ürün seçimi",
      "Derin nem ve antioksidan desteği",
      "Leke ve ton eşitsizliği tedavisi",
      "Uzun vadeli cilt sağlığı",
    ],
    details:
      "Bakım seansı öncesinde detaylı cilt analizi yapılır. Seanslar 60-90 dakika sürer ve haftada ya da ayda bir tekrarlanması önerilir.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Saç Tasarım",
    tagline: "Kraliyet Dokunuşu",
    description:
      "Saç kesimi, renklendirme, ombre, keratin bakım ve vitamin işlemleri ile saçlarınıza özgün bir stil kazandırıyoruz. Uzman saç stilistlerimiz her saç tipine özel çözümler sunar.",
    benefits: [
      "Kişiye özel stil danışmanlığı",
      "Profesyonel renk uygulamaları",
      "Keratin ve protein bakımı",
      "Hasar onarımı tedavileri",
      "Kalıcı şekillendirme seçenekleri",
    ],
    details:
      "Saç bakım randevularında önce saç analizi yapılır, ardından kişiye özel ürün ve yöntem belirlenir. İşlem süresi saç uzunluğu ve uygulamaya göre değişir.",
    image: "/images/service-hair.png",
  },
  {
    name: "Makyaj",
    tagline: "Sanatsal Dokunuş",
    description:
      "Özel günleriniz için porselen makyaj, gelin makyajı ve günlük makyaj uygulamaları. Yüz hatlarınızı öne çıkaran, uzun süre kalıcı profesyonel makyaj deneyimi.",
    benefits: [
      "Gelin ve özel gün makyajı",
      "Kalıcı ve transfer yapmaz formül",
      "HD fotoğraf uyumlu makyaj",
      "Kişilik ve stil analizine göre",
      "Profesyonel ürün markaları",
    ],
    details:
      "Makyaj randevularında kıyafet ve konsept paylaşmanız önerilir. İşlem süresi 60-90 dakikadır. Yoğun talep dönemlerinde önceden randevu alınması gerekmektedir.",
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
      "İşlem öncesi cilde uyuşturucu krem uygulanır. Pigment seçimi yüz analizi ile birlikte yapılır. İşlem 2-3 saat sürer; 4-6 hafta sonra rötuş seansı ile sonuç kalıcılaştırılır.",
    image: "/images/service-makeup.png",
  },
];

interface ServiceDrawerProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onBook: () => void;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ServiceModal({ service, onClose, onBook }: ServiceDrawerProps) {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
            style={{ backgroundColor: "rgba(20,5,30,0.72)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Drawer panel — slides in from right */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36, mass: 1 }}
            className="fixed top-0 right-0 h-full z-[110] flex flex-col shadow-2xl"
            style={{
              width: "min(520px, 100vw)",
              backgroundColor: "#F5F5F5",
            }}
          >
            {/* Gold top accent line */}
            <div className="h-1 w-full shrink-0" style={{ background: "linear-gradient(90deg, #3B0A45, #D4AF37, #3B0A45)" }} />

            {/* Hero image — fixed height */}
            <div className="relative h-52 shrink-0 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.75)" }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #F5F5F5 0%, rgba(245,245,245,0.1) 70%, transparent 100%)" }} />

              {/* Badge */}
              {service.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                >
                  <Star size={10} fill="currentColor" /> {service.badge}
                </motion.div>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-white/20"
                style={{ border: "1px solid rgba(255,255,255,0.5)", color: "white" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {/* Service label */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-6" style={{ backgroundColor: "#D4AF37" }} />
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "#D4AF37" }}>
                    Royal Güzellik
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h2 variants={fadeUp} className="font-serif text-3xl mb-1" style={{ color: "#3B0A45" }}>
                  {service.name}
                </motion.h2>

                {/* Tagline */}
                <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "#6A0DAD" }}>
                  {service.tagline}
                </motion.p>

                {/* Separator */}
                <motion.div variants={fadeUp} className="h-[1px] mb-6" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />

                {/* Description */}
                <motion.p variants={fadeUp} className="text-sm font-light leading-relaxed mb-8" style={{ color: "#555" }}>
                  {service.description}
                </motion.p>

                {/* Benefits */}
                <motion.div variants={fadeUp} className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={14} style={{ color: "#D4AF37" }} />
                    <h3 className="text-xs uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>
                      Faydaları & Avantajları
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {service.benefits.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.07, duration: 0.38 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                        <span className="text-sm font-light" style={{ color: "#444" }}>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div variants={fadeUp} className="p-5 mb-8" style={{ backgroundColor: "rgba(59,10,69,0.05)", borderLeft: "3px solid #D4AF37" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={13} style={{ color: "#6A0DAD" }} />
                    <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: "#3B0A45" }}>
                      Uygulama Detayları
                    </h4>
                  </div>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "#666" }}>
                    {service.details}
                  </p>
                </motion.div>

                {/* Decorative gold divider */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                  <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(212,175,55,0.3)" }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#D4AF37" }} />
                  <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(212,175,55,0.3)" }} />
                </motion.div>
              </motion.div>
            </div>

            {/* Sticky CTA at bottom */}
            <div className="shrink-0 px-8 py-5 border-t" style={{ borderColor: "rgba(212,175,55,0.25)", backgroundColor: "#F5F5F5" }}>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                onClick={() => {
                  onClose();
                  setTimeout(onBook, 300);
                }}
                className="royal-btn w-full flex items-center justify-center gap-3 py-5 text-sm font-bold uppercase tracking-widest"
                style={{ backgroundColor: "#3B0A45", color: "#D4AF37" }}
              >
                Bu Hizmet İçin Randevu Al
                <ArrowRight size={16} />
              </motion.button>

              <p className="text-center text-xs mt-3 font-light" style={{ color: "#999" }}>
                Ücretsiz danışma için WhatsApp'tan da ulaşabilirsiniz.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
