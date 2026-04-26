const styles = {
  card: {
    border: '1px solid #d8c9a8',
    borderRadius: 14,
    background: 'linear-gradient(180deg, #fffefa, #fbf6ea)',
    boxShadow: '0 10px 24px rgba(58, 41, 9, 0.08)',
    padding: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#2d2211',
  },
  body: {
    marginTop: '0.7rem',
  },
};

function PageCard({ title, children }) {
  return (
    <section style={styles.card}>
      {title ? <h2 style={styles.title}>{title}</h2> : null}
      <div style={styles.body}>{children}</div>
    </section>
  );
}

export default PageCard;
