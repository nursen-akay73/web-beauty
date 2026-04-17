import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "Hakkımızda" },
  { href: "#services", label: "Hizmetlerimiz" },
  { href: "#values", label: "Değerlerimiz" },
  { href: "#gallery", label: "Galeri" },
  { href: "#contact", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border/50 py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group">
          <span className={`font-serif text-2xl md:text-3xl tracking-tight transition-colors ${scrolled ? "text-primary" : "text-primary md:text-primary-foreground"}`}>
            Royal <span className="text-accent italic">Güzellik</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-accent ${
                    scrolled ? "text-primary/80" : "text-primary-foreground/90"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => scrollTo("#contact")}
            className="bg-accent hover:bg-accent/90 text-primary-foreground uppercase tracking-wider text-xs px-8 py-6 rounded-none font-semibold transition-all duration-300"
          >
            Randevu Al
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-primary" : "text-primary"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-[60px] bg-background z-40 flex flex-col items-center justify-center gap-8 px-6 pb-20"
          >
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-2xl font-serif text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-accent hover:bg-accent/90 text-primary-foreground w-full max-w-xs uppercase tracking-wider py-6 rounded-none text-lg mt-4"
            >
              Randevu Al
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
