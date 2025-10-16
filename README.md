# GreenTail-G2

GreenTail is a sustainable pet food verification tool (SDG 12). We use a custom Eco-Score to help dog/cat owners cut through "greenwashing" and find the most environmentally responsible products that fit their budget. Features include a 5-step Onboarding Quiz and personalized product recommendations.

- [Architecture & Specifications](docs/architecture.md)

## Getting Started

```bash
npm install
npm run dev
```

The app is built with [Vite](https://vitejs.dev/), React, React Router, and Tailwind CSS. Run `npm run dev` to start the development server and open the printed local URL in your browser.

## Project Structure

```
src/
  components/      Reusable UI primitives (EcoScore badge, product cards, etc.)
  context/         React context for quiz state management
  data/            Static mock JSON/JS data powering product listings
  pages/           Route-level views (Home, Quiz, Product Explorer)
  services/        Firebase interaction layer (mocked for MVP)
  styles/          Tailwind entry point and global styles
```

Static product data lives in `src/data/products.js`. Firestore calls are stubbed in `src/services/firestoreService.js` so that the UI can be exercised offline while keeping the architecture ready for real integrations.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reloading. |
| `npm run build` | Create a production build of the SPA. |
| `npm run preview` | Preview the production build locally. |
