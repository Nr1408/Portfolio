# Nishit Rajput — Portfolio


Personal portfolio and CV website for Nishit Rajput, a third-year Computer Science student at K.J. Somaiya Institute of Technology, Mumbai.

## Overview

A premium, dark-themed single-page developer portfolio built with React, TanStack Start, and Tailwind CSS v4. It showcases projects, skills, education, and achievements with smooth scroll-triggered animations and a glassmorphism design language.

## Key Technologies

- **Framework**: [TanStack Start](https://tanstack.com/start) (React, file-based routing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + custom CSS (glassmorphism, keyframes)
- **Fonts**: Space Grotesk (Google Fonts) + DM Mono for code labels
- **Animations**: CSS keyframes + IntersectionObserver for scroll-reveal
- **Particles**: Canvas-based animated particle system in the Hero section
- **Deployment**: [Netlify](https://netlify.com)

## Sections

1. **Hero** — name, subtitle, CTA buttons, social links, particle background
2. **About** — summary paragraph + stats cards
3. **Skills** — grouped badge layout across 7 categories
4. **Projects** — WorkFromCafe, Strengthy, LeafLens
5. **Education** — animated CGPA bars, timeline layout
6. **Achievements** — KnowBuild '25 (1st Place), CodePrix 1.0 (Finalist)
7. **Interests** — hobby chips
8. **Contact / Footer** — email, phone, social links

## Running Locally

```bash
npm install
npm run dev        # starts at http://localhost:3000
```

Or via Netlify CLI for full platform feature emulation:

```bash
netlify dev        # starts at http://localhost:8888
```

## Profile Photo

Replace `/public/headshot-on-white.jpg` with your actual headshot. The image is rendered as a 140×140px circle with an animated gradient ring border.
# portfolio
