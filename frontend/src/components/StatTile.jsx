const styles = {
  tile: {
    border: '1px solid #e0d0ae',
    borderRadius: 12,
    background: '#fffdf5',
    padding: '0.85rem 0.95rem',
  },
  label: {
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#7a6643',
    marginBottom: '0.25rem',
  },
  value: {
    margin: 0,
    fontSize: '1.35rem',
    fontWeight: 750,
    color: '#2a1e09',
  },
};

function StatTile({ label, value }) {
  return (
    <div style={styles.tile}>
      <div style={styles.label}>{label}</div>
      <p style={styles.value}>{value}</p>
    </div>
  );
}

export default StatTile;
