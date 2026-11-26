"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Illustrative figure: a dashboard wireframe with a question, the region the
 * model grounds it in, and the interaction it takes. Not a screenshot.
 */
export function DashLensFigure({ className = "" }: { className?: string }) {
  const bars = [38, 62, 47, 88, 55, 70];
  const line = "M20,120 C60,100 80,112 110,90 S170,60 200,72 S250,40 280,34";
  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-labelledby="dl-title dl-desc"
    >
      <title id="dl-title">DashLens, illustrated</title>
      <desc id="dl-desc">
        A dashboard with KPI tiles, a bar chart, a line chart and a region filter. A question asks which region
        grew fastest. The system highlights the tallest bar after selecting the Q3 filter, and answers in text.
      </desc>

      {/* Dashboard frame */}
      <rect x="0.5" y="0.5" width="639" height="419" fill="#f1ede4" stroke="#151513" />
      <rect x="0.5" y="0.5" width="639" height="30" fill="#e8e3d7" stroke="#151513" />
      <g fontFamily="var(--font-jetbrains)" fontSize="10" fill="#57554f">
        <text x="14" y="20">sales_overview.dash</text>
        {/* Filter controls */}
        <rect x="430" y="8" width="56" height="15" fill="none" stroke="#a9a597" />
        <text x="440" y="19">Q2</text>
        <motion.rect
          x="492" y="8" width="56" height="15"
          fill="#151513"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        />
        <motion.text
          x="502" y="19"
          initial={{ fill: "#57554f" }}
          whileInView={{ fill: "#f1ede4" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          Q3 ✓
        </motion.text>
        <rect x="554" y="8" width="72" height="15" fill="none" stroke="#a9a597" />
        <text x="562" y="19">Region ▾</text>
      </g>

      {/* KPI tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 136}, 46)`}>
          <rect width="124" height="58" fill="none" stroke="#d3ccbd" />
          <rect x="10" y="12" width="44" height="5" fill="#a9a597" />
          <rect x="10" y="28" width={[70, 56, 82][i]} height="16" fill="#151513" opacity="0.85" />
        </g>
      ))}

      {/* Bar chart */}
      <g transform="translate(20,124)">
        <rect width="260" height="200" fill="none" stroke="#d3ccbd" />
        <line x1="30" y1="170" x2="245" y2="170" stroke="#151513" />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={42 + i * 34}
            y={170 - h * 1.5}
            width="20"
            height={h * 1.5}
            fill={i === 3 ? "#151513" : "#a9a597"}
          />
        ))}
        <g fontFamily="var(--font-jetbrains)" fontSize="9" fill="#6e6b63">
          {["N", "S", "E", "W", "C", "NE"].map((l, i) => (
            <text key={l} x={52 + i * 34} y="186" textAnchor="middle">{l}</text>
          ))}
        </g>
        {/* Grounding box */}
        <motion.rect
          x={36 + 3 * 34} y={170 - 88 * 1.5 - 8} width="32" height={88 * 1.5 + 14}
          fill="none" stroke="#c2410c" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
        />
      </g>

      {/* Line chart */}
      <g transform="translate(296,124)">
        <rect width="124" height="200" fill="none" stroke="#d3ccbd" />
        <g transform="translate(-8,40) scale(0.45 1)">
          <path d={line} fill="none" stroke="#57554f" strokeWidth="2.6" />
        </g>
        <rect x="12" y="170" width="60" height="5" fill="#a9a597" />
      </g>

      {/* Question + answer panel */}
      <g transform="translate(436,46)">
        <rect width="184" height="278" fill="#e8e3d7" />
        <g fontFamily="var(--font-jetbrains)" fontSize="9" fill="#6e6b63">
          <text x="12" y="20">USER</text>
        </g>
        <foreignObject x="12" y="28" width="160" height="60">
          <p style={{ fontFamily: "var(--font-newsreader)", fontSize: 15, lineHeight: 1.2, color: "#151513", margin: 0 }}>
            Which region grew fastest in Q3?
          </p>
        </foreignObject>

        <g fontFamily="var(--font-jetbrains)" fontSize="9" fill="#57554f">
          {[
            ["01", "observe", 0.4],
            ["02", "click Q3 filter", 0.9],
            ["03", "ground: bar 'E'", 1.3],
          ].map(([n, label, d]) => (
            <motion.g
              key={n as string}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: d as number, duration: 0.5, ease: EASE }}
            >
              <text x="12" y={110 + Number(n) * 18} fill="#c2410c">{n}</text>
              <text x="32" y={110 + Number(n) * 18}>{label}</text>
            </motion.g>
          ))}
        </g>

        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <line x1="12" y1="186" x2="172" y2="186" stroke="#151513" />
          <text x="12" y="204" fontFamily="var(--font-jetbrains)" fontSize="9" fill="#6e6b63">ANSWER</text>
          <foreignObject x="12" y="210" width="164" height="64">
            <p style={{ fontFamily: "var(--font-geist)", fontSize: 11.5, lineHeight: 1.35, color: "#151513", margin: 0 }}>
              The East region, the tallest bar once Q3 is selected. Highlighted in the bar chart.
            </p>
          </foreignObject>
        </motion.g>
      </g>

      <g fontFamily="var(--font-jetbrains)" fontSize="9" fill="#6e6b63">
        <text x="20" y="346">ILLUSTRATIVE · NOT REAL DATA</text>
        <line x1="20" y1="360" x2="620" y2="360" stroke="#d3ccbd" />
        <text x="20" y="384">screen → VLM → action → screen → accessible answer</text>
      </g>
    </svg>
  );
}
