import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/** Floating "try a hairstyle with AI" button with a slowly turning gold-and-lilac ring. */
export default function AiHairButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.3, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Link href="/sac-stili" className="ai-hair-btn group" aria-label="Ücretsiz AI ile sana hangi saç stilinin yakıştığını dene">
        <span className="ai-hair-btn__inner">
          <Sparkles size={18} className="ai-hair-btn__spark" />
          <span className="hidden sm:inline">AI ile saç stilini dene</span>
          <span className="sm:hidden">AI saç dene</span>
          <span className="ai-hair-btn__badge">Ücretsiz</span>
        </span>
      </Link>
    </motion.div>
  );
}
