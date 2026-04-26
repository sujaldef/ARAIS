# Page 04 — Model Control Panel
## File: pages/04_model_control.md
## Route: /model-control

---

## PAGE PURPOSE

The control room for the multi-model pool and the adaptive orchestrator.
Users see every model's status and performance, understand why the orchestrator
is making the decisions it's making, and can manually override behavior.

This page answers: "Which models are available? Why did the system choose this one?
Can I override it? What are the trade-offs?"

---

## PAGE LAYOUT

Uses: **Two-Column (60/40)**

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                    │
├──────────────────────────────┬──────────────────────────────────┤
│  LEFT COLUMN (60%)           │  RIGHT COLUMN (40%)              │
│                              │                                  │
│  ┌────────────────────────┐  │  ┌──────────────────────────┐    │
│  │  MODEL POOL GRID       │  │  │  ORCHESTRATOR STATUS     │    │
│  │  (3 model cards)       │  │  │  PANEL                   │    │
│  └────────────────────────┘  │  └──────────────────────────┘    │
│                              │                                  │
│  ┌────────────────────────┐  │  ┌──────────────────────────┐    │
│  │  COST-ACCURACY         │  │  │  RUNTIME STATE VECTOR    │    │
│  │  FRONTIER CHART        │  │  │                          │    │
│  └────────────────────────┘  │  └──────────────────────────┘    │
│                              │                                  │
│                              │  ┌──────────────────────────┐    │
│                              │  │  SWITCH HISTORY LOG      │    │
│                              │  └──────────────────────────┘    │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## PAGE HEADER

Title: "Model Control"
Subtitle: "Manage the adaptive model pool and orchestration rules"
Right: "Auto-adapt" toggle (ON by default) + "Evaluation Mode" toggle

---

## MODEL POOL GRID (Left Column)

Three model cards stacked or in a column:

### Model Card Structure (for each of 3 models)

```
┌─────────────────────────────────────────────────────┐
│  [●] TIER 2 — MEDIUM     [ACTIVE ▶]                 │
│  Isolation Forest + LSTM Hybrid                      │
│                                                      │
│  Accuracy    Latency    Memory     FP Rate           │
│  91.4%       28ms       84MB       6.2%              │
│  ████████░░  ██░░░░░░   ███░░░░░   ██░░░░░           │
│                                                      │
│  Last active: NOW                                    │
│  Trained on: MERN Benchmark + SMD Dataset            │
│                                                      │
│  [Set as Default]  [Force Select]  [View Details]    │
└─────────────────────────────────────────────────────┘
```

### Three Models

**Tier 1 — Fast Model**
- Name: "EWMA + Z-Score Statistical Detector"
- Accuracy: 76.8% | Latency: 3ms | Memory: 8MB | FP Rate: 11.4%
- Status badge: `STANDBY` (grey)
- Use case label: "High-volume, low-risk streams"
- Left border: neutral/grey

**Tier 2 — Medium Model (DEFAULT)**
- Name: "Isolation Forest + LSTM Hybrid"
- Accuracy: 91.4% | Latency: 28ms | Memory: 84MB | FP Rate: 6.2%
- Status badge: `ACTIVE` (blue, pulsing)
- Use case label: "Standard operations — balanced performance"
- Left border: blue (active)

**Tier 3 — Deep Model**
- Name: "Transformer Autoencoder (Lite)"
- Accuracy: 97.1% | Latency: 187ms | Memory: 310MB | FP Rate: 2.1%
- Status badge: `STANDBY` (grey)
- Use case label: "High-risk, low-load sessions"
- Left border: neutral/grey

### Active Card Styling
The currently active card gets:
- Blue left border (3px `--color-active`)
- Slightly elevated background (`--color-bg-elevated`)
- Active badge pulsing
- Subtle blue shadow (`--shadow-glow-blue`)

### Card Metric Bar Details
Each metric has a small progress bar below its value.
Color coding:
- Accuracy: higher = greener
- Latency: lower = greener (invert the bar)
- Memory: lower = greener
- FP Rate: lower = greener

---

## COST-ACCURACY FRONTIER CHART (Left Column)

Panel title: "Cost-Accuracy Frontier"

A Recharts ScatterChart:
- X-axis: Latency (ms), 0–250ms range
- Y-axis: Accuracy (%), 70–100% range
- Three scatter points (one per model), sized by memory usage
  - Tier 1: small point, grey, label "T1"
  - Tier 2: medium point, blue (currently selected), label "T2"
  - Tier 3: large point, grey, label "T3"
- Connected by a curved line (Pareto frontier)
- Currently selected model point is larger + has glow ring animation
- Tooltip on hover: shows all four metrics
- Height: 200px

Below chart:
- "The orchestrator moves along this frontier based on runtime conditions."
  (text-xs, muted)

---

## ORCHESTRATOR STATUS PANEL (Right Column)

Panel title: "Orchestrator" + live status badge (`AUTO` green / `MANUAL` amber)

### Decision Logic Display
Shows the orchestrator's current reasoning as a live rule table:

```
CURRENT RUNTIME CONDITIONS → MODEL SELECTION

Rule 1: CPU Usage
  Current: 54%    Threshold: 80%    ✓ Not triggered

Rule 2: Inference Latency
  Current: 28ms   Budget: 100ms     ✓ Within budget

Rule 3: Session Risk Tier
  Current: MEDIUM  Required: HIGH for Tier 3    → Tier 2 sufficient

Rule 4: Live FP Rate (10-min window)
  Current: 6.2%   Threshold: 10%    ✓ Acceptable

DECISION: Maintain Tier 2 — no switch required
```

Visual rendering of this table:
- Each rule is a row
- Condition columns: label + current value (monospace) + threshold + pass/fail icon
- Decision row at bottom: bold, with current model badge
- Entire table updates every 3 seconds

### Manual Override Section
- "Override Mode" toggle (disables auto-adaptation)
- When override ON: select dropdown for forced model + "Apply Override" button
- Warning banner: "Manual override active — adaptive features disabled"

---

## RUNTIME STATE VECTOR (Right Column)

Panel title: "Runtime State Vector"
Subtitle: "Inputs to the orchestrator decision engine"

Four horizontal gauge rows:

1. **CPU Usage** — bar + value% + trend arrow
2. **RAM Usage** — bar + value% + trend arrow
3. **Inference Queue Depth** — "3 windows pending" + small bar
4. **Session Risk Tier** — three-segment: LOW | MEDIUM | HIGH (one highlighted)

Below: "State sampled every 1000ms" (text-xs, muted)

---

## SWITCH HISTORY LOG (Right Column)

Panel title: "Switch History" + total switch count badge

Scrollable list, max 6 rows visible:

Each row:
```
13:44:01   T3 → T2   Triggered by: CPU 86%     Duration on T3: 13m 22s
13:31:22   T2 → T3   Triggered by: Risk HIGH   Duration on T2: 4m 18s
13:15:04   T1 → T2   Triggered by: Complexity  Duration on T1: 1m 02s
```

Columns: Timestamp (mono) | Transition (with arrow →, color coded) | Trigger | Duration on prev

"View full log" link at bottom → opens full-screen log overlay/modal
