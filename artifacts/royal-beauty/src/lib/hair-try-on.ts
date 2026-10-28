import type { FaceLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";

/*
 * Free, on-device hairstyle try-on. MediaPipe finds the face in the browser
 * (the photo never leaves the device) and each style is drawn as a shaded
 * hair shape fitted to the face: centred between the eyes, scaled to the
 * face width and turned with the head.
 *
 * Shapes live in "face units": x and y are fractions of the face width,
 * measured from the point between the eyes, y pointing down. T is the
 * hairline (top of the forehead) and C the chin, both measured per face.
 */

const MEDIAPIPE_VERSION = "1.1.1";
const WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

// MediaPipe face-mesh indices: outline of the face, cheek edges, eye corners, top and chin.
const FACE_OVAL = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149,
  150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109,
];

type Mode = "IMAGE" | "VIDEO";
const landmarkers: Partial<Record<Mode, Promise<FaceLandmarker>>> = {};

/** Loads (once per mode) the face landmarker; the library is only downloaded on this page. */
export function loadLandmarker(mode: Mode): Promise<FaceLandmarker> {
  landmarkers[mode] ??= (async () => {
    const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
    const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
    const create = (delegate: "GPU" | "CPU") =>
      FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate },
        runningMode: mode,
        numFaces: 1,
      });
    try {
      return await create("GPU");
    } catch {
      return create("CPU");
    }
  })();
  return landmarkers[mode]!;
}

export type HairColor = { id: string; name: string; base: string; light: string; dark: string };

export const HAIR_COLORS: HairColor[] = [
  { id: "siyah", name: "Siyah", base: "#1d1512", light: "#4a3a33", dark: "#0b0706" },
  { id: "kahve", name: "Koyu Kahve", base: "#3b2418", light: "#6e4a34", dark: "#1c0f09" },
  { id: "kumral", name: "Kumral", base: "#6b4329", light: "#a2724c", dark: "#36200f" },
  { id: "bal", name: "Bal Köpüğü", base: "#a8743f", light: "#dcae72", dark: "#5f3c1a" },
  { id: "sari", name: "Sarı", base: "#cda56a", light: "#f1d9a6", dark: "#8a6633" },
  { id: "bakir", name: "Bakır", base: "#9a4a24", light: "#d27b45", dark: "#561f0b" },
];

type Pt = [number, number];

type Shape = {
  /** Hair around and behind the face; the face itself is cut out of it. */
  back: Pt[];
  /** Fringe or swept bangs drawn over the forehead. */
  front?: Pt[];
  /** Extra round shapes, such as a bun: [x, y, radius]. */
  circles?: [number, number, number][];
  /** How far down strands run, and how curly they are (0 = straight). */
  length: number;
  curl: number;
};

export type HairStyle = { id: string; name: string; note: string; build: (T: number, C: number) => Shape };

type OutlineOptions = {
  T: number;
  C: number;
  /** Volume above the hairline. */
  top: number;
  /** Half-width at the temples and cheeks. */
  width: number;
  /** Where the hair ends, and its half-width there. */
  length: number;
  flare: number;
  /** Half-width of the gap left for the neck. */
  inner: number;
  wave?: number;
  bumps?: number;
};

/** Symmetric outline: crown, down the right side, across the neck, up the left. */
function outline({ T, C, top, width, length, flare, inner, wave = 0, bumps = 0 }: OutlineOptions): Pt[] {
  // Dome over the head: a quarter ellipse from the crown down to the temple.
  const right: Pt[] = [];
  for (let i = 1; i <= 5; i++) {
    const a = (i / 6) * (Math.PI / 2);
    right.push([width * Math.sin(a), T + 0.12 - (top + 0.12) * Math.cos(a)]);
  }
  right.push([width, T + 0.12]);
  const start = 0.25;
  const steps = Math.max(2, Math.round((length - start) / 0.12));
  for (let i = 0; i <= steps; i++) {
    const k = i / steps;
    const y = start + (length - start) * k;
    const x = width + (flare - width) * k + wave * Math.sin(k * Math.PI * 3);
    right.push([x, y]);
  }
  const joinY = Math.min(length - 0.04, C - 0.12);
  right.push([(flare + inner) / 2, length + 0.03], [inner, length - 0.02]);
  if (joinY < length - 0.06) right.push([inner, joinY]);

  let pts: Pt[] = [[0, T - top], ...right, ...right.slice().reverse().map(([x, y]) => [-x, y] as Pt)];

  if (bumps > 0) {
    // Curly hair: push every other point outwards from the centre of the head.
    const cy = (T + length) / 2;
    pts = pts.map(([x, y], i) => {
      const dx = x;
      const dy = y - cy;
      const len = Math.hypot(dx, dy) || 1;
      const out = i % 2 === 0 ? bumps : -bumps * 0.3;
      return [x + (dx / len) * out, y + (dy / len) * out];
    });
  }
  return pts;
}

