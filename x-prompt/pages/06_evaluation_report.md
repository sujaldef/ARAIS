# Page 06 — Evaluation Report
## File: pages/06_evaluation_report.md
## Route: /evaluation

---

## PAGE PURPOSE

The evaluation engine makes Gap 1 (Unrealistic Evaluation) visible and solvable.
This page shows model performance profiles generated under real-world stress conditions:
noise, drift, latency pressure, and imbalanced inputs.

Users understand not just "how accurate is my model?" but
"how does accuracy degrade as conditions get harder?"

---

## PAGE LAYOUT

Uses: **Full-width** with internal panel grid

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER + RUN CONTROLS                                     │
├─────────────────────────────────────────────────────────────────┤
│  STAT STRIP (4 cards, compact)                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐    ┌────────────────────────────┐     │
│  │  PERFORMANCE UNDER   │    │  ACCURACY VS NOISE LEVEL   │     │
│  │  DRIFT CHART         │    │  (3-model comparison)      │     │
│  └──────────────────────┘    └────────────────────────────┘     │
│                                                                 │
│  ┌──────────────────────┐    ┌────────────────────────────┐     │
│  │  LATENCY DISTRIBUTION│    │  CONDITION COVERAGE        │     │
│  │  HISTOGRAM           │    │  MATRIX                    │     │
│  └──────────────────────┘    └────────────────────────────┘     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  DETAILED EVALUATION RESULTS TABLE                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## PAGE HEADER

Title: "Evaluation Engine"
Subtitle: "Performance profiles under realistic, stress-tested conditions"

### Run Controls (right of header)
- **Stress test preset** (select): 
  "Quick (30s)" | "Standard (2min)" | "Full Suite (10min)"
- **Run Evaluation** primary button (icon: Play)
- **Last run**: "13:32:04 · 2 min 14s duration" (text-xs, muted)
- When running: button becomes "Running..." with spinner + progress bar appears below header

---

## STAT STRIP (compact, 4 cards in a row)

1. **Overall Accuracy** (current vs benchmark): `94.2% / 91.0% baseline`
2. **Conditions Tested**: `5 of 7 configured`
3. **Worst-case Accuracy** (hardest stress condition): `71.3%`
4. **Evaluation Runtime**: `2m 14s last run`

---

## PERFORMANCE UNDER DRIFT CHART (top-left)

Panel title: "Accuracy Under Concept Drift"
Subtitle: "How models degrade as distribution shifts over time"

Recharts LineChart:
- X-axis: Drift intensity (None → Slow → Medium → Fast → Extreme)
- Y-axis: Accuracy % (0–100)
- Three lines, one per model tier:
  - Tier 1 (Fast): steep drop-off, grey line
  - Tier 2 (Medium): moderate slope, blue line
  - Tier 3 (Deep): most robust, teal line
- All three lines start near same accuracy at "None"
  and diverge as drift increases
- Shaded area between T1 and T3 lines (the "decision zone")
- Red vertical reference line at "Medium" drift: "Current simulated condition"
- Height: 200px

Points on chart are filled circles, hoverable.
Tooltip: shows all three model accuracies + drift description.

---

## ACCURACY VS NOISE LEVEL CHART (top-right)

Panel title: "Accuracy vs Noise Level"
Subtitle: "Signal-to-noise degradation across model tiers"

Recharts AreaChart:
- X-axis: Noise level % (0%, 10%, 20%, 30%, 40%, 50%)
- Y-axis: Accuracy %
- Three overlaid area series (same model tiers as above)
  with different fill opacities
- Gradient fill for each: top of area = full color, bottom = transparent
- "Current noise" vertical marker line

Height: 200px

---

## LATENCY DISTRIBUTION HISTOGRAM (bottom-left)

Panel title: "Inference Latency Distribution"
Subtitle: "Latency spread across all inferences in current session"

Recharts BarChart:
- X-axis: Latency buckets: <5ms | 5–20ms | 20–50ms | 50–100ms | >100ms
- Y-axis: Count of inference calls
- Bars color-coded by bucket:
  - <5ms: teal (fast, good)
  - 5–20ms: blue
  - 20–50ms: amber (acceptable)
  - 50–100ms: orange
  - >100ms: red (slow)
- Each bar has value label on top

Below chart: "P50: 23ms · P95: 87ms · P99: 234ms · Max: 312ms"
(monospace, text-sm, color-coded by speed)

Height: 200px

---

## CONDITION COVERAGE MATRIX (bottom-right)

Panel title: "Stress Test Coverage"
Subtitle: "Which conditions have been evaluated"

A grid matrix (7 rows × 3 columns):

Rows = test conditions:
1. Gaussian Noise (20%)
2. Gaussian Noise (40%)
3. Slow Concept Drift
4. Fast Concept Drift
5. Class Imbalance (95/5)
6. Missing Values (10%)
7. Delayed Labels

Columns = models (T1, T2, T3)

Cell values: checkmark (tested + result) | dash (not tested) | spinner (in progress)
Cell background:
- Tested + passing: `--color-normal-soft`
- Tested + degraded: `--color-uncertain-soft`
- Tested + failing: `--color-anomaly-soft`
- Not tested: `--color-bg-base`

Footer: "4 conditions untested — run Full Suite to complete coverage"
Link: "Configure conditions" → opens settings panel (or modal)

---

## DETAILED EVALUATION RESULTS TABLE (bottom, full-width)

Panel title: "Evaluation Results" + session selector + "Download Report" ghost button

Table columns:
| Condition | Model | Precision | Recall | F1 | FP Rate | Latency P95 | Status |
|-----------|-------|-----------|--------|----|---------|-------------|--------|

All numeric columns: monospace, right-aligned
Status column: badge (PASS green / DEGRADED amber / FAIL red)
Row grouping: grouped by condition, sub-rows per model within each condition group

Sortable by any column.
Filterable by model (checkbox dropdown) and status (pill filter).

Footer: "Showing 15 of 21 results · Filtered by: T2, T3"

---

## EVALUATION PROGRESS OVERLAY (shown while evaluation is running)

A full-width progress banner just below the header (not a modal — stays inline):

```
┌──────────────────────────────────────────────────────────────────┐
│  ▶ EVALUATION RUNNING — Standard Suite                           │
│  ████████████████████░░░░  72% complete · Est. 38s remaining    │
│  Current: Testing Tier 2 under Fast Concept Drift...            │
└──────────────────────────────────────────────────────────────────┘
```

Background: `--color-active-soft`, left border 3px `--color-active`
Progress bar fill: `--color-active`
Text: text-sm, `--color-active-text`
Can be dismissed with ✕ (pauses evaluation, not cancels)
