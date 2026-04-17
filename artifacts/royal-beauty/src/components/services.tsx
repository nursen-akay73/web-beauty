import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Cilt Bakımı",
    description: "Hydrafacial, medikal cilt bakımı, peeling ve altın maske uygulamaları ile cildinizin ihtiyacı olan nemi ve ışıltıyı geri kazandırıyoruz.",
    image: "/images/service-skincare.png",
    delay: 0.1,
  },
  {
    title: "Lazer Epilasyon",
    description: "Altın standart Soprano Ice teknolojisi ile her cilt tipinde dört mevsim ağrısız, acısız, kesin çözüm.",
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
    title: "Profesyonel Makyaj",
    description: "Özel günleriniz için porselen makyaj, gelin makyajı ve günlük makyaj uygulamaları.",
    image: "/images/service-makeup.png",
    delay: 0.4,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-primary relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">Uzmanlık Alanlarımız</span>
            <div className="h-[1px] w-8 bg-accent" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-primary-foreground mb-6"
          >
            Premium <span className="italic">Hizmetlerimiz</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/70 max-w-2xl mx-auto font-light"
          >
            Her biri kendi alanında uzman estetisyenlerimiz ile en son teknolojiyi birleştirerek size eşsiz bir güzellik deneyimi sunuyoruz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.8 }}
              className="group relative overflow-hidden bg-background"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="p-8 relative z-10 transition-transform duration-500 bg-background group-hover:-translate-y-4">
                <h3 className="text-2xl font-serif text-primary mb-4">{service.title}</h3>
                <div className="w-12 h-[1px] bg-accent mb-6 transition-all duration-500 group-hover:w-24" />
                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary hover:text-accent transition-colors">
                  Detaylı İncele <ArrowRight size={14} />
                </button>
              </div>
              
              {/* Gold hover border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-500 pointer-events-none z-20" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
