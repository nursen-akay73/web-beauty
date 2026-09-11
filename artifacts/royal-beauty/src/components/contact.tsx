import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ChevronDown, Instagram, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

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
  preferredDate: z.date().optional(),
  message: z.string().optional(),
});

const fieldClass =
  "w-full h-12 rounded-full border bg-white/90 px-5 text-sm shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 focus-visible:border-[#D4AF37] placeholder:text-[#9ca3af]";

function PreferredDatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (v: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 flex items-center justify-between rounded-full border bg-white/90 px-5 text-left text-sm shadow-sm transition-all duration-200 focus:outline-none"
        style={{
          borderColor: open ? "#D4AF37" : "rgba(59,10,69,0.12)",
          boxShadow: open ? "0 0 0 2px rgba(212,175,55,0.35)" : undefined,
          color: value ? "#3B0A45" : "#9ca3af",
        }}
      >
        <span>
          {value
            ? format(value, "d MMMM yyyy", { locale: tr })
            : "Tercih ettiğiniz tarih (Opsiyonel)"}
        </span>
        <CalendarIcon size={16} className="text-gray-400 shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-3 z-50 rounded-3xl border p-5 shadow-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(212,175,55,0.35)",
              boxShadow: "0 18px 40px rgba(59,10,69,0.18)",
            }}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-medium" style={{ color: "#3B0A45" }}>
                Tarih seçin
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ color: "#3B0A45", backgroundColor: "rgba(59,10,69,0.06)" }}
              >
                Kapat
              </button>
            </div>

            <div className="flex justify-center rounded-2xl border p-3" style={{ borderColor: "rgba(59,10,69,0.1)", backgroundColor: "#FBF8FC" }}>
              <Calendar
                mode="single"
                locale={tr}
                selected={value}
                onSelect={(date) => {
                  onChange(date);
                  setOpen(false);
                }}
                disabled={{ before: today }}
                className="[--cell-size:2.75rem] bg-transparent p-0"
                classNames={{
                  month_caption: "flex h-10 w-full items-center justify-center text-base font-semibold",
                  weekday: "text-[#3B0A45]/70 flex-1 select-none text-center text-xs font-medium",
                  day_button: "size-full rounded-full text-sm font-medium hover:bg-[#3B0A45] hover:text-white",
                }}
              />
            </div>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                  setOpen(false);
                }}
                className="mt-4 w-full text-center text-sm py-2.5 rounded-full transition-colors"
                style={{ color: "#3B0A45", backgroundColor: "rgba(59,10,69,0.06)" }}
              >
                Tarihi temizle
              </button>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        className="w-full h-12 flex items-center justify-between rounded-full border bg-white/90 px-5 text-left text-sm shadow-sm transition-all duration-200 focus:outline-none"
        style={{
          borderColor: open ? "#D4AF37" : "rgba(59,10,69,0.12)",
          boxShadow: open ? "0 0 0 2px rgba(212,175,55,0.35)" : undefined,
          color: value ? "#3B0A45" : "#9ca3af",
        }}
      >
        <span>{value || "İlgilendiğiniz Hizmeti Seçin"}</span>
        <ChevronDown
          size={16}
          className="transition-transform duration-300 text-gray-400 shrink-0"
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
            className="absolute left-0 right-0 top-full mt-2 z-50 shadow-xl border divide-y max-h-64 overflow-y-auto rounded-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(59,10,69,0.12)",
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
                  className="w-full text-left px-5 py-3 text-sm transition-colors duration-150 hover:bg-[#3B0A45] hover:text-white first:rounded-t-2xl last:rounded-b-2xl"
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
      preferredDate: undefined,
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
                  <p className="text-white/60 font-light">
                    Bitlis / Tatvan, Tuğ Mahallesi<br />
                    Cumhuriyet Bulvarı, Şahper Plaza<br />
                    Royal Güzellik — Daire No: 5, 3. Kat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <Phone size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1 text-white">Telefon & WhatsApp</h4>
                  <a
                    href="tel:+905453632026"
                    className="font-light transition-colors hover:text-[#D4AF37]"
                    style={{ color: "rgba(255,255,255,0.6)", display: "block" }}
                  >
                    0 (545) 363 20 26
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <Instagram size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1 text-white">Instagram</h4>
                  <a
                    href="https://www.instagram.com/royalguzellik_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-light transition-all duration-300 hover:text-[#D4AF37] group inline-flex items-center gap-2"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    @royalguzellik_
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider" style={{ color: "#D4AF37" }}>↗</span>
                  </a>
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
            className="p-8 md:p-12 shadow-2xl rounded-[2rem]"
            style={{
              background:
                "linear-gradient(165deg, #FFFFFF 0%, #F8F4F9 55%, #F3ECF5 100%)",
              border: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            <h3 className="text-2xl font-serif mb-8" style={{ color: "#3B0A45" }}>Randevu Formu</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Adınız Soyadınız *"
                          className={fieldClass}
                          style={{ borderColor: "rgba(59,10,69,0.12)", color: "#3B0A45" }}
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
                          className={fieldClass}
                          style={{ borderColor: "rgba(59,10,69,0.12)", color: "#3B0A45" }}
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
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PreferredDatePicker
                          value={field.value}
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
                          className="min-h-[120px] w-full border bg-white/90 px-5 py-4 text-sm shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 focus-visible:border-[#D4AF37] placeholder:text-[#9ca3af] !rounded-[2rem] !resize-none"
                          style={{
                            borderColor: "rgba(59,10,69,0.12)",
                            color: "#3B0A45",
                            borderRadius: "2rem",
                            resize: "none",
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    className="royal-btn btn-randevu-shimmer uppercase tracking-[0.25em] px-16 py-4 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-full hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "#3B0A45",
                      color: "#D4AF37",
                      border: "1px solid rgba(212,175,55,0.4)",
                      minWidth: "220px",
                    }}
                  >
                    Gönder
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