/** Straight fringe across the forehead, with a slightly uneven edge. */
function fringe(T: number, half: number, bottom: number): Pt[] {
  const pts: Pt[] = [
    [-half - 0.04, T + 0.06],
    [-half * 0.6, T - 0.1],
    [0, T - 0.14],
    [half * 0.6, T - 0.1],
    [half + 0.04, T + 0.06],
    [half + 0.02, bottom - 0.04],
  ];
  const teeth = 9;
  for (let i = 1; i < teeth; i++) {
    const x = half - (2 * half * i) / teeth;
    pts.push([x, bottom + (i % 2 ? 0.02 : -0.015)]);
  }
  pts.push([-half - 0.02, bottom - 0.04]);
  return pts;
}

/** Bangs swept from one side down across the forehead. */
function sweep(T: number, half: number, bottom: number): Pt[] {
  return [
    [-half - 0.05, T + 0.02],
    [-half * 0.4, T - 0.12],
    [half * 0.5, T - 0.1],
    [half + 0.06, T + 0.04],
    [half + 0.04, bottom],
    [half * 0.5, (T + bottom) / 2 + 0.06],
    [-half * 0.2, T + 0.12],
    [-half * 0.75, T + 0.12],
  ];
}

export const HAIR_STYLES: HairStyle[] = [
  {
    id: "uzun-dalgali",
    name: "Uzun Dalgalı",
    note: "Yumuşak dalgalar, omuz altı",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.5, width: 0.7, length: C + 0.95, flare: 0.82, inner: 0.36, wave: 0.07 }),
      length: C + 0.95,
      curl: 0.5,
    }),
  },
  {
    id: "bob",
    name: "Bob Kesim",
    note: "Çene hizası, düz ve şık",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.46, width: 0.66, length: C + 0.05, flare: 0.62, inner: 0.4 }),
      front: sweep(T, 0.42, T + 0.24),
      length: C + 0.05,
      curl: 0,
    }),
  },
  {
    id: "kahkullu",
    name: "Kâküllü Düz",
    note: "Kaş hizası kâkül, uzun düz",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.46, width: 0.66, length: C + 0.8, flare: 0.66, inner: 0.36 }),
      front: fringe(T, 0.44, -0.16),
      length: C + 0.8,
      curl: 0,
    }),
  },
  {
    id: "pixie",
    name: "Pixie",
    note: "Kısa, cesur ve ferah",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.44, width: 0.62, length: 0.12, flare: 0.54, inner: 0.3 }),
      front: sweep(T, 0.4, -0.12),
      length: 0.12,
      curl: 0.15,
    }),
  },
  {
    id: "topuz",
    name: "Topuz",
    note: "Toplu, zarif bir topuz",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.4, width: 0.6, length: 0.05, flare: 0.52, inner: 0.3 }),
      circles: [[0, T - 0.52, 0.2]],
      length: 0.05,
      curl: 0.2,
    }),
  },
  {
    id: "kivircik",
    name: "Hacimli Kıvırcık",
    note: "Bol hacim, doğal bukleler",
    build: (T, C) => ({
      back: outline({ T, C, top: 0.58, width: 0.82, length: C + 0.45, flare: 0.92, inner: 0.38, bumps: 0.05 }),
      length: C + 0.45,
      curl: 1,
    }),
  },
];

/** Closed Catmull-Rom curve through the points, as a canvas path. */
function smooth(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  const n = pts.length;
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    );
  }
  ctx.closePath();
}

/** Small seeded random, so strands stay put from frame to frame. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export type Face = {
  /** Point between the eyes in pixels, head tilt, and face width in pixels. */
  ox: number;
  oy: number;
  angle: number;
  width: number;
  T: number;
  C: number;
  oval: Pt[];
};

/** Turns MediaPipe's landmarks into the face frame the styles are drawn in. */
export function toFace(lm: NormalizedLandmark[], w: number, h: number): Face {
  const p = (i: number): Pt => [lm[i].x * w, lm[i].y * h];
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const eyeA = mid(p(33), p(133));
  const eyeB = mid(p(362), p(263));
  const [ox, oy] = mid(eyeA, eyeB);
  const angle = Math.atan2(eyeB[1] - eyeA[1], eyeB[0] - eyeA[0]);
  const [lx, ly] = p(234);
  const [rx, ry] = p(454);
  const width = Math.hypot(rx - lx, ry - ly);
  const down = (q: Pt) => ((q[0] - ox) * -Math.sin(angle) + (q[1] - oy) * Math.cos(angle)) / width;
  return { ox, oy, angle, width, T: down(p(10)), C: down(p(152)), oval: FACE_OVAL.map(p) };
}

const layers = new Map<string, HTMLCanvasElement>();
function layer(name: string, w: number, h: number) {
  let c = layers.get(name);
  if (!c) {
    c = document.createElement("canvas");
    layers.set(name, c);
  }
  if (c.width !== w || c.height !== h) {
    c.width = w;
    c.height = h;
  }
  const ctx = c.getContext("2d")!;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { c, ctx };
}

function toFaceSpace(ctx: CanvasRenderingContext2D, f: Face) {
  const cos = Math.cos(f.angle) * f.width;
  const sin = Math.sin(f.angle) * f.width;
  ctx.setTransform(cos, sin, -sin, cos, f.ox, f.oy);
}

