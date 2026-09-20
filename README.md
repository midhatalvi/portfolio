# Midhat Alvi — Portfolio

Personal engineering portfolio for Midhat Alvi (mechanical, robotics, and aerospace). It presents selected work as evidence: renders, specs, and the decisions behind each build.

**Live:** [midhatalvi.vercel.app](https://midhatalvi.vercel.app)

## Stack

- React 18 + Vite 5 (plain JSX)
- react-router-dom 6 for per-project routes (`/work/:slug`)
- framer-motion for scroll reveals and transitions
- Canvas 2D for the animated intro and interactive hero background

## Highlights

- **IntroGate** — a one-per-load particle intro that assembles the name, then morphs into the live hero heading.
- **HeroField** — an interactive vertex mesh behind the hero that reacts to the cursor.
- **Data-driven projects** — every project lives in `src/data/projects.js`; adding one is a single object with its own detail page.

## Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  components/    reusable UI (TopBar, Footer, ProjectCard, IntroGate, HeroField, ...)
  pages/         Home and Project
  data/          projects.js — single source of truth for all project content
  styles.css     global styles
public/images/   project renders and photos
```

## Deployment

Hosted on Vercel and connected to this repository, so every push to `main` deploys automatically. Client-side routing is handled by the rewrite in `vercel.json`.
