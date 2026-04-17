import { useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Values from "@/components/values";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  useSectionReveal();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#F5F5F5", color: "#3B0A45" }}
    >
      <Navbar />

      <main className="flex-1">
        {/* Hero — full bleed, no reveal needed */}
        <Hero />

        {/* About — slides in from left */}
        <div className="reveal-section section-fade-in">
          <About />
        </div>

        {/* Services — dark purple section */}
        <div className="reveal-section section-fade-in">
          <Services />
        </div>

        {/* Values */}
        <div className="reveal-section section-fade-in">
          <Values />
        </div>

        {/* Gallery */}
        <div className="reveal-section section-fade-in">
          <Gallery />
        </div>

        {/* Contact */}
        <div className="reveal-section section-fade-in">
          <Contact />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
