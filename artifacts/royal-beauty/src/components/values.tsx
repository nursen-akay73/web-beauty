import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Award } from "lucide-react";

export default function Values() {
  return (
    <section id="values" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
            Neden <span className="italic">Royal Güzellik?</span>
          </h2>
          <div className="h-[1px] w-24 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="w-20 h-20 mx-auto rounded-full border border-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-500">
              <ShieldCheck size={32} className="text-accent group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-serif text-primary mb-4">Tavizsiz Hijyen</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Sağlığınız bizim için her şeyden önemli. Kliniğimizdeki her alan ve ekipman, medikal standartlarda sterilize edilmektedir. Tek kullanımlık malzemeler ve katı hijyen protokolleri uyguluyoruz.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center group"
          >
            <div className="w-20 h-20 mx-auto rounded-full border border-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-500">
              <Sparkles size={32} className="text-accent group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-serif text-primary mb-4">Kişiselleştirilmiş Bakım</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Her cilt ve her beden eşsizdir. Standart paketler yerine, sizin ihtiyaçlarınıza özel analizler yapıyor ve en doğru sonuçları alacağınız kişiye özel tedavi protokolleri oluşturuyoruz.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center group"
          >
            <div className="w-20 h-20 mx-auto rounded-full border border-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-500">
              <Award size={32} className="text-accent group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-serif text-primary mb-4">Sertifikalı Uzmanlık</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Royal Güzellik Akademisi sertifikalı uzman estetisyenlerimiz, alanındaki en son yenilikleri takip ederek size en güvenli ve etkili uygulamaları sunar.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
