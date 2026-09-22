"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type Blob = {
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      driftX: number;
      driftY: number;
      speed: number;
      phase: number;
    };

    // Subtle electric blue + indigo glows
    const palette = [
      "rgba(49, 92, 255, 0.18)",  // electric blue
      "rgba(109, 93, 251, 0.14)", // indigo
      "rgba(49, 92, 255, 0.08)",  // blue, lighter
      "rgba(109, 93, 251, 0.06)", // indigo, lighter
    ];

    const blobs: Blob[] = palette.map((color, i) => ({
      baseX: 0.25 + Math.random() * 0.5,
      baseY: 0.25 + Math.random() * 0.5,
      radius: 0.35 + Math.random() * 0.25,
      color,
      driftX: 0.06 + Math.random() * 0.06,
      driftY: 0.05 + Math.random() * 0.05,
      speed: 0.00008 + Math.random() * 0.00012,
      phase: i * 1.7,
    }));

    let start = performance.now();
    let raf = 0;

    const draw = (t: number) => {
      const elapsed = t - start;

      ctx.fillStyle = "#07090D";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const cx =
          (b.baseX + Math.sin(elapsed * b.speed + b.phase) * b.driftX) * width;
        const cy =
          (b.baseY + Math.cos(elapsed * b.speed * 1.3 + b.phase) * b.driftY) *
          height;
        const r = b.radius * Math.max(width, height);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(7, 9, 13, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (!prefersReduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (prefersReduced) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}