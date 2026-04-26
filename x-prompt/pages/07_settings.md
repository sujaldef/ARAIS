# Page 07 — Settings
## File: pages/07_settings.md
## Route: /settings

---

## PAGE PURPOSE

System configuration. Users control thresholds, model preferences,
evaluation schedules, data pipeline behavior, and UI preferences.
Designed for one-time setup, not frequent use. Should feel like a
professional IDE's preferences panel.

---

## PAGE LAYOUT

Uses: **Three-Column (25/45/30)**

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                    │
├────────────────┬──────────────────────────┬────────────────────┤
│  SETTINGS NAV  │  SETTINGS FORM AREA      │  LIVE PREVIEW /    │
│  (categories)  │  (active category)       │  SUMMARY PANEL     │
│  25%           │  45%                     │  30%               │
└────────────────┴──────────────────────────┴────────────────────┘
```

---

## PAGE HEADER

Title: "Settings"
Subtitle: "System configuration and threshold management"
Right: "Reset to Defaults" ghost button + "Save All Changes" primary button (disabled until changes made)

---

## SETTINGS NAVIGATION (Left Column)

Vertical list of category items. Each item:
- Icon + label
- Active: filled blue left border, `--color-bg-selected`, text primary
- Inactive: text secondary, hover `--color-bg-hover`

Categories:
1. `Sliders` — Detection Thresholds
2. `Cpu` — Model & Orchestration
3. `Activity` — Evaluation Engine
4. `Database` — Data Pipeline
5. `Bell` — Alerts & Notifications
6. `Monitor` — Appearance
7. `Info` — About ARAIS

Section divider with label "SYSTEM" above last item.

---

## SETTINGS FORM — DETECTION THRESHOLDS

Panel title: "Detection Thresholds"
Subtitle: "Controls sensitivity of anomaly and OOD detection"

### Anomaly Detection
Label: "ANOMALY SCORE THRESHOLD"
Control: Slider, 0.1–0.99, default 0.70
Current value: large number right of slider
Effect preview: "At 0.70, ~8.2% of windows are flagged as anomalies (based on session data)"
Color band under slider: green (0.1–0.5) → amber (0.5–0.8) → red (0.8–0.99)

---

Label: "CONFIDENCE MINIMUM"
Control: Slider, 0.5–0.99, default 0.75
Effect: "Results below this confidence are marked as UNCERTAIN"

---

### OOD Detection
Label: "OOD DISTANCE THRESHOLD"
Control: Slider, 1.0σ – 5.0σ, default 3.0σ
Effect: "At 3.0σ, events more than 3 std deviations from training centroid are flagged as OOD"
Subtext: "Lower value = more sensitive, more OOD flags"

Label: "DISTANCE METRIC"
Control: Select — Mahalanobis (recommended) / Cosine / Euclidean / L1

---

### Uncertainty Thresholds
Two sliders:
- "HIGH uncertainty above": 0.7 (default)
- "MEDIUM uncertainty above": 0.4 (default)

---

## SETTINGS FORM — MODEL & ORCHESTRATION

Panel title: "Model & Orchestration Rules"

### Auto-Adaptation Rules
Toggle: "Enable adaptive model selection" — ON by default

When enabled, show the rule configuration table:

| Rule | Trigger Condition | Action | Enabled |
|------|-------------------|--------|---------|
| CPU Load | CPU > [80]% | Downgrade to T1 or T2 | [toggle] |
| Latency Budget | P95 > [100]ms | Downgrade one tier | [toggle] |
| Risk Tier HIGH | Session risk = HIGH | Force Tier 3 | [toggle] |
| FP Rate | FP rate > [10]% | Upgrade one tier | [toggle] |

Each threshold in brackets is an inline editable number input.

### Default Model
Select: "Default model tier" — T1 / T2 (default) / T3

### Model Memory Limits
- Tier 3 memory cap slider: 200MB–500MB, default 350MB
- "Unload idle models after": select 1min / 5min / 30min / Never

---

## SETTINGS FORM — EVALUATION ENGINE

Panel title: "Evaluation Configuration"

### Evaluation Schedule
Toggle: "Run evaluation automatically" — ON
Select: "Evaluation frequency" — Every 5 min / 15 min / 1 hour / Manual only

### Stress Test Conditions
Title: "Active stress test conditions"
Multi-select checkbox list:
- [x] Gaussian Noise 20%
- [x] Gaussian Noise 40%
- [x] Slow Concept Drift
- [x] Fast Concept Drift
- [ ] Step-change drift
- [x] Class imbalance 95/5
- [ ] Temporal gaps
- [x] Missing values 10%

### Evaluation Data
Toggle: "Use session data for evaluation" — ON
Toggle: "Include synthetic augmentation" — ON
Slider: "Synthetic augmentation ratio" — 0–50%, default 30%

---

## SETTINGS FORM — DATA PIPELINE

Panel title: "Data Pipeline"

### Ingestion
- Max file size: number input + "MB"
- Accepted formats: multi-select checkboxes: CSV / JSON / TXT / NDJSON
- Default delimiter: select Comma / Tab / Semicolon / Auto-detect

### Preprocessing defaults
Same controls as ingestion page's configuration panel but as persistent defaults:
- Default window size select
- Default normalization toggle
- Default missing value strategy select

### Storage
- Session data retention: select Keep all / Last 10 sessions / Last 30 days / Never
- "Clear all session data" destructive button (requires confirmation modal)
- Storage usage display: "Using 142MB of local storage (SQLite)"

---

## SETTINGS FORM — ALERTS & NOTIFICATIONS

Panel title: "Alert Configuration"

### Toast Notifications
For each alert type, one row with toggle + threshold:
- Anomaly detected: [toggle ON] when score > [0.70]
- OOD event flagged: [toggle ON] always
- Model switch: [toggle ON] always
- High uncertainty: [toggle OFF] when uncertainty = HIGH
- Evaluation complete: [toggle ON] always

### Sound
Toggle: "Enable sound alerts" — OFF by default
Select: "Sound for anomaly": None / Beep / Chime

---

## SETTINGS FORM — APPEARANCE

Panel title: "Appearance"
(Theme is always dark — no light mode toggle)

- Accent color: color swatch picker (5 preset options: blue / teal / purple / amber / red)
- Font size: select Default / Compact / Comfortable
- Chart animation speed: select Fast / Normal / None
- Show confidence gauge: toggle ON
- Show latency in topbar: toggle ON
- Sidebar: toggle "Show labels" (icon-only vs icon + label)

---

## LIVE PREVIEW / SUMMARY PANEL (Right Column)

Panel title: "Change Summary"

Shows a real-time diff of settings changes:

```
Pending changes (3)
─────────────────────────────
Anomaly threshold
  0.70 → 0.65 (more sensitive)
  ⚠ This will increase false positives by ~12%

OOD Distance Metric
  Mahalanobis → Cosine
  ℹ Cosine is faster but less accurate for correlated features

Default Model Tier
  Tier 2 → Tier 3
  ⚠ Higher accuracy, 160ms avg latency increase
```

Each change shows:
- Setting name
- Old value → new value
- Impact note (colored by severity: info blue / warning amber / danger red)

Below: "Save All Changes" primary button (full width)
"Discard Changes" ghost button

If no changes: "No pending changes. All settings are saved." (muted, centered)
