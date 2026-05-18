// Sectores.jsx — 3×3 grid of industries served
function Sectores() {
  const sectores = [
    { name: 'Alimenticio',   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18l-1.5 9h-15zM6 11V7a6 6 0 0 1 12 0v4M12 4v3"/></svg> },
    { name: 'Manufactura',   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="12" rx="2"/><path d="M6 9V5h12v4M2 13h20"/></svg> },
    { name: 'Hospitalidad',  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-7h6v7"/><path d="M11 11h2"/></svg> },
    { name: 'Educativo',     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg> },
    { name: 'Salud',         icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M12 11v6M9 14h6"/></svg> },
    { name: 'Comercial',     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 5 4h14l2 5"/><path d="M3 9v11h18V9"/><path d="M9 13h6"/></svg> },
    { name: 'Industrial',    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20"/><path d="M3 21V11l5 3V11l5 3V11l8 3v7"/></svg> },
    { name: 'Gobierno',      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10h14v11M3 10l9-6 9 6M9 14v5M15 14v5"/></svg> },
    { name: 'Distribuidores',icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h13v8H3z"/><path d="M16 10h3l2 3v2h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg> },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 32,
          marginBottom: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 600 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Sectores que atendemos</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
              color: 'var(--ng-ink)',
              lineHeight: 1.1,
            }}>
              Donde la operación no puede parar.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
              Nueve verticales con dosis, normativa y soporte adaptados.
            </p>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--ng-steel)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Cobertura nacional · base SLP
          </div>
        </div>

        <div className="ng-sectores-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: 'var(--ng-line)',
          border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
        }}>
          {sectores.map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: '36px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              transition: 'background .15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ng-blue-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 12,
                background: 'var(--ng-blue-50)',
                color: 'var(--ng-blue)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--ng-ink)',
                letterSpacing: '-0.01em',
              }}>
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .ng-sectores-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ng-sectores-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Sectores = Sectores;
