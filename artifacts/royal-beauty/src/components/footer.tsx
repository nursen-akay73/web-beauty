import { Link } from "wouter";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1025] text-primary-foreground border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl tracking-tight text-white">
                Royal <span className="text-accent italic">Güzellik</span>
              </span>
            </Link>
            <p className="text-primary-foreground/60 font-light text-sm leading-relaxed mb-8">
              Güzelliğinizi lüks bir ritüele dönüştüren, uzman dokunuşların ve son teknolojinin buluştuğu İstanbul'un premium güzellik merkezi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Hızlı Menü</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Hakkımızda</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Hizmetlerimiz</a></li>
              <li><a href="#values" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Değerlerimiz</a></li>
              <li><a href="#gallery" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Galeri</a></li>
              <li><a href="#contact" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Hizmetler</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Soprano Ice Lazer</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Hydrafacial Cilt Bakımı</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Medikal Peeling</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Kaş & Kirpik Tasarımı</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Saç Tasarım</a></li>
              <li><a href="#services" className="text-primary-foreground/60 hover:text-accent text-sm font-light transition-colors">Profesyonel Makyaj</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Bülten Bülteni</h4>
            <p className="text-primary-foreground/60 font-light text-sm mb-4">
              Kampanya ve yeniliklerden haberdar olmak için e-posta listemize katılın.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 w-full focus:outline-none focus:border-accent/50 rounded-none"
              />
              <button className="bg-accent text-primary-foreground px-4 flex items-center justify-center hover:bg-accent/90 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light">
            &copy; {currentYear} Royal Güzellik. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-light">
            <a href="#" className="hover:text-accent transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-accent transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
