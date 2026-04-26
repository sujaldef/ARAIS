/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0D1117',
          panel: '#111827',
          'panel-alt': '#0F172A',
          elevated: '#1E293B',
          input: '#1A2235',
          hover: '#1F2D40',
          selected: '#1E3A5F',
        },
        border: {
          DEFAULT: '#1E2D3D',
          strong: '#2D3F55',
          'glow-blue': '#2563EB40',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#4B5563',
          inverse: '#0D1117',
          code: '#7DD3FC',
        },
        anomaly: {
          DEFAULT: '#DC2626',
          soft: '#7F1D1D',
          glow: '#DC262640',
          text: '#FCA5A5',
        },
        normal: {
          DEFAULT: '#0D9488',
          soft: '#0F3430',
          glow: '#0D948840',
          text: '#5EEAD4',
        },
        uncertain: {
          DEFAULT: '#D97706',
          soft: '#451A03',
          glow: '#D9770640',
          text: '#FCD34D',
        },
        ood: {
          DEFAULT: '#7C3AED',
          soft: '#2E1065',
          glow: '#7C3AED40',
          text: '#C4B5FD',
        },
        active: {
          DEFAULT: '#2563EB',
          soft: '#1E3A8A',
          glow: '#2563EB50',
          text: '#93C5FD',
        },
        info: {
          DEFAULT: '#3B82F6',
          text: '#BFDBFE',
        },
        accent: {
          primary: '#2563EB',
          secondary: '#7C3AED',
          danger: '#DC2626',
          success: '#0D9488',
        },
      },
      fontFamily: {
        display: ['DM Mono', 'JetBrains Mono', 'monospace'],
        body: ['IBM Plex Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs: ['0.625rem', { lineHeight: '0.75rem' }], // 10px
        sm: ['0.75rem', { lineHeight: '0.875rem' }], // 12px
        base: ['0.875rem', { lineHeight: '1rem' }], // 14px
        md: ['1rem', { lineHeight: '1.25rem' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.375rem' }], // 18px
        xl: ['1.375rem', { lineHeight: '1.625rem' }], // 22px
        '2xl': ['1.75rem', { lineHeight: '2rem' }], // 28px
        '3xl': ['2.5rem', { lineHeight: '3rem' }], // 40px
        '4xl': ['3.5rem', { lineHeight: '4rem' }], // 56px
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
      },
      borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '10px',
        full: '9999px',
      },
      boxShadow: {
        panel: '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px #1E2D3D',
        elevated: '0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px #2D3F55',
        'glow-blue': '0 0 16px #2563EB40',
        'glow-red': '0 0 16px #DC262640',
        'glow-amber': '0 0 16px #D9770640',
        'glow-purple': '0 0 16px #7C3AED40',
      },
      zIndex: {
        base: '0',
        raised: '10',
        overlay: '100',
        modal: '200',
        toast: '300',
        tooltip: '400',
      },
      transitionDuration: {
        fast: '120ms',
        base: '220ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};
