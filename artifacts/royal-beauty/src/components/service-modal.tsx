import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Star } from "lucide-react";

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
      "Seans 45-60 dakika sürer. Yosun bazlı özel peeling karışımı uygulandıktan sonra masaj ile cildin derinliklerine işlenmesi sağlanır. Ayda 1 kez tekrarlayan bakım için idealdir.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Hydrafacial",
    tagline: "Cilt Bakımında Yeni Nesil Deneyim",
    description:
      "Hydrafacial, 3 adımda derin temizlik, eksfoliasyon ve nem dolumu yapan dünyaca ünlü bir cilt bakım sistemidir. Seansın hemen ardından gözle görülür bir ışıltı ve yenilenme hissi sunar.",
    benefits: [
      "Gözenek temizliği ve sıkılaştırma",
      "Cilt yüzeyini pürüzsüzleştirir",
      "Nem ve antioksidan dolumu",
      "Anında fark yaratan sonuç",
      "Kimyasal içermez, doğal",
    ],
    details:
      "3 aşamalı uygulama; Cleanse & Peel (temizlik ve eksfoliasyon), Extract & Hydrate (derin temizlik ve nemlendirme), Fuse & Protect (antioksidan koruması). Seans süresi 60 dakika.",
    image: "/images/service-skincare.png",
    badge: "Yeni",
  },
  {
    name: "Kirpik Lifting",
    tagline: "Doğal Kirpiklerinizi Vurgulayın",
    description:
      "Kirpik lifting, kendi kirpiklerinizi kaldırarak doğal ama dramatik bir etki yaratır. Maskara gerektirmeden aylarca süren kıvrım ve uzunluk hissi sağlar.",
    benefits: [
      "Kirpikleri doğal yollarla kaldırır",
      "6-8 hafta kalıcılık",
      "Maskara gerektirmez",
      "Gözlere derinlik katar",
      "Hızlı 45 dakikalık uygulama",
    ],
    details:
      "Silikon aparatlar yardımıyla kirpikler kaldırılır, kalıcı dalga solüsyonu ve besleyici bakım serumu uygulanır. İşlem tamamen ağrısızdır ve seans sonrası hemen normal hayata dönülür.",
    image: "/images/service-makeup.png",
  },
  {
    name: "Saç Vitamin İşlemi",
    tagline: "Saç Kökünden Gelen Güç",
    description:
      "Saç derisine uygulanan vitamin infüzyonu, saç köklerini besler, dökülmeyi azaltır ve saçların daha güçlü, parlak büyümesini sağlar. Yoğun bakım formülü ile saçınız içten dışa canlanır.",
    benefits: [
      "Saç dökülmesini azaltır",
      "Kök güçlendirme ve canlandırma",
      "Parlaklık ve yumuşaklık",
      "Saç büyümesini hızlandırır",
      "Tüm saç tiplerine uygun",
    ],
    details:
      "Mezoterapiye benzer şekilde ince iğneler ya da dermaroller aracılığıyla saç derisi vitaminleri (biotin, peptid, mineral kompleksi) ile infüze edilir. 4-6 seans ile belirgin sonuç.",
    image: "/images/service-hair.png",
  },
  {
    name: "Cilt Gençleştirme",
    tagline: "RF & LED Teknoloji ile Genç Cilt",
    description:
      "Radyo frekansı (RF) ve LED ışık terapisi kombinasyonu ile cilt sıkılaştırma, kırışıklık azaltma ve gençleştirme. Cerrahi müdahale gerektirmeyen, doğal ve güvenli bir tedavi.",
    benefits: [
      "Cilt sıkılaştırma ve kaldırma etkisi",
      "Kolajen üretimini uyarır",
      "İnce çizgi ve kırışıklık azaltma",
      "Yüz konturunu belirginleştirir",
      "Cerrahi olmayan, ağrısız",
    ],
    details:
      "RF enerji cilt altı dokusunu ısıtarak kolajen liflerinin kasılmasını sağlar; LED terapisi ise hücre yenilenmesini ve leke azalmayı destekler. Her ay 1 seans ile yaşlanma belirtilerini belirgin biçimde azaltır.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Cilt Bakımı",
    tagline: "Kişiselleştirilmiş Medikal Bakım",
    description:
      "Cilt tipinize ve ihtiyaçlarınıza özel tasarlanmış medikal kalitede cilt bakım protokolleri. Uzman estetisyenlerimiz en doğru ürünleri ve yöntemleri seçerek cildinizi içeriden dışarıya yeniler.",
    benefits: [
      "Cilt tipine özel protokol",
      "Medikal kalite ürünler",
      "Uzman estetisyen uygulaması",
      "Derin nemlendirme ve beslenme",
      "Görünür yenilenme ve ışıltı",
    ],
    details:
      "Bakım öncesi cilt analizi yapılır, ardından temizlik, tonik, serum, maske ve nemlendirici aşamalarıyla kişisel bir protokol uygulanır. Düzenli aylık bakımla kalıcı iyileşme sağlanır.",
    image: "/images/service-skincare.png",
  },
  {
    name: "Dolgu İşlemleri",
    tagline: "Hyalüronik Asit ile Doğal Kontur",
    description:
      "Dudak dolgusu, yüz konturlama ve derin kırışıklık dolgusu için FDA onaylı hyalüronik asit bazlı ürünler kullanılır. Doğal ve genç bir görünüm için uzman doktor gözetiminde uygulama.",
    benefits: [
      "Anında belirgin sonuç",
      "Doğal ve orantılı görünüm",
      "FDA onaylı hyalüronik asit",
      "9-18 ay kalıcılık",
      "Minimal iyileşme süreci",
    ],
    details:
      "Uyuşturucu krem ile rahatsızlık minimize edilir. Uzman uygulayıcı tarafından ince kanüller ile yerleştirilir. Seans 30-45 dakika sürer, uygulama sonrası hafif şişlik 24-48 saat içinde geçer.",
    image: "/images/service-makeup.png",
  },
  {
    name: "Botoks İşlemleri",
    tagline: "Mimik Çizgilerine Profesyonel Çözüm",
    description:
      "Botulinum toksin enjeksiyonu ile alın çizgileri, göz kırışıklıkları ve gülümseme çizgilerini yumuşatarak daha genç ve dinlenmiş bir görünüm elde edin. Hızlı, güvenli ve etkili.",
    benefits: [
      "Alın ve göz çevresi çizgileri azalır",
      "3-7 gün içinde etkisi görülür",
      "4-6 ay kalıcılık",
      "Hızlı 20 dakikalık işlem",
      "Sertifikalı hekim uygulaması",
    ],
    details:
      "Botoks, seçilen kas gruplarına mikro dozda enjekte edilerek kasın geçici olarak gevşemesini sağlar. Mimik kasılmaları ile oluşan dinamik çizgiler görünür biçimde yumuşar. İzin süreci gerektirmez.",
    image: "/images/service-skincare.png",
  },
];

