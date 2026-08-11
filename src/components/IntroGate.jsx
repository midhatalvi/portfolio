import { useEffect, useRef, useState } from "react";

// Plays once per page load: scattered particles converge into a big centered
// "MIDHAT ALVI", hold, then MORPH — every particle flies to the exact position
// and size of the real hero name and the canvas crossfades into the live text.
let PLAYED = false;

const WIRE = [127, 168, 190]; // --wire
const SIGNAL = [226, 72, 61]; // --signal
const BG = "#0C1116";

const CONVERGE = 1400;
const STAGGER = 440; // spread of per-particle start delays (left-to-right)
const HOLD = 380;
const MORPH = 900; // centered name -> real hero position + crossfade

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function IntroGate() {
  const [done, setDone] = useState(() => PLAYED);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (PLAYED) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    PLAYED = true;
    if (reduce) {
      setDone(true);
      return;
    }

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let W = 0,
      H = 0,
      dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // If the viewport hasn't been laid out yet, skip the intro rather than crash.
    if (W < 2 || H < 2) {
      setDone(true);
      return;
    }

    // Sample glyph pixels of two lines into [x,y] points.
    const sample = (opts) => {
      const off = document.createElement("canvas");
      if (W < 2 || H < 2) return [];
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      o.fillStyle = "#fff";
      o.textAlign = opts.align;
      o.textBaseline = opts.baseline;
      if ("letterSpacing" in o) o.letterSpacing = opts.letterSpacing || "0px";
      o.font = opts.font;
      o.fillText("MIDHAT", opts.x, opts.y1);
      o.fillText("ALVI", opts.x, opts.y2);
      const data = o.getImageData(0, 0, W, H).data;
      const pts = [];
      const gap = opts.gap;
      for (let y = 0; y < H; y += gap)
        for (let x = 0; x < W; x += gap)
          if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
      return pts;
    };

    // Big centered name — sized to fit BOTH width and height so it never clips.
    const centerSample = () => {
      const fs = Math.min(W * 0.17, H * 0.32, 150);
      return sample({
        align: "center",
        baseline: "middle",
        font: `900 ${fs}px Archivo, sans-serif`,
        letterSpacing: "0px",
        x: W / 2,
        y1: H / 2 - fs * 0.46,
        y2: H / 2 + fs * 0.46,
        gap: fs > 90 ? 5 : 4,
      });
    };

    // Sample the REAL hero name at its on-page position/size for the morph target.
    const heroSample = () => {
      const el = document.querySelector(".hero-name");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return null;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const lh = parseFloat(cs.lineHeight) || fs * 0.85;
      return sample({
        align: "left",
        baseline: "top",
        font: `${cs.fontWeight} ${fs}px ${cs.fontFamily}`,
        letterSpacing: cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing,
        x: r.left,
        y1: r.top,
        y2: r.top + lh,
        gap: fs > 60 ? 4 : 3,
      });
    };

    const shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    let centerPts = shuffle(centerSample());
    if (!centerPts.length) {
      setDone(true);
      return;
    }
    let heroPts = heroSample(); // may be null -> graceful fade fallback

    const N = Math.min(centerPts.length, 2200);
    const cx = W / 2,
      cy = H / 2;
    const R = Math.hypot(W, H) * 0.5;
    const P = new Array(N);

    const build = () => {
      const hp = heroPts && heroPts.length ? shuffle(heroPts.slice()) : null;
      for (let i = 0; i < N; i++) {
        const nm = centerPts[i % centerPts.length];
        const a = Math.random() * Math.PI * 2;
        const r = R * (0.35 + Math.random() * 0.75);
        const h = hp ? hp[i % hp.length] : nm;
        P[i] = {
          nx: nm[0],
          ny: nm[1],
          hx: h[0],
          hy: h[1],
          x0: cx + Math.cos(a) * r,
          y0: cy + Math.sin(a) * r,
          delay: (nm[0] / W) * STAGGER + Math.random() * 120,
          red: Math.random() < 0.08,
        };
      }
    };
    build();

    const start = performance.now();
    const NAME_END = CONVERGE + STAGGER;
    const HOLD_END = NAME_END + HOLD;
    const END = HOLD_END + MORPH;
    const hasHero = !!(heroPts && heroPts.length);

    const frame = (now) => {
      const el = now - start;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      let m = 0; // morph progress 0..1
      if (el >= HOLD_END) {
        m = easeInOut(Math.min(1, (el - HOLD_END) / MORPH));
        // Fade the whole overlay out, revealing the live hero underneath.
        wrap.style.opacity = String(1 - m);
      }

      for (let i = 0; i < N; i++) {
        const p = P[i];
        const lt = easeOutExpo(Math.max(0, Math.min(1, (el - p.delay) / CONVERGE)));
        let x = p.x0 + (p.nx - p.x0) * lt;
        let y = p.y0 + (p.ny - p.y0) * lt;
        if (m && hasHero) {
          x = p.nx + (p.hx - p.nx) * m;
          y = p.ny + (p.hy - p.ny) * m;
        }
        const c = p.red ? SIGNAL : WIRE;
        ctx.globalAlpha = Math.min(1, lt * 1.6);
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;

      if (el >= END) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const run = () => (raf = requestAnimationFrame(frame));
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        centerPts = shuffle(centerSample());
        heroPts = heroSample();
        build();
        run();
      });
    } else run();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const skip = () => {
    if (wrapRef.current) wrapRef.current.style.opacity = "0";
    setTimeout(() => setDone(true), 200);
  };

  if (done) return null;
  return (
    <div className="intro" ref={wrapRef}>
      <canvas ref={canvasRef} />
      <button className="intro-skip" onClick={skip}>
        Skip
      </button>
    </div>
  );
}
