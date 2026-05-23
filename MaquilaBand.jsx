// MaquilaBand.jsx — alternating band promoting private-label / manufactura line
function MaquilaBand() {
  const features = [
    'Formulación a medida',
    'Escalamiento desde 200 L',
    'Envasado 100ml – 1000L',
    'Etiqueta y diseño',
    'Pruebas QA + COA',
    'Mínimo de orden flexible',
  ];

  return (
    <section style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div className="ng-maquila-band-grid" style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 56,
        alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>02 · Manufactura y marca privada</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--ng-ink)', lineHeight: 1.1 }}>
            Tu marca,<br/>nuestra planta.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: '0 0 28px', lineHeight: 1.55, maxWidth: 480 }}>
            Fabricamos producto químico de uso industrial bajo tu marca: formulación, escalamiento, envasado y etiquetado. MOQ desde 12 piezas para iniciar línea.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px 24px',
            marginBottom: 28,
          }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ng-ink)', fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {f}
              </div>
            ))}
          </div>

          <div className="ng-maquila-band-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => { window.location.href = 'contacto.html?tab=manufactura'; }}
              style={{
              background: 'var(--ng-blue)', color: '#fff',
              fontWeight: 700, fontSize: 14, padding: '14px 24px',
              borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
            }}>Solicitar propuesta de manufactura</button>
            <button
              onClick={() => { window.location.href = 'proyectos.html?filtro=manufactura'; }}
              style={{
              background: 'transparent', color: 'var(--ng-ink)',
              border: '1px solid var(--ng-line)',
              fontWeight: 700, fontSize: 14, padding: '14px 24px',
              borderRadius: 'var(--r)', cursor: 'pointer',
            }}>Casos de cliente</button>
          </div>
        </div>

        {/* Imagen real manufactura */}
        <div style={{
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          aspectRatio: '5/4',
          flexShrink: 0,
        }}>
          <img
            src="assets/images/Imagen_Manufactura_Neugreen.webp"
            alt="Planta de manufactura Neugreen — San Luis Potosí"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ng-maquila-band-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ng-maquila-band-btns button { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

window.MaquilaBand = MaquilaBand;
