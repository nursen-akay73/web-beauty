import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  service: z.string().optional(),
  message: z.string().optional(),
});

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Talebiniz Alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
      variant: "default",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-primary text-primary-foreground relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-accent" />
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">İletişim</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif mb-8">
              Randevu ve <span className="italic text-accent">Bilgi</span> İçin
            </h2>
            
            <p className="text-primary-foreground/70 font-light mb-12 max-w-md">
              Sizlere daha iyi hizmet verebilmek için aşağıdaki formdan bize ulaşabilir veya iletişim bilgilerimizden bizi arayabilirsiniz.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border border-accent/30 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1">Adres</h4>
                  <p className="text-primary-foreground/70 font-light">Nişantaşı, Teşvikiye Cad. No: 123<br/>Şişli, İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border border-accent/30 text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1">Telefon & WhatsApp</h4>
                  <p className="text-primary-foreground/70 font-light">+90 555 123 45 67<br/>+90 212 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full border border-accent/30 text-accent">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-semibold mb-1">Çalışma Saatleri</h4>
                  <p className="text-primary-foreground/70 font-light">Pzt - Cmt: 09:00 - 19:30<br/>Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background text-foreground p-8 md:p-12 shadow-2xl"
          >
            <h3 className="text-2xl font-serif text-primary mb-8">Randevu Formu</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Adınız Soyadınız *" className="rounded-none border-b-border border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 focus-visible:border-b-accent px-0" {...field} />
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
                        <Input placeholder="Telefon Numaranız *" className="rounded-none border-b-border border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 focus-visible:border-b-accent px-0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="İlgilendiğiniz Hizmet" className="rounded-none border-b-border border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 focus-visible:border-b-accent px-0" {...field} />
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
                          className="rounded-none border-b-border border-t-0 border-l-0 border-r-0 bg-transparent focus-visible:ring-0 focus-visible:border-b-accent px-0 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary-foreground uppercase tracking-widest rounded-none py-6 mt-4 transition-all duration-300">
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
