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
              onClick={() => { window.location.href = 'contacto.html'; }}
              style={{
              background: 'var(--ng-blue)', color: '#fff',
              fontWeight: 700, fontSize: 14, padding: '14px 24px',
              borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
            }}>Solicitar propuesta de manufactura</button>
            <button
              onClick={() => { window.location.href = 'proyectos.html'; }}
              style={{
              background: 'transparent', color: 'var(--ng-ink)',
              border: '1px solid var(--ng-line)',
              fontWeight: 700, fontSize: 14, padding: '14px 24px',
              borderRadius: 'var(--r)', cursor: 'pointer',
            }}>Casos de cliente</button>
          </div>
        </div>

        {/* Stylized "bottle row" placeholder */}
        <div style={{
          background: 'var(--ng-mist)',
          border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r-xl)',
          padding: 40,
          aspectRatio: '5/4',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 18,
          position: 'relative',
        }}>
          {[
            { h: 70, w: 56, c: 'var(--ng-blue)' },
            { h: 85, w: 64, c: 'var(--ng-green)' },
            { h: 60, w: 50, c: 'var(--ng-blue-700)' },
            { h: 78, w: 60, c: 'var(--ng-ink)' },
            { h: 65, w: 54, c: 'var(--ng-blue)' },
          ].map((b, i) => (
            <div key={i} style={{
              width: `${b.w}%`,
              maxWidth: b.w + 'px',
              height: `${b.h}%`,
              background: b.c,
              borderRadius: '6px 6px 4px 4px',
              position: 'relative',
              boxShadow: '0 12px 24px -10px rgba(0,63,197,.35)',
            }}>
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                width: '40%', height: '14px', background: b.c, borderRadius: '3px 3px 0 0',
              }}></div>
              <div style={{
                position: 'absolute', top: '30%', left: '10%', right: '10%',
                height: '34%', background: '#fff', borderRadius: 3, opacity: .94,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 8, fontWeight: 800, color: b.c,
                letterSpacing: '0.05em',
              }}>
                <div>TU MARCA</div>
                <div style={{ width: '60%', height: 1, background: b.c, margin: '2px 0', opacity: .4 }}></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, fontWeight: 500 }}>20 L</div>
              </div>
            </div>
          ))}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ng-steel)',
            background: '#fff', padding: '4px 10px', borderRadius: 6,
            border: '1px solid var(--ng-line)',
          }}>Mockup · 5 SKUs marca privada</div>
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
