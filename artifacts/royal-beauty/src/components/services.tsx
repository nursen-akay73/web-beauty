import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import ServiceModal, { SERVICE_DETAILS, type ServiceDetail } from "./service-modal";

const serviceCards = [
  {
    title: "Cilt Bakımı",
    description: "Hydrafacial, Dermapen, medikal peeling ve altın maske uygulamaları ile cildinize nemi ve ışıltıyı geri kazandırıyoruz.",
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
    description: "Saç kesimi, renklendirme, ombre, keratin bakım ve vitamin işlemleri ile saçlarınıza kraliyet dokunuşu.",
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

export default function Services() {
  const [listSelected, setListSelected] = useState<number | null>(null);
  const [modalService, setModalService] = useState<ServiceDetail | null>(null);

  const openModal = (name: string) => {
    const found = SERVICE_DETAILS.find((s) => s.name === name);
    if (found) setModalService(found);
  };

  const openModalCard = (title: string) => {
    const found = SERVICE_DETAILS.find((s) => s.name === title);
    if (found) setModalService(found);
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ServiceModal
        service={modalService}
        onClose={() => setModalService(null)}
        onBook={scrollToContact}
      />

      <section id="services" className="relative" style={{ backgroundColor: "#3B0A45" }}>
        {/* Top transition */}
        <div
          className="absolute -top-px left-0 right-0 h-16 z-10"
          style={{ background: "linear-gradient(to bottom, #F5F5F5 0%, transparent 100%)" }}
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

            {/* Service Cards */}
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
                  onClick={() => openModalCard(service.title)}
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
                    <div className="h-[1px] w-10 mb-5 transition-all duration-500 group-hover:w-20" style={{ backgroundColor: "#D4AF37" }} />
                    <p className="text-white/60 font-light text-sm leading-relaxed mb-5">{service.description}</p>
                    <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors" style={{ color: "#D4AF37" }}>
                      Detaylı İncele <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37] transition-colors duration-500 pointer-events-none z-20" />
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
                  <p className="text-white/40 text-sm mt-3 font-light">Hizmete tıklayarak detaylı bilgi ve fayda listesini görüntüleyin</p>
                </div>

                <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  {SERVICE_DETAILS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                    >
                      <button
                        onClick={() => {
                          setListSelected(listSelected === i ? null : i);
                          openModal(item.name);
                        }}
                        className="w-full flex items-center justify-between py-5 px-2 text-left group transition-all duration-300"
                        style={{
                          borderLeft: listSelected === i ? "3px solid #D4AF37" : "3px solid transparent",
                          paddingLeft: listSelected === i ? "16px" : "8px",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="text-xs transition-all duration-300"
                            style={{ color: listSelected === i ? "#D4AF37" : "rgba(255,255,255,0.3)" }}
                          >
                            ✦
                          </span>
                          <span
                            className="uppercase tracking-widest text-sm font-semibold transition-colors duration-300"
                            style={{ color: listSelected === i ? "#D4AF37" : "rgba(255,255,255,0.85)" }}
                          >
                            {item.name}
                          </span>
                          {item.badge && (
                            <span
                              className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
                              style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          size={16}
                          className="transition-all duration-300 shrink-0"
                          style={{
                            color: listSelected === i ? "#D4AF37" : "rgba(255,255,255,0.25)",
                            transform: listSelected === i ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: teaser / info panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="lg:sticky lg:top-28"
              >
                <AnimatePresence mode="wait">
                  {listSelected !== null ? (
                    <motion.div
                      key={listSelected}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="border relative"
                      style={{ backgroundColor: "rgba(106,13,173,0.12)", borderColor: "#D4AF37" }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l" style={{ borderColor: "#D4AF37" }} />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r" style={{ borderColor: "#D4AF37" }} />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l" style={{ borderColor: "#D4AF37" }} />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r" style={{ borderColor: "#D4AF37" }} />

                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={SERVICE_DETAILS[listSelected].image}
                          alt={SERVICE_DETAILS[listSelected].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(59,10,69,0.9) 0%, transparent 100%)" }} />
                      </div>

                      <div className="p-8">
                        <div className="h-[1px] w-10 mb-6" style={{ backgroundColor: "#D4AF37" }} />
                        <h4 className="text-2xl font-serif text-white mb-2">{SERVICE_DETAILS[listSelected].name}</h4>
                        <p className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "#D4AF37" }}>
                          {SERVICE_DETAILS[listSelected].tagline}
                        </p>
                        <p className="text-white/55 text-sm font-light leading-relaxed mb-8">
                          {SERVICE_DETAILS[listSelected].description}
                        </p>

                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => openModal(SERVICE_DETAILS[listSelected].name)}
                            className="flex items-center justify-center gap-2 py-4 uppercase tracking-widest text-xs font-bold border transition-all duration-300 hover:bg-white/10"
                            style={{ borderColor: "#D4AF37", color: "#D4AF37" }}
                          >
                            Tüm Detayları & Faydaları Gör <ArrowRight size={13} />
                          </button>
                          <button
                            onClick={scrollToContact}
                            className="flex items-center justify-center gap-2 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                          >
                            Randevu Al <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
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
                      <p className="text-white/25 text-sm font-light">
                        Soldaki listeden merak ettiğiniz hizmete tıklayarak detaylı bilgi alın, fotoğrafları ve faydaları görüntüleyin.
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
          style={{ background: "linear-gradient(to top, #F5F5F5 0%, transparent 100%)" }}
        />
      </section>
    </>
  );
}
