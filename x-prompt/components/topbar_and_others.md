# Component: Topbar
## File: components/topbar.md

---

## STRUCTURE

Height: 52px
Position: fixed top, full width, z-index 100
Background: `--color-bg-panel`
Border bottom: 1px `--color-border`

Three zones, horizontal flex, space-between:

```
[ LOGO/BRAND  ]  [ BREADCRUMB + SESSION ]  [ STATUS CLUSTER ]
  Left                  Center                    Right
```

---

## LEFT ZONE (16px left padding)

Not needed (sidebar handles branding).
Left zone contains:
- Current page title: `--font-display`, text-sm, semibold, text-primary
  Updates with route changes (animated: fade out → fade in, 150ms)

---

## CENTER ZONE

Breadcrumb trail:
- "ARAIS" (text-xs, muted) → `>` → Section Name → `>` → Sub-context if any
- Font: `--font-body`, text-xs
- Separator: `ChevronRight` icon, 12px, muted
- Active item: text-secondary
- Parent items: text-muted, clickable (navigate to that route)

Below breadcrumb (vertically centered):
Session label: "Session 004 · Started 2h 14m ago" (text-xs, muted)
This timer increments live.

---

## RIGHT ZONE (16px right padding)

Elements left to right:

1. **Pipeline Status Indicator**
   - Dot (8px, rounded) + text-xs label
   - RUNNING: green pulse dot + "RUNNING"
   - IDLE: grey dot + "IDLE"
   - PROCESSING: amber pulse + "PROCESSING"

2. **Divider** (1px vertical, 16px height, `--color-border`)

3. **Active Model Badge**
   - Chip: "T2 · 28ms" (monospace, text-xs)
   - Background: `--color-bg-elevated`
   - Border: 1px `--color-border-strong`
   - On click: navigates to /model-control

4. **Divider**

5. **Clock**
   - Current time: "13:47:32" (monospace, text-xs, text-secondary)
   - Updates every second

6. **Settings Icon Button**
   - `Settings` icon, 16px
   - Ghost icon button
   - Navigate to /settings on click

---
---
---

# Component: Stream Chart
## File: components/stream_chart.md

---

## PURPOSE

The primary real-time visualization component used on the Live Analysis page.
A composited chart showing multiple data series overlaid on a time-scrolling X-axis.

---

## PROPS

```typescript
interface StreamChartProps {
  data: DataPoint[];          // Array of {timestamp, signal, anomalyScore, confidence, oodScore}
  thresholds: {
    anomaly: number;          // e.g., 0.70
    ood: number;              // e.g., 0.80
  };
  width?: number;             // default: 100%
  height?: number;            // default: 280
  isLive?: boolean;           // if true, auto-scrolls on new data
  onPointClick?: (point) => void;
}
```

---

## VISUAL LAYERS (bottom to top render order)

1. **Background**: `--color-bg-base`, no border within chart
2. **Horizontal grid lines**: 5 lines, 1px `--color-border`, opacity 0.4
3. **Anomaly event bands**: vertical shaded rectangles at anomaly timestamps
   - Width: one window's time span
   - Fill: `--color-anomaly-glow`
4. **Confidence area fill**: beneath confidence line, gradient fill
5. **OOD score line**: dashed, `--color-ood`, 1.5px, rendered
6. **Raw signal line**: thin, `--color-text-muted`, opacity 0.5
7. **Anomaly score line**: `--color-anomaly`, 2px, bold
8. **Confidence line**: `--color-active`, 1.5px
9. **Threshold reference lines**: horizontal dashed
10. **Anomaly point markers**: triangle markers at peak anomaly timestamps
11. **Axes and labels**: last (on top of chart content)

---

## INTERACTIONS

- **Hover**: vertical crosshair line + custom tooltip
  - Tooltip shows all series values at that timestamp
  - Tooltip background: `--color-bg-elevated`
  - Tooltip border: 1px `--color-border-strong`
  - Values in monospace

- **Click**: fires `onPointClick` with point data

- **Live scrolling**: when `isLive=true`, chart animates left shift
  as new data point arrives. Only last 120 points displayed.
  No Recharts transition animation (use CSS transform for smoothness)

---

## CUSTOM TOOLTIP CONTENT

```
13:47:32.441
────────────────
Signal value:    1.247
Anomaly score:  ████ 0.87
Confidence:     ████████ 0.92
OOD score:      ░░ 0.12
```

---
---
---

# Component: Confidence Gauge
## File: components/confidence_gauge.md

---

## PURPOSE

Two-part widget showing model confidence (arc gauge) + uncertainty level (segmented bar).
Used on Live Analysis page. Communicates prediction quality at a glance.

---

## PROPS

```typescript
interface ConfidenceGaugeProps {
  confidence: number;          // 0–1
  uncertainty: 'LOW' | 'MEDIUM' | 'HIGH';
  animated?: boolean;          // default true
}
```

---

## CONFIDENCE ARC GAUGE

Visual: semicircular arc (180 degrees, bottom to left to top to right)
Width: entire panel width (fills container)
Height: about 60% of panel

Outer track: 8px wide arc, `--color-bg-elevated`, full semicircle
Inner fill arc: 8px wide, same radius, fills from left to degree corresponding to value
- 0–40%: fills with `--color-anomaly` (low confidence = bad)
- 40–75%: fills with `--color-uncertain`
- 75–100%: fills with `--color-active`

Center display (inside the arc):
- Large number: "87%" (`--font-display`, text-3xl, color matches arc color)
- Below number: "CONFIDENCE" label (text-xs, uppercase, tracking-wider, muted)

