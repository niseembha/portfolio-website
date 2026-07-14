# Niseem Bhattacharya — Portfolio

A production React portfolio built around the idea of turning raw signals into useful action. The flagship hero is a dependency-free Canvas 2D instrument that lets visitors resolve a scrambled signal into Niseem's name.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5173/portfolio-website/` by default.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

The app uses React 19 and Vite, with no runtime animation or UI dependencies. Portfolio content lives in `src/data/portfolio.js`; presentation and interaction components live in `src/components`.

## Deployment

The Vite base path is configured for GitHub Pages at `/portfolio-website/`. The production output is written to `dist/`.
