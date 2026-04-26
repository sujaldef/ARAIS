# Page 05 — OOD Alert Center
## File: pages/05_ood_alerts.md
## Route: /ood-alerts

---

## PAGE PURPOSE

The novel anomaly and out-of-distribution event management center.
This is where Gap 6 (Open-World Detection Failure) is made visible.
Users review events that fell outside the known distribution,
understand why they were flagged, and decide what to do with them
(accept into training, mark as false positive, or escalate).

This page answers: "What did my system encounter that it had never seen before?"

---

## PAGE LAYOUT

Uses: **Two-Column (55/45)**

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER + SUMMARY STAT ROW                                 │
├─────────────────────────────────┬───────────────────────────────┤
│  LEFT COLUMN (55%)              │  RIGHT COLUMN (45%)           │
│                                 │                               │
│  ┌─────────────────────────┐    │  ┌───────────────────────┐    │
│  │  OOD EVENTS TABLE       │    │  │  EVENT DETAIL PANEL   │    │
│  │  (paginated list)       │    │  │  (selected event)     │    │
│  │                         │    │  │                       │    │
│  │                         │    │  │                       │    │
│  │                         │    │  └───────────────────────┘    │
│  └─────────────────────────┘    │                               │
│                                 │  ┌───────────────────────┐    │
│                                 │  │  DISTRIBUTION         │    │
│                                 │  │  COMPARISON CHART     │    │
│                                 │  └───────────────────────┘    │
└─────────────────────────────────┴───────────────────────────────┘
```

---

## PAGE HEADER

Title: "OOD & Novel Anomaly Center"
Subtitle: "Events that fall outside the trained distribution boundary"

### Summary Stat Strip (4 mini-stats in a horizontal row, compact)
- **Total OOD Events**: 12 (this session)
- **Pending Review**: 8 (amber badge)
- **Added to Training**: 3 (green badge)
- **Avg OOD Score**: 0.91 (red)

---

## OOD EVENTS TABLE (Left Column)

Panel title: "Flagged Events" + filter controls row

### Filter Bar (above table)
- Status filter: `All` | `Pending` | `Reviewed` | `Escalated` (tab-style)
- OOD score filter: slider (0.5–1.0)
- Search: text input, "Search by ID or timestamp"

### Table Columns
| # | Event ID | Timestamp | OOD Score | Input Type | Status | Actions |
|---|----------|-----------|-----------|------------|--------|---------|

**Column details:**
- **#**: row index, monospace, muted
- **Event ID**: `OOD-4821`, monospace, `--color-ood-text`
- **Timestamp**: `13:47:32`, monospace, muted
- **OOD Score**: value (e.g., `0.94`) displayed as number + mini-bar.
  Bar fill color: `--color-ood`, width proportional to score
- **Input Type**: text description, e.g., "Multivariate spike cluster" or "Structural pattern shift"
- **Status**: badge — `PENDING` (amber) | `REVIEWED` | `ESCALATED` (red) | `TRAINED` (green)
- **Actions**: three icon buttons: 
  - Eye icon → opens Event Detail panel on right
  - CheckCircle icon → "Accept for training"
  - X icon → "Mark as false positive"

### Row Behavior
- Click any row → loads Event Detail on right column
- Currently viewed row: highlighted with purple left border (`--color-ood`)
- Hover: `--color-bg-hover`

### Pagination
- "Showing 1–10 of 12 events"
- Previous / Next buttons (ghost)

---

## EVENT DETAIL PANEL (Right Column, top)

Initially shows: "Select an event to inspect" (empty state with eye icon)

When an event is selected:

### Header
- Event ID: `OOD-4821` (large, purple, monospace)
- Status badge + action buttons: "Add to Training" (primary) | "Dismiss" (ghost)

### Event Metadata Grid
2×3 grid of label-value pairs:
- **Timestamp**: 13:47:32.441
- **Window size**: 60 points
- **OOD Score**: 0.94
- **Distance metric**: Mahalanobis (3.82σ from baseline)
- **Model attempted**: Tier 2
- **Model output**: ERROR · Confidence 0.52 · Uncertainty HIGH

### OOD Explanation Section
Title: "Why was this flagged?"
Body (generated explanation):
> "This input's feature vector sits 3.82 standard deviations from the training
> distribution centroid. The spike pattern in channels [cpu_usage, latency]
> co-occurs in a combination not present in any training window."

Text: `--font-body`, text-sm, `--color-text-secondary`

### Signal Snapshot Chart
- Small area chart (height: 100px) showing just this event's window
- Red shaded background to indicate it's an anomalous region
- X-axis: the 60 time points of this window
- Y-axis: signal value
- Title: "Input signal — flagged window"

### Feedback Input
- "Your assessment" textarea (3 rows):
  placeholder: "Add notes about this event for the training dataset..."
- "Save note" ghost button

---

## DISTRIBUTION COMPARISON CHART (Right Column, bottom)

Panel title: "Distribution Boundary"
Subtitle: "Selected event vs training distribution"

A 2D scatter plot visualization:
- Use Recharts ScatterChart
- X-axis: "Feature dimension 1 (PCA)" 
- Y-axis: "Feature dimension 2 (PCA)"
- **Training distribution**: cluster of grey dots (200 sample points from training)
- **Decision boundary**: elliptical dashed line drawn around training cluster
- **Selected OOD event**: single large purple/red dot, clearly outside the ellipse
  - Animated: bounces once on load, then stays with a glow ring
- **Recent normal events**: small blue dots, inside boundary

Legend:
- ● Training data (grey) · ● Normal (blue) · ● OOD event (purple) · --- Boundary

Height: 180px

Note below chart (text-xs, muted):
"Projected to 2D via PCA for visualization. Actual detection uses
full-dimensional Mahalanobis distance."

---

## BATCH ACTIONS BAR (bottom of left column)

Sticky at bottom of events table:
- Checkbox in table header selects all visible rows
- When rows selected: batch action bar appears:
  - "X events selected"
  - "Add all to training queue" (primary button)
  - "Dismiss all" (ghost)
  - "Export selected" (ghost)
