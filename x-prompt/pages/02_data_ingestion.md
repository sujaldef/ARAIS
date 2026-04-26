# Page 02 — Data Ingestion
## File: pages/02_data_ingestion.md
## Route: /data-ingestion

---

## PAGE PURPOSE

The entry point for all data entering ARAIS.
Users can upload CSV/JSON files, configure the stream simulator,
or point the system to a local API endpoint.

This page answers: "How do I get my data into the system?"

---

## PAGE LAYOUT

Uses: **Two-Column (60/40)**

```
┌─────────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                    │
│  "Data Ingestion"  +  data source tabs                         │
├──────────────────────────────┬──────────────────────────────────┤
│  LEFT COLUMN (60%)           │  RIGHT COLUMN (40%)              │
│                              │                                  │
│  ┌────────────────────────┐  │  ┌──────────────────────────┐    │
│  │  DATA SOURCE PANEL     │  │  │  CONFIGURATION PANEL     │    │
│  │  (tab-switched)        │  │  │  (context-sensitive)     │    │
│  │                        │  │  │                          │    │
│  └────────────────────────┘  │  └──────────────────────────┘    │
│                              │                                  │
│  ┌────────────────────────┐  │  ┌──────────────────────────┐    │
│  │  DATA PREVIEW TABLE    │  │  │  INGESTION LOG / STATUS  │    │
│  │  (first 20 rows)       │  │  │                          │    │
│  └────────────────────────┘  │  └──────────────────────────┘    │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## PAGE HEADER

Left side:
- Title: "Data Ingestion" (`--font-display`, text-xl)
- Subtitle: "Provide data via file upload, API feed, or the built-in stream simulator"

Tabs (below header, full-width tab bar):
- **File Upload** (icon: FileUp)
- **Stream Simulator** (icon: Activity)
- **API Feed** (icon: Wifi)

Active tab: bottom border 2px `--color-accent-primary`, text primary.
Inactive: text muted, no border.

---

## DATA SOURCE PANEL — FILE UPLOAD TAB

### Upload Zone
- Large drag-and-drop zone: 100% width, 180px height
- Border: 2px dashed `--color-border-strong`
- Border radius: `--radius-lg`
- Background: `--color-bg-panel-alt`
- Center content:
  - Upload icon (Lucide `Upload`, 36px, muted)
  - Text: "Drag and drop your file here" (text-md, text-secondary)
  - Subtext: "Supports .csv, .json, .txt · Max 50MB" (text-sm, text-muted)
  - "Browse Files" ghost button below
- Hover state: border color → `--color-active`, background subtle glow
- Drag-over state: border solid blue, background `--color-active-glow` tint

### Accepted File List (after upload)
- Replaces upload zone after file(s) selected
- File row: FileText icon | filename | file size | format badge | [×] remove button
- "Add more files" small link below list
- "Process Files" primary button (full width) at bottom

### Format Validation
- On file select, immediately show inline format check:
  - Parsing schema (detected columns, row count)
  - ✓ Timestamp column detected: `timestamp`
  - ✓ Value columns: `cpu_usage`, `memory`, `latency`
  - ✗ Warning if no timestamp column found (amber inline alert)

---

## DATA SOURCE PANEL — STREAM SIMULATOR TAB

### Simulator Controls
A control form laid out in two columns:

**Left sub-column:**
- **Signal Type** (select): Sine wave / Random walk / Step function / Mixed
- **Base frequency** (slider): 0.1 Hz – 10 Hz
- **Noise level** (slider 0–100%): adds Gaussian noise to clean signal
  - Visual: small mini-chart preview updates live as slider moves

**Right sub-column:**
- **Concept drift rate** (select): None / Slow (24hr) / Medium (1hr) / Fast (5min)
- **Anomaly injection rate** (slider 0–20%): percentage of windows with injected anomaly
- **Anomaly type** (multi-select chips): Point / Contextual / Collective / OOD

### Simulator Status Bar (below controls)
- Status badge: STOPPED (red) / RUNNING (green pulse)
- Stats: "Generated 1,247 data points · 14 anomalies injected · 2 OOD events"
- "Start Simulator" primary button | "Stop" destructive button (shown when running)

---

## DATA SOURCE PANEL — API FEED TAB

### Configuration Form
- **Endpoint URL** text input: e.g., `http://localhost:8000/stream`
- **Poll interval** (select): 100ms / 500ms / 1s / 5s
- **Auth token** password input (optional)
- **Expected format** (select): JSON array / CSV line / NDJSON

### Test Connection
- "Test Connection" ghost button → shows success/error inline result
- Success: green checkmark + "Responding · 23ms avg" message
- Error: red × + error message + retry suggestion

---

## CONFIGURATION PANEL (Right Column)

### Preprocessing Options
Panel title: "Preprocessing Configuration"

- **Window size** (select): 10 / 30 / 60 / 120 points
- **Normalization** (toggle): Z-score normalization — ON by default
- **Missing value handling** (select): Forward fill / Drop / Interpolate
- **Feature extraction** (multi-select checkboxes):
  - Rolling mean
  - Rolling std dev
  - Rate of change
  - FFT features

### OOD Detection Settings
Panel title: "OOD Detection Threshold"

- **Distance metric** (select): Mahalanobis / Cosine / Euclidean
- **Sensitivity threshold** (slider 0.1–0.9):
  - Below slider: "More sensitive → More OOD flags"
  - Low/High labels on slider ends
- **Reference distribution**: "Built-in baseline" | "From uploaded reference file"

### "Apply Configuration" primary button (full width, bottom)

---

## DATA PREVIEW TABLE

Panel title: "Data Preview" + row count badge + column count badge

Table shows first 20 rows of ingested data:
- Scrollable horizontally if many columns
- First column: row index (monospace, muted)
- Timestamp column: highlighted, monospace
- Numeric columns: right-aligned, monospace
- Anomaly label column (if present): badge per cell (anomaly/normal)

Below table: "Showing rows 1–20 of 4,847 total · Processing complete in 0.3s"

---

## INGESTION LOG / STATUS PANEL (Right Column)

Real-time text log of ingestion events:

```
[13:42:01] ✓ File parsed: sensor_data.csv (4,847 rows, 6 columns)
[13:42:01] ✓ Timestamp column detected: 'timestamp'
[13:42:02] ✓ Normalization applied (z-score)
[13:42:02] ℹ 3 missing values forward-filled in column 'temp_2'
[13:42:02] ✓ OOD reference distribution computed (2048 samples)
[13:42:02] ✓ Ready for analysis — 4,847 windows created
```

- Font: `--font-mono`, text-xs, text-secondary
- Background: `--color-bg-base` (darker than panel)
- Max height: 180px, scroll overflow
- Success lines: `--color-normal-text`
- Warning lines: `--color-uncertain-text`
- Error lines: `--color-anomaly-text`
- Auto-scroll to bottom as new lines appear
- "Clear log" link top-right

### "Begin Analysis" Button
- Full width, primary, large (44px height)
- Below the log panel
- Disabled until data is successfully ingested
- On click: navigates to Live Analysis page with this data loaded
