"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fig. 1: an attention field.
 *
 * Three kinds of tokens share one space: text (English and Bangla), image
 * patches and interface elements, after the three modalities of the TriModal
 * AI Lab. A query point follows the cursor, or drifts slowly when idle. Every
 * token gets a softmax weight from its distance to the query, and the top
 * tokens are linked by arcs whose weight shows their attention.
 *
 * It is drawn on a 2D canvas with no dependencies, pauses when off screen,
 * and shows one still frame when the user prefers reduced motion.
 */

type Kind = "text" | "patch" | "ui";
type Token = { x: number; y: number; kind: Kind; label: string; w: number; phase: number };

const TEXT = [
  "what", "is", "the", "sales", "in", "Q3", "?", "বাংলা", "প্রশ্ন", "উত্তর",
  "chart", "axis", "key", "read", "why?", "কোড", "why", "trend", "label", "দেখো",
];
const UI = ["[tab]", "[btn]", "[menu]", "[sort]", "[zoom]", "[pin]"];

const INK = "21,21,19";
const VERMILION = "194,65,12";

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildTokens(): Token[] {
  const rnd = seeded(20261126);
  const cols = 6;
  const rows = 8;
  const tokens: Token[] = [];
  let t = 0;
  let u = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Jittered grid keeps the composition ordered but not mechanical.
      const x = (c + 0.5 + (rnd() - 0.5) * 0.7) / cols;
      const y = (r + 0.5 + (rnd() - 0.5) * 0.6) / rows;
      const roll = rnd();
      let kind: Kind = roll < 0.5 ? "text" : roll < 0.84 ? "patch" : "ui";
      if (kind === "ui" && u >= UI.length) kind = "patch";
      const label = kind === "text" ? TEXT[t++ % TEXT.length] : kind === "ui" ? UI[u++] : "";
      tokens.push({ x, y, kind, label, w: 0, phase: rnd() * Math.PI * 2 });
    }
  }
  return tokens;
}

