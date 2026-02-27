# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A product strategy case study UI concept for **Flicks** — a cinema discovery app that makes movie attendance communal. The React app is a prototype hub showing 9 interactive screens across 3 proposed "Cinema Together" features, with a navigation index page at the root.

## Development Commands

All commands run from the `ui-concept/` directory:

```bash
npm run dev       # Start Vite dev server with hot module replacement
npm run build     # TypeScript compile (tsc -b) then Vite bundle → dist/
npm run preview   # Serve the production build locally
```

No linting or test commands are configured.

## Architecture

### Entry point
`App.tsx` is the prototype navigation hub (index page). It renders a `ScreenId`-keyed switcher: `null` → shows the `IndexPage` gallery; a string ID like `"1a"` → shows a `ScreenViewer` with the selected screen inside a `PhoneFrame`.

### Source tree
```
src/
  types.ts                         — shared TypeScript interfaces (Film, Cinema, Friend, etc.)
  data.ts                          — all mock data (films, cinemas, friends, diary entries)
  components/
    figma/ImageWithFallback.tsx    — legacy image component (kept for reference)
    layout/
      PhoneFrame.tsx               — 393×852 phone chrome with dynamic island
      StatusBar.tsx                — iOS status bar (light/dark prop)
      FlicksTabBar.tsx             — 5-tab bottom bar (Home/In Cinemas/Streaming/Search/More)
    flicks/                        — pixel-matched real Flicks UI components
      DatePicker.tsx               — horizontal date pill scroller
      DualTab.tsx                  — TIMES & TICKETS / STREAMING tab pair
      FilmDetailHeader.tsx         — hero backdrop + film metadata overlay
      CinemaListing.tsx            — cinema name + session pill grid
      NearYouDropdown.tsx          — location filter pill
      RTScoreBadge.tsx             — Rotten Tomatoes badge (sm inline / lg full)
      SessionTimePill.tsx          — individual showtime pill (w/ optional gold border)
      StreamingProviderRow.tsx     — "Where to watch" service row
    cinema-together/               — new social feature components (gold accent only)
      BottomSheet.tsx              — animated slide-up sheet with scrim
      EmojiReactionPill.tsx        — spring-animated emoji selector
      FriendAvatarStack.tsx        — overlapping avatar stack with overflow count
      FriendNudge.tsx              — contextual friend activity banner
      FriendRow.tsx                — friend list item (with optional checkbox or RSVP badge)
      GoldButton.tsx               — primary gold CTA (#D4A853)
      GoldCheckbox.tsx             — gold checked checkbox
      RSVPBadge.tsx                — going/maybe/invited/declined status pill
      SecondaryButton.tsx          — outline secondary action button
      SocialSignalBadge.tsx        — "N friends want to see this" strip
      StarRating.tsx               — interactive 5-star rating (gold)
      ViewingDiaryCard.tsx         — diary entry card (poster, emoji, stars, note)
  screens/
    social-signals/
      Screen1A.tsx                 — Showtimes with friend interest + join bottom sheet
      Screen1B.tsx                 — Film detail with social context
      Screen1C.tsx                 — Join confirmation bottom sheet (pre-opened)
    whos-in/
      Screen2A.tsx                 — Dual CTA: buy tickets vs invite friends
      Screen2B.tsx                 — Friend selection with gold checkboxes
      Screen2C.tsx                 — RSVP tracking dashboard
    quick-capture/
      Screen3A.tsx                 — iOS lock screen post-film notification
      Screen3B.tsx                 — Emoji-first reaction + star rating flow
      Screen3C.tsx                 — Viewing diary with stats + Letterboxd export
  App.tsx                          — index page + screen viewer
  main.tsx                         — Vite entry
  index.css                        — @import "tailwindcss" + body font
```

### Navigation model
`App` holds `activeScreen: ScreenId | null`. `null` renders the `IndexPage` gallery; a screen ID renders `ScreenViewer` (dark backdrop + `PhoneFrame` + prev/next arrows). All 9 screens are self-contained components — they do not share routing state.

### Colour system
- **Flicks brand**: `#F23953` — selected date pills, active tab, primary CTAs in base app
- **Cinema Together gold**: `#D4A853` — used **exclusively** for social feature components (`cinema-together/`). Never used in base Flicks UI.
- All screens are 393 × 852 px (iPhone 15 Pro logical resolution)

### Styling
Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no config file needed). No external component libraries. All transitions use `cubic-bezier(0.16, 1, 0.3, 1)`. Font stack is Apple system UI (SF Pro).

### Mock data
`data.ts` exports: `FRIENDS` (5 friends with RSVP statuses), `CINEMAS` (3 NZ cinemas with sessions), `CONCLAVE`/`DUNE2`/`BRUTALIST` films, `DIARY_ENTRIES`. All hardcoded — no API.

## Design System Reference
See `design-system.md` at the project root for the complete extracted token set from all 73 reference screenshots.

## Permissions

`.claude/settings.local.json` restricts `WebFetch` to `www.flicks.co.nz` only.
