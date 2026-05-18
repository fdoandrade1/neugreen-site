// StatsBar.jsx — row of 4 metrics that overlap the hero bottom
function StatsBar({ items }) {
  return (
    <section className="ng-statsbar-section" style={{
      maxWidth: 'var(--container-max)',
      margin: '-72px auto 0',
      padding: '0 var(--section-pad-x)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div className="ng-statsbar-grid" style={{
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
          <div key={i} className="ng-statsbar-item" style={{
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
      <style>{`
        @media (max-width: 1024px) {
          .ng-statsbar-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ng-statsbar-item:nth-child(even) { border-right: none !important; }
        }
        @media (max-width: 640px) {
          .ng-statsbar-section { margin-top: 24px !important; }
          .ng-statsbar-grid { grid-template-columns: 1fr !important; padding: 20px !important; }
          .ng-statsbar-item { border-right: none !important; padding-right: 0 !important; border-bottom: 1px solid var(--ng-line); padding-bottom: 16px; }
          .ng-statsbar-item:last-child { border-bottom: none !important; padding-bottom: 0; }
        }
      `}</style>
    </section>
  );
}

window.StatsBar = StatsBar;
