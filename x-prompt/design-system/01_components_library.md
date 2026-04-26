# Component Library — ARAIS Design System
## File: design-system/01_components_library.md

---

## PURPOSE

Defines every reusable UI component in ARAIS. Build these first — all pages assemble
from these building blocks. Each component spec includes: visual description,
props interface, states, and implementation notes.

---

## 1. BUTTON

### Variants

**Primary**
- Background: `--color-accent-primary` (#2563EB)
- Text: white, `--font-body`, `--weight-semibold`, `--text-sm`
- Padding: 8px 16px
- Border radius: `--radius-md`
- Hover: 10% lighter, `--shadow-glow-blue`
- Active: scale(0.97)
- Disabled: 40% opacity, no cursor

**Destructive**
- Same as Primary but background: `--color-accent-danger`
- Hover: glow red

**Ghost**
- Background: transparent
- Border: 1px solid `--color-border-strong`
- Text: `--color-text-secondary`
- Hover: background `--color-bg-hover`, text `--color-text-primary`

**Icon Button**
- Square: 32px × 32px
- Ghost style
- Contains single Lucide icon, 16px

### Sizes
- sm: 28px height, text-xs
- md: 36px height, text-sm (default)
- lg: 44px height, text-md

---

## 2. BADGE / STATUS CHIP

A small inline label used to communicate state at a glance.

### Variants and Their Use

| Variant    | Color Token         | Use Case                          |
|------------|---------------------|-----------------------------------|
| anomaly    | --color-anomaly     | Detected anomaly                  |
| normal     | --color-normal      | Clean / normal result             |
| uncertain  | --color-uncertain   | High uncertainty output           |
| ood        | --color-ood         | Out-of-distribution input         |
| active     | --color-active      | Live / running model              |
| inactive   | --color-text-muted  | Inactive / paused model           |

### Visual Spec
- Height: 20px
- Padding: 0 8px
- Font: `--font-mono`, `--text-xs`, `--weight-semibold`, `--tracking-wide`
- Text: UPPERCASE
- Border radius: `--radius-sm`
- Background: soft variant of signal color (e.g., `--color-anomaly-soft`)
- Text: text variant of signal color (e.g., `--color-anomaly-text`)
- Border: 1px solid the main signal color at 40% opacity

### Pulse Variant
For live/active states, add a pulsing dot (8px circle) to the left of the label.
The dot uses the signal color and animates: scale 1 → 1.4 → 1, opacity 1 → 0.4 → 1, 1.5s loop.

---

## 3. PANEL / CARD

The primary container for all content sections.

### Spec
- Background: `--color-bg-panel`
- Border: 1px solid `--color-border`
- Border radius: `--radius-md`
- Box shadow: `--shadow-panel`
- Padding: 20px (default), 16px (compact), 24px (spacious)

### Header Strip
- Optional top section within the panel
- Border bottom: 1px solid `--color-border`
- Padding: 12px 20px
- Contains: title (text-sm, semibold, text-primary) + optional right-side action

### Variants
- **default**: as above
- **elevated**: uses `--color-bg-elevated` + `--shadow-elevated`
- **bordered-accent**: left border 3px solid signal color (anomaly / normal / ood etc.)
- **ghost**: no background, only border

---

## 4. STAT CARD

Used on the home dashboard to display a single key metric.

### Layout
```
┌────────────────────────────────┐
│  LABEL TEXT           [badge]  │
│                                │
│  42.7                          │
│  ──────────                    │
│  ↑ 12% vs last session         │
└────────────────────────────────┘
```

### Spec
- Full Panel spec applies as container
- Label: `--font-body`, `--text-xs`, `--weight-medium`, `--tracking-wider`,
  UPPERCASE, `--color-text-muted`
- Value: `--font-display`, `--text-4xl`, `--weight-bold`, signal color or white
- Subtext: `--font-body`, `--text-sm`, `--color-text-secondary`
- Optional trend arrow (↑ green / ↓ red)
- Min width: 200px

---

## 5. TABLE

Used for anomaly event logs, model comparison, evaluation results.

### Spec
- Background: transparent (sits in a Panel)
- Header row: `--color-bg-elevated`, text-xs uppercase tracking-wider text-secondary
- Row height: 44px
- Row border: 1px bottom `--color-border`
- Row hover: `--color-bg-hover`
- Selected row: `--color-bg-selected`, left border 2px solid `--color-active`
- Cell text: text-sm, text-primary for primary col, text-secondary for metadata cols
- Monospace font for numeric columns (scores, timestamps, IDs)

### Sortable Columns
Show sort arrow icon (Lucide `ArrowUpDown`) on hover; switch to `ArrowUp`/`ArrowDown` when sorted.

---

## 6. INPUT / FORM CONTROLS

### Text Input
- Background: `--color-bg-input`
- Border: 1px solid `--color-border`
- Border radius: `--radius-md`
- Height: 36px
- Padding: 0 12px
- Font: `--font-body`, `--text-sm`
- Text: `--color-text-primary`
- Placeholder: `--color-text-muted`
- Focus: border `--color-accent-primary`, box-shadow `--shadow-glow-blue`

### Select / Dropdown
Same visual as text input. Custom styled dropdown menu:
- Background: `--color-bg-elevated`
- Item hover: `--color-bg-hover`
- Selected item: `--color-bg-selected`
- Border: 1px `--color-border-strong`
- Border radius: `--radius-md`
- Shadow: `--shadow-elevated`

### Toggle / Switch
- Track: 32px × 18px, border-radius full
- Off state: `--color-bg-elevated`, border `--color-border-strong`
- On state: `--color-accent-primary`
- Knob: white circle, 14px, transition `--transition-spring`
- Label right of toggle, text-sm

### Slider
- Track: 4px height, `--color-bg-elevated`
- Fill (left of thumb): `--color-accent-primary`
- Thumb: 14px circle, white, box-shadow `--shadow-glow-blue`

---

## 7. PROGRESS BAR

Used for confidence scores, accuracy metrics.

### Spec
- Track height: 6px, background `--color-bg-elevated`, border-radius full
- Fill: signal color (anomaly / normal / uncertain) based on value range
  - 0–0.4: uncertain/amber
  - 0.4–0.75: normal/teal
  - 0.75–1.0: active/blue for confidence, anomaly/red for risk
- Fill border-radius: full
- Animated fill on mount: width 0 → value over 600ms ease-out

---

## 8. TOOLTIP

- Background: `--color-bg-elevated`
- Border: 1px `--color-border-strong`
- Border radius: `--radius-sm`
- Padding: 6px 10px
- Font: text-xs, text-primary
- Shadow: `--shadow-elevated`
- Arrow: 6px triangle matching background
- Delay: 300ms before show
- Animation: fade + 4px translateY, 150ms

---

## 9. NOTIFICATION / TOAST

Appears top-right, stacks vertically, auto-dismisses after 4s.

### Variants
- **anomaly**: left border 3px `--color-anomaly`, icon: `AlertTriangle` red
- **ood**: left border 3px `--color-ood`, icon: `Zap` purple
- **info**: left border 3px `--color-active`, icon: `Info` blue
- **success**: left border 3px `--color-normal`, icon: `CheckCircle` teal

### Layout
```
┌──────────────────────────────────────┐
│ [icon]  Title text             [×]   │
│         Supporting description       │
│ ─────────────────────────────────── │
│ [progress bar, draining to 0 in 4s]  │
└──────────────────────────────────────┘
```
Width: 340px. Animation: slide in from right + fade.

---

## 10. DIVIDER

### Horizontal
- 1px height, background `--color-border`
- Optional center label: background `--color-bg-panel`, padding 0 12px,
  text-xs uppercase tracking-wider text-muted

### Vertical
- 1px width, background `--color-border`
- Minimum height: 100% of parent
