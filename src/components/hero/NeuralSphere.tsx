"use client";

import { useEffect, useRef } from "react";

/**
 * The hero centrepiece: a breathing point-cloud sphere, a "neural" globe.
 *
 * About 1,200 points sit on a Fibonacci sphere. A slow wave moves through
 * them, they turn with the cursor, and a few synapse arcs carry light pulses
 * between distant points. Drawn on a 2D canvas with additive blending, so it
 * needs no WebGL or 3D library. It pauses off screen and draws one still frame
 * for reduced motion.
 */

type P3 = { x: number; y: number; z: number };

const N_POINTS = 1200;
const N_ARCS = 46;

function fibSphere(n: number): P3[] {
  const pts: P3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
  }
  return pts;
}

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function NeuralSphere({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    const base = fibSphere(small ? 700 : N_POINTS);
    const rnd = seeded(7);
    const arcs = Array.from({ length: small ? 28 : N_ARCS }, () => {
      const a = Math.floor(rnd() * base.length);
      let b = Math.floor(rnd() * base.length);
      if (b === a) b = (b + 97) % base.length;
      return { a, b, speed: 0.12 + rnd() * 0.25, offset: rnd() };
    });

    let W = 0;
    let H = 0;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Pointer → target rotation (eased).
    const tgt = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      tgt.y = (e.clientX / window.innerWidth - 0.5) * 1.1;
      tgt.x = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) start();
    });
    io.observe(wrap);

    const projected = base.map(() => ({ x: 0, y: 0, z: 0 }));

    const draw = (now: number) => {
      const t = now / 1000;
      cur.x += (tgt.x - cur.x) * 0.045;
      cur.y += (tgt.y - cur.y) * 0.045;
      const ry = t * 0.12 + cur.y;
      const rx = -0.35 + cur.x;
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cx = Math.cos(rx), sx = Math.sin(rx);
      const R = Math.min(W, H) * 0.38;
      const ox = W / 2;
      const oy = H / 2;
      const persp = 2.6;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < base.length; i++) {
        const p = base[i];
        // Breathing wave travelling over the surface.
        const wave = 1 + 0.07 * Math.sin(p.y * 6 + t * 1.3) * Math.cos(p.x * 4 - t * 0.9);
        let x = p.x * wave, y = p.y * wave, z = p.z * wave;
        // Rotate Y then X.
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y1 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        x = x1; y = y1; z = z2;
        const s = persp / (persp - z);
        const px = ox + x * R * s;
        const py = oy + y * R * s;
        projected[i].x = px;
        projected[i].y = py;
        projected[i].z = z;

        const depth = (z + 1) / 2; // 0 back → 1 front
        const size = 0.5 + depth * 1.5;
        const alpha = 0.12 + depth * 0.75;
        // Violet at the back, pale iris/aqua at the front.
        const r = Math.round(124 + depth * 80);
        const g = Math.round(58 + depth * 150);
        const b = Math.round(237 + depth * 12);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Synapse arcs with travelling pulses.
      ctx.lineWidth = 0.6;
      for (const arc of arcs) {
        const A = projected[arc.a];
        const B = projected[arc.b];
        const depth = ((A.z + B.z) / 2 + 1) / 2;
        if (depth < 0.35) continue;
        const mx = (A.x + B.x) / 2 + (ox - (A.x + B.x) / 2) * -0.25;
        const my = (A.y + B.y) / 2 + (oy - (A.y + B.y) / 2) * -0.25;
        ctx.strokeStyle = `rgba(167,139,250,${0.05 + depth * 0.18})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(mx, my, B.x, B.y);
        ctx.stroke();

        const k = (t * arc.speed + arc.offset) % 1;
        const qx = (1 - k) * (1 - k) * A.x + 2 * (1 - k) * k * mx + k * k * B.x;
        const qy = (1 - k) * (1 - k) * A.y + 2 * (1 - k) * k * my + k * k * B.y;
        const glow = ctx.createRadialGradient(qx, qy, 0, qx, qy, 7);
        glow.addColorStop(0, `rgba(103,232,249,${0.5 * depth + 0.2})`);
        glow.addColorStop(1, "rgba(103,232,249,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(qx, qy, 7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const start = () => {
      cancelAnimationFrame(raf);
      const step = (now: number) => {
        draw(now);
        if (visible) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (reduce) draw(2000);
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
