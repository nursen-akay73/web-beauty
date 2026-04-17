import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      href="https://wa.me/905555555555" // Placeholder number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="WhatsApp üzerinden iletişime geçin"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-background text-foreground text-sm font-medium px-4 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-border">
        Hemen İletişime Geçin
      </span>
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30"></span>
    </motion.a>
  );
}
