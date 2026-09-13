import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, PlayCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────
// Data layer — mock array for now. To go live, swap INSTAGRAM_POSTS for a
// fetch from the Instagram Basic Display API or a widget provider
// (Elfsight / Behold vb.) that returns items in this same shape.
// ─────────────────────────────────────────────────────────────────────────

export type InstagramCategory = "hair" | "skincare" | "nails";

export type InstagramPost = {
  id: string;
  category: InstagramCategory;
  imageUrl: string;
  caption: string;
  instagramPostUrl: string;
  mediaType: "image" | "video";
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "1",
    category: "hair",
    imageUrl: "/images/service-hair.png",
    caption: "Ombre saç boyama ve bakım sonrası ışıltılı sonuç ✨",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
  {
    id: "2",
    category: "skincare",
    imageUrl: "/images/service-dermapen.png",
    caption: "Dermapen seansı öncesi/sonrası cilt yenilenmesi",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "video",
  },
  {
    id: "3",
    category: "nails",
    imageUrl: "/images/service-kalici-makyaj.png",
    caption: "Kalıcı oje ve protez tırnak uygulaması",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
  {
    id: "4",
    category: "skincare",
    imageUrl: "/images/service-hydrafacial.png",
    caption: "Hydrafacial ile anında canlanan cilt",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
  {
    id: "5",
    category: "hair",
    imageUrl: "/images/left-hair.png",
    caption: "Keratin bakımlı, pürüzsüz saçlar",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "video",
  },
  {
    id: "6",
    category: "nails",
    imageUrl: "/images/service-makeup.png",
    caption: "Özel gün öncesi tam bakım rutini",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
  {
    id: "7",
    category: "skincare",
    imageUrl: "/images/service-peeling.png",
    caption: "Medikal peeling sonrası pürüzsüz cilt dokusu",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
  {
    id: "8",
    category: "hair",
    imageUrl: "/images/service-laser.png",
    caption: "Soprano Ice lazer epilasyon deneyimi",
    instagramPostUrl: "https://www.instagram.com/royalguzellik_/",
    mediaType: "image",
  },
];

const FILTERS: { value: InstagramCategory | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "hair", label: "Kuaför & Saç" },
  { value: "skincare", label: "Cilt Bakımı & Dermapen" },
  { value: "nails", label: "Tırnak & Protez" },
];

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/royalguzellik_/";

export default function InstagramFeed() {
  const [activeFilter, setActiveFilter] = useState<InstagramCategory | "all">("all");

  const filteredPosts =
    activeFilter === "all"
      ? INSTAGRAM_POSTS
      : INSTAGRAM_POSTS.filter((post) => post.category === activeFilter);

  return (
    <section id="instagram" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
              Instagram'da Biz
            </span>
            <div className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">
            <span className="italic">Uygulamalarımız</span> & Canlı Sonuçlar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-light text-sm md:text-base">
            En son saç tasarım, cilt bakımı ve tırnak uygulamalarımızı Instagram sayfamızdan keşfedin.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="px-5 py-3.5 md:py-2.5 text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
                style={
                  isActive
                    ? { backgroundColor: "#D4AF37", borderColor: "#D4AF37", color: "#3B0A45" }
                    : { backgroundColor: "transparent", borderColor: "rgba(59,10,69,0.2)", color: "#3B0A45" }
                }
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.a
                key={post.id}
                layout
                href={post.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden block"
                aria-label={post.caption}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {post.mediaType === "video" && (
                  <div className="absolute top-3 right-3 z-10 text-white drop-shadow">
                    <PlayCircle size={22} fill="rgba(0,0,0,0.35)" />
                  </div>
                )}

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-center px-4"
                  style={{ backgroundColor: "rgba(59,10,69,0.75)" }}
                >
                  <Instagram className="text-white" size={28} />
                  <span className="text-white text-xs uppercase tracking-widest font-semibold border border-white/60 px-4 py-2 backdrop-blur-sm">
                    Instagram'da İncele
                  </span>
                  <p className="text-white/70 text-xs font-light leading-snug line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
          >
            <Instagram size={16} />
            @royalguzellik_ Instagram Sayfamızı Takip Edin
          </a>
        </div>
      </div>
    </section>
  );
}
