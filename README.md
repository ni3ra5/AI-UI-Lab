<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS_Modules-✔-blue?style=flat-square" />
</p>

# AI/UI Lab

> A theme playground for previewing and evaluating UI themes across realistic pages.

Designers and developers can instantly see how a theme behaves across diverse interface patterns — dashboards, data tables, maps, and card grids. Themes are authored externally (in code, with AI assistance) and registered into the system. The app **manages and applies** themes — it does not create or generate them.

---

## Quick Start

```bash
npm install
npm run dev
```

---

## How Themes Work

Every visual decision flows through **theme tokens**. Switching themes is instant — CSS custom properties are replaced on `:root` and persisted via `localStorage`.

```
Theme file (.ts)  →  applyTheme()  →  CSS variables on :root  →  UI updates instantly
```

### Adding a Theme

Drop a `.ts` file in `src/themes/` that exports a `Theme` object. It auto-appears in the theme switcher — **no config changes needed**.

Each theme is a self-describing spec:

| Token Layer | What it controls |
|-------------|-----------------|
| **Colors** | Primary, secondary, accent, semantic, text — with roles, usage hints, contrast targets, and shade scales |
| **Typography** | Font families, weights, and a type scale (xs → 4xl) |
| **Spacing** | Base unit + scale from `0.5` (2px) to `20` (80px) |
| **Radius** | sm → full, with usage descriptions |
| **Shadows** | sm, md, lg, xl, overlay |
| **Motion** | Duration and easing tokens |
| **Components** | Per-component overrides (button, card, input, sidebar, table, etc.) |

### Included Themes

| Theme | Personality |
|-------|------------|
| **Default** | Clean, professional SaaS with indigo accents |
| **Ocean** | Calming teal and deep blue, inspired by the sea |
| **Ember** | Luxurious dark with warm olive tones and red-orange accents |

---

## Pages

Each page is designed to stress-test a different set of UI patterns:

| Page | Patterns tested |
|------|----------------|
| **Dashboard** | KPI stat cards, line chart, bar chart, activity feed |
| **Users** | Sortable data table, pagination, avatars, row hover states |
| **Projects** | Card grid ↔ table toggle, progress bars, tags, team avatars |
| **Map** | Leaflet map, sidebar location list, popups, custom markers |
| **Themes** | Live token inspector — color swatches, typography samples, radius previews |

---

## Architecture

```
src/
├── themes/            # Theme definitions (drop-in .ts files)
├── types/theme.ts     # Theme type contract
├── lib/
│   ├── applyTheme.ts  # CSS variable injection on :root
│   └── chartUtils.ts  # Theme-aware chart color helpers
├── context/           # ThemeContext + provider
├── components/
│   ├── ui/            # Button, Card, Input, Select, Badge, Avatar, ProgressBar
│   └── layout/        # AppShell, Sidebar, TopNav, ThemeSwitcher
├── pages/             # Dashboard, Users, Projects, Map, Themes
├── data/              # Mock data for all pages
└── styles/            # Reset + global styles
```

### Design Principles

- **Zero hardcoded values** — all UI references CSS variables (`var(--color-primary)`, `var(--spacing-4)`, etc.)
- **No component libraries** — Button, Card, Input, etc. built from scratch for full theme control
- **No Tailwind** — themes own all visual decisions via CSS Modules
- **Code-first themes** — themes are TypeScript objects with full type safety

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | CSS Modules |
| Charts | Recharts |
| Maps | Leaflet + React Leaflet |
| Fonts | Google Fonts (Inter, DM Sans, DM Serif Display, JetBrains Mono, Fira Code) |

---

## Out of Scope

Theme editor GUI, theme export, authentication, dark/light mode toggle, theme validation/linting.
