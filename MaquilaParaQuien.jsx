// MaquilaParaQuien.jsx — "¿Para quién es esto?" 4 audience cards
function MaquilaParaQuien() {
  const items = [
    {
      title: 'Marcas en crecimiento',
      body: 'Operadores de limpieza, distribuidores regionales o empresas con cartera de clientes que quieren cerrar el círculo con marca propia.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 7 8m0 0 4 4M7 8v13M21 12l-4 4m0 0-4-4m4 4V3"/></svg>,
    },
    {
      title: 'Distribuidores con marca privada',
      body: 'Comercializadores que quieren tener línea propia diferenciada del catálogo genérico — sin invertir en planta, laboratorio o registro sanitario.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h13v8H3z"/><path d="M16 10h3l2 3v2h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
    },
    {
      title: 'Cadenas retail y horeca',
      body: 'Cadenas de hoteles, restaurantes o retail con consumo recurrente de químicos que buscan estandarizar formulación, presentación y proveeduría única.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/></svg>,
    },
    {
      title: 'Empresas con línea de negocio nueva',
      body: 'Equipos que quieren lanzar línea propia (alimenticio, salud, beauty profesional) y necesitan socio de manufactura confiable con cumplimiento regulatorio.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>¿Para quién es esto?</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Cuatro perfiles que más manufacturamos.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
            Si no estás aquí, no significa que no aplique. Cuéntanos tu caso.
          </p>
        </div>

        <div className="ng-paraquien-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 18,
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid var(--ng-line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px 30px',
              display: 'flex', gap: 20,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 12,
                background: 'var(--ng-green-50)',
                color: 'var(--ng-green-700)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
              }}>
                {it.icon}
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 700,
                  margin: '0 0 8px',
                  color: 'var(--ng-ink)',
                  letterSpacing: '-0.01em',
                }}>{it.title}</h4>
                <p style={{
                  fontSize: 14,
                  color: 'var(--ng-steel)',
                  margin: 0,
                  lineHeight: 1.55,
                }}>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ng-paraquien-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.MaquilaParaQuien = MaquilaParaQuien;
