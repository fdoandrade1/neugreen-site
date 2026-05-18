// Infrastructure.jsx — split image+text section, "operación real" pillar
function Infrastructure() {
  const points = [
    { n: '01', title: 'Planta y bodega propias', body: 'San Luis Potosí · 2,400 m² de operación. No somos distribuidores; fabricamos y almacenamos.' },
    { n: '02', title: 'Laboratorio interno', body: 'Formulación, escalamiento y QA. Cada lote validado antes de salir. Trazabilidad completa.' },
    { n: '03', title: 'Logística regional', body: 'Cobertura Bajío + Centro-Norte. Respuesta 24 h hábiles. Entrega 48 h FOB SLP.' },
  ];

  return (
    <section style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div className="ng-infra-layout" style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Photo placeholder — for real Neugreen plant photo */}
        <div style={{
          aspectRatio: '4/5',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          background: `
            linear-gradient(160deg, rgba(0,63,197,.30) 0%, rgba(11,27,43,.55) 100%),
            repeating-linear-gradient(135deg, #5A6B82 0 8px, #475569 8px 16px, #334155 16px 24px)
          `,
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {/* fake "drums on pallets" texture */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(circle at 30% 60%, rgba(0,63,197,.5) 0 60px, transparent 80px),
              radial-gradient(circle at 60% 70%, rgba(0,63,197,.4) 0 50px, transparent 70px),
              radial-gradient(circle at 45% 78%, rgba(65,190,67,.3) 0 40px, transparent 60px)
            `,
          }}></div>
          {/* "real photo" tag */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            background: 'rgba(11,27,43,.85)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,.85)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            padding: '6px 10px', borderRadius: 6,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Placeholder · pedir foto real planta SLP</div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>04 · Infraestructura</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--ng-ink)', lineHeight: 1.1 }}>
            Capacidad real,<br/>no narrativa de catálogo.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: '0 0 32px', lineHeight: 1.55, maxWidth: 480 }}>
            Tenemos lo que decimos. Visita guiada disponible para clientes — la planta SLP es la prueba que un distribuidor no puede igualar.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {points.map((p, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '54px 1fr',
                gap: 18,
                padding: '20px 0',
                borderTop: i === 0 ? '1px solid var(--ng-line)' : 'none',
                borderBottom: '1px solid var(--ng-line)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                  color: 'var(--ng-blue)',
                }}>{p.n}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--ng-ink)' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.5 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ng-infra-layout { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}

window.Infrastructure = Infrastructure;
