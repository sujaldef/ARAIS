# Layout Rules & App Shell
## File: design-system/02_layout_rules.md

---

## APP SHELL STRUCTURE

The entire ARAIS app lives inside a fixed-dimension shell.
There are NO scrolling pages at the top level. Each page manages
its own internal scroll.

```
┌─────────────────────────────────────────────────────────────────┐
│  TOPBAR (52px, full width, position: fixed, z-index: 100)       │
├───────────────┬─────────────────────────────────────────────────┤
│               │                                                 │
│  SIDEBAR      │   MAIN CONTENT AREA                             │
│  (220px)      │   (fills remaining width)                       │
│  fixed        │   padding: 24px                                 │
│  full height  │   overflow-y: auto                              │
│               │                                                 │
│               │                                                 │
│               │                                                 │
│               │                                                 │
│               │                                                 │
└───────────────┴─────────────────────────────────────────────────┘
```

### Dimensions
- **Topbar**: height 52px, width 100vw, fixed at top, z-index 100
- **Sidebar**: width 220px, height calc(100vh - 52px), fixed left, top 52px
- **Main content**: margin-left 220px, margin-top 52px, padding 24px
- **Min app width**: 1280px (desktop Electron — no mobile breakpoints needed)

---

## TOPBAR SPEC (top-level layout)

Refer to `components/topbar.md` for detailed spec.

Topbar contains:
- Left: ARAIS logo + wordmark + version tag
- Center: Active session breadcrumb (e.g., "Dashboard › Live Analysis › Session 004")
- Right: System health ring + active model indicator + clock + settings icon

---

## SIDEBAR SPEC (top-level layout)

Refer to `components/sidebar.md` for detailed spec.

Sidebar contains:
- Top: App logo area (64px block)
- Navigation links (icon + label, 7 items)
- Bottom: System resource mini-monitors (CPU, RAM bars)

---

## CONTENT AREA GRID SYSTEM

### Full-Width Layout
Single column, panel takes 100% of content area.
Use for: Live Analysis, Evaluation Report.

### Two-Column Layout (60/40)
Left column: 60% (primary content, charts)
Right column: 40% (controls, stats, alerts)
Gap: 16px

Use for: Data Ingestion (upload left, config right),
Model Control (model pool left, orchestrator right)

### Three-Column Layout (33/33/33)
Equal-width panels.
Gap: 16px
Use for: Settings (categories / form / preview)

### Stat Card Row
Horizontal row of 4 stat cards, equal width, gap 16px.
Always sits at top of Dashboard page.

### Panel Stacking
Within a column, panels stack vertically with 16px gap.
Panels have no fixed height by default — content drives height.
Exception: Charts have explicit heights (see each page spec).

---

## PAGE TRANSITION

All page changes animate:
- Exiting page: opacity 1→0, translateY 0→-8px, duration 150ms ease-in
- Entering page: opacity 0→1, translateY 8px→0, duration 220ms ease-out
- Stagger child panels on enter: each panel delays by 40ms × index

Use Framer Motion `<AnimatePresence>` + `<motion.div>` on each route.

---

## INTERNAL PAGE LAYOUT RULES

### Panel Headers
Every panel with a title uses this structure:
```
Panel Header (border-bottom, 12px 20px padding)
  Left: Section title (text-sm, semibold) + optional description (text-xs, muted)
  Right: Action buttons (ghost, sm) or badge

Panel Body (20px padding)
  Main content
```

### Empty States
When a panel has no data:
- Centered vertically and horizontally in panel
- Lucide icon (48px, muted color)
- Heading: "No data yet" (text-md, text-secondary)
- Subtext: contextual explanation (text-sm, text-muted)
- Optional: primary action button

### Loading States
- Skeleton loaders, NOT spinners
- Skeleton: animated shimmer (`--color-bg-elevated` → `--color-bg-hover` gradient, 1.5s loop)
- Match skeleton shape to expected content (bars for text, rect for chart)

### Error States
- Red-bordered panel (`--color-anomaly` border)
- AlertCircle icon (red, 32px)
- Error message (text-sm, text-primary)
- "Retry" ghost button

---

## RESPONSIVE BEHAVIOR

Not applicable — this is an Electron desktop app with minimum 1280px width.
Do not add responsive breakpoints. Do not add hamburger menus.
Sidebar is always visible. Topbar is always full width.

---

## SCROLL BEHAVIOR

- Sidebar: scrolls independently if nav items overflow (unlikely)
- Main content area: `overflow-y: auto`, custom scrollbar style:
  - Track: transparent
  - Thumb: `--color-border-strong`, 4px width, border-radius full
  - Thumb hover: `--color-text-muted`
- Individual chart panels: overflow hidden (charts are bounded)

---

## FOCUS & ACCESSIBILITY

- Focus ring: 2px solid `--color-accent-primary`, 2px offset, border-radius matching element
- All interactive elements must have visible focus state
- Tab order follows visual reading order (left→right, top→bottom)
- All icon-only buttons must have `aria-label`
- Color is never the ONLY differentiator — always pair with icon or text
