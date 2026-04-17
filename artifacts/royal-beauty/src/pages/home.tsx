import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Values from "@/components/values";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-accent/30 selection:text-primary">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Values />
        <Gallery />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
