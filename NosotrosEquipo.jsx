// NosotrosEquipo.jsx — leadership + advisors
function NosotrosEquipo() {
  const team = [
    { name: 'Fernando Andrade Anaya', role: 'Dirección', area: 'Estrategia y operación', email: 'admin@neugreen.mx' },
    { name: 'Lorenzo Rodrigo Casas Arellano', role: 'Contacto general', area: 'Manufactura + industrial', email: 'contacto@neugreen.mx' },
    { name: 'Sofi González', role: 'Ventas · línea productos', area: 'Cotización catálogo', email: 'ventas@neugreen.mx' },
    { name: 'Jeshua González', role: 'Ventas · industrial', area: 'Tratamiento de agua', email: 'ventas@neugreen.mx' },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Quién contesta</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            No es un call center. Son cuatro personas.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 580 }}>
            Equipo comercial-técnico que conoce cada cliente activo. Si nos escribes, te responde uno de ellos.
          </p>
        </div>

        <div className="ng-equipo-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {team.map((p, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid var(--ng-line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              {/* Avatar placeholder */}
              <div style={{
                width: 72, height: 72, borderRadius: 16,
                background: `linear-gradient(135deg, ${i % 2 === 0 ? 'var(--ng-blue)' : 'var(--ng-green)'} 0%, ${i % 2 === 0 ? 'var(--ng-blue-700)' : 'var(--ng-green-700)'} 100%)`,
                display: 'grid', placeItems: 'center',
                color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26,
                letterSpacing: '-0.02em',
              }}>
                {p.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16, fontWeight: 700,
                  margin: '0 0 4px', color: 'var(--ng-ink)',
                  letterSpacing: '-0.01em', lineHeight: 1.25,
                }}>{p.name}</h4>
                <div style={{ fontSize: 12, color: 'var(--ng-blue)', fontWeight: 600, letterSpacing: '0.02em' }}>{p.role}</div>
              </div>

              <div style={{ paddingTop: 12, borderTop: '1px solid var(--ng-line)' }}>
                <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginBottom: 6 }}>{p.area}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-ink)', letterSpacing: '0.02em' }}>{p.email}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          padding: '18px 22px',
          background: '#fff',
          border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
          fontSize: 13, color: 'var(--ng-ink)', lineHeight: 1.5,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Detrás operan también el químico de laboratorio, dos operadores de planta y la red de colaboradores externos. No fingimos que somos 200 — somos lo que necesitamos ser.
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .ng-equipo-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ng-equipo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.NosotrosEquipo = NosotrosEquipo;
