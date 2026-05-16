// StatsBar.jsx — row of 4 metrics that overlap the hero bottom
function StatsBar({ items }) {
  return (
    <section style={{
      maxWidth: 'var(--container-max)',
      margin: '-72px auto 0',
      padding: '0 var(--section-pad-x)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        background: 'var(--ng-white)',
        border: '1px solid var(--ng-line)',
        borderRadius: 'var(--r-xl)',
        padding: '28px 32px',
        boxShadow: 'var(--shadow)',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            paddingRight: 24,
            borderRight: i < items.length - 1 ? '1px solid var(--ng-line)' : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: item.color === 'green' ? 'var(--ng-green-700)' : 'var(--ng-blue)',
            }}>
              {item.value}
            </div>
            <div style={{
              fontSize: 13,
              color: 'var(--ng-steel)',
              marginTop: 8,
              lineHeight: 1.4,
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.StatsBar = StatsBar;
