import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ChevronDown, Instagram, CalendarIcon, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import ParticleField from "@/components/particle-field";

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
  phone: z
    .string()
    .refine((v) => /^\+?[\d\s()-]+$/.test(v.trim()), "Geçerli bir telefon numarası giriniz")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 13;
    }, "Geçerli bir telefon numarası giriniz"),
  service: z.string().optional(),
  preferredDate: z.date().optional(),
  message: z.string().optional(),
});

const fieldClass =
  "w-full h-14 !rounded-none border bg-white px-5 text-sm shadow-none transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#3B0A45] placeholder:text-[#9ca3af]";

const monoLabel = "font-mono text-[11px] uppercase tracking-[0.18em] text-[#3B0A45]/55";

// Pzt–Cmt 09:00–19:30 (see "Çalışma Saatleri" below).
const OPEN_MIN = 9 * 60;
const CLOSE_MIN = 19 * 60 + 30;

function nextSalonBoundary(now: Date): { open: boolean; target: Date } {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const workday = now.getDay() !== 0;
  if (workday && minutes >= OPEN_MIN && minutes < CLOSE_MIN) {
    const target = new Date(now);
    target.setHours(19, 30, 0, 0);
    return { open: true, target };
  }
  const target = new Date(now);
  target.setHours(9, 0, 0, 0);
  if (!workday || minutes >= OPEN_MIN) target.setDate(target.getDate() + 1);
  if (target.getDay() === 0) target.setDate(target.getDate() + 1);
  return { open: false, target };
}

function SalonCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { open, target } = nextSalonBoundary(now);
  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const units = [
    { v: Math.floor(total / 86400), l: "Gün" },
    { v: Math.floor((total % 86400) / 3600), l: "Saat" },
    { v: Math.floor((total % 3600) / 60), l: "Dakika" },
    { v: total % 60, l: "Saniye" },
  ].filter((u, i) => i > 0 || u.v > 0);

  return (
    <div className="mb-8">
      <p className={`${monoLabel} mb-3 flex items-center gap-2`}>
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: open ? "#2E9E5B" : "#D4AF37" }}
        />
        {open ? "Şu an açığız · Kapanışa kalan" : "Şu an kapalıyız · Açılışa kalan"}
      </p>
      <div className="flex items-start gap-3 sm:gap-5">
        {units.map((u, i) => (
          <div key={u.l} className="flex items-start gap-3 sm:gap-5">
            {i > 0 && <span className="text-2xl leading-none text-[#3B0A45]/25 mt-1">:</span>}
            <div className="text-center">
              <div className="font-serif text-4xl sm:text-5xl leading-none tabular-nums text-[#3B0A45]">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="text-[11px] text-[#3B0A45]/55 mt-2">{u.l}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        className="w-full h-14 flex items-center justify-between border bg-white px-5 text-left text-sm transition-all duration-200 focus:outline-none"
        style={{
          borderColor: open ? "#3B0A45" : "rgba(59,10,69,0.15)",
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
                className="text-xs px-4 py-2.5 rounded-full min-h-11"
                style={{ color: "#3B0A45", backgroundColor: "rgba(59,10,69,0.06)" }}
              >
                Kapat
              </button>
            </div>

            <div className="flex justify-center overflow-x-auto rounded-2xl border p-2 sm:p-3" style={{ borderColor: "rgba(59,10,69,0.1)", backgroundColor: "#FBF8FC" }}>
              <Calendar
                mode="single"
                locale={tr}
                selected={value}
                onSelect={(date) => {
                  onChange(date);
                  setOpen(false);
                }}
                disabled={{ before: today }}
                className="[--cell-size:2.25rem] sm:[--cell-size:2.75rem] bg-transparent p-0"
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
        className="w-full h-14 flex items-center justify-between border bg-white px-5 text-left text-sm transition-all duration-200 focus:outline-none"
        style={{
          borderColor: open ? "#3B0A45" : "rgba(59,10,69,0.15)",
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

  const watched = form.watch();
  const filled = [
    watched.name?.trim().length >= 2,
    watched.phone?.replace(/\D/g, "").length >= 10,
    !!watched.service,
    !!watched.preferredDate,
    !!watched.message?.trim(),
  ].filter(Boolean).length;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const lines = [
      "Merhaba, randevu talebim var.",
      "",
      `Ad Soyad: ${values.name}`,
      `Telefon: ${values.phone}`,
    ];

    if (values.service) {
      lines.push(`Hizmet: ${values.service}`);
    }

    if (values.preferredDate) {
      lines.push(
        `Tercih edilen tarih: ${format(values.preferredDate, "d MMMM yyyy", { locale: tr })}`
      );
    }

    if (values.message?.trim()) {
      lines.push(`Not: ${values.message.trim()}`);
    }

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/905453632026?text=${text}`;
    // The form validates asynchronously, so by now the click no longer counts as a
    // user gesture and Safari/iOS may block the new tab. window.open returns null
    // when blocked (it always does with "noopener"), so open without it, cut the
    // opener by hand, and fall back to this tab so the message is never lost.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }

    toast({
      title: "WhatsApp açılıyor",
      description: "Mesajınızı kontrol edip göndermeniz yeterli.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative" style={{ backgroundColor: "#3B0A45" }}>
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ backgroundColor: "rgba(212,175,55,0.04)" }} />
      <ParticleField className="absolute inset-0 w-full h-full" />

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
            className="relative p-8 md:p-12 shadow-2xl"
            style={{
              background: "#FBF9FC",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <p className={`${monoLabel} mb-5`}>Randevu Formu — Royal Güzellik</p>
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-8" style={{ color: "#3B0A45" }}>
              Size ayrılan zaman.
              <br />
              <span className="italic" style={{ color: "#B8922E" }}>Yalnızca sizin için.</span>
            </h3>

            <SalonCountdown />

            <div className="mb-10">
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span style={{ color: "#3B0A45" }}>{String(filled).padStart(2, "0")} / 05 alan dolduruldu</span>
                <span className="text-[#3B0A45]/45">Zorunlu: ad, telefon</span>
              </div>
              <div className="h-[2px] w-full" style={{ backgroundColor: "rgba(59,10,69,0.1)" }}>
                <div
                  className="h-full transition-[width] duration-500 ease-out"
                  style={{ width: `${(filled / 5) * 100}%`, background: "linear-gradient(90deg, #D4AF37, #f7e7a1)" }}
                />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <p className={monoLabel}>Ad Soyad *</p>
                      <FormControl>
                        <Input
                          placeholder="Adınız Soyadınız"
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
                      <p className={monoLabel}>Telefon *</p>
                      <FormControl>
                        <Input
                          placeholder="05XX XXX XX XX"
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
                      <p className={monoLabel}>Hizmet</p>
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
                      <p className={monoLabel}>Tercih Edilen Tarih</p>
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
                      <p className={monoLabel}>Not</p>
                      <FormControl>
                        <Textarea
                          placeholder="Notunuz (Opsiyonel)"
                          className="min-h-[110px] w-full border bg-white px-5 py-4 text-sm shadow-none transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#3B0A45] placeholder:text-[#9ca3af] !rounded-none !resize-none"
                          style={{
                            borderColor: "rgba(59,10,69,0.15)",
                            color: "#3B0A45",
                            resize: "none",
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="group w-full h-14 !rounded-none flex items-center justify-between px-6 text-sm font-medium transition-colors duration-300 hover:bg-[#2D0B3F]"
                    style={{ backgroundColor: "#3B0A45", color: "#fff" }}
                  >
                    <span>Randevu talebimi gönder</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                      style={{ color: "#D4AF37" }}
                    />
                  </Button>
                  <p className="mt-5 text-center text-xs leading-relaxed text-[#3B0A45]/55 max-w-sm mx-auto">
                    Gönder'e bastığınızda WhatsApp açılır; mesajınızı kontrol edip göndermeniz yeterli.
                    Size en kısa sürede dönüş yapılır.
                  </p>
                </div>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
