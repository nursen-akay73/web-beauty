import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full rounded-l-[100px] -z-10" style={{ backgroundColor: "rgba(106,13,173,0.10)" }} />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-t-[150px] shadow-2xl">
              <img 
                src="/images/owner.png" 
                alt="Leyla Akay - Royal Güzellik Kurucusu" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[10px] border-accent/20 rounded-t-[150px] pointer-events-none" />
            </div>
            
            <div className="absolute bottom-10 -right-10 md:-right-20 bg-background p-6 md:p-8 shadow-xl max-w-[280px] border border-border">
              <p className="font-serif text-xl text-primary italic mb-2">"Güzellik bir lüks değil, hak ettiğiniz bir ritüeldir."</p>
              <h3 className="uppercase tracking-widest text-sm font-bold text-accent">Leyla Akay</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Kurucu & Uzman Estetisyen</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">Biz Kimiz?</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">
              İstanbul'un <br />
              <span className="italic">Kraliyet</span> Standardı
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
              Royal Güzellik olarak, güzellik ve bakım anlayışını standartların ötesine taşıyoruz. Her misafirimizin kendini özel ve ayrıcalıklı hissedeceği, baştan aşağı lüks bir deneyim sunuyoruz.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-10 font-light">
              İstanbul Royal Güzellik Akademisi sertifikalı uzman kadromuz ve FDA onaylı altın standart Soprano Ice Lazer teknolojimiz ile güvenilir, hijyenik ve sonuç odaklı hizmet veriyoruz. Bedeninizin ve ruhunuzun yenilendiği bu kraliyet yolculuğuna davetlisiniz.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-border pt-10">
              <div>
                <h4 className="text-3xl font-serif text-primary mb-2">10+</h4>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Yıllık Tecrübe</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-primary mb-2">100%</h4>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Müşteri Memnuniyeti</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
