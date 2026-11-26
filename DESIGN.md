# Design notes — Fahim Foysal

## Current direction: "Nocturne"

A cinematic, motion-led dark site. It should feel calm, expensive and alive: smooth inertial
scrolling, soft violet light in a near-black space, and type that arrives rather than appears.

### Concept

- **The centrepiece** is a *neural sphere*: about 1,200 points on a breathing globe that turns with
  the cursor, with synapse arcs carrying pulses of light. It nods to multimodal AI without using a
  stock brain or robot image.
- **Every section opens the same way**: a glowing pill label, a large two-tone heading
  (white → violet gradient), and a short lead.
- **Depth comes from light, not 3D models**: blurred violet and aqua glows, frosted-glass cards, and
  a fine film grain.

### Palette

| Token          | Value                    | Use                                  |
| -------------- | ------------------------ | ------------------------------------ |
| `void`         | `#060609`                | Page background                      |
| `night`        | `#0b0b11`                | Intro curtain, deep panels           |
| `text`         | `#ececf1`                | Primary text                         |
| `dim`          | `#a3a3b2`                | Body copy (8:1 on void)              |
| `faint`        | `#6c6c7c`                | Labels, metadata                     |
| `violet`       | `#a78bfa`                | Accent, glows, focus                 |
| `violet-deep`  | `#7c3aed`                | Gradient depth                       |
| `iris`         | `#c4b5fd`                | Light accent text                    |
| `aqua`         | `#67e8f9`                | Second accent, used sparingly (pulses, progress) |
| `line`         | `rgb(255 255 255 / .08)` | Hairlines and card borders           |

### Type

- **Display:** Sora 600, tight tracking (-0.04em).
- **Body:** Geist.
- **Labels:** Geist Mono, uppercase, wide tracking.
- **Bangla:** Noto Sans Bengali, loaded on demand.

### Motion system

| Pattern               | Where                         | How                                                          |
| --------------------- | ----------------------------- | ------------------------------------------------------------ |
| Tech loader           | First page of a session       | The name decodes from random glyphs letter by letter while some letters flicker solid/outline; a terminal runs a joke build log ("brewing chai for the GPU", "downloading more RAM… (legally)", "it works on my machine ✓") with an ASCII progress bar. At 100% the name flies into the nav logo as the sheet lifts on a curved edge. About 4s, skippable, once per session. |
| Portrait tilt         | About                         | The photo tilts in 3D toward the cursor with a moving light glare |
| Blur-in characters    | Hero name, page titles        | Letters rise 0.35em from 10px blur, 35ms apart               |
| Rotating words        | Hero roles                    | Vertical slide with blur, every 2.6s                         |
| Scroll-lit paragraph  | About lead                    | Each word goes from 14% to 100% opacity as it scrolls        |
| Masked line reveal    | Section headings              | Lines slide up from behind a clip with a slight rotation     |
| Timeline fill         | Career                        | The centre line scales with scroll; cards slide in from alternating sides |
| Card hover            | All cards                     | A 3D tilt toward the cursor, a spotlight following it, a light beam running around the border (an animated conic gradient), and a lift with glow |
| Animated filter pill  | Projects                      | A shared `layoutId` pill glides between tabs; cards blur out and in |
| Section stage         | Every home section            | Scroll-scrubbed: each section rises from 90% scale, 90px down and 48px radius to full size, like a card being dealt; alternate sections sit on a slightly lighter panel |
| Velocity marquee      | Between sections              | Giant tilted word strips (solid/outline alternating) that drift, speed up with scroll velocity and reverse on scroll up |
| Card parallax         | Projects                      | Right-column cards move against the scroll more than left ones, giving the grid depth |
| Marquee               | Tech stack                    | Two rows in opposite directions; pauses on hover             |
| Roll text             | Navigation, resume            | Letters roll upward on hover                                 |
| Magnetic buttons      | Main calls to action          | Lean up to about 8px toward the cursor, with a sheen         |
| Custom cursor         | Fine pointers only            | A dot and a trailing ring that swells over links             |
| Smooth scroll         | Everywhere                    | Lenis, about 1.15s with expo easing; anchor links glide      |

- **Easing:** one curve everywhere, `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reduced motion** (`prefers-reduced-motion`):
  - Lenis, the intro, the custom cursor and the marquee movement are turned off.
  - Motion skips transforms and keeps only the fades.
  - The sphere shows a single still frame.

### Layout

- A container of at most 82rem. Gutters are 1.25rem on mobile and 2.5rem from 768px up.
- Sections use `clamp(6rem, 13vw, 11rem)` vertical padding.
- Rounded corners: cards 24–32px, chips and buttons fully rounded.

---

## Earlier exploration (for the record)

The first version used an editorial "Marginalia" system: warm paper, a serif display face, and
figures captioned like a research paper. The owner preferred a darker, motion-first, cinematic
feel, so the site moved to Nocturne. The content model in `src/content/` did not change.
