# Vamshi Korutla · portfolio

Portfolio of Vamshi Krishna Korutla: data & business analyst and founder.

- Source: [`app/`](app) (Vite + React + TypeScript, Tailwind, Framer Motion, Three.js via React Three Fiber, Recharts, Prism)
- Live: https://vamshi-korutla.vercel.app (Vercel, static deploy of the repo root; config in `vercel.json`)

## Update the site

```bash
cd app
npm install
npm run dev       # local preview at http://localhost:5173
npm run publish   # builds and copies the site into the repo root
```

Then commit and push to `main`, and run `npx vercel deploy --prod` from the repo root. Content lives in `app/src/data/content.ts`.