Tick marks at 0%, 25%, 50%, 75%, 100%
Tick labels: text-xs, muted

Needle (optional): a thin triangular pointer animated to value angle

Animation: arc fills from 0 to value over 800ms on mount, ease-out

---

## UNCERTAINTY SEGMENT BAR

Below the arc, separated by 12px gap.

Three segments in a horizontal bar, equal width, 6px height, 4px gap:
- Segment 1: "LOW" label below
- Segment 2: "MEDIUM" label below
- Segment 3: "HIGH" label below

Active segment styling:
- LOW: fill `--color-normal`, glow shadow
- MEDIUM: fill `--color-uncertain`, glow shadow
- HIGH: fill `--color-anomaly`, glow shadow + gentle pulse animation

Inactive segments: `--color-bg-elevated`

Current level text: right of segments, text-xs monospace, signal color

---
---
---

# Component: Model Status Card
## File: components/model_status_card.md

---

## PROPS

```typescript
interface ModelStatusCardProps {
  tier: 1 | 2 | 3;
  modelName: string;
  isActive: boolean;
  latency: number;             // ms
  accuracy: number;            // 0–1
  memoryMB: number;
  lastSwitch?: SwitchEvent;
  showControls?: boolean;      // show force-select button
}
```

---

## LAYOUT

```
┌──────────────────────────────────────┐
│  ◉ TIER 2 — MEDIUM      [ACTIVE ▶]  │   ← header row
│  Isolation Forest + LSTM Hybrid       │
├──────────────────────────────────────┤
│  28ms latency    91% accuracy        │   ← two-column stats
│  84MB memory     6.2% FP rate        │
├──────────────────────────────────────┤
│  Last switch: Tier 3 → Tier 2        │   ← switch info
│  4 min ago · Reason: CPU load 86%    │
├──────────────────────────────────────┤
│  [Force Select]    [View Details]    │   ← actions (if showControls)
└──────────────────────────────────────┘
```

---

## HEADER ROW

Left: colored dot (signal color for tier: T1=grey, T2=blue, T3=teal) + tier label
Right: status badge (ACTIVE pulsing / STANDBY)

Model name: text-sm, text-secondary, below header

---

## STATS SECTION

Four metrics in 2×2 grid:
Each metric: label (text-xs, uppercase, muted) + value (text-sm, monospace, text-primary)

Metrics:
- Latency: value in ms, color-coded (fast=teal, medium=blue, slow=amber, very slow=red)
- Accuracy: value as %, color-coded (high=teal, medium=blue, low=amber)
- Memory: value in MB
- FP Rate: value as %, lower is better

---

## SWITCH INFO SECTION (only if lastSwitch provided)

text-xs, muted
"Switched from T3 → T2 · 4 min ago"
Below: "Reason: CPU load exceeded 80% threshold"
Reason styled: `--color-uncertain-text`, text-xs

---
---
---

# Component: Anomaly Event Row
## File: components/anomaly_event_row.md

---

## PURPOSE

Single row in the event feed and recent events log.
Used on Dashboard (Recent Events) and Live Analysis (Event Feed).

---

## LAYOUT

```
[timestamp]  [event-id]  [score bar+value]  [status badge]  [model]  [ood?]
```

All in a horizontal flex row, 44px height, 12px horizontal padding.

---

## COLUMNS

**Timestamp**
- Width: 80px
- Font: `--font-mono`, text-xs, `--color-text-muted`
- Format: "13:47:32"

**Event ID**
- Width: 80px
- Font: `--font-mono`, text-xs, `--color-active-text`
- Format: "#4821"

**Anomaly Score**
- Width: 140px
- Mini progress bar (60px) + value (4-digit: "0.87")
- Bar color: signal color based on value range

**Status Badge**
- Width: 90px
- See Badge component in design-system/01_components_library.md

**Model Used**
- Width: 60px
- Text: "T2", text-xs, monospace, muted

**OOD Flag**
- Width: 40px
- If OOD: small `Zap` icon (14px), `--color-ood-text`
- If not OOD: empty

---

## ROW BEHAVIOR

- Hover: `--color-bg-hover`
- Click: expand to show full event detail (accordion, or navigate)
- New row animation: `translateY(-8px) + opacity:0` → `translateY(0) + opacity:1`, 150ms
- New row brief highlight: background flashes `--color-active-glow`, fades in 500ms

---
---
---

# Component: OOD Badge
## File: components/ood_badge.md

---

## PURPOSE

A compact inline indicator showing OOD proximity score.
Used in tables, event rows, and inference result panels.

---

## VARIANTS

**Standard (inline)**
- Pill shape, `--radius-full`
- Background: `--color-ood-soft`
- Border: 1px `--color-ood` at 50% opacity
- Text: "OOD" + score, `--font-mono`, text-xs, `--color-ood-text`
- Example: `◈ OOD 0.94`

**Icon only (compact)**
- Just `Zap` icon (14px), `--color-ood-text`
- Has tooltip showing full score on hover

**Alert (large, standalone)**
- Full-width banner format
- Background: `--color-ood-soft`
- Left border: 3px `--color-ood`
- Icon: `AlertTriangle` 20px
- Text: "Novel Pattern Detected · Score: 0.94"
- Sub-text: "This input does not match any known training pattern"
- "Review" button right-aligned

---

## ANIMATION

When OOD score is very high (>0.9):
Badge border pulses: opacity 1 → 0.3 → 1, every 2 seconds
