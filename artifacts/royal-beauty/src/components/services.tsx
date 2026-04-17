import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const serviceCards = [
  {
    title: "Cilt Bakımı",
    description: "Hydrafacial, medikal cilt bakımı, peeling ve altın maske uygulamaları ile cildinizin ihtiyacı olan nemi ve ışıltıyı geri kazandırıyoruz.",
    image: "/images/service-skincare.png",
    delay: 0.1,
  },
  {
    title: "Lazer Epilasyon",
    description: "Altın standart Soprano Ice teknolojisi ile her cilt tipinde dört mevsim ağrısız, kalıcı çözüm.",
    image: "/images/service-laser.png",
    delay: 0.2,
  },
  {
    title: "Saç Tasarım",
    description: "Saç kesimi, renklendirme, ombre, keratin bakım ve kaynak işlemleri ile saçlarınıza kraliyet dokunuşu.",
    image: "/images/service-hair.png",
    delay: 0.3,
  },
  {
    title: "Makyaj",
    description: "Özel günleriniz için porselen makyaj, gelin makyajı ve günlük makyaj uygulamaları.",
    image: "/images/service-makeup.png",
    delay: 0.4,
  },
];

const serviceList = [
  {
    name: "Lazer Epilasyon",
    desc: "Soprano Ice ile ağrısız, kalıcı tüy arındırma",
    icon: "✦",
  },
  {
    name: "Dermapen",
    desc: "Mikro iğneler ile cilt yenileme ve kolajen uyarımı",
    icon: "✦",
  },
  {
    name: "Yosun Peeling",
    desc: "Deniz yosunu ekstreli derin temizlik ve nemlendirme",
    icon: "✦",
  },
  {
    name: "Hydrafacial",
    desc: "Derin temizlik, eksfoliasyon ve nem doldurma",
    icon: "✦",
  },
  {
    name: "Kirpik Lifting",
    desc: "Doğal kirpiklerinizin kıvrımını vurgulayan profesyonel uygulama",
    icon: "✦",
  },
  {
    name: "Saç Vitamin İşlemi",
    desc: "Saç derisine nourishing vitamin infüzyonu",
    icon: "✦",
  },
  {
    name: "Cilt Gençleştirme",
    desc: "RF ve LED teknolojileri ile cilt sıkılaştırma",
    icon: "✦",
  },
  {
    name: "Cilt Bakımı",
    desc: "Kişiye özel medikal cilt bakım protokolleri",
    icon: "✦",
  },
  {
    name: "Dolgu İşlemleri",
    desc: "Dudak ve yüz konturlaması için hyaluronik asit dolgusu",
    icon: "✦",
  },
  {
    name: "Botoks İşlemleri",
    desc: "Mimik çizgilerini azaltmaya yönelik botulinum toksin uygulaması",
    icon: "✦",
  },
];

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="services" className="relative" style={{ backgroundColor: "#3B0A45" }}>

      {/* Top wave / transition from above */}
      <div
        className="absolute -top-px left-0 right-0 h-16 z-10"
        style={{
          background: "linear-gradient(to bottom, #F5F5F5 0%, transparent 100%)",
        }}
      />

      <div className="relative z-20 py-28 md:py-36">
        <div className="container mx-auto px-6 md:px-12">

          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-[1px] w-10" style={{ backgroundColor: "#D4AF37" }} />
              <span className="uppercase tracking-[0.25em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                Uzmanlık Alanlarımız
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
              Premium <span className="italic gold-shimmer">Hizmetlerimiz</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/65 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Her biri kendi alanında uzman estetisyenlerimiz ile en son teknolojiyi birleştirerek size eşsiz bir güzellik deneyimi sunuyoruz.
            </motion.p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
            {serviceCards.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay, duration: 0.8 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-30"
                    style={{ backgroundColor: "rgba(59,10,69,0.4)" }}
                  />
                </div>

                <div className="p-7 relative z-10 transition-transform duration-500 group-hover:-translate-y-3" style={{ backgroundColor: "rgba(45,11,63,0.9)" }}>
                  <h3 className="text-xl font-serif text-white mb-3">{service.title}</h3>
                  <div
                    className="h-[1px] w-10 mb-5 transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: "#D4AF37" }}
                  />
                  <p className="text-white/60 font-light text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <button
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors"
                    style={{ color: "#D4AF37" }}
                  >
                    Detaylı İncele <ArrowRight size={13} />
                  </button>
                </div>

                {/* Gold hover border */}
                <div
                  className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37] transition-colors duration-500 pointer-events-none z-20"
                />
              </motion.div>
            ))}
          </div>

          {/* ── Interactive Service List ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-6" style={{ backgroundColor: "#D4AF37" }} />
                  <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                    Tüm Hizmetler
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-snug">
                  İlgilendiğiniz <span className="italic" style={{ color: "#D4AF37" }}>hizmeti</span> seçin
                </h3>
              </div>

              <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {serviceList.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6 }}
                  >
                    <button
                      onClick={() => setSelected(selected === i ? null : i)}
                      className="w-full flex items-center justify-between py-5 px-2 text-left group transition-all duration-300"
                      style={{
                        borderLeft: selected === i ? "3px solid #D4AF37" : "3px solid transparent",
                        paddingLeft: selected === i ? "16px" : "8px",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="text-xs transition-all duration-300"
                          style={{ color: selected === i ? "#D4AF37" : "rgba(255,255,255,0.3)" }}
                        >
                          {item.icon}
                        </span>
                        <span
                          className="uppercase tracking-widest text-sm font-semibold transition-colors duration-300"
                          style={{ color: selected === i ? "#D4AF37" : "rgba(255,255,255,0.85)" }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        className="transition-all duration-300"
                        style={{
                          color: selected === i ? "#D4AF37" : "rgba(255,255,255,0.25)",
                          transform: selected === i ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {selected === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/55 text-sm font-light leading-relaxed pb-5 pl-9 pr-4">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: highlighted selected service OR decorative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="lg:sticky lg:top-28"
            >
              <AnimatePresence mode="wait">
                {selected !== null ? (
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="p-10 border relative glow-pulse"
                    style={{
                      backgroundColor: "rgba(106,13,173,0.15)",
                      borderColor: "#D4AF37",
                    }}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l" style={{ borderColor: "#D4AF37" }} />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r" style={{ borderColor: "#D4AF37" }} />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l" style={{ borderColor: "#D4AF37" }} />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r" style={{ borderColor: "#D4AF37" }} />

                    <div className="h-[1px] w-10 mb-8" style={{ backgroundColor: "#D4AF37" }} />
                    <h4 className="text-3xl font-serif text-white mb-4">{serviceList[selected].name}</h4>
                    <p className="text-white/65 font-light leading-relaxed mb-8">
                      {serviceList[selected].desc}
                    </p>
                    <button
                      onClick={() => {
                        const el = document.querySelector("#contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-3 uppercase tracking-widest text-xs font-bold px-8 py-4 transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                    >
                      Bu Hizmeti Rezerve Et <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-10 border"
                    style={{ borderColor: "rgba(212,175,55,0.25)", backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="h-[1px] w-10 mb-8" style={{ backgroundColor: "#D4AF37" }} />
                    <p className="text-white/40 font-serif text-xl italic leading-relaxed mb-6">
                      "Güzellik bir ayrıcalık değil, hakkınız."
                    </p>
                    <p className="text-white/30 text-sm font-light">
                      Soldaki listeden merak ettiğiniz hizmeti seçerek detaylı bilgi alın ve randevu oluşturun.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom transition */}
      <div
        className="absolute -bottom-px left-0 right-0 h-16 z-10"
        style={{
          background: "linear-gradient(to top, #F5F5F5 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
