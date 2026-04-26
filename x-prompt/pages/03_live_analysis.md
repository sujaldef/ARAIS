# Page 03 — Live Analysis
## File: pages/03_live_analysis.md
## Route: /live-analysis

---

## PAGE PURPOSE

The operational heart of ARAIS. This is where inference happens in real time.
Users watch data flow through the system, see anomalies flagged as they occur,
monitor model confidence, and observe the adaptive switching mechanism in action.

This is the most visually dynamic page. It must feel alive.

---

## PAGE LAYOUT

Uses: **Full-width** with internal sub-grid

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER + CONTROLS BAR                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  MAIN STREAM CHART  (full width, 280px height)             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  INFERENCE       │  │  CONFIDENCE +    │  │  ACTIVE      │  │
│  │  RESULT PANEL    │  │  UNCERTAINTY     │  │  MODEL       │  │
│  │  (live)          │  │  GAUGE           │  │  STATUS      │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  LIVE EVENT FEED  (scrolling log, most recent at top)      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## CONTROLS BAR (below page header)

A horizontal bar with inline controls:

Left side:
- "▶ Running" status indicator (pulsing green dot + text) OR "⏸ Paused" (amber dot)
- Data source label: "Source: sensor_data.csv · 4,847 windows" (text-sm, muted)

Center:
- **Playback speed** segmented control: 0.5× | 1× | 2× | 5× | MAX
  - Segmented control: pills with active state filled blue
- **Window position** slider (full width, 240px) — seek through data like a progress bar
  - Current position timestamp shown beneath

Right side:
- **Pause / Resume** icon button (Lucide `Pause` / `Play`)
- **Reset** icon button (Lucide `RotateCcw`)
- **Export results** ghost button (Lucide `Download`)

---

## MAIN STREAM CHART

### Spec
- Component: Recharts `ComposedChart` (line + area + reference lines)
- Height: 280px, 100% width
- Background: `--color-bg-base` (slightly darker than panel to make it recede)
- Left padding: 60px (for Y-axis), right padding: 20px

### Data Series (all simultaneously visible)
1. **Raw signal** — thin line, `--color-text-muted`, opacity 0.6
   "The underlying data value"
2. **Anomaly score** — bold line, `--color-anomaly`, 2px
   Spikes upward at anomaly events
3. **Confidence** — area chart beneath anomaly line, `--color-active-glow` fill,
   `--color-active` stroke, opacity 0.3 fill
4. **OOD score** — dashed line, `--color-ood`, 1.5px, dashes: 4 4

### Threshold Lines
- Red dashed horizontal line at anomaly threshold (e.g., 0.7)
  - Label: "Anomaly threshold: 0.70" (right-anchored, text-xs, red)
- Purple dashed horizontal line at OOD threshold (e.g., 0.8)
  - Label: "OOD threshold: 0.80"

### Anomaly Markers
At every point where anomaly score > threshold:
- Red vertical shaded band (full chart height, 2px width, `--color-anomaly-glow`)
- Small red triangle marker below X-axis

### Scrolling Window
- Only the last 120 data points are shown
- Chart shifts left as new data arrives (real-time scroll effect)
- Recharts `isAnimationActive={false}` for the live feed (no lag)

### X-Axis
- Timestamps, text-xs, muted
- Show every 20th label to avoid crowding

### Y-Axis (left)
- 0.0 to 1.0, text-xs, muted
- Label: "Score" (rotated, text-xs)

### Y-Axis (right, secondary)
- Raw signal value range (auto-scaled), text-xs, muted
- Label: "Signal" (rotated)

---

## INFERENCE RESULT PANEL (bottom-left)

### Layout
```
┌──────────────────────────────┐
│  CURRENT INFERENCE           │
│                              │
│  ┌────────────────────────┐  │
│  │   ANOMALY              │  │  ← large status badge, full-width
│  └────────────────────────┘  │
│                              │
│  Risk Score                  │
│  ████████████░░  0.87        │  ← progress bar + value
│                              │
│  Event ID: #4821             │
│  Window: 13:47:32 → 13:47:42 │
│  Processed in: 18ms          │
└──────────────────────────────┘
```

### Behavior
- Updates on every new inference result (every 1–5 seconds depending on speed)
- Status badge animates: flash + scale when value changes (NORMAL ↔ ANOMALY)
- When ANOMALY: panel gets red left border accent + very subtle red background tint
- When NORMAL: panel green left border
- Risk score bar color changes with value

---

## CONFIDENCE + UNCERTAINTY GAUGE (bottom-center)

Refer to: `components/confidence_gauge.md` for detailed spec.

This panel shows two primary gauges stacked vertically:

**Top: Confidence Gauge**
- Semicircular arc gauge (0–100%)
- Current value large center number: "87%" (`--font-display`, text-3xl)
- Label below: "MODEL CONFIDENCE" (text-xs, uppercase, muted)
- Arc fill: gradient from `--color-normal` (left/low) to `--color-active` (high)
- Needle or fill indicator animates smoothly on value change

**Bottom: Uncertainty Indicator**
- Three-segment bar: LOW | MEDIUM | HIGH
- Active segment highlighted with glow
- Current level displayed as text badge
- Tooltip: "Epistemic uncertainty — HIGH indicates model is unsure about this region"

---

## ACTIVE MODEL STATUS (bottom-right)

Refer to: `components/model_status_card.md` for detailed spec.

Shows:
- **Current model**: name, tier badge, icon
- **Switch log** (last 3 switches):
  ```
  13:44:01  Tier 3 → Tier 2  [CPU: 86%]
  13:31:22  Tier 2 → Tier 3  [Risk: HIGH]
  13:15:04  Tier 1 → Tier 2  [Complexity ↑]
  ```
  Each row: monospace timestamp, tier change with arrow, trigger reason badge
- **Override**: "Force model" select dropdown + "Apply" button (for manual override)

---

## LIVE EVENT FEED

Panel title: "Event Feed" + event count badge (updates live)

Scrolling list of inference events, newest at top.
Max height: 200px, `overflow-y: auto`

Each row (see `components/anomaly_event_row.md`):
- Timestamp (monospace, muted) | Event ID | Score | Badge | Model Used | OOD flag

New row behavior:
- Slides in from top with fade animation (150ms)
- Row briefly highlights yellow then fades to normal

Filter bar above list:
- "All" | "Anomaly only" | "OOD only" | "Uncertain only" — text filter tabs

"Export Feed" link (top-right of panel) → downloads CSV of current session events
