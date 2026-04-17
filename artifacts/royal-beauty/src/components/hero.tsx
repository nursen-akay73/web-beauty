import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Royal Güzellik Salon Interior"
          className="w-full h-full object-cover scale-105 animate-in slide-in-from-bottom-2 duration-1000"
        />
        <div className="absolute inset-0 bg-primary/70 md:bg-primary/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-accent/60" />
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">
            Premium Güzellik Deneyimi
          </span>
          <div className="h-[1px] w-12 bg-accent/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif text-primary-foreground leading-tight max-w-4xl mb-8"
        >
          Güzelliğinizi <span className="italic text-accent">Kraliyet</span> İhtişamıyla Taçlandırın
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-primary-foreground/80 md:text-lg max-w-2xl font-light leading-relaxed mb-12"
        >
          Leyla Akay vizyonuyla, Soprano Ice teknolojisi ve profesyonel dokunuşların buluştuğu İstanbul'un en seçkin güzellik merkezi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button
            onClick={() => scrollTo("#contact")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary-foreground rounded-none px-12 py-7 uppercase tracking-widest text-sm transition-all duration-500 hover:scale-105"
          >
            Randevu Oluştur
          </Button>
          <Button
            onClick={() => scrollTo("#services")}
            variant="outline"
            size="lg"
            className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-none px-12 py-7 uppercase tracking-widest text-sm transition-all duration-500"
          >
            Hizmetleri Keşfet
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-primary-foreground/60 text-xs uppercase tracking-widest font-light">
          Aşağı Kaydır
        </span>
        <div className="w-[1px] h-16 bg-primary-foreground/20 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 bg-accent absolute top-0"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
