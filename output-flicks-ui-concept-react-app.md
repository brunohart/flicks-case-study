# Output: Flicks UI Concept — React App Setup

## What was built

An interactive React app rendering Flicks UI concepts (Social Signals, Showtimes with friend avatars, Join flow) using the **real Flicks app design system** — not generic placeholder colors.

**Location:** `ui-concept/`
**Run it:** `cd ui-concept && npm run dev` → opens at http://localhost:5173

---

## File manifest

```
ui-concept/
├── package.json                              # Vite + React 19 + TypeScript + Tailwind v4
├── tsconfig.json                             # TypeScript config
├── vite.config.ts                            # Vite with React + Tailwind plugins
├── index.html                                # Entry HTML
├── src/
│   ├── main.tsx                              # React root mount
│   ├── index.css                             # Tailwind import + system font stack
│   ├── App.tsx                               # Main component — all screens & UI
│   └── components/
│       └── figma/
│           └── ImageWithFallback.tsx          # <img> wrapper with letter fallback on error
└── dist/                                     # Production build output (already built)
```

---

## Screens & interactions

| Tab | Screen | What it shows |
|-----|--------|---------------|
| **Discover** | Film list | Movie cards with posters, metadata, genre tags, social signal badges ("Alex + 2 want to see this") |
| **Cinemas** | Showtimes for Anora | Date picker pills, cinema cards with showtime pills, friend avatar on 7:00pm slot, "Join Sam →" CTA |
| **Watchlist** | Placeholder | Empty state |
| **Profile** | Placeholder | Empty state |

**Interactive flow:** On the Cinemas tab, tapping "Join Sam →" opens a bottom sheet confirmation with "I'm in →" button.

---

## Flicks design system colors applied

| Token | Hex | Usage |
|-------|-----|-------|
| Primary accent (coral) | `#F23953` | Active tab, selected date pill, social signal text, "Join" CTA, "I'm in" button, friend showtime border/glow |
| Background | `#F8F8FA` | App background |
| Card surface | `#FFFFFF` | All cards, bottom sheet, tab bar |
| Primary text | `#1A1A1E` | Headings, body text, status bar |
| Secondary text | `#8E8E93` | Metadata, distances, inactive tabs, "Maybe later" |
| Border | `#E5E5E7` | Card borders, tab bar border, inactive pill borders |
| Genre tag bg | `#F5F5F7` | Genre pill backgrounds |
| Social signal bg | `rgba(242, 57, 83, 0.08)` | Soft coral tint behind friend badges |
| Friend showtime glow | `rgba(242, 57, 83, 0.25)` | Box-shadow on showtime pills with friends |
| Page bg (behind phone) | `#E5E5E7` | Body background framing the 393×852 device |

### Colors corrected from original code

| What changed | Was (wrong) | Now (correct) | Why |
|---|---|---|---|
| Active tab / selected pills | `#4CAF50` Material green | `#F23953` Flicks coral | Green was never in the Flicks palette |
| Social signal text & "Join" CTA | `#D4A853` gold | `#F23953` Flicks coral | Gold was from the case study presentation theme, not the app |
| Social signal badge bg | `rgba(212, 168, 83, 0.08)` gold tint | `rgba(242, 57, 83, 0.08)` coral tint | Match accent color |
| Friend showtime border | `#D4A853` gold border + gold shadow | `#F23953` coral border + coral shadow | Match accent color |
| "I'm in" confirm button | `#D4A853` gold | `#F23953` coral | Match accent color |
| "Showtimes" tab | Clock icon + "Showtimes" | Cinema icon + "Cinemas" | Matches real Flicks app navigation |
| App background | `#F8F8F8` | `#F8F8FA` | Slightly cooler to match Flicks |

---

## Tech stack

- **Vite 6** — dev server + build
- **React 19** — UI
- **TypeScript 5.7** — type safety
- **Tailwind CSS v4** — utility classes (via `@tailwindcss/vite` plugin)
- **No other dependencies** — zero extra libraries

---

## How to run

```bash
cd ui-concept
npm install    # already done, but run if node_modules is missing
npm run dev    # starts at http://localhost:5173
```

Production build:
```bash
npm run build  # outputs to ui-concept/dist/
```
