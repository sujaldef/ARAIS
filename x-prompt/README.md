# ARAIS — Frontend Specification Package
## Adaptive Real-World Anomaly Intelligence System
### For AI Code Generation — Complete Frontend Build Prompt

---

## WHAT THIS FOLDER IS

This is a complete, page-by-page frontend design and implementation specification
for the ARAIS (Adaptive Real-World Anomaly Intelligence System) — an intelligent
code and data analysis workbench.

Every file in this folder is a prompt/specification document. Your job is to read
each file and generate the corresponding React + Electron-ready component or page.

---

## FOLDER STRUCTURE

```
ARAIS_Frontend_Spec/
│
├── README.md                        ← You are here. Read this first.
│
├── design-system/
│   ├── 00_tokens.md                 ← Colors, typography, spacing, all design tokens
│   ├── 01_components_library.md     ← Reusable components spec (buttons, cards, badges, etc.)
│   └── 02_layout_rules.md           ← Grid system, sidebar, header, panel rules
│
├── pages/
│   ├── 01_landing_home.md           ← Dashboard home / landing page
│   ├── 02_data_ingestion.md         ← File upload + stream simulator page
│   ├── 03_live_analysis.md          ← Live inference + real-time stream visualizer
│   ├── 04_model_control.md          ← Model pool, orchestrator status, switching panel
│   ├── 05_ood_alerts.md             ← OOD / Novel anomaly alert center
│   ├── 06_evaluation_report.md      ← Evaluation engine report + performance profiles
│   └── 07_settings.md               ← System settings, thresholds, session config
│
├── components/
│   ├── sidebar.md                   ← Navigation sidebar spec
│   ├── topbar.md                    ← Top bar / header spec
│   ├── stream_chart.md              ← Live time-series chart component
│   ├── confidence_gauge.md          ← Confidence + uncertainty gauge widget
│   ├── model_status_card.md         ← Model tier card with live status
│   ├── anomaly_event_row.md         ← Single anomaly event list item
│   └── ood_badge.md                 ← OOD proximity indicator badge
│
└── assets-spec/
    ├── icons.md                     ← Icon set directions (Lucide React recommended)
    └── motion.md                    ← Animation and transition spec
```

---

## HOW TO USE THIS PACKAGE

1. Start with `design-system/00_tokens.md` — implement all CSS variables and Tailwind config
2. Build `design-system/01_components_library.md` — shared components used across pages
3. Implement `design-system/02_layout_rules.md` — app shell, sidebar, router setup
4. Then build each page in `pages/` in order (01 → 07)
5. Use `components/` files to build the widget-level pieces each page needs
6. Apply motion spec from `assets-spec/motion.md` last as a polish pass

---

## TECH STACK (NON-NEGOTIABLE)

- **Framework**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS (utility classes) + CSS variables for the design system
- **Charts**: Recharts (for time-series, line, bar, area charts)
- **Icons**: Lucide React
- **Motion**: Framer Motion for page transitions and entrance animations
- **Routing**: React Router v6 (or Electron-safe routing)
- **State**: Zustand for global state (model status, session, alerts)
- **Fonts**: Load via @fontsource or Google Fonts import

---

## AESTHETIC DIRECTION — READ BEFORE BUILDING ANYTHING

### Theme: "Industrial Intelligence"

Think: mission-critical monitoring software meets surgical precision.
Dark-first. Dense but breathable. Every pixel earns its place.

**NOT**: purple gradient SaaS landing pages. NOT generic dashboards.
**YES**: Something that looks like it runs a nuclear plant's anomaly detection.

### Visual Character
- Dark charcoal backgrounds, NOT pure black (#0D1117 base)
- Deep navy panels for content areas
- Crimson/red for anomalies and warnings (never orange for errors)
- Electric blue for active states and data streams
- Amber/gold for uncertain/caution states
- Muted teal for "normal" and "safe" signals
- Monospace font for data values, scores, and code
- A strong geometric sans-serif for headings
- Thin ruled lines and subtle grid texture on backgrounds

### Spatial Logic
- Left sidebar: always visible, 220px, icon + label navigation
- Top bar: 52px, breadcrumb + session status + system health
- Content area: the rest, with internal panel grid
- Panels have visible borders (1px, low-opacity white), subtle shadow
- Data-dense but never cluttered — use controlled negative space

---

## CRITICAL RULES FOR THE AI BUILDING THIS

1. **No placeholder lorem ipsum anywhere.** All text must be ARAIS-domain content.
2. **All charts must use realistic fake data** — anomaly spikes, drift patterns, score curves.
3. **Every page must feel alive** — at least one animated element per page (chart updating,
   badge pulsing, number ticking).
4. **Mobile is NOT a concern.** This is an Electron desktop app. Design for 1280px+ width.
5. **Dark mode only.** No light mode toggle. The system is always dark.
6. **Consistency over creativity on components.** Design tokens are law.
   Creativity is for layouts and micro-interactions.
7. **Functional-first.** Every button, input, and toggle should do something visible
   (even with mock data/handlers).
