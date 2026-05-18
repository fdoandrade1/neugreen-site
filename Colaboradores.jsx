// Colaboradores.jsx — "red de colaboradores" with specialty icons
function Colaboradores() {
  const items = [
    { name: 'Obra civil',         icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M10 21V14h4v7"/></svg> },
    { name: 'Hidráulica',         icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/><path d="M3 21h18"/></svg> },
    { name: 'Eléctrica',          icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 4 14 11 14 10 22 20 10 13 10 13 2"/></svg> },
    { name: 'Instrumentación',    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> },
    { name: 'Herrería',           icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3 3 9l6 6 6-6-6-6Z"/><path d="m15 9 6 6-6 6-6-6"/></svg> },
    { name: 'Carpintería',        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m14 8 8 8-4 4-8-8"/><path d="m4 12 6 6-6 6"/><path d="M14 8 4 18"/></svg> },
    { name: 'Permisos · COFEPRIS',icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg> },
    { name: 'Acceso a planta',    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="ng-col-main" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: 56, alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Red de colaboradores</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 18px',
              color: 'var(--ng-ink)',
              lineHeight: 1.1,
            }}>
              Proyectos integrales,<br/>no entregas sueltas.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 24px', lineHeight: 1.55, maxWidth: 420 }}>
              Coordinamos obra civil, hidráulica, eléctrica e instrumentación — con cuadrillas auditadas y acceso a planta cliente bajo protocolo de seguridad.
            </p>
            <div style={{
              padding: '14px 18px',
              background: 'var(--ng-blue-50)',
              border: '1px solid var(--ng-blue-100)',
              borderRadius: 'var(--r)',
              display: 'flex', alignItems: 'flex-start', gap: 12,
              fontSize: 13, color: 'var(--ng-ink)',
              lineHeight: 1.5,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Tú firmas una sola cotización con Neugreen. Nosotros coordinamos a los aliados, los pagamos y respondemos por el entregable.
            </div>
          </div>

          <div className="ng-col-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}>
            {items.map((it, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid var(--ng-line)',
                borderRadius: 'var(--r-lg)',
                padding: '22px 16px 20px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 12,
                transition: 'transform .15s ease, border-color .15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = 'var(--ng-line)';
              }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  background: 'var(--ng-blue-50)',
                  color: 'var(--ng-blue)',
                  display: 'grid', placeItems: 'center',
                }}>
                  {it.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--ng-ink)',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.3,
                }}>{it.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    <style>{`
      @media (max-width: 1024px) {
        .ng-col-cards { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 768px) {
        .ng-col-main { grid-template-columns: 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 480px) {
        .ng-col-cards { grid-template-columns: repeat(2, 1fr) !important; }
      }
    `}</style>
    </section>
  );
}

window.Colaboradores = Colaboradores;
