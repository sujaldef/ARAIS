# Page 01 — Dashboard Home
## File: pages/01_landing_home.md
## Route: /  or  /dashboard

---

## PAGE PURPOSE

The Dashboard Home is the first screen after app launch.
It gives the user a complete system-at-a-glance view:
current session health, recent anomaly activity, model performance snapshot,
and quick-access entry points to every major workflow.

This page answers: "Is my system working? What happened recently? What do I do next?"

---

## PAGE LAYOUT

Uses: **Stat Card Row** at top + **Two-Column (60/40)** below

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                    │
│  "System Overview"  +  session selector  +  "New Session" btn  │
├────────────┬────────────┬────────────┬────────────┤
│ STAT CARD  │ STAT CARD  │ STAT CARD  │ STAT CARD  │  ← Row 1
├────────────┴────────────┴────────────┴────────────┤
│                                                   │
│   LEFT COLUMN (60%)          RIGHT COLUMN (40%)   │
│                                                   │
│  ┌─────────────────────┐   ┌──────────────────┐   │
│  │  ANOMALY TIMELINE   │   │  ACTIVE MODEL    │   │
│  │  (area chart)       │   │  STATUS          │   │
│  │  last 60 minutes    │   │                  │   │
│  └─────────────────────┘   └──────────────────┘   │
│                                                   │
│  ┌─────────────────────┐   ┌──────────────────┐   │
│  │  RECENT EVENTS LOG  │   │  SYSTEM HEALTH   │   │
│  │  (last 10 events)   │   │  (CPU, RAM,      │   │
│  │                     │   │   latency rings) │   │
│  └─────────────────────┘   └──────────────────┘   │
│                                                   │
│                             ┌──────────────────┐   │
│                             │  QUICK ACTIONS   │   │
│                             └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## STAT CARDS ROW

Four cards side-by-side at the top of the page.

### Card 1: Total Anomalies Detected
- Value: e.g., `247`
- Label: `ANOMALIES DETECTED`
- Badge: `THIS SESSION`
- Trend: ↑ 18% vs previous session (red arrow since higher = worse)
- Value color: `--color-anomaly-text`

### Card 2: Detection Accuracy
- Value: e.g., `94.2%`
- Label: `DETECTION ACCURACY`
- Badge: `LIVE`  (with pulse dot, blue)
- Trend: ↑ 2.1% improvement (green arrow)
- Value color: `--color-normal-text`

### Card 3: OOD Events
- Value: e.g., `12`
- Label: `NOVEL PATTERNS`
- Badge: `OOD` (purple)
- Trend: 3 pending review
- Value color: `--color-ood-text`

### Card 4: Avg Inference Latency
- Value: e.g., `23ms`
- Label: `AVG LATENCY`
- Badge: `TIER 2` (neutral)
- Trend: ↓ 8ms vs benchmark (green arrow since lower = better)
- Value color: `--color-active-text`

---

## LEFT COLUMN PANELS

### Panel A: Anomaly Timeline (Area Chart)
- **Chart type**: Recharts AreaChart with gradient fill
- **Height**: 240px
- **Data**: Simulated 60 data points (1 per minute, last hour)
- **Series**:
  - Anomaly score (0–1 scale), area fill: `--color-anomaly-glow`, stroke `--color-anomaly`
  - Confidence score, area fill: `--color-active-glow`, stroke `--color-active`
- **X-axis**: time labels (12:00, 12:15, 12:30, 12:45, 13:00), text-xs, muted
- **Y-axis**: 0.0 to 1.0 scale, text-xs, muted
- **Tooltip**: custom dark tooltip showing exact scores + timestamp
- **Annotations**: vertical dashed red lines at anomaly event timestamps
- **Grid lines**: faint horizontal only, 1px `--color-border`
- **Animation**: chart draws in from left on mount (Recharts animation)

### Panel B: Recent Events Log
- **Height**: auto (shows last 10 events, then "View all" link)
- **Component**: list of `<AnomalyEventRow>` (see components/anomaly_event_row.md)
- **Columns**: Timestamp | Event ID | Score | Status Badge | Model Used
- **Sorting**: newest first
- **Empty state**: "No events in this session yet"
- **"View all" link**: navigates to Live Analysis page with filter active

---

## RIGHT COLUMN PANELS

### Panel C: Active Model Status
- **Component**: `<ModelStatusCard>` (see components/model_status_card.md)
- Shows currently selected model tier (Fast / Medium / Deep)
- Shows: model name, tier badge, current latency, accuracy on recent window
- Shows: last switch event ("Switched from Tier 3 → Tier 2, 4 min ago — Reason: CPU load 84%")
- "Control Models" button → navigates to Model Control page

### Panel D: System Health
- Three radial/donut mini-charts (or arc gauges) in a horizontal row:
  - **CPU Usage**: current %, color shifts: <60% = teal, 60-80% = amber, >80% = red
  - **RAM Usage**: current % of available
  - **Pipeline Latency**: current ms (relative to 50ms target)
- Below the gauges: two horizontal progress bars:
  - **Evaluation coverage**: "Models evaluated under 3 of 5 stress conditions"
  - **Feedback queue**: "8 events pending review"
- All values animate on mount (counter from 0 to value)

### Panel E: Quick Actions
- Four large ghost buttons in a 2×2 grid:
  - **Upload Data** (icon: Upload) → /data-ingestion
  - **Start Stream** (icon: Play) → /live-analysis
  - **Run Evaluation** (icon: BarChart2) → /evaluation
  - **Review OOD Events** (icon: AlertTriangle, badge with count) → /ood-alerts
- Each button: 80px height, icon 20px above label, subtle hover glow

---

## PAGE HEADER

Left side:
- Title: "System Overview" (`--font-display`, text-xl, text-primary)
- Subtitle: "Session 004 · Started 2h 14m ago" (text-sm, text-muted)

Right side:
- Session selector dropdown (previous sessions list)
- "New Session" primary button

---

## INTERACTIVITY & BEHAVIOR

1. Stat cards animate their numbers in on page load (count-up from 0, 800ms)
2. Timeline chart auto-updates every 5 seconds with new simulated data point appended
3. Recent events log flashes a row (highlight animation) when new event arrives
4. System health values update every 3 seconds
5. If OOD count > 0, the Quick Actions "Review OOD Events" button pulses gently

---

## EMPTY STATE (first launch, no session)

Replace all panels with:
- Centered illustration: simple geometric brain/circuit SVG (monochrome)
- Heading: "No active session"
- Subtext: "Upload a dataset or start the stream simulator to begin analysis"
- Two large buttons: "Upload Data" (primary) | "Start Simulator" (ghost)
