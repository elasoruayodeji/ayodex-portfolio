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
  entry: InfluenceEntry;
  /** Which way the label reads on desktop. */
  align: "left" | "right" | "centre";
  /** Desktop anchor, in 1000x620 viewBox units. */
  x: number;
  y: number;
  /** Mobile anchor, in 420x960 viewBox units. */
  mx: number;
  my: number;
  delay: number;
};

/** A single leaf shape, reused at every size. */
const LEAF = "M 0 0 C 8 -10, 20 -9, 24 0 C 20 9, 8 10, 0 0 Z";

/* ---------- desktop geometry: a wide 1000x620 tree ---------- */

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
  [258, 262, -28, 1],
  [292, 300, 12, 0.85],
  [330, 322, -8, 0.7],
  [742, 232, 22, 1],
  [706, 268, -14, 0.85],
  [664, 296, 8, 0.7],
  [466, 128, -30, 0.9],
  [534, 132, 26, 0.9],
  [500, 96, 4, 0.7],
  [430, 152, -40, 0.6],
  [572, 116, 34, 0.6],
];

const roots = [
  "M 500 470 C 470 496, 424 508, 372 522",
  "M 500 470 C 530 496, 576 508, 628 522",
  "M 500 470 C 500 500, 498 520, 500 546",
  "M 424 509 C 392 518, 360 536, 336 556",
  "M 576 509 C 608 518, 640 536, 664 556",
];

const trunkPath = `M ${TRUNK_X - 13} ${TRUNK_BASE}
  C ${TRUNK_X - 18} 404, ${TRUNK_X - 15} 360, ${TRUNK_X - 9} 300
  C ${TRUNK_X - 7} 282, ${TRUNK_X - 5} 262, ${TRUNK_X - 4} 244
  L ${TRUNK_X + 4} 244
  C ${TRUNK_X + 5} 262, ${TRUNK_X + 7} 282, ${TRUNK_X + 9} 300
  C ${TRUNK_X + 15} 360, ${TRUNK_X + 18} 404, ${TRUNK_X + 13} ${TRUNK_BASE} Z`;

/* ---------- mobile geometry: the same tree, drawn tall, 420x960 ---------- */

/*
 * The desktop frame is roughly 1.6:1 landscape. On a phone that becomes a
 * postage stamp, which is why the old build hid it and drew a line instead.
 * This composition is the same subject redrawn for a portrait frame: a long
 * trunk up the centre, three limbs leaving at three heights, and the owner's
 * portrait in the roots at the base. Lives, roots, branches: all present.
 */

const M_X = 210;
const M_BASE = 806;

const mobileLimbs = [
  {
    id: "top",
    d: "M 210 322 C 254 292, 282 238, 300 176",
    tip: { x: 300, y: 176 },
    twigs: [
      "M 246 302 C 268 270, 276 248, 300 234",
      "M 224 338 C 252 338, 270 322, 278 302",
    ],
  },
  {
    id: "middle",
    d: "M 210 470 C 156 452, 128 404, 122 350",
    tip: { x: 122, y: 350 },
    twigs: [
      "M 178 456 C 152 428, 148 406, 124 400",
      "M 198 492 C 172 484, 150 468, 140 446",
    ],
  },
  {
    id: "low",
    d: "M 210 634 C 264 614, 296 578, 300 522",
    tip: { x: 300, y: 522 },
    twigs: [
      "M 250 618 C 274 592, 282 568, 302 558",
      "M 228 662 C 256 662, 274 648, 282 628",
    ],
  },
] as const;

const mobileLeaves = [
  [300, 234, 20, 0.9],
  [274, 264, -18, 0.75],
  [322, 206, -34, 0.6],
  [124, 400, -24, 0.9],
  [148, 432, 18, 0.75],
  [98, 372, -40, 0.6],
  [302, 558, 24, 0.9],
  [278, 588, -16, 0.75],
  [326, 534, -30, 0.6],
  [248, 300, -46, 0.55],
  [178, 456, 34, 0.55],
  [252, 616, -38, 0.55],
];

const mobileRoots = [
  "M 210 806 C 176 836, 136 852, 92 872",
  "M 210 806 C 244 836, 284 852, 328 872",
  "M 210 806 C 210 846, 208 878, 208 918",
  "M 152 848 C 126 866, 104 884, 86 906",
  "M 268 848 C 294 866, 316 884, 334 906",
];

const mobileTrunkPath = `M ${M_X - 9} ${M_BASE}
  C ${M_X - 15} 720, ${M_X - 12} 620, ${M_X - 8} 520
  C ${M_X - 6} 440, ${M_X - 5} 384, ${M_X - 4} 330
  L ${M_X + 4} 330
  C ${M_X + 5} 384, ${M_X + 6} 440, ${M_X + 8} 520
  C ${M_X + 12} 620, ${M_X + 15} 720, ${M_X + 9} ${M_BASE} Z`;

