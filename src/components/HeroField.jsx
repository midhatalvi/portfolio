import { useEffect, useRef } from "react";

// Interactive vertex mesh behind the hero name. Idle: a faint, slowly drifting
// grid of "wire" nodes. On hover: nearby nodes push away from the cursor and the
// wires around it light up "signal" red, so the surface pops and deforms.
const WIRE = [127, 168, 190]; // --wire
const SIGNAL = [226, 72, 61]; // --signal
const SPACING = 46; // px between nodes
const R = 160; // cursor influence radius

const lerp = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export default function HeroField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement; // .hero
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      dpr = 1,
      cols = 0,
      rows = 0;
    let nodes = [];
    let pairs = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = false;

    const buildGrid = () => {
      nodes = [];
      pairs = [];
      cols = Math.ceil(W / SPACING) + 1;
      rows = Math.ceil(H / SPACING) + 1;
      const mx = (W - (cols - 1) * SPACING) / 2;
      const my = (H - (rows - 1) * SPACING) / 2;
      const j = SPACING * 0.18;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          nodes.push({
            ox: mx + c * SPACING + (Math.random() - 0.5) * j,
            oy: my + r * SPACING + (Math.random() - 0.5) * j,
            x: 0,
            y: 0,
            phase: Math.random() * Math.PI * 2,
            red: Math.random() < 0.06,
            lift: 0,
          });
      const idx = (r, c) => r * cols + c;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          if (c < cols - 1) pairs.push([idx(r, c), idx(r, c + 1)]);
          if (r < rows - 1) pairs.push([idx(r, c), idx(r + 1, c)]);
        }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth;
      H = host.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (reduce) render(0); // static single frame
    };

    const render = (t) => {
      ctx.clearRect(0, 0, W, H);
      const time = t * 0.001;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let x = n.ox,
          y = n.oy;
        if (!reduce) {
          x += Math.sin(time * 0.6 + n.phase) * 2.2;
          y += Math.cos(time * 0.5 + n.phase) * 2.2;
        }
        let lift = 0;
        if (mouse.active) {
          const dx = x - mouse.x,
            dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.001) {
            const f = 1 - d / R;
            const push = f * f * 30;
            x += (dx / d) * push;
            y += (dy / d) * push;
            lift = f;
          }
        }
        n.x = x;
        n.y = y;
        n.lift = lift;
      }

      for (let k = 0; k < pairs.length; k++) {
        const a = nodes[pairs[k][0]],
          b = nodes[pairs[k][1]];
        const lift = a.lift > b.lift ? a.lift : b.lift;
        const alpha = 0.08 + lift * 0.6;
        const col = lift > 0 ? lerp(WIRE, SIGNAL, Math.min(1, lift * 0.9)) : WIRE;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const lift = n.lift;
        const size = 1.5 + lift * 3.2;
        const col = n.red
          ? SIGNAL
          : lift > 0.3
          ? lerp(WIRE, SIGNAL, lift)
          : WIRE;
        ctx.globalAlpha = 0.28 + lift * 0.72;
        ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      render(t);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      if (reduce) render(0);
    };
    const onLeave = () => {
      mouse.active = false;
      if (reduce) render(0);
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? startLoop() : stopLoop()),
      { threshold: 0 }
    );
    io.observe(host);

    return () => {
      stopLoop();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
