# AI/UI Lab

A theme playground for previewing and evaluating UI themes across realistic pages. Designers and developers can instantly see how a theme behaves across diverse interface patterns — dashboards, data tables, maps, and card grids.

## Purpose

Themes are authored externally (in code, with AI assistance) and registered into the system. The app **manages and applies** themes — it does not create or generate them. Every visual decision flows through theme tokens, so switching themes is instant and consistent.

## Adding a Theme

Drop a `.ts` file in `src/themes/` that exports a `Theme` object. It auto-appears in the theme switcher — no config changes needed.

Each theme is a self-describing spec with:
- **Colors** — primary, secondary, accent, semantic, text (with roles, usage, contrast hints, and shade scales)
- **Typography** — font families, weights, and a type scale
- **Spacing** — base unit and scale (`0.5`–`20`)
- **Radius** — sm through full, with usage descriptions
- **Shadows** — sm, md, lg, xl
- **Motion** — duration and easing tokens
- **Component overrides** — per-component token customization

## Pages

| Page | What it tests |
|------|---------------|
| **Dashboard** | KPI cards, line/bar charts, activity feed |
| **Users** | Data table with sorting, pagination, avatars |
| **Projects** | Card grid + table view toggle, progress bars, tags |
| **Map** | Leaflet map with sidebar list, popups, markers |
| **Themes** | Live token inspector — colors, typography, spacing, radius |

## Tech Stack

- **React 19** + TypeScript
- **Vite** for dev/build
- **CSS Modules** — no Tailwind, no utility classes
- **Recharts** for charts
- **Leaflet** for maps
- No third-party component library — all components built from scratch for full theme control

## Architecture

```
src/
  themes/          # Theme definitions (drop-in .ts files)
  types/theme.ts   # Theme type contract
  lib/applyTheme.ts # CSS variable injection on :root
  context/         # ThemeContext + provider
  components/
    ui/            # Button, Card, Input, Select, Badge, Avatar, ProgressBar
    layout/        # AppShell, Sidebar, TopNav, ThemeSwitcher
  pages/           # Dashboard, Users, Projects, Map, Themes
  data/            # Mock data for all pages
  styles/          # Reset + global styles
```

All UI references CSS variables (`var(--color-primary)`, `var(--spacing-4)`, etc.) — never hardcoded values. Theme switching works by replacing CSS custom properties on `:root`, persisted via `localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

## Out of Scope

Theme editor GUI, theme export, authentication, dark/light mode toggle, theme validation/linting.
