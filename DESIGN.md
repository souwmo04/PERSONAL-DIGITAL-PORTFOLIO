# Design notes — Fahim Foysal

This file records how the visual identity was chosen and the rules the site follows.
Read it before you add a new section, so new work matches the old.

---

## Step 1 — Three directions we explored

### A. "Marginalia" — the research notebook  ← chosen

The site reads like a well-set research paper that someone has annotated by hand.

- **Concept.** Sections are numbered like a paper (§ 01, § 02). Visuals are captioned
  as figures ("Fig. 1 — …"). Small notes sit in the margin beside the main text,
  the way a reader writes in the margin of a printout. It says "researcher" without
  saying it.
- **Typography.** A high-contrast editorial serif for display (Newsreader, with
  optical sizes and a real italic). A quiet grotesk for reading (Geist). A monospace
  for metadata, labels and numbers (JetBrains Mono).
- **Layout.** A strict 12-column Swiss grid, used asymmetrically: the main column is
  offset, and the margin column carries notes, figure numbers and dates.
- **Palette.** Warm paper, near-black ink, graphite, hairline rules, and one
  vermilion accent used rarely: the status dot, active states, one word per section.
  The contact section flips to ink, so the page ends darker than it began.

### B. "Blueprint"

- **Concept.** Architectural drawing sheets. Each project is a plate with a title
  block, dimension lines and section cuts.
- **Typography.** A wide grotesk (Neue Haas–style) in capitals with a technical mono.
- **Layout.** A visible construction grid, with every element snapped to it.
- **Palette.** Off-white, cobalt line work and a safety-orange highlight.
- **Why not.** It is strong for engineering. But it reads cold and impersonal, and
  it hides the research and writing side of the work.

### C. "Signal / Noise"

- **Concept.** An oscilloscope or lab instrument. Content shows up as "readings";
  sections are channels.
- **Typography.** A mono throughout, with a condensed display face.
- **Layout.** Dense dashboard panels on a dark field.
- **Palette.** Graphite, phosphor green and amber.
- **Why not.** It slides too easily into the neon, dark, glowing look the brief
  rules out. It is also tiring to read over long passages such as abstracts.

**Decision.** Direction A fits the person best. The main proof of work is a
publication and research-led projects. An editorial, paper-like system lets the
research carry the identity, and it still leaves room for engineering detail.

---

## Step 2 — The design system

### Colour

| Token        | Hex       | Use                                                         |
| ------------ | --------- | ----------------------------------------------------------- |
| `paper`      | `#F1EDE4` | Page background                                             |
| `paper-2`    | `#E8E3D7` | Recessed panels, figure grounds                             |
| `ink`        | `#151513` | Primary text, contact section background                    |
| `graphite`   | `#57554F` | Secondary text (7.0:1 on paper)                             |
| `muted`      | `#6E6B63` | Metadata and captions (5.0:1 on paper)                      |
| `rule`       | `#D3CCBD` | Hairlines and dividers                                      |
| `vermilion`  | `#C2410C` | The single accent: text links on hover, status, focus (4.7:1 on paper) |
| `signal`     | `#E8572A` | Accent used only on dark ink                                |

Colour rule: there is **one** accent. It never fills large areas. If something
needs emphasis, use weight, size or italics before colour.

### Typography

| Role       | Face                 | Notes                                          |
| ---------- | -------------------- | ---------------------------------------------- |
| Display    | Newsreader (variable)| Tight tracking (-0.02em to -0.035em); italic for emphasis |
| Body       | Geist                | 16–18px, 1.6 line height, at most 68 characters per line |
| Meta       | JetBrains Mono       | 11–12px, uppercase, +0.08em tracking            |

Scale: fluid `clamp()` steps — meta 0.72rem · body 1rem · lead 1.25rem ·
h3 1.75rem · h2 clamp(2.5rem, 6vw, 5rem) · display clamp(3.25rem, 10vw, 9.5rem).

### Spacing

A 4px base unit. Section padding uses `clamp(5rem, 12vw, 10rem)` vertically.
Inside a section, use the steps 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.

### Grid

- Mobile: 4 columns, 20px gutter, 20px margin.
- Tablet (≥768): 8 columns, 24px gutter, 40px margin.
- Desktop (≥1024): 12 columns, 24px gutter, a 1440px maximum width.
- Convention: columns 1–3 are the **margin column** (section number, notes, dates);
  columns 4–12 hold the content. Asymmetry comes from breaking out of this on purpose.

### Motion

1. Motion explains structure. It is not decoration. Content rises 16–24px and fades
   in once, as it enters.
2. One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` (a soft
   expo-out). Durations are 0.5–0.9s, and the stagger is 60–90ms.
3. Hover feedback stays under 250ms. Underlines draw left to right.
4. Only one element moves continuously: the hero attention field. It runs on its own
   and pauses when it is off screen.
5. With `prefers-reduced-motion`, every transform is dropped and only the opacity
   change is kept. The attention field shows one still frame.

### Components

- **Section header.** A mono `§ 0N` and a label in the margin column, with a serif
  heading in the content column, above a hairline rule.
- **Links.** No pill buttons. The primary action is ink text with an arrow and a
  drawn underline. The single "solid" button style (ink fill) is kept for the two
  main calls to action.
- **Figures.** Every visual sits in a frame with a caption in the form
  `Fig. N — description`.
- **Corners.** Square everywhere. Rounding appears only on the status dot.
