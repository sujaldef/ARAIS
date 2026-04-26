# Design Tokens — ARAIS Design System
## File: design-system/00_tokens.md

---

## PURPOSE

This file defines every design token used across the entire ARAIS frontend.
Implement these as CSS custom properties on `:root` AND as a Tailwind theme extension.
Nothing in the UI should use a hardcoded color, font size, or spacing value
that isn't derived from these tokens.

---

## COLOR TOKENS

### Base Backgrounds
```
--color-bg-base:       #0D1117   /* App shell background — near-black with blue undertone */
--color-bg-panel:      #111827   /* Panel / card background */
--color-bg-panel-alt:  #0F172A   /* Alternate panel (slightly cooler) */
--color-bg-elevated:   #1E293B   /* Elevated surface — modals, dropdowns, tooltips */
--color-bg-input:      #1A2235   /* Form inputs, text areas */
--color-bg-hover:      #1F2D40   /* Hover state for list items, rows */
--color-bg-selected:   #1E3A5F   /* Selected / active item background */
```

### Border & Divider
```
--color-border:        #1E2D3D   /* Default border — subtle, structural */
--color-border-strong: #2D3F55   /* Strong border — panel edges, section dividers */
--color-border-glow:   #2563EB40 /* Blue glow border for active/focused elements */
```

### Text
```
--color-text-primary:   #F1F5F9  /* Primary readable text */
--color-text-secondary: #94A3B8  /* Supporting text, labels, metadata */
--color-text-muted:     #4B5563  /* Disabled, placeholder, very secondary */
--color-text-inverse:   #0D1117  /* Text on light/colored backgrounds */
--color-text-code:      #7DD3FC  /* Monospace data values, scores, IDs */
```

### Semantic — Signal Colors
```
/* ANOMALY / ERROR — Crimson Red */
--color-anomaly:        #DC2626
--color-anomaly-soft:   #7F1D1D
--color-anomaly-glow:   #DC262640
--color-anomaly-text:   #FCA5A5

/* NORMAL / SAFE — Teal */
--color-normal:         #0D9488
--color-normal-soft:    #0F3430
--color-normal-glow:    #0D948840
--color-normal-text:    #5EEAD4

/* UNCERTAIN / CAUTION — Amber */
--color-uncertain:      #D97706
--color-uncertain-soft: #451A03
--color-uncertain-glow: #D9770640
--color-uncertain-text: #FCD34D

/* OOD / NOVEL — Purple */
--color-ood:            #7C3AED
--color-ood-soft:       #2E1065
--color-ood-glow:       #7C3AED40
--color-ood-text:       #C4B5FD

/* ACTIVE / DATA STREAM — Electric Blue */
--color-active:         #2563EB
--color-active-soft:    #1E3A8A
--color-active-glow:    #2563EB50
--color-active-text:    #93C5FD

/* SYSTEM / INFO — Slate Blue */
--color-info:           #3B82F6
--color-info-text:      #BFDBFE
```

### Accent & Brand
```
--color-accent-primary:   #2563EB   /* Primary interactive — buttons, links, focus rings */
--color-accent-secondary: #7C3AED   /* Secondary accent — OOD, novelty indicators */
--color-accent-danger:    #DC2626   /* Destructive actions, critical alerts */
--color-accent-success:   #0D9488   /* Confirmations, success states */
```

---

## TYPOGRAPHY TOKENS

### Font Families
```css
/* Load these via @fontsource or Google Fonts */
--font-display:  'DM Mono', 'JetBrains Mono', monospace;  /* Headings — unexpected, technical */
--font-body:     'IBM Plex Sans', 'Inter', sans-serif;    /* Body text — clean, readable */
--font-mono:     'JetBrains Mono', 'Fira Code', monospace; /* Data values, scores, IDs, code */
```

### Font Size Scale
```
--text-xs:   0.625rem   /* 10px — metadata, timestamps, tiny labels */
--text-sm:   0.75rem    /* 12px — secondary labels, badge text */
--text-base: 0.875rem   /* 14px — default body text */
--text-md:   1rem       /* 16px — slightly prominent text */
--text-lg:   1.125rem   /* 18px — section subheadings */
--text-xl:   1.375rem   /* 22px — page section titles */
--text-2xl:  1.75rem    /* 28px — panel main stats */
--text-3xl:  2.5rem     /* 40px — hero numbers, KPI values */
--text-4xl:  3.5rem     /* 56px — large metric displays */
```

### Font Weight
```
--weight-regular: 400
--weight-medium:  500
--weight-semibold: 600
--weight-bold:    700
```

### Line Height
```
--leading-tight:  1.2
--leading-normal: 1.5
--leading-relaxed: 1.7
```

### Letter Spacing
```
--tracking-tight:  -0.02em   /* Display/heading text */
--tracking-normal:  0em
--tracking-wide:   0.06em    /* Labels, badges, uppercase text */
--tracking-wider:  0.12em    /* ALL-CAPS section labels */
```

---

## SPACING TOKENS

Use a base-4 scale:
```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
```

---

## BORDER RADIUS
```
--radius-sm:   3px    /* Tight — badges, small chips */
--radius-md:   6px    /* Default — cards, panels, inputs */
--radius-lg:   10px   /* Larger cards, modals */
--radius-full: 9999px /* Pills, circular elements */
```

---

## SHADOWS & GLOWS
```
--shadow-panel:  0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px var(--color-border);
--shadow-elevated: 0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px var(--color-border-strong);
--shadow-glow-blue: 0 0 16px var(--color-active-glow);
--shadow-glow-red:  0 0 16px var(--color-anomaly-glow);
--shadow-glow-amber: 0 0 16px var(--color-uncertain-glow);
--shadow-glow-purple: 0 0 16px var(--color-ood-glow);
```

---

## Z-INDEX SCALE
```
--z-base:    0
--z-raised:  10
--z-overlay: 100
--z-modal:   200
--z-toast:   300
--z-tooltip: 400
```

---

## TRANSITION TOKENS
```
--transition-fast:   120ms ease
--transition-base:   220ms ease
--transition-slow:   400ms ease
--transition-spring: 350ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## TAILWIND CONFIG EXTENSION

Map all the above into `tailwind.config.js` under `theme.extend`:
- colors → all --color-* tokens become utility classes
- fontFamily → display, body, mono
- fontSize → all --text-* sizes
- spacing → matches --space-* scale
- borderRadius → sm, md, lg, full
- boxShadow → panel, elevated, glow-blue, glow-red, glow-amber, glow-purple
- transitionDuration → fast (120), base (220), slow (400)