/** Fills a hair shape, then shades it and adds strands only where it was painted. */
function paint(
  ctx: CanvasRenderingContext2D,
  f: Face,
  fill: (ctx: CanvasRenderingContext2D) => void,
  color: HairColor,
  from: number,
  to: number,
  spread: number,
  curl: number,
  seed: number,
) {
  toFaceSpace(ctx, f);
  ctx.fillStyle = color.base;
  ctx.beginPath();
  fill(ctx);
  ctx.fill();

  ctx.globalCompositeOperation = "source-atop";
  const shade = ctx.createLinearGradient(0, from, 0, to);
  shade.addColorStop(0, color.dark);
  shade.addColorStop(0.35, color.base);
  shade.addColorStop(1, color.dark);
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = shade;
  ctx.fillRect(-2, from - 0.5, 4, to - from + 1);

  // Sheen on the crown.
  const sheen = ctx.createRadialGradient(-0.15, from + 0.15, 0.02, -0.15, from + 0.15, 0.5);
  sheen.addColorStop(0, color.light);
  sheen.addColorStop(1, "transparent");
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = sheen;
  ctx.fillRect(-2, from - 0.5, 4, to - from + 1);

  // Strands from the parting, over the top of the head and down the sides.
  const rand = seeded(seed);
  ctx.lineCap = "round";
  for (let i = 0; i < 220; i++) {
    const u = rand() * 2 - 1;
    const end = from + (to - from) * (0.6 + rand() * 0.4);
    const wig = curl * 0.1;
    ctx.globalAlpha = 0.14 + rand() * 0.28;
    ctx.strokeStyle = rand() > 0.45 ? color.light : color.dark;
    ctx.lineWidth = (0.6 + rand() * 1.6) / f.width;
    ctx.beginPath();
    ctx.moveTo(u * 0.08, from + 0.02);
    ctx.bezierCurveTo(
      u * spread * 0.5,
      from + 0.04,
      u * spread * 0.62 + wig,
      from + (end - from) * 0.45,
      u * spread * (0.5 + rand() * 0.12) + (rand() - 0.5) * wig * 2,
      end,
    );
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

/** Draws `source` with the hairstyle on top. The canvas must already be sized. */
export function renderLook(
  out: HTMLCanvasElement,
  source: CanvasImageSource,
  face: Face | null,
  style: HairStyle,
  color: HairColor,
) {
  const { width: w, height: h } = out;
  const ctx = out.getContext("2d")!;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(source, 0, 0, w, h);
  if (!face) return;

  const shape = style.build(face.T, face.C);
  const seed = style.id.length * 9973 + 17;
  const top = face.T - 0.62;

  const back = layer("back", w, h);
  paint(
    back.ctx,
    face,
    (c) => {
      smooth(c, shape.back);
      for (const [x, y, r] of shape.circles ?? []) {
        c.moveTo(x + r, y);
        c.arc(x, y, r, 0, Math.PI * 2);
      }
    },
    color,
    top,
    shape.length,
    1.6,
    shape.curl,
    seed,
  );
  // Cut the face out so only the hair around it remains.
  back.ctx.setTransform(1, 0, 0, 1, 0, 0);
  back.ctx.globalCompositeOperation = "destination-out";
  back.ctx.filter = `blur(${Math.max(1, face.width / 160)}px)`;
  back.ctx.fillStyle = "#000";
  back.ctx.beginPath();
  face.oval.forEach(([x, y], i) => (i ? back.ctx.lineTo(x, y) : back.ctx.moveTo(x, y)));
  back.ctx.closePath();
  back.ctx.fill();
  // Darker hair where it meets the face, so the edge reads as depth rather than a cut.
  back.ctx.globalCompositeOperation = "source-atop";
  back.ctx.filter = `blur(${face.width / 30}px)`;
  back.ctx.strokeStyle = color.dark;
  back.ctx.globalAlpha = 0.6;
  back.ctx.lineWidth = face.width / 9;
  back.ctx.stroke();
  back.ctx.globalAlpha = 1;
  back.ctx.filter = "none";
  back.ctx.globalCompositeOperation = "source-over";

  if (shape.front) {
    const front = layer("front", w, h);
    paint(front.ctx, face, (c) => smooth(c, shape.front!), color, face.T - 0.15, 0, 1, shape.curl, seed + 7);
    back.ctx.drawImage(front.c, 0, 0);
  }

  ctx.save();
  ctx.shadowColor = "rgba(20, 8, 24, 0.35)";
  ctx.shadowBlur = face.width / 18;
  ctx.shadowOffsetY = face.width / 60;
  ctx.filter = `blur(${Math.max(0.4, face.width / 600)}px)`;
  ctx.drawImage(back.c, 0, 0);
  ctx.restore();
}

/** Square crop around the face, for the style thumbnails. */
export function faceCrop(face: Face, w: number, h: number) {
  const size = Math.min(face.width * 2.7, w, h);
  const cx = face.ox;
  const cy = face.oy + face.width * 0.2;
  const x = Math.min(Math.max(cx - size / 2, 0), w - size);
  const y = Math.min(Math.max(cy - size / 2, 0), h - size);
  return { x, y, size };
}
