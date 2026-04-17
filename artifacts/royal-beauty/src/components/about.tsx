import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award } from "lucide-react";

const expertise = [
  "Cilt bakımı",
  "Lazer epilasyon",
  "Medikal bakım",
  "Kuaförlük",
  "Saç kesimi",
  "Saç tasarımı",
  "Dermapen",
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Decorative violet patch */}
      <div className="absolute top-0 right-0 w-1/3 h-full rounded-l-[100px] -z-10" style={{ backgroundColor: "rgba(106,13,173,0.07)" }} />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-5/12 relative shrink-0"
          >
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{ borderRadius: "120px 120px 12px 12px" }}
            >
              <img
                src="/images/leyla-akay.png"
                alt="Leyla Akay - Royal Güzellik Kurucusu"
                className="w-full object-cover"
                style={{ maxHeight: "520px", objectPosition: "center top" }}
              />
              {/* Inner border ring */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "8px solid rgba(212,175,55,0.18)",
                  borderRadius: "120px 120px 12px 12px",
                }}
              />
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-6 -right-4 md:-right-10 p-6 shadow-xl max-w-[270px]"
              style={{ backgroundColor: "#F5F5F5", border: "1px solid rgba(212,175,55,0.35)" }}
            >
              <div className="h-[2px] w-8 mb-3" style={{ backgroundColor: "#D4AF37" }} />
              <p className="font-serif text-base italic mb-3 leading-snug" style={{ color: "#3B0A45" }}>
                "Güzellik bir lüks değil, hak ettiğiniz bir ritüeldir."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37" }}>
                Leyla Akay
              </p>
              <p className="text-xs uppercase tracking-wider mt-0.5" style={{ color: "#999" }}>
                Kurucu & Uzman Estetisyen
              </p>
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12" style={{ backgroundColor: "#D4AF37" }} />
              <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                Biz Kimiz?
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight" style={{ color: "#3B0A45" }}>
              İstanbul'un <br />
              <span className="italic" style={{ color: "#6A0DAD" }}>Kraliyet</span> Standardı
            </h2>

            <p className="leading-relaxed mb-5 font-light" style={{ color: "#555" }}>
              Royal Güzellik, güzellik ve bakım alanında en yüksek kalitede hizmet sunmaktadır.
            </p>

            <p className="leading-relaxed mb-5 font-light" style={{ color: "#555" }}>
              Kurucumuz ve uzmanımız <strong style={{ color: "#3B0A45", fontWeight: 600 }}>Leyla Akay</strong>, İstanbul Royal Güzellik Akademisi'nde güzellik ve bakım eğitimini tamamlayarak müşterilerine zengin deneyim sunmaktadır. MEB onaylı sertifika ve diplomalara sahip olan Leyla Akay, özellikle saç kesimi ve tasarımında olağanüstü yetenek sergilemektedir.
            </p>

            {/* Expertise list */}
            <div className="mb-7">
              <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#3B0A45" }}>
                Uzmanlık Alanları
              </p>
              <div className="grid grid-cols-2 gap-2">
                {expertise.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} style={{ color: "#D4AF37" }} className="shrink-0" />
                    <span className="text-sm font-light" style={{ color: "#444" }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="leading-relaxed mb-5 font-light" style={{ color: "#555" }}>
              Merkezimizde, daha ağrısız, hızlı ve etkili lazer epilasyon için en son teknoloji <strong style={{ color: "#3B0A45", fontWeight: 600 }}>"Buz Lazer Soprano"</strong> cihazını kullanmaktayız.
            </p>

            {/* Hygiene & quality badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ border: "1px solid rgba(212,175,55,0.4)", backgroundColor: "rgba(212,175,55,0.05)" }}>
                <Shield size={15} style={{ color: "#D4AF37" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3B0A45" }}>Steril & Hijyenik</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ border: "1px solid rgba(212,175,55,0.4)", backgroundColor: "rgba(212,175,55,0.05)" }}>
                <Award size={15} style={{ color: "#D4AF37" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3B0A45" }}>MEB Onaylı Sertifika</span>
              </div>
            </div>

            <p className="leading-relaxed mb-8 font-light text-sm italic" style={{ color: "#666", borderLeft: "3px solid #D4AF37", paddingLeft: "16px" }}>
              Royal Güzellik'te her ayrıntı, müşterilerimizin kendilerini daha özel, daha bakımlı ve daha güzel hissetmeleri için tasarlanmıştır. Güzelliğinize değer katan özel bir deneyim yaşamaya davet ediyoruz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "rgba(212,175,55,0.25)" }}>
              <div>
                <h4 className="text-3xl font-serif mb-1" style={{ color: "#3B0A45" }}>10+</h4>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#999" }}>Yıllık Tecrübe</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-1" style={{ color: "#3B0A45" }}>100%</h4>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#999" }}>Müşteri Memnuniyeti</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-1" style={{ color: "#3B0A45" }}>FDA</h4>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#999" }}>Onaylı Cihazlar</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
