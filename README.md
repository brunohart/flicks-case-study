# From Discovery to Ritual

A product strategy case study for Flicks (Vista Group) — exploring how cinema discovery can become communal attendance.

**Live presentation:** [brunohart.github.io/flicks-case-study](https://brunohart.github.io/flicks-case-study)

By Bruno Hart · February 2026

---

## Interactive UI Concept

The `ui-concept/` directory contains a working React prototype of the proposed Flicks features — Social Signals, friend-aware Showtimes, and the Join flow — built to match the real Flicks app design system.

```bash
cd ui-concept
npm install
npm run dev
```

Opens at [localhost:5173](http://localhost:5173). Four screens: **Discover** (film cards with social signals), **Cinemas** (showtimes with friend avatars + Join flow), Watchlist, and Profile.

### Tech stack

Vite 6 · React 19 · TypeScript · Tailwind CSS v4

### Design system

Uses the actual Flicks color palette: `#F23953` coral accent, `#F8F8FA` background, `#1A1A1E` text — not generic placeholders. See [`output-flicks-ui-concept-react-app.md`](output-flicks-ui-concept-react-app.md) for full details.
