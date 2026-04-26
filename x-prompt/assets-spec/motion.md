# Motion & Animation Specification
## File: assets-spec/motion.md

---

## PHILOSOPHY

Motion in ARAIS communicates system state and data change — it is never decorative.
Every animation has a functional purpose:
- New data arrived → chart shifts
- Anomaly detected → badge flashes
- Model switches → status indicator transitions
- Page changes → content slides

Use Framer Motion for page-level and component-level animations.
Use CSS transitions for hover, focus, and simple state changes.
Never use animation where it would delay the user from seeing information.

---

## PAGE TRANSITIONS

Implemented with Framer Motion `<AnimatePresence>` + `<motion.div>` on route outlet.

```
Exit:  { opacity: 1→0, y: 0→-8px }, duration: 150ms, ease: easeIn
Enter: { opacity: 0→1, y: 8px→0  }, duration: 220ms, ease: easeOut
```

Panel stagger on page enter:
Each direct child panel: `delay = index * 40ms`
This creates a cascading reveal from top-left to bottom-right.

---

## CHART ANIMATIONS

### On Mount (initial data load)
- Line/area charts: `isAnimationActive={true}`, Recharts default (800ms, ease)
- Exception: Live stream chart — `isAnimationActive={false}` (prevents lag during updates)

### Live Data Update (stream chart)
- New point appended to right: CSS transform translateX on chart SVG element
  (-pointWidth) → 0, 200ms ease-out
- This creates a smooth left-scroll effect

### Threshold line appearance: fade in, 300ms

---

## COMPONENT ENTRANCE ANIMATIONS

Use `variants` with Framer Motion for reusable patterns:

**fadeUp** (for cards, panels, content blocks):
```
hidden:  { opacity: 0, y: 12 }
visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } }
```

**fadeIn** (for badges, tooltips, overlays):
```
hidden:  { opacity: 0 }
visible: { opacity: 1, transition: { duration: 0.15 } }
```

**scaleIn** (for modals, dropdowns):
```
hidden:  { opacity: 0, scale: 0.96 }
visible: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: [0.34,1.56,0.64,1] } }
```

---

## STATE CHANGE ANIMATIONS

### Status Badge (NORMAL ↔ ANOMALY switch)
1. Scale: 1 → 1.08, 100ms spring
2. Scale: 1.08 → 1, 200ms spring
3. Color transition: 300ms (CSS transition on background + border)

### New Anomaly Event (row slide-in)
```
initial: { opacity: 0, y: -8, backgroundColor: 'var(--color-active-glow)' }
animate: { opacity: 1, y: 0,  backgroundColor: 'transparent' }
transition: { duration: 0.15, then: { duration: 0.5 } }
```
Two-phase: fast slide-in, slow color fade.

### Model Switch Event (in switch log)
New row animates in from top (same as anomaly event row).
Active model card: brief glow pulse on the newly active card.
```
keyframes: { boxShadow: ['0 0 0 transparent', '0 0 20px var(--color-active-glow)', '0 0 0 transparent'] }
duration: 600ms
```

### Confidence Gauge Update
Arc fill: animates to new value, 400ms ease-out.
Center number: counts up/down to new value, 300ms.

### Stat Card Numbers (on page load)
Count from 0 to final value over 800ms ease-out.
Use `requestAnimationFrame` loop or a `useCountUp` hook.

---

## PULSE ANIMATIONS (CSS keyframes)

**Standard pulse** — for LIVE/ACTIVE badges:
```css
@keyframes pulse-badge {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(1.3); }
}
```
Duration: 1.5s, infinite, ease-in-out.

**Alert pulse** — for critical anomaly / high-OOD badges:
```css
@keyframes pulse-alert {
  0%, 100% { box-shadow: 0 0 0 0 var(--color-anomaly-glow); }
  50%       { box-shadow: 0 0 0 6px transparent; }
}
```
Duration: 2s, infinite.

**Shimmer** — for skeleton loaders:
```css
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
```
Background: linear-gradient(90deg, --color-bg-elevated, --color-bg-hover, --color-bg-elevated)
Background-size: 800px 100%
Duration: 1.5s, infinite, linear.

---

## HOVER TRANSITIONS

All interactive elements use CSS transition shorthand:
```css
transition: background-color 120ms ease, border-color 120ms ease,
            box-shadow 120ms ease, color 120ms ease, opacity 120ms ease;
```

Button active (press): `transform: scale(0.97)`, 80ms.

---

## LOADING STATES

When a panel is loading data:
1. Render skeleton layout matching expected content structure
2. Apply shimmer animation to all skeleton elements
3. When data loads: fade skeleton out (opacity 0, 150ms), fade content in

Do NOT use full-page spinners. Loading is always panel-local.

---

## REDUCED MOTION

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In Framer Motion: check `useReducedMotion()` and skip animations if true.
