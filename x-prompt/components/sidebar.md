# Component: Sidebar
## File: components/sidebar.md

---

## PURPOSE

The primary navigation structure. Always visible on the left side of the app.
220px wide, full height below topbar.

---

## STRUCTURE

```
┌─────────────────────┐
│  LOGO AREA          │  64px
├─────────────────────┤
│  NAVIGATION         │  fills remaining height
│                     │
│  [nav items]        │
│                     │
├─────────────────────┤
│  SYSTEM RESOURCES   │  ~130px fixed at bottom
└─────────────────────┘
```

---

## LOGO AREA

Height: 64px
Background: slightly lighter than sidebar bg (`--color-bg-elevated`)
Border bottom: 1px `--color-border`
Padding: 0 16px

Content (horizontal, centered vertically):
- Left: small geometric icon/logo (SVG, 28px) — design: abstract waveform or hexagon with diagonal line (circuit-like)
- Right of icon: two-line block:
  - Line 1: "ARAIS" (`--font-display`, text-md, bold, text-primary)
  - Line 2: "v1.0 · Intelligence Layer" (text-xs, muted)

---

## NAVIGATION ITEMS

7 navigation items + 1 section divider

Background: `--color-bg-panel`
Item height: 44px
Item padding: 0 16px
Gap between items: 2px

Each item contains:
- Icon (Lucide, 18px) — always visible
- Label text (text-sm, `--font-body`)
- Optional: badge (for OOD alert count, evaluation status)

**Navigation items in order:**

1. `LayoutDashboard` — Dashboard
   - Route: /dashboard
   
2. `Upload` — Data Ingestion
   - Route: /data-ingestion

3. `Activity` — Live Analysis
   - Route: /live-analysis
   - Badge: "LIVE" pill (green, small) when analysis is running

4. `Cpu` — Model Control
   - Route: /model-control
   - Badge: active model tier ("T2", small grey pill)

5. `AlertTriangle` — OOD Alerts
   - Route: /ood-alerts
   - Badge: pending OOD count (red number badge, shows only when count > 0)

6. `BarChart2` — Evaluation
   - Route: /evaluation
   - Badge: "Running" (animated blue, shows when eval is active)

7. `Settings` — Settings
   - Route: /settings

---

## ITEM STATES

### Inactive (default)
- Background: transparent
- Icon: `--color-text-muted`
- Label: `--color-text-secondary`

### Hover
- Background: `--color-bg-hover`
- Icon + label: `--color-text-primary`
- Transition: `--transition-fast`

### Active (current route)
- Background: `--color-bg-selected`
- Left border: 2px solid `--color-accent-primary`
- Icon: `--color-active-text`
- Label: `--color-text-primary`, `--weight-semibold`

---

## SECTION DIVIDER

Between item 6 (Evaluation) and 7 (Settings):
- 1px horizontal line, `--color-border`
- 8px margin top and bottom

---

## SYSTEM RESOURCES SECTION (bottom)

Position: absolute bottom, width 100%, padding 12px 16px
Border top: 1px `--color-border`
Background: `--color-bg-panel-alt`

Shows two resource bars:

**CPU Usage**
- Row: "CPU" label (text-xs, muted) + value right-aligned (text-xs, monospace)
- Progress bar: 4px height, full width
  - Fill color: green <60% / amber 60-80% / red >80%
- Value: e.g., "54%"

**RAM Usage**
- Same structure
- Value: e.g., "2.1 / 8.0 GB"

Both values update every 3 seconds.

**Separator**

Below bars (6px margin):
- "Pipeline: RUNNING" OR "Pipeline: IDLE"
- Text-xs, monospace, color matches state (green/muted)
- Small pulsing dot if RUNNING
