import { useEffect, useRef } from "react";

interface SilkWaveProps {
  className?: string;
  /** Number of threads that make up the ribbon. */
  strands?: number;
}

/**
 * A twisting silk ribbon of gold and lilac threads drifting across the page,
 * after the flowing-fabric preloader at preloaderprov4.framer.website.
 */
export default function SilkWave({ className = "", strands = 90 }: SilkWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let gradient: CanvasGradient | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Lilac on the left, gold through the middle, pale champagne on the right.
      gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "rgba(160,120,200,0)");
      gradient.addColorStop(0.2, "rgba(200,170,230,0.55)");
      gradient.addColorStop(0.55, "rgba(212,175,55,0.75)");
      gradient.addColorStop(0.85, "rgba(247,231,161,0.6)");
      gradient.addColorStop(1, "rgba(247,231,161,0)");
      if (reduceMotion) draw(4000);
    };

    // Each thread follows the same wave; its offset from the ribbon's centre
    // swings with cos(twist), so the threads cross over and the ribbon twists.
    const draw = (t: number) => {
      if (!gradient) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      const time = t * 0.00035;
      const mid = h * 0.55;
      const amp = h * 0.2;
      const width = h * 0.55;
      const step = Math.max(6, w / 160);

      for (let i = 0; i < strands; i++) {
        const s = i / (strands - 1) - 0.5;
        ctx.globalAlpha = 0.12 + (1 - Math.abs(s) * 2) * 0.3;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const wave =
            Math.sin(u * Math.PI * 2.2 + time) * amp +
            Math.sin(u * Math.PI * 4.7 - time * 1.3) * amp * 0.25;
          const twist = Math.cos(u * Math.PI * 2.6 - time * 0.8 + s * 1.2);
          const y = mid + wave + s * width * twist;
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reduceMotion;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [strands]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
