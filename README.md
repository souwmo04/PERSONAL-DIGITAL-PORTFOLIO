# Fahim Foysal: personal portfolio

The personal site of **Fahim Foysal**: AI researcher, machine learning engineer and software developer
(TriModal AI Lab, North South University).

The design is a dark, cinematic, motion-led system called "Nocturne". It has a breathing neural-sphere
hero, inertial smooth scrolling, blur-in type, a scroll-filled career timeline, spotlight glass cards
and a tech-stack marquee. The palette, type and every motion pattern are documented in
[DESIGN.md](DESIGN.md).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Motion for React, for animation, and Lenis, for smooth scrolling (both respect `prefers-reduced-motion`)
- Lucide React, for icons
- No backend, no database. Every page is generated statically.

## Editing content

All content lives in typed data files. You don't need to touch a component to update the site.

| File                              | What it holds                                                |
| --------------------------------- | ------------------------------------------------------------ |
| `src/content/site.ts`             | Name, intro, status line, email, social links, CV            |
| `src/content/about.ts`            | About section copy, margin notes, "Now" and "Next"           |
| `src/content/publications.ts`     | Papers (title, authors, venue, results, BibTeX), interests   |
| `src/content/projects.ts`         | Projects: problem, approach, pipeline, stack, links          |
| `src/content/experience.ts`       | Timeline, achievements, skill groups                         |

- **Links left as `""` are hidden**, so the site never shows a broken link. Add LinkedIn, Google Scholar,
  ORCID, OpenReview and each project's GitHub URL when you have them.
- **Screenshots.** Put images in `public/projects/<slug>/` and list them in the project's `screenshots`
  array. They appear on that project's case-study page.
- **CV.** `/cv` is a printable CV built from the same data, so "Download CV" always works. To serve a
  PDF instead, put it at `public/cv/Fahim-Foysal-CV.pdf` and set `site.cv.pdf` to
  `"/cv/Fahim-Foysal-CV.pdf"`.
- **Publications.** Copy titles, author order and numbers exactly from the published record.

## Pages

- `/`: home (hero, about, career, awards, research, projects, stack, contact)
- `/research/[slug]`: paper notes with contributions, results and BibTeX
- `/work/[slug]`: project case studies
- `/cv`: a printable CV
- `sitemap.xml`, `robots.txt`, an Open Graph image and JSON-LD (Person, ScholarlyArticle)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Deploy on Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new). The framework is detected automatically.
2. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) once you connect a custom
   domain. Without it, the site uses Vercel's production URL for canonical links and the sitemap.
