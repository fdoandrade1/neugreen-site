// NosotrosTimeline.jsx — vertical timeline of company milestones
function NosotrosTimeline() {
  const events = [
    { year: '2010', title: 'Fundación · primer laboratorio', body: 'Arrancamos formulando enzimáticos para cocinas industriales en San Luis Potosí. Un químico, una idea y mucho ensayo-error.' },
    { year: '2013', title: 'Primera planta de manufactura', body: 'Mudanza a planta propia de 600 m². Estandarización de procesos y primer cliente industrial fijo.' },
    { year: '2017', title: 'Maquila para terceros', body: 'Apertura formal de la unidad de marca privada. Primer cliente: cadena de hoteles boutique de Riviera Maya.' },
    { year: '2020', title: 'Soluciones industriales', body: 'Expansión a tratamiento de agua, torres y calderas. Equipo de ingeniería de proyecto + red de colaboradores.' },
    { year: '2023', title: 'Cobertura nacional', body: 'Logística regional en Bajío, Centro-Norte y Sureste. Más de 120 SKUs en inventario activo permanente.' },
    { year: '2026', title: 'Bioaumentación a escala', body: 'Octava PTAR en operación. Línea enzimática consolidada. Brand Guidelines v1.0 publicado.' },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Historia · 16 años</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            De un laboratorio en SLP a planta industrial.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 580 }}>
            Sin rondas de inversión externas. Crecimiento orgánico financiado por la operación del cliente.
          </p>
        </div>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* vertical line */}
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 8,
            width: 2,
            background: 'linear-gradient(180deg, var(--ng-blue-100) 0%, var(--ng-green-50) 100%)',
          }}></div>

          {events.map((e, i) => (
            <div key={i} style={{
              position: 'relative',
              padding: '0 0 36px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: 28,
              alignItems: 'flex-start',
            }}>
              {/* dot */}
              <div style={{
                position: 'absolute', left: -22, top: 6,
                width: 14, height: 14, borderRadius: '50%',
                background: i === events.length - 1 ? 'var(--ng-green)' : 'var(--ng-blue)',
                border: '3px solid var(--ng-mist)',
                boxShadow: '0 0 0 2px ' + (i === events.length - 1 ? 'var(--ng-green)' : 'var(--ng-blue-100)'),
              }}></div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800, fontSize: 32,
                color: i === events.length - 1 ? 'var(--ng-green-700)' : 'var(--ng-blue)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>{e.year}</div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20, fontWeight: 700,
                  margin: '0 0 8px', color: 'var(--ng-ink)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                }}>{e.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 560 }}>{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.NosotrosTimeline = NosotrosTimeline;
