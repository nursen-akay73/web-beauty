import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, ImagePlus, Loader2, ShieldCheck, Sparkles, X } from "lucide-react";
import ParticleField from "@/components/particle-field";
import {
  HAIR_COLORS,
  HAIR_STYLES,
  faceCrop,
  loadLandmarker,
  renderLook,
  toFace,
  type Face,
} from "@/lib/hair-try-on";

type Mode = "idle" | "photo" | "camera";
type Status = "ready" | "loading" | "no-face" | "camera-denied" | "error";

const MAX_SIDE = 1280;
const ease = [0.22, 1, 0.36, 1] as const;

const STATUS_TEXT: Record<Exclude<Status, "ready">, string> = {
  loading: "Yapay zekâ hazırlanıyor…",
  "no-face": "Yüzünüzü bulamadık. Yüzünüzün önden ve net göründüğü bir fotoğraf deneyin.",
  "camera-denied": "Kameraya izin verilmedi. Tarayıcı ayarlarından izin verip tekrar deneyin ya da fotoğraf yükleyin.",
  error: "Bir şeyler ters gitti. Sayfayı yenileyip tekrar deneyin.",
};

const HEADLINE = ["Sana", "hangi", "saç", "yakışır?"];

export default function HairTryOn() {
  const [mode, setMode] = useState<Mode>("idle");
  const [status, setStatus] = useState<Status>("ready");
  const [styleIdx, setStyleIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(1);
  const [mirrored, setMirrored] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLCanvasElement>(null);
  const thumbRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const faceRef = useRef<Face | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef(0);
  const lookRef = useRef({ styleIdx, colorIdx });
  lookRef.current = { styleIdx, colorIdx };

  useEffect(() => {
    document.title = "AI Saç Stüdyosu — Royal Güzellik";
    window.scrollTo(0, 0);
  }, []);

  const drawThumbs = useCallback((source: CanvasImageSource, face: Face, w: number, h: number) => {
    const full = document.createElement("canvas");
    full.width = w;
    full.height = h;
    const { x, y, size } = faceCrop(face, w, h);
    HAIR_STYLES.forEach((style, i) => {
      const thumb = thumbRefs.current[i];
      if (!thumb) return;
      renderLook(full, source, face, style, HAIR_COLORS[lookRef.current.colorIdx]);
      thumb.width = 240;
      thumb.height = 240;
      thumb.getContext("2d")!.drawImage(full, x, y, size, size, 0, 0, 240, 240);
    });
  }, []);

  const drawPhoto = useCallback(() => {
    const photo = photoRef.current;
    const out = mainRef.current;
    const face = faceRef.current;
    if (!photo || !out || !face) return;
    out.width = photo.width;
    out.height = photo.height;
    const { styleIdx: s, colorIdx: c } = lookRef.current;
    renderLook(out, photo, face, HAIR_STYLES[s], HAIR_COLORS[c]);
    drawThumbs(photo, face, photo.width, photo.height);
  }, [drawThumbs]);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  // Redraw the photo whenever the chosen style or colour changes.
  useEffect(() => {
    if (mode === "photo") drawPhoto();
  }, [mode, styleIdx, colorIdx, drawPhoto]);

  /** Copies an image into a working canvas no larger than MAX_SIDE and finds the face on it. */
  const loadPicture = async (source: CanvasImageSource, w: number, h: number, fromCamera: boolean) => {
    const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
    const photo = document.createElement("canvas");
    photo.width = Math.round(w * scale);
    photo.height = Math.round(h * scale);
    photo.getContext("2d")!.drawImage(source, 0, 0, photo.width, photo.height);
    photoRef.current = photo;
    setStatus("loading");
    try {
      const landmarker = await loadLandmarker("IMAGE");
      const result = landmarker.detect(photo);
      const lm = result.faceLandmarks[0];
      faceRef.current = lm ? toFace(lm, photo.width, photo.height) : null;
      setMirrored(fromCamera);
      setMode("photo");
      setStatus(lm ? "ready" : "no-face");
      // Mode may already be "photo", so draw now rather than wait for the effect.
      requestAnimationFrame(drawPhoto);
    } catch {
      setStatus("error");
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    stopCamera();
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      void loadPicture(img, img.naturalWidth, img.naturalHeight, false);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => setStatus("error");
    img.src = url;
  };

  const startCamera = async () => {
    stopCamera();
    setStatus("loading");
    try {
      const [stream, landmarker] = await Promise.all([
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        }),
        loadLandmarker("VIDEO"),
      ]);
      streamRef.current = stream;
      const video = videoRef.current ?? document.createElement("video");
      videoRef.current = video;
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      setMode("camera");
      setMirrored(true);
      setStatus("ready");

      let lastThumbs = 0;
      let lastFound: boolean | null = null;
      const loop = (now: number) => {
        const out = mainRef.current;
        if (out && video.readyState >= 2) {
          if (out.width !== video.videoWidth) out.width = video.videoWidth;
          if (out.height !== video.videoHeight) out.height = video.videoHeight;
          const lm = landmarker.detectForVideo(video, now).faceLandmarks[0];
          const face = lm ? toFace(lm, out.width, out.height) : null;
          const { styleIdx: s, colorIdx: c } = lookRef.current;
          renderLook(out, video, face, HAIR_STYLES[s], HAIR_COLORS[c]);
          if (!!face !== lastFound) {
            lastFound = !!face;
            setStatus(face ? "ready" : "no-face");
          }
          if (face && now - lastThumbs > 900) {
            lastThumbs = now;
            drawThumbs(video, face, out.width, out.height);
          }
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } catch (err) {
      stopCamera();
      setStatus(err instanceof DOMException && err.name === "NotAllowedError" ? "camera-denied" : "error");
    }
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;
    const { videoWidth: w, videoHeight: h } = video;
    const frame = document.createElement("canvas");
    frame.width = w;
    frame.height = h;
    frame.getContext("2d")!.drawImage(video, 0, 0);
    stopCamera();
    void loadPicture(frame, w, h, true);
  };

  const reset = () => {
    stopCamera();
    faceRef.current = null;
    photoRef.current = null;
    setMode("idle");
    setStatus("ready");
  };

  const style = HAIR_STYLES[styleIdx];
  const color = HAIR_COLORS[colorIdx];
  const whatsapp = `https://wa.me/905453632026?text=${encodeURIComponent(
    `Merhaba, sitenizdeki AI Saç Stüdyosu'nda "${style.name}" (${color.name}) stilini beğendim. Saç tasarımı için randevu almak istiyorum.`,
  )}`;

  return (
    // lang="tr" so the uppercase headline turns "i" into "İ".
    <div lang="tr" className="min-h-screen" style={{ backgroundColor: "#F5F5F5", color: "#3B0A45" }}>
      <header className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          Royal <span className="italic" style={{ color: "#B8922E" }}>Güzellik</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2D0B3F]"
          style={{ backgroundColor: "#3B0A45" }}
        >
          <ArrowLeft size={16} /> Ana sayfa
        </Link>
      </header>

      {/* Intro after lustréa.framer.website: the headline sharpens from a pale blur, then the studio rises in. */}
      <section className="container mx-auto px-6 md:px-12 pt-6 md:pt-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2"
          style={{ color: "#B8922E" }}
        >
          <Sparkles size={14} /> Ücretsiz · Yapay Zekâ Saç Stüdyosu
        </motion.p>
        <h1 className="font-serif uppercase leading-[0.9] tracking-tight text-[15vw] md:text-[9.5vw]">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: "35%", filter: "blur(14px)", color: "rgba(59,10,69,0.15)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)", color: i === 3 ? "#B8922E" : "#3B0A45" }}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}
            >
              {i === 3 ? <span className="italic normal-case">{word}</span> : word}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p className="max-w-md text-[#3B0A45]/65 font-light leading-relaxed">
            Fotoğrafını yükle ya da kamerayı aç; yapay zekâ yüzünü bulsun, farklı saç modellerini ve renklerini
            senin üzerinde göstersin. Beğendiğini seç, randevunu al.
          </p>
          <a
            href="#studyo"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]"
          >
            Stüdyoya geç
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </section>

      <motion.section
        id="studyo"
        initial={{ opacity: 0, y: 140, clipPath: "inset(10% 5% 0% 5% round 2rem)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
        transition={{ duration: 1.2, delay: 0.9, ease }}
        className="relative mx-4 md:mx-8 mt-12 md:mt-16 mb-10 rounded-[2rem] overflow-hidden"
        style={{ backgroundColor: "#3B0A45" }}
      >
        <ParticleField className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] p-5 md:p-10">
          {/* Preview */}
          <div>
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border"
              style={{ borderColor: "rgba(212,175,55,0.35)", backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <canvas
                ref={mainRef}
                aria-label={mode === "idle" ? undefined : `${style.name} saç stili önizlemesi`}
                className={`absolute inset-0 h-full w-full object-cover ${mode === "idle" ? "hidden" : ""} ${
                  mirrored ? "-scale-x-100" : ""
                }`}
              />

              {mode === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <p className="font-serif text-2xl md:text-3xl text-white mb-2">Başlamak için bir yol seç</p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full max-w-xs inline-flex items-center justify-center gap-3 rounded-full px-6 h-14 text-sm font-medium transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                  >
                    <ImagePlus size={18} /> Fotoğraf yükle
                  </button>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full max-w-xs inline-flex items-center justify-center gap-3 rounded-full border px-6 h-14 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Camera size={18} /> Canlı kamerayı aç
                  </button>
                </div>
              )}

              {status !== "ready" && (
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-[#2D0B3F]/85 px-4 py-3 text-sm text-white backdrop-blur">
                  {status === "loading" && <Loader2 size={16} className="animate-spin shrink-0" />}
                  <span>{STATUS_TEXT[status]}</span>
                </div>
              )}
            </div>

            {mode !== "idle" && (
              <div className="mt-4 flex flex-wrap gap-3">
                {mode === "camera" ? (
                  <button
                    type="button"
                    onClick={takeSnapshot}
                    className="inline-flex items-center gap-2 rounded-full px-5 h-11 text-sm font-medium"
                    style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
                  >
                    <Camera size={16} /> Bu kareyi çek
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="inline-flex items-center gap-2 rounded-full border px-5 h-11 text-sm text-white hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Camera size={16} /> Kamerayı aç
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border px-5 h-11 text-sm text-white hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  <ImagePlus size={16} /> Başka fotoğraf
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full px-5 h-11 text-sm text-white/70 hover:text-white"
                >
                  <X size={16} /> Baştan başla
                </button>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                void onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>

          {/* Styles, colours, booking */}
          <div className="text-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 mb-4">Saç stilleri</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HAIR_STYLES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyleIdx(i)}
                  aria-pressed={i === styleIdx}
                  className="group text-left rounded-2xl p-2 transition-all duration-300"
                  style={{
                    backgroundColor: i === styleIdx ? "rgba(212,175,55,0.14)" : "rgba(255,255,255,0.04)",
                    boxShadow: i === styleIdx ? "inset 0 0 0 1.5px #D4AF37" : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white/5">
                    <canvas
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      className={`h-full w-full ${mode === "idle" ? "hidden" : ""} ${mirrored ? "-scale-x-100" : ""}`}
                    />
                    {mode === "idle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={22} className="text-[#D4AF37]/60" />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium">{s.name}</p>
                  <p className="text-[11px] text-white/50 leading-snug">{s.note}</p>
                </button>
              ))}
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 mt-8 mb-3">Saç rengi</p>
            <div className="flex flex-wrap gap-3">
              {HAIR_COLORS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorIdx(i)}
                  aria-pressed={i === colorIdx}
                  title={c.name}
                  className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-xs transition-colors"
                  style={{
                    backgroundColor: i === colorIdx ? "rgba(212,175,55,0.14)" : "rgba(255,255,255,0.04)",
                    boxShadow: i === colorIdx ? "inset 0 0 0 1.5px #D4AF37" : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="h-6 w-6 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${c.light}, ${c.base} 55%, ${c.dark})` }}
                  />
                  {c.name}
                </button>
              ))}
            </div>

            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex h-14 w-full items-center justify-between rounded-full px-6 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#D4AF37", color: "#3B0A45" }}
            >
              <span>
                “{style.name}” için randevu al
              </span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/55">
              <ShieldCheck size={16} className="shrink-0 text-[#D4AF37]" />
              Fotoğrafınız cihazınızdan çıkmaz; yüz tanıma tamamen tarayıcınızda çalışır ve hiçbir yere kaydedilmez.
              Sonuçlar fikir vermek içindir; size en uygun kesimi uzmanlarımız birlikte belirler.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
