import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, Shield, Heart, Star } from "lucide-react";

const benefits = [
  {
    icon: <Zap size={20} />,
    title: "Ağrısız & Konforsuz",
    desc: "SHR teknolojisi ile cildi yavaş yavaş ısıtır, anlık atışların verdiği acı hissi tamamen ortadan kalkar.",
  },
  {
    icon: <Shield size={20} />,
    title: "Tüm Cilt & Kıl Tiplerine Uygun",
    desc: "Açık tenli–koyu tenli, ince tüylü–kalın tüylü tüm profiller için klinik olarak kanıtlanmış güvenlik.",
  },
  {
    icon: <Heart size={20} />,
    title: "Dört Mevsim Uygulama",
    desc: "Dalga boyu ve soğutma teknolojisi sayesinde yaz aylarında bile güvenle uygulanabilir.",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Kalıcı & Uzun Süreli Sonuç",
    desc: "Ortalama 6-8 seans ile kalıcı tüy azalması sağlanır. Bakım seansları ile sonuç ömür boyu sürdürülür.",
  },
  {
    icon: <Star size={20} />,
    title: "My Face My Body Ödülü",
    desc: "Soprano Titanium, yılın en iyi yeni cihazı ödülünü kazanarak dünya standartlarını belirleyen cihaz seçildi.",
  },
  {
    icon: <Award size={20} />,
    title: "FDA Onaylı Teknoloji",
    desc: "Uluslararası tıbbi güvenlik sertifikalarıyla onaylanmış, Royal Güzellik'in güvendiği premium cihaz.",
  },
];

export default function SopranoSection() {
  return (
    <section
      id="soprano"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/soprano-titanium.jpg"
          alt="Soprano Titanium Cihazı"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.22) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,11,63,0.96) 0%, rgba(59,10,69,0.88) 50%, rgba(45,11,63,0.96) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: text + benefits */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8" style={{ backgroundColor: "#D4AF37" }} />
                <span
                  className="uppercase tracking-[0.25em] text-xs font-semibold"
                  style={{ color: "#D4AF37" }}
                >
                  Teknolojimiz
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">
                Soprano{" "}
                <span className="italic gold-shimmer">Titanium</span>
              </h2>
              <p
                className="text-sm uppercase tracking-widest font-semibold mb-8"
                style={{ color: "#D4AF37" }}
              >
                Lazer Epilasyonda Çığır Açan Yenilik
              </p>

              <p className="text-white/65 font-light leading-relaxed mb-10 max-w-lg">
                Dünya çapında kliniklerin güvendiği Soprano Titanium, üç dalga boyunu tek bir kafada birleştirerek lazer epilasyonda benzeri görülmemiş bir etkinlik ve güvenlik sunuyor. Royal Güzellik olarak bu teknolojiyi sizinle buluşturuyoruz.
              </p>

              {/* Award badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="inline-flex items-center gap-4 px-6 py-4 mb-10 border"
                style={{ borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.08)" }}
              >
                <Award size={28} style={{ color: "#D4AF37" }} />
                <div>
                  <p
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: "#D4AF37" }}
                  >
                    My Face My Body Awards
                  </p>
                  <p className="text-white/70 text-xs font-light mt-0.5">
                    Yılın En İyi Yeni Cihazı Ödülü
                  </p>
                </div>
              </motion.div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="mt-0.5 shrink-0 p-2 transition-all duration-300"
                      style={{ color: "#D4AF37" }}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{b.title}</h4>
                      <p className="text-white/50 text-xs font-light leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: device image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative max-w-md w-full">
                {/* Glow behind device */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75"
                  style={{ backgroundColor: "#D4AF37" }}
                />
                <img
                  src="/images/soprano-titanium.jpg"
                  alt="Soprano Titanium Lazer Cihazı"
                  className="relative z-10 w-full object-contain"
                  style={{ maxHeight: "560px", filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.6))" }}
                />
                {/* Corner borders */}
                <div className="absolute top-2 left-2 w-10 h-10 border-t border-l z-20" style={{ borderColor: "#D4AF37" }} />
                <div className="absolute top-2 right-2 w-10 h-10 border-t border-r z-20" style={{ borderColor: "#D4AF37" }} />
                <div className="absolute bottom-2 left-2 w-10 h-10 border-b border-l z-20" style={{ borderColor: "#D4AF37" }} />
                <div className="absolute bottom-2 right-2 w-10 h-10 border-b border-r z-20" style={{ borderColor: "#D4AF37" }} />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
