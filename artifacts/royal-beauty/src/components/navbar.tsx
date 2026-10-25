import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShimmerTransition } from "@/components/page-shimmer";

const navLinks = [
  { href: "#about", label: "Hakkımızda" },
  { href: "#services", label: "Hizmetlerimiz" },
  { href: "#skin-analysis", label: "Cilt Analizi" },
  { href: "#values", label: "Değerlerimiz" },
  { href: "#gallery", label: "Galeri" },
  { href: "#contact", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const shimmer = useShimmerTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The gold border highlight follows the cursor anywhere on the page.
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const el = navRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    shimmer();
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 180);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        ref={navRef}
        className={`liquid-gold-nav mx-auto transition-[max-width] duration-500 ${
          scrolled ? "max-w-6xl" : "max-w-7xl"
        }`}
      >
        <div
          className={`liquid-gold-nav__inner flex items-center justify-between pl-6 pr-2 md:pl-8 transition-all duration-500 ${
            scrolled ? "py-1.5" : "py-2.5"
          }`}
        >
          <Link href="/" className="group">
            <span className="font-serif text-2xl md:text-[1.7rem] tracking-tight text-primary-foreground whitespace-nowrap">
              Royal <span className="text-accent italic">Güzellik</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="roll-link text-[13px] uppercase tracking-widest font-medium text-primary-foreground/85"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <a
              href="https://www.instagram.com/royalguzellik_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:border-accent hover:bg-accent/10"
              style={{ borderColor: "rgba(212,175,55,0.4)" }}
            >
              <Instagram
                size={18}
                className="transition-all duration-300 group-hover:scale-110"
                style={{ color: "#D4AF37" }}
              />
              {/* shimmer ring on hover */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "0 0 12px rgba(212,175,55,0.45)" }}
              />
            </a>
            <Button
              onClick={() => scrollTo("#contact")}
              className="royal-btn btn-randevu-shimmer !rounded-full bg-accent hover:bg-accent/90 text-primary uppercase tracking-wider text-xs px-7 py-5 font-semibold"
            >
              Randevu Al
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2.5 min-w-11 min-h-11 flex items-center justify-center text-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav — drawer that expands under the pill */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden mt-3 mx-auto max-w-7xl rounded-3xl overflow-hidden border"
            style={{
              backgroundColor: "rgba(45,11,63,0.96)",
              borderColor: "rgba(212,175,55,0.45)",
              boxShadow: "0 20px 50px rgba(45,11,63,0.35)",
            }}
          >
            <ul className="flex flex-col items-center gap-5 pt-8 pb-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="block py-2.5 -my-2.5 text-2xl font-serif text-primary-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pb-8 pt-4 flex justify-center">
              <Button
                onClick={() => scrollTo("#contact")}
                className="royal-btn !rounded-full bg-accent hover:bg-accent/90 text-primary w-full max-w-xs uppercase tracking-wider py-6 text-base"
              >
                Randevu Al
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
