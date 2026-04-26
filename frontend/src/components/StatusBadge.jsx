function StatusBadge({ text, tone = 'neutral' }) {
  const tones = {
    neutral: {
      background: '#f4efe2',
      border: '#d8c9a8',
      color: '#5d4b2d',
    },
    success: {
      background: '#e8f4d9',
      border: '#afd37f',
      color: '#365b10',
    },
    danger: {
      background: '#f8e2de',
      border: '#e7a79a',
      color: '#74261a',
    },
  };

  const palette = tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        padding: '0.2rem 0.55rem',
        borderRadius: 999,
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: '0.8rem',
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}

export default StatusBadge;
