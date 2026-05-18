// NosotrosValores.jsx — 4 valores no-negociables
function NosotrosValores() {
  const valores = [
    { n: '01', title: 'Cifras antes que adjetivos', body: 'Si no se mide, no se vende. Cada propuesta lleva ROI estimado, dosis específica y plazo concreto.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 17 4-6 4 4 5-8"/></svg> },
    { n: '02', title: 'Asesoría, no venta', body: 'El comprador B2B no quiere ser vendido — quiere ser asesorado. Si la solución no aplica, lo decimos.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg> },
    { n: '03', title: 'Sustentabilidad con consecuencia', body: 'Lo verde tiene que generar ahorro, cumplimiento o eficiencia. Si no, es decoración — y la decoración no resuelve operaciones.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-5 7-12 7-12s7 7 7 12a7 7 0 0 1-7 7Z"/></svg> },
    { n: '04', title: 'Continuidad antes que margen', body: 'Si la operación del cliente se detiene, perdimos. Inventario activo y SLA de respuesta son piso, no diferenciador.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="6"/></svg> },
  ];
  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Cuatro valores no negociables</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            Cómo decidimos cuando nadie ve.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 620 }}>
            La cultura interna que aplica desde el laboratorio hasta el embarque.
          </p>
        </div>
        <div className="ng-valores-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {valores.map((v, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid var(--ng-line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px 26px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: i === 2 ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
                  color: i === 2 ? 'var(--ng-green-700)' : 'var(--ng-blue)',
                  display: 'grid', placeItems: 'center',
                }}>{v.icon}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ng-steel)', letterSpacing: '0.04em' }}>{v.n}</div>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17, fontWeight: 700,
                margin: 0, color: 'var(--ng-ink)',
                letterSpacing: '-0.015em', lineHeight: 1.25,
              }}>{v.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .ng-valores-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ng-valores-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.NosotrosValores = NosotrosValores;
