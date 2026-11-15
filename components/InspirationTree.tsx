"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { branches, type InfluenceEntry } from "@/lib/inspiration";

/**
 * The inspiration tree.
 *
 * One SVG carries the drawing (roots, trunk, branches, twigs, leaves) and each
 * inspiration portrait is an HTML button positioned over its branch tip with
 * CSS percentages. That split keeps the artwork as vector paths that can be
 * drawn with stroke-dashoffset, while the portraits stay real focusable
 * buttons with real links inside them.
 *
 * Growth is driven by one CSS custom property per stroke, `--len`, holding
 * each path's own `getTotalLength()`. A shared keyframe animates
 * stroke-dashoffset from that length to zero, so every limb unfolds at its own
 * scale and the timing reads as growth rather than a wipe.
 *
 * Geometry lives in a fixed 1000x620 viewBox. Desktop shows the whole frame;
 * mobile swaps to a shorter frame and a per-branch rail layout (see the CSS),
 * so nothing has to be shrunk into illegibility.
 */

type Tip = {
  /** Anchor in viewBox units where the portrait centre should sit. */
  x: number;
  y: number;
  entry: InfluenceEntry;
  branchId: string;
  /** Which way the label reads on desktop. */
  align: "left" | "right" | "centre";
  delay: number;
};

/* Trunk centreline, shared by the trunk path and its branches. */
const TRUNK_X = 500;
const TRUNK_BASE = 470;

/**
 * Each branch is drawn as a quadratic curve leaving the trunk and ending at a
 * tip. `tip` is where the portrait sits, so the curve visibly arrives at it.
 */
const limbs = [
  {
    id: "left",
    d: `M ${TRUNK_X} 392 C 372 372, 268 340, 212 268`,
    tip: { x: 212, y: 268 },
    twigs: [
      "M 300 356 C 272 316, 250 300, 214 296",
      "M 356 372 C 344 330, 322 306, 296 288",
    ],
  },
  {
    id: "right",
    d: `M ${TRUNK_X} 352 C 628 336, 730 306, 786 236`,
    tip: { x: 786, y: 236 },
    twigs: [
      "M 700 306 C 722 268, 740 250, 784 254",
      "M 640 328 C 656 292, 678 274, 706 262",
    ],
  },
  {
    id: "centre",
    d: `M ${TRUNK_X} 300 C 500 236, 502 190, 500 128`,
    tip: { x: 500, y: 128 },
    twigs: [
      "M 500 216 C 462 196, 442 182, 430 158",
      "M 500 176 C 536 158, 556 142, 568 118",
    ],
  },
] as const;

/** Small leaves scattered along the limbs: x, y, rotation, size. */
const leaves = [
  [258, 262, -28, 1], [292, 300, 12, 0.85], [330, 322, -8, 0.7],
  [742, 232, 22, 1], [706, 268, -14, 0.85], [664, 296, 8, 0.7],
  [466, 128, -30, 0.9], [534, 132, 26, 0.9], [500, 96, 4, 0.7],
  [430, 152, -40, 0.6], [572, 116, 34, 0.6],
];

const roots = [
  "M 500 470 C 470 496, 424 508, 372 522",
  "M 500 470 C 530 496, 576 508, 628 522",
  "M 500 470 C 500 500, 498 520, 500 546",
  "M 424 509 C 392 518, 360 536, 336 556",
  "M 576 509 C 608 518, 640 536, 664 556",
];