export function InspirationTree({ me }: { me?: string | null }) {
  const uid = useId().replace(/[:]/g, "");
  const [open, setOpen] = useState<string | null>(null);

  /*
   * Mobile limb per branch: Addy (engineering) on the highest limb, Elon
   * (ambition) on the middle limb reaching left, Mr Bayo (craft) on the low
   * limb reaching right. Alternating sides keeps the portraits clear of the
   * trunk and of each other on a narrow screen.
   */
  const mobileLimbsFor = { craft: 0, ideas: 1, people: 2 } as const;

  const tips: Tip[] = branches.map((branch) => {
    const limb = limbs.find((l) => l.id === branch.side)!;
    const mobile =
      mobileLimbs[mobileLimbsFor[branch.id as keyof typeof mobileLimbsFor]];
    return {
      entry: branch.entries[0],
      align: branch.side,
      x: limb.tip.x,
      y: limb.tip.y,
      mx: mobile.tip.x,
      my: mobile.tip.y,
      delay:
        branch.side === "centre" ? 1.5 : branch.side === "left" ? 1.85 : 2.15,
    };
  });

  const openEntry = tips.find((t) => t.entry.id === open)?.entry ?? null;

  return (
    <div className={`tree tree--${uid}`}>
      {/*
        The frame is exactly the drawing's box, on both compositions, and all
        percentage-positioned pieces (root, portraits) sit inside it. Without
        this the percentages resolve against the whole section, which includes
        the detail card below, and every portrait drifts downward.
      */}
      <div className="tree-frame">
        {/* ---------- desktop drawing ---------- */}
        <div className="tree-canvas tree-canvas--desktop" aria-hidden="true">
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
              d={trunkPath}
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
                      style={{
                        animationDelay: `${1.55 + i * 0.22 + j * 0.1}s`,
                      }}
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

        {/* ---------- mobile drawing: the same tree, drawn tall ---------- */}
        <div className="tree-canvas tree-canvas--mobile" aria-hidden="true">
          <svg
            viewBox="0 0 420 960"
            className="tree-svg"
            preserveAspectRatio="xMidYMid meet"
            role="presentation"
          >
            <defs>
              <linearGradient id={`${uid}-m-trunk`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="var(--brand)" stopOpacity="0.78" />
                <stop offset="1" stopColor="var(--brand)" stopOpacity="0.95" />
              </linearGradient>
              <radialGradient id={`${uid}-m-ground`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--brand)" stopOpacity="0.12" />
                <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse
              cx="210"
              cy="866"
              rx="176"
              ry="46"
              fill={`url(#${uid}-m-ground)`}
              className="tree-ground"
            />

            <g className="tree-limbs">
              {mobileRoots.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  className="tree-stroke tree-stroke--root"
                  style={{ animationDelay: `${0.05 + i * 0.09}s` }}
                />
              ))}
            </g>

            <path
              d={mobileTrunkPath}
              fill={`url(#${uid}-m-trunk)`}
              className="tree-trunk"
              style={{ animationDelay: "0.55s" }}
            />

            <g className="tree-limbs">
              {mobileLimbs.map((limb, i) => (
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
                      style={{
                        animationDelay: `${1.55 + i * 0.22 + j * 0.1}s`,
                      }}
                    />
                  ))}
                </g>
              ))}
            </g>

            <g className="tree-leaves">
              {mobileLeaves.map(([x, y, rot, scale], i) => (
                <path
                  key={`${x}-${y}`}
                  d={LEAF}
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
                    "--mx": `${(tip.mx / 420) * 100}%`,
                    "--my": `${(tip.my / 960) * 100}%`,
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

                <div id={panelId} className="tree-tip-panel" hidden={!isOpen}>
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

      {/*
        On phones the descriptions live here instead of expanding inside the
        drawing, where they would cover the next branch. The same panel is
        rendered for desktop inside each tip, so both stay in sync.
      */}
      <div className="tree-detail" aria-live="polite">
        {openEntry ? (
          <>
            <div className="tree-detail-head">
              <div>
                <p className="tree-detail-name">{openEntry.name}</p>
                <p className="tree-detail-role">{openEntry.role}</p>
              </div>
              <button
                type="button"
                className="tree-detail-close"
                onClick={() => setOpen(null)}
                aria-label={`Close details for ${openEntry.name}`}
              >
                Close
              </button>
            </div>
            <p className="tree-tip-note">{openEntry.note}</p>
            {openEntry.link ? (
              <a
                href={openEntry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tree-tip-link"
              >
                {openEntry.linkLabel ?? openEntry.link}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {openEntry.imageCredit ? (
              <p className="tree-tip-credit">{openEntry.imageCredit}</p>
            ) : null}
          </>
        ) : (
          <p className="tree-detail-empty">
            Tap a portrait to read why that person is on the tree. They are here
            for their work, not because they know me.
          </p>
        )}
      </div>
    </div>
  );
}
