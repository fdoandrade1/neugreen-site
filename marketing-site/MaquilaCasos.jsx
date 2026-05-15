// MaquilaCasos.jsx — 3 placeholder "caso confidencial" cards
function MaquilaCasos() {
  const cases = [
    {
      industria: 'Industria · Hospitalidad',
      title: 'Caso confidencial · Cadena hotelera',
      stat: '8 SKUs',
      statLabel: 'lanzados bajo marca propia',
      tags: ['Línea completa', '1 200 L/mes', 'Cobertura nacional'],
    },
    {
      industria: 'Industria · Distribución',
      title: 'Caso confidencial · Distribuidor regional',
      stat: '+ 24 %',
      statLabel: 'margen vs. producto comprado',
      tags: ['Línea profesional', 'Etiqueta privada', '4 estados'],
    },
    {
      industria: 'Industria · Alimenticio',
      title: 'Caso confidencial · Procesadora de cárnicos',
      stat: '3 productos',
      statLabel: 'CIP a medida',
      tags: ['Línea especializada', 'COFEPRIS', 'Validación HACCP'],
    },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-navy)',
      color: '#fff',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 32,
          marginBottom: 48, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#A6C8FF', marginBottom: 12,
            }}>Casos · NDA activo</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
              color: '#fff',
              lineHeight: 1.1,
            }}>
              Manufacturas activas que no podemos nombrar.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', margin: 0, lineHeight: 1.55, maxWidth: 560 }}>
              La mayoría de nuestros clientes de maquila firma NDA. Podemos compartir el detalle bajo confidencialidad en una llamada técnica.
            </p>
          </div>
          <button style={{
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,.22)',
            fontWeight: 700, fontSize: 14,
            padding: '12px 22px',
            borderRadius: 'var(--r)',
            cursor: 'pointer',
          }}>Solicitar referencia bajo NDA</button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}>
          {cases.map((c, i) => (
            <div key={i} style={{
              background: '#102942',
              border: '1px solid #1f3d5e',
              borderRadius: 'var(--r-lg)',
              padding: '32px 28px',
              transition: 'border-color .15s ease, box-shadow .15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ng-green)';
              e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(0,63,197,.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f3d5e';
              e.currentTarget.style.boxShadow = '';
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,.55)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}>{c.industria}</div>

              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                fontWeight: 700,
                margin: '0 0 28px',
                color: '#fff',
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
              }}>{c.title}</h4>

              <div style={{
                paddingTop: 20,
                borderTop: '1px solid rgba(255,255,255,.10)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 36,
                  lineHeight: 1,
                  color: 'var(--ng-green)',
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}>{c.stat}</div>
                <div style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,.72)',
                  marginBottom: 20,
                }}>{c.statLabel}</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t, j) => (
                    <span key={j} style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,.06)',
                      color: 'rgba(255,255,255,.85)',
                      border: '1px solid rgba(255,255,255,.10)',
                      letterSpacing: '0.04em',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.MaquilaCasos = MaquilaCasos;