type Props = {
  service: ServiceDetail | null;
  onClose: () => void;
  onBook: () => void;
};

export default function ServiceModal({ service, onClose, onBook }: Props) {
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-[#3B0A45] hover:bg-[#3B0A45] hover:text-white transition-all duration-300"
                style={{ color: "#3B0A45" }}
              >
                <X size={18} />
              </button>

              {/* Hero image */}
              <div className="relative h-52 md:h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #F5F5F5 0%, rgba(245,245,245,0.3) 60%, transparent 100%)",
                  }}
                />
                {service.badge && (
                  <div
                    className="absolute top-5 left-5 px-4 py-1.5 text-xs uppercase tracking-widest font-bold"
                    style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                  >
                    {service.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-8 md:px-12 pb-10 -mt-6 relative z-10">
                {/* Brand label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8" style={{ backgroundColor: "#D4AF37" }} />
                  <span
                    className="uppercase tracking-[0.2em] text-xs font-semibold"
                    style={{ color: "#D4AF37" }}
                  >
                    Royal Güzellik
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                </div>

                <h2
                  className="text-3xl md:text-4xl font-serif mb-2"
                  style={{ color: "#3B0A45" }}
                >
                  {service.name}
                </h2>
                <p
                  className="text-sm font-semibold uppercase tracking-wider mb-6"
                  style={{ color: "#6A0DAD" }}
                >
                  {service.tagline}
                </p>

                <p className="font-light leading-relaxed mb-8 text-gray-600">
                  {service.description}
                </p>

                {/* Benefits */}
                <div
                  className="p-6 mb-6 border-l-4"
                  style={{
                    backgroundColor: "rgba(59,10,69,0.04)",
                    borderLeftColor: "#D4AF37",
                  }}
                >
                  <h4
                    className="uppercase tracking-widest text-xs font-bold mb-4"
                    style={{ color: "#3B0A45" }}
                  >
                    Faydaları & Avantajlar
                  </h4>
                  <ul className="space-y-2.5">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#D4AF37" }}
                        />
                        <span className="text-sm font-light text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Details */}
                <div
                  className="p-6 mb-8 border"
                  style={{ borderColor: "rgba(59,10,69,0.12)" }}
                >
                  <h4
                    className="uppercase tracking-widest text-xs font-bold mb-3"
                    style={{ color: "#3B0A45" }}
                  >
                    Uygulama Detayları
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-gray-600">
                    {service.details}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(onBook, 200);
                  }}
                  className="w-full flex items-center justify-center gap-3 py-5 uppercase tracking-widest text-sm font-bold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#3B0A45", color: "#D4AF37" }}
                >
                  Bu Hizmet İçin Randevu Al <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