export function InspirationTree({ me }: { me?: string | null }) {
  const uid = useId().replace(/[:]/g, "");
  const [open, setOpen] = useState<string | null>(null);

  const tips: Tip[] = limbs.map((limb, i) => {
    const branch = branches.find((b) => b.side === limb.id)!;
    return {
      x: limb.tip.x,
      y: limb.tip.y,
      entry: branch.entries[0],
      branchId: branch.id,
      align: limb.id === "left" ? "left" : limb.id === "right" ? "right" : "centre",
      delay: 1.5 + i * 0.35,
    };
  });

  return (
    <div className={`tree tree--${uid}`}>
      {/* ---------- the drawing ---------- */}
      <div className="tree-canvas" aria-hidden="true">
        <svg
          viewBox="0 0 1000 620"
          className="tree-svg"
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          <defs>
            <linearGradient id={`${uid}-trunk`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="var(--brand)" stopOpacity="0.78" />
              <stop offset="1" stopColor="var(--brand)" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id={`${uid}-ground`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="var(--brand)" stopOpacity="0.1" />
              <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* soft ground shadow under the root system */}
          <ellipse
            cx="500"
            cy="530"
            rx="250"
            ry="54"
            fill={`url(#${uid}-ground)`}
            className="tree-ground"
          />

          {/* roots, drawn first */}
          <g className="tree-limbs tree-limbs--roots">
            {roots.map((d, i) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                className="tree-stroke tree-stroke--root"
                style={{ animationDelay: `${0.05 + i * 0.09}s` }}
              />
            ))}
          </g>

          {/* trunk: a tapered wedge rather than a line, so it has weight */}
          <path
            d={`M ${TRUNK_X - 13} ${TRUNK_BASE}
                C ${TRUNK_X - 18} 404, ${TRUNK_X - 15} 360, ${TRUNK_X - 9} 300
                C ${TRUNK_X - 7} 282, ${TRUNK_X - 5} 262, ${TRUNK_X - 4} 244
                L ${TRUNK_X + 4} 244
                C ${TRUNK_X + 5} 262, ${TRUNK_X + 7} 282, ${TRUNK_X + 9} 300
                C ${TRUNK_X + 15} 360, ${TRUNK_X + 18} 404, ${TRUNK_X + 13} ${TRUNK_BASE} Z`}
            fill={`url(#${uid}-trunk)`}
            className="tree-trunk"
            style={{ animationDelay: "0.55s" }}
          />

          {/* branches */}
          <g className="tree-limbs">
            {limbs.map((limb, i) => (
              <g key={limb.id}>
                <path
                  d={limb.d}
                  pathLength={1}
                  className="tree-stroke tree-stroke--branch"
                  style={{ animationDelay: `${1.05 + i * 0.22}s` }}
                />
                {limb.twigs.map((d, j) => (
                  <path
                    key={d}
                    d={d}
                    pathLength={1}
                    className="tree-stroke tree-stroke--twig"
                    style={{ animationDelay: `${1.55 + i * 0.22 + j * 0.1}s` }}
                  />
                ))}
              </g>
            ))}
          </g>

          {/* leaves */}
          <g className="tree-leaves">
            {leaves.map(([x, y, rot, scale], i) => (
              <path
                key={`${x}-${y}`}
                d="M 0 0 C 8 -10, 20 -9, 24 0 C 20 9, 8 10, 0 0 Z"
                transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}
                className="tree-leaf"
                style={{ animationDelay: `${1.85 + i * 0.055}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* ---------- root: me ---------- */}
      <div className="tree-root">
        <div className="tree-root-badge" aria-hidden="true">
          {me ? (
            <Image
              src={me}
              alt=""
              fill
              sizes="48px"
              className="tree-root-photo"
            />
          ) : (
            "ESG"
          )}
        </div>
        <p className="tree-root-label">Where it begins</p>
        <p className="tree-root-words">Curiosity · Learning · Building</p>
      </div>

      {/* ---------- the three inspirations ---------- */}
      <ul className="tree-tips">
        {tips.map((tip) => {
          const isOpen = open === tip.entry.id;
          const panelId = `${uid}-panel-${tip.entry.id}`;
          return (
            <li
              key={tip.entry.id}
              className={`tree-tip tree-tip--${tip.align}`}
              style={
                {
                  "--x": `${(tip.x / 1000) * 100}%`,
                  "--y": `${(tip.y / 620) * 100}%`,
                  "--delay": `${tip.delay}s`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className="tree-portrait"
                data-filled={tip.entry.image ? "" : undefined}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : tip.entry.id)}
              >
                {tip.entry.image ? (
                  <Image
                    src={tip.entry.image}
                    alt={tip.entry.imageAlt ?? tip.entry.name}
                    fill
                    sizes="(min-width: 900px) 118px, 84px"
                    className="tree-portrait-img"
                  />
                ) : (
                  <span className="tree-portrait-fallback">
                    {tip.entry.name.charAt(0)}
                  </span>
                )}
                <span className="sr-only">
                  {isOpen ? "Hide details for" : "Show details for"}{" "}
                  {tip.entry.name}
                </span>
              </button>

              <div className="tree-tip-text">
                <p className="tree-tip-name">{tip.entry.name}</p>
                <p className="tree-tip-role">{tip.entry.role}</p>
              </div>

              <div
                id={panelId}
                className="tree-tip-panel"
                hidden={!isOpen}
              >
                <p className="tree-tip-note">{tip.entry.note}</p>
                {tip.entry.link ? (
                  <a
                    href={tip.entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tree-tip-link"
                  >
                    {tip.entry.linkLabel ?? tip.entry.link}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {tip.entry.imageCredit ? (
                  <p className="tree-tip-credit">{tip.entry.imageCredit}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
