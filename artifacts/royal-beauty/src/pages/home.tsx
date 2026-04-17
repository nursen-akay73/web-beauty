import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import SopranoSection from "@/components/soprano-section";
import Values from "@/components/values";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import WelcomeSplash from "@/components/welcome-splash";
import PageShimmer from "@/components/page-shimmer";

function useSectionReveal() {
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
}

export default function Home() {
  useSectionReveal();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#F5F5F5", color: "#3B0A45" }}
    >
      <WelcomeSplash />
      <PageShimmer />
      <Navbar />

      <main className="flex-1">
        <Hero />

        <div className="reveal-section section-fade-in">
          <About />
        </div>

        <div className="reveal-section section-fade-in">
          <Services />
        </div>

        {/* Soprano Titanium Technology Section */}
        <div className="reveal-section section-fade-in">
          <SopranoSection />
        </div>

        <div className="reveal-section section-fade-in">
          <Values />
        </div>

        <div className="reveal-section section-fade-in">
          <Gallery />
        </div>

        <div className="reveal-section section-fade-in">
          <Contact />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