export function AttentionField({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState<{ label: string; w: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tokens = buildTokens();
    const mono = getComputedStyle(canvas).fontFamily;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Query position (normalised), with eased follow.
    const q = { x: 0.62, y: 0.38 };
    const target = { x: 0.62, y: 0.38 };
    let pointerActive = false;
    let lastPointer = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      if (nx < -0.1 || nx > 1.1 || ny < -0.1 || ny > 1.1) {
        pointerActive = false;
        return;
      }
      target.x = Math.min(1, Math.max(0, nx));
      target.y = Math.min(1, Math.max(0, ny));
      pointerActive = true;
      lastPointer = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) loop();
    });
    io.observe(wrap);

    let raf = 0;
    let lastReadout = 0;
    const tau = 0.018;

    const draw = (now: number) => {
      const t = now / 1000;
      if (!pointerActive || now - lastPointer > 3500) {
        pointerActive = false;
        // Idle drift: a slow Lissajous path, so the field is never static.
        target.x = 0.5 + Math.sin(t * 0.21) * 0.34;
        target.y = 0.5 + Math.sin(t * 0.13 + 1.2) * 0.32;
      }
      q.x += (target.x - q.x) * 0.08;
      q.y += (target.y - q.y) * 0.08;

      // Softmax over negative squared distance (aspect-corrected).
      const aspect = W / Math.max(H, 1);
      let sum = 0;
      for (const tok of tokens) {
        const dx = (tok.x - q.x) * aspect;
        const dy = tok.y - q.y;
        tok.w = Math.exp(-(dx * dx + dy * dy) / tau);
        sum += tok.w;
      }
      for (const tok of tokens) tok.w /= sum || 1;

      const ranked = [...tokens].sort((a, b) => b.w - a.w);
      const top = ranked.slice(0, 6);
      const maxW = top[0]?.w || 1;

      ctx.clearRect(0, 0, W, H);

      const qx = q.x * W;
      const qy = q.y * H;

      // Arcs from query to the top-k tokens.
      top.forEach((tok, i) => {
        const tx = tok.x * W;
        const ty = tok.y * H;
        const mx = (qx + tx) / 2;
        const my = (qy + ty) / 2 - Math.hypot(tx - qx, ty - qy) * 0.35;
        const rel = tok.w / maxW;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.quadraticCurveTo(mx, my, tx, ty);
        ctx.strokeStyle = i === 0 ? `rgba(${VERMILION},${0.35 + rel * 0.6})` : `rgba(${INK},${0.08 + rel * 0.45})`;
        ctx.lineWidth = 0.6 + rel * 1.6;
        ctx.stroke();
      });

      // Tokens.
      const unit = Math.min(W / 6, H / 8);
      const fontSize = Math.max(9.5, Math.min(13, unit * 0.17));
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const tok of tokens) {
        const rel = Math.min(1, tok.w / maxW);
        const breathe = reduce ? 0 : Math.sin(t * 0.8 + tok.phase) * 0.5;
        const x = tok.x * W;
        const y = tok.y * H + breathe;
        const isTop = tok === top[0];
        const alpha = 0.22 + rel * 0.78;
        const color = isTop ? `rgba(${VERMILION},1)` : `rgba(${INK},${alpha})`;

        if (tok.kind === "text") {
          ctx.font = `${isTop ? 500 : 400} ${fontSize}px ${mono}`;
          ctx.fillStyle = color;
          ctx.fillText(tok.label, x, y);
        } else if (tok.kind === "ui") {
          ctx.font = `400 ${fontSize - 1}px ${mono}`;
          ctx.fillStyle = color;
          ctx.fillText(tok.label, x, y);
        } else {
          // Image patch: a small square, filled in proportion to its weight.
          const s = unit * 0.2;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.strokeRect(x - s / 2, y - s / 2, s, s);
          const fill = s * rel;
          ctx.fillStyle = isTop ? `rgba(${VERMILION},0.9)` : `rgba(${INK},${0.15 + rel * 0.7})`;
          ctx.fillRect(x - fill / 2, y - fill / 2, fill, fill);
        }
      }

      // Query reticle.
      ctx.strokeStyle = `rgba(${INK},0.9)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(qx, qy, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(qx - 16, qy);
      ctx.lineTo(qx - 5, qy);
      ctx.moveTo(qx + 5, qy);
      ctx.lineTo(qx + 16, qy);
      ctx.moveTo(qx, qy - 16);
      ctx.lineTo(qx, qy - 5);
      ctx.moveTo(qx, qy + 5);
      ctx.lineTo(qx, qy + 16);
      ctx.stroke();
      ctx.font = `400 10px ${mono}`;
      ctx.fillStyle = `rgba(${INK},0.7)`;
      ctx.textAlign = "left";
      ctx.fillText("q", qx + 12, qy - 12);

      if (now - lastReadout > 180) {
        lastReadout = now;
        setReadout(
          top.slice(0, 4).map((tok) => ({
            label: tok.kind === "patch" ? "▢ patch" : tok.label,
            w: tok.w,
          })),
        );
      }
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      const step = (now: number) => {
        draw(now);
        if (visible && !reduce) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (reduce) {
      // One still frame, with the query at a fixed place.
      draw(4000);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={className}>
      <div ref={wrapRef} className="relative aspect-[7/8] w-full touch-pan-y">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 font-mono" />
      </div>
      <div className="meta mt-4 grid min-h-[5.75rem] grid-cols-[auto_1fr] content-start gap-x-4 gap-y-1.5 text-muted" aria-hidden>
        {readout.map((r, i) => (
          <div key={i} className="contents">
            <span className={`w-16 truncate ${i === 0 ? "text-vermilion" : ""}`}>{r.label}</span>
            <span className="flex items-center gap-2">
              <span className="h-px bg-current" style={{ width: `${Math.max(4, r.w * 100 * 1.4)}%` }} />
              <span className="tabular-nums">{r.w.toFixed(2)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
