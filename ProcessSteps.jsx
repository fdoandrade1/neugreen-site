// ProcessSteps.jsx — 4 numbered steps showing the commercial process
function ProcessSteps() {
  const steps = [
    { n: '01', title: 'Diagnóstico técnico', body: 'Llamada de 30 min. Definimos proceso, problema, normativa aplicable y dosis estimada.', dur: '30 min' },
    { n: '02', title: 'Propuesta + ficha técnica', body: 'Cotización con SKU, presentación, MOQ, lead time y referencia de cliente similar.', dur: '24 – 48 h' },
    { n: '03', title: 'Pedido y entrega', body: 'OC, factura, embarque FOB SLP. Logística regional con seguimiento por WhatsApp.', dur: '48 – 96 h' },
    { n: '04', title: 'Soporte de aplicación', body: 'Capacitación inicial en sitio o remota. Ajuste de dosis primer mes incluido.', dur: 'Mes 1' },
  ];

  return (
    <section style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
      borderTop: '1px solid var(--ng-line)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Cómo trabajamos</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', color: 'var(--ng-ink)', lineHeight: 1.1 }}>
            Proceso comercial sin fricción
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
            Cuatro pasos. Cero adivinanzas. El cliente sabe exactamente cuándo recibe qué.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 4,
          background: 'var(--ng-line)',
          border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: '28px 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800, fontSize: 32,
                  color: 'var(--ng-blue)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--ng-steel)',
                  padding: '3px 8px', background: 'var(--ng-mist)',
                  borderRadius: 'var(--r-pill)',
                }}>{s.dur}</div>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17, fontWeight: 700,
                margin: '0 0 8px', color: 'var(--ng-ink)',
                letterSpacing: '-0.01em',
              }}>{s.title}</h4>
              <p style={{
                fontSize: 13, color: 'var(--ng-steel)',
                margin: 0, lineHeight: 1.55,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.ProcessSteps = ProcessSteps;
