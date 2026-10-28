import type { PointerEvent, ReactNode } from "react";

interface GlowLinkProps {
  href: string;
  children: ReactNode;
}

/**
 * Footer link that lights up as a glossy purple gel pill on hover, with a glow
 * that follows the cursor and a sheen sweeping across, after
 * sociable-football-548119.framer.app. Styles live in index.css (.glow-link).
 */
export default function GlowLink({ href, children }: GlowLinkProps) {
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  return (
    <a href={href} onPointerMove={onMove} className="glow-link text-sm font-light">
      <span aria-hidden="true" className="glow-link__halo" />
      <span aria-hidden="true" className="glow-link__body" />
      <span aria-hidden="true" className="glow-link__spot" />
      <span aria-hidden="true" className="glow-link__sheen" />
      <span className="relative">{children}</span>
    </a>
  );
}
