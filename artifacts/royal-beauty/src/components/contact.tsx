import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

const SERVICE_OPTIONS = [
  "Lazer Epilasyon",
  "Dermapen",
  "Yosun Peeling",
  "Hydrafacial",
  "Kirpik Lifting",
  "Saç Vitamin İşlemi",
  "Cilt Gençleştirme",
  "Cilt Bakımı",
  "Dolgu İşlemleri",
  "Botoks İşlemleri",
  "Saç Tasarım",
  "Profesyonel Makyaj",
  "Diğer",
];

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  service: z.string().optional(),
  message: z.string().optional(),
});

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-0 border-b bg-transparent text-left transition-colors duration-200 focus:outline-none"
        style={{
          borderBottomColor: open ? "#D4AF37" : "hsl(var(--border))",
          color: value ? "#3B0A45" : "#9ca3af",
        }}
      >
        <span className="text-sm">{value || "İlgilendiğiniz Hizmeti Seçin"}</span>
        <ChevronDown
          size={16}
          className="transition-transform duration-300 text-gray-400"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-1 z-50 shadow-xl border divide-y max-h-64 overflow-y-auto"
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "rgba(59,10,69,0.15)",
              divideColor: "rgba(59,10,69,0.08)",
            }}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-sm transition-colors duration-150 hover:bg-[#3B0A45] hover:text-white"
                  style={{
                    color: value === opt ? "#D4AF37" : "#3B0A45",
                    backgroundColor: value === opt ? "rgba(59,10,69,0.06)" : "transparent",
                    fontWeight: value === opt ? "600" : "300",
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    toast({
      title: "Talebiniz Alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative" style={{ backgroundColor: "#3B0A45" }}>
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ backgroundColor: "rgba(212,175,55,0.04)" }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8" style={{ backgroundColor: "#D4AF37" }} />
              <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ color: "#D4AF37" }}>
                İletişim
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
              Randevu ve <span className="italic" style={{ color: "#D4AF37" }}>Bilgi</span> İçin
            </h2>

            <p className="text-white/60 font-light mb-12 max-w-md">
              Sizlere daha iyi hizmet verebilmek için aşağıdaki formdan bize ulaşabilir veya iletişim bilgilerimizden bizi arayabilirsiniz.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border text-white/80" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <MapPin size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1 text-white">Adres</h4>
                  <p className="text-white/60 font-light">Nişantaşı, Teşvikiye Cad. No: 123<br />Şişli, İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <Phone size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1 text-white">Telefon & WhatsApp</h4>
                  <p className="text-white/60 font-light">+90 555 123 45 67<br />+90 212 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <Clock size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1 text-white">Çalışma Saatleri</h4>
                  <p className="text-white/60 font-light">Pzt - Cmt: 09:00 - 19:30<br />Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-12 shadow-2xl"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <h3 className="text-2xl font-serif mb-8" style={{ color: "#3B0A45" }}>Randevu Formu</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Adınız Soyadınız *"
                          className="rounded-none border-b border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 px-0"
                          style={{ borderBottomColor: "hsl(var(--border))" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Telefon Numaranız *"
                          className="rounded-none border-b border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 px-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Custom service select */}
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ServiceSelect
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Notunuz (Opsiyonel)"
                          className="rounded-none border-b border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 px-0 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="royal-btn w-full uppercase tracking-widest py-6 mt-4 font-bold"
                  style={{ backgroundColor: "#3B0A45", color: "#D4AF37" }}
                >
                  Gönder
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
