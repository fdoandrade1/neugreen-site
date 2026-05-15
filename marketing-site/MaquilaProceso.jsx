// MaquilaProceso.jsx — 6-step horizontal process timeline
function MaquilaProceso() {
  const steps = [
    {
      n: '01',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h6v18H3zM15 3l6 6v12h-6V3z"/><circle cx="6" cy="9" r="1.5"/><circle cx="18" cy="14" r="1.5"/></svg>,
      title: 'Formulación',
      body: 'Recibimos tu brief o partimos de una fórmula referencia. Nuestro QA evalúa viabilidad técnica, normativa y de costo en 5 días hábiles.',
    },
    {
      n: '02',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v3H9z"/><path d="M9 6v4l-5 9a2 2 0 0 0 1.8 2.9H18.2A2 2 0 0 0 20 19l-5-9V6"/><path d="M7 14h10"/></svg>,
      title: 'Laboratorio y análisis',
      body: 'Pruebas de estabilidad, eficacia, pH, viscosidad y compatibilidad con envase. Bench-test antes de cualquier lote piloto.',
    },
    {
      n: '03',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h6"/></svg>,
      title: 'Fichas técnicas y HDS',
      body: 'Ficha técnica, HDS bajo SGA, etiqueta NOM-018 y registros sanitarios (COFEPRIS) cuando aplican. Tú recibes los documentos firmados.',
    },
    {
      n: '04',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v3H9z"/><rect x="6" y="6" width="12" height="15" rx="2"/><path d="M9 14h6M9 18h6"/></svg>,
      title: 'Envasado y etiquetado',
      body: 'Línea de envasado de 100 ml hasta 1 000 L. Etiqueta impresa con tu marca, lote, fecha de manufactura y caducidad. Empaque secundario configurable.',
    },
    {
      n: '05',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="12" rx="2"/><path d="M6 9V5h12v4M2 13h20M8 17h2M14 17h2"/></svg>,
      title: 'Escalamiento industrial',
      body: 'Del lote piloto al primer lote comercial. Validación en producción, replicabilidad lote a lote y trazabilidad por número de serie.',
    },
    {
      n: '06',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h13v8H3z"/><path d="M16 10h3l2 3v2h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
      title: 'Entrega final',
      body: 'Embarque FOB SLP con guía de carga, COA del lote y factura. Seguimiento por WhatsApp directo con cuenta asignada.',
    },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 780, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Cómo trabajamos · 6 pasos</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Del brief al embarque, sin sorpresas.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 620 }}>
            Cada paso con entregable documentado. El cliente conoce el estado del proyecto en todo momento — no hay caja negra.
          </p>
        </div>

        {/* Process strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 16,
          position: 'relative',
        }}>
          {/* connecting line */}
          <div style={{
            position: 'absolute',
            top: 34, left: '8.33%', right: '8.33%',
            height: 2,
            background: 'linear-gradient(90deg, var(--ng-blue-100) 0%, var(--ng-green-50) 100%)',
            zIndex: 0,
          }}></div>

          {steps.map((s, i) => (
            <div key={i} style={{
              position: 'relative',
              zIndex: 1,
              background: '#fff',
              border: '1px solid var(--ng-line)',
              borderRadius: 'var(--r-lg)',
              padding: '24px 18px 22px',
              transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = 'var(--ng-line)';
            }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: 12,
                background: i < 3 ? 'var(--ng-blue-50)' : 'var(--ng-green-50)',
                color: i < 3 ? 'var(--ng-blue)' : 'var(--ng-green-700)',
                display: 'grid', placeItems: 'center',
                marginBottom: 14,
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11, fontWeight: 600,
                color: 'var(--ng-steel)',
                letterSpacing: '0.06em',
                marginBottom: 6,
              }}>{s.n}</div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17, fontWeight: 700,
                margin: '0 0 8px',
                color: 'var(--ng-ink)',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}>{s.title}</h4>
              <p style={{
                fontSize: 13,
                color: 'var(--ng-steel)',
                margin: 0,
                lineHeight: 1.5,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.MaquilaProceso = MaquilaProceso;
