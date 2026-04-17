import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent" />
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">Görsel Dünyamız</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary">
              <span className="italic">Kraliyet</span> Atmosferi
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-light text-sm md:text-base">
            Güzelliğe adanmış zarif mekanımızdan ve imza dokunuşlarımızdan estetik kareler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square md:col-span-2 lg:col-span-2 relative overflow-hidden group"
          >
            <img 
              src="/images/gallery-1.png" 
              alt="Royal Güzellik Uygulama" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="border border-white/50 text-white px-6 py-3 tracking-widest uppercase text-xs backdrop-blur-sm">Cilt Bakımı</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aspect-square relative overflow-hidden group"
          >
            <img 
              src="/images/gallery-2.png" 
              alt="Royal Güzellik Detay" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="border border-white/50 text-white px-6 py-3 tracking-widest uppercase text-xs backdrop-blur-sm">Estetik Dokunuş</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="aspect-square relative overflow-hidden group"
          >
            <img 
              src="/images/gallery-3.png" 
              alt="Royal Güzellik Ürünler" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="border border-white/50 text-white px-6 py-3 tracking-widest uppercase text-xs backdrop-blur-sm">Premium Ürünler</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="aspect-[2/1] md:col-span-2 lg:col-span-2 relative overflow-hidden group"
          >
            <img 
              src="/images/hero.png" 
              alt="Royal Güzellik Salon" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="border border-white/50 text-white px-6 py-3 tracking-widest uppercase text-xs backdrop-blur-sm">Salon Atmosferi</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
