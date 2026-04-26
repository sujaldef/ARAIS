# Icons Specification
## File: assets-spec/icons.md

---

## ICON LIBRARY

Use **Lucide React** exclusively. No mixing with other icon sets.
Import individually to keep bundle size minimal:
```js
import { Activity, AlertTriangle, BarChart2 } from 'lucide-react';
```

---

## STANDARD ICON SIZES

| Context                    | Size  |
|----------------------------|-------|
| Sidebar navigation         | 18px  |
| Topbar actions             | 16px  |
| Button icons (left of text)| 15px  |
| Icon-only buttons          | 16px  |
| Table row icons            | 14px  |
| Badge icons                | 12px  |
| Empty state illustrations  | 48px  |
| Alert/toast icons          | 20px  |

---

## ICON → SEMANTIC MAPPING

### Navigation
| Page               | Icon               |
|--------------------|--------------------|
| Dashboard          | `LayoutDashboard`  |
| Data Ingestion     | `Upload`           |
| Live Analysis      | `Activity`         |
| Model Control      | `Cpu`              |
| OOD Alerts         | `AlertTriangle`    |
| Evaluation         | `BarChart2`        |
| Settings           | `Settings`         |

### System States
| State              | Icon               |
|--------------------|--------------------|
| Running / Live     | `Play`             |
| Paused             | `Pause`            |
| Stopped            | `Square`           |
| Loading            | `Loader2` (spin)   |
| Success            | `CheckCircle2`     |
| Error              | `XCircle`          |
| Warning            | `AlertTriangle`    |
| Info               | `Info`             |
| OOD / Novel        | `Zap`              |

### Actions
| Action             | Icon               |
|--------------------|--------------------|
| Upload / Import    | `Upload`           |
| Download / Export  | `Download`         |
| Delete / Remove    | `Trash2`           |
| Edit               | `Pencil`           |
| View / Inspect     | `Eye`              |
| Close / Dismiss    | `X`                |
| Add                | `Plus`             |
| Search             | `Search`           |
| Filter             | `Filter`           |
| Sort               | `ArrowUpDown`      |
| Refresh / Reset    | `RotateCcw`        |
| Settings / Config  | `SlidersHorizontal`|
| Copy               | `Copy`             |
| Expand             | `Maximize2`        |
| Collapse           | `Minimize2`        |

### Data & ML
| Concept            | Icon               |
|--------------------|--------------------|
| Model / Brain      | `BrainCircuit`     |
| Data stream        | `Waves`            |
| Anomaly spike      | `TrendingUp`       |
| Confidence         | `Target`           |
| Uncertainty        | `HelpCircle`       |
| Time series        | `LineChart`        |
| Evaluation         | `FlaskConical`     |
| Pattern / Cluster  | `Hexagon`          |
| Distribution       | `BarChart3`        |
| Feedback           | `MessageSquare`    |

---

## ICON STYLING

Default: inherit parent text color
```jsx
<Activity size={18} className="text-muted" />
```

Signal-colored icons (use className or style):
- Anomaly: `style={{ color: 'var(--color-anomaly)' }}`
- Normal: `style={{ color: 'var(--color-normal)' }}`
- OOD: `style={{ color: 'var(--color-ood)' }}`
- Uncertain: `style={{ color: 'var(--color-uncertain)' }}`

Spinning loader:
```jsx
<Loader2 size={16} className="animate-spin" />
```

---

## NO CUSTOM SVG ICONS

Do not create or embed custom SVG icons.
Use Lucide exclusively for consistency.
The one exception: the app logo/wordmark in the sidebar and topbar,
which can be a simple geometric SVG shape (not an icon, but a brand mark).

---

## APP LOGO MARK

Design brief for the brand mark SVG (sidebar + topbar):
- Abstract representation of a signal waveform with an anomaly spike
- Style: two thin horizontal lines (signal track) with a sharp spike in the middle
- The spike is accented in `--color-anomaly`
- The tracks are `--color-text-secondary`
- Clean, geometric, readable at 28px and 20px sizes
- Viewbox: 32×32
- No text — just the symbol
