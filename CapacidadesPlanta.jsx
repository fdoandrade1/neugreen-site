// CapacidadesPlanta.jsx — wide block with photo background (bodega SLP) + stats card overlay
function CapacidadesPlanta() {
  const stats = [
    { v: '+15', l: 'Años de experiencia técnica' },
    { v: '+100', l: 'Formulaciones activas' },
    { v: '5/7', l: 'Días/semana operando' },
    { v: 'COFEPRIS', l: 'Y normativas NOM cumplidas', mono: true },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        {/* photo block with overlay */}
        <div style={{
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          minHeight: 480,
          background: `
            linear-gradient(120deg, rgba(0,85,184,.68) 0%, rgba(0,85,184,.45) 50%, rgba(11,27,43,.35) 100%),
            url('assets/images/BODEGA_NEUGREEN_COMPLETA_FINAL.webp') center/cover no-repeat
          `,
          position: 'relative',
          padding: '64px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#fff',
        }}>

          <div style={{ position: 'relative', maxWidth: 640 }}>
            <div className="eyebrow" style={{ color: '#A6C8FF', marginBottom: 16 }}>Capacidades de planta · San Luis Potosí</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 3.6vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
              color: '#fff',
              lineHeight: 1.05,
            }}>
              Capacidad real,<br/>no narrativa de catálogo.
            </h2>
            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,.85)',
              margin: 0, lineHeight: 1.55, maxWidth: 480,
            }}>
              Planta operando, laboratorio interno, inventario activo. Visita guiada disponible con cita previa.
            </p>
          </div>
        </div>

        {/* floating stat card overlapping bottom */}
        <div className="ng-cap-stats" style={{
          background: '#fff',
          border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r-lg)',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          marginTop: -56,
          marginLeft: 56,
          marginRight: 56,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              paddingRight: 16,
              borderRight: i < stats.length - 1 ? '1px solid var(--ng-line)' : 'none',
            }}>
              <div style={{
                fontFamily: s.mono ? 'var(--font-mono)' : 'var(--font-display)',
                fontWeight: s.mono ? 600 : 800,
                fontSize: s.mono ? 18 : 36,
                lineHeight: 1,
                letterSpacing: s.mono ? '0.02em' : '-0.02em',
                color: i % 2 === 0 ? 'var(--ng-blue)' : 'var(--ng-green-700)',
                marginTop: s.mono ? 10 : 0,
              }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 8, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    <style>{`
      @media (max-width: 1024px) {
        .ng-cap-stats { grid-template-columns: repeat(2, 1fr) !important; margin-left: 24px !important; margin-right: 24px !important; }
      }
      @media (max-width: 640px) {
        .ng-cap-stats { grid-template-columns: 1fr !important; margin-left: 16px !important; margin-right: 16px !important; margin-top: 16px !important; }
      }
    `}</style>
    </section>
  );
}

window.CapacidadesPlanta = CapacidadesPlanta;
