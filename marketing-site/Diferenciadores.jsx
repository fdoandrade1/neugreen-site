// Diferenciadores.jsx — "Por qué Neugreen" — 4 reasons in 2×2 / row of 4
function Diferenciadores() {
  const items = [
    {
      n: '01',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v3H9z"/><path d="M9 6v4l-5 9a2 2 0 0 0 1.8 2.9H18.2A2 2 0 0 0 20 19l-5-9V6"/><path d="M7 14h10"/></svg>,
      title: 'Formulación propia',
      body: 'Laboratorio interno con escalamiento documentado. Cada lote se valida antes de salir.',
    },
    {
      n: '02',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>,
      title: 'Cumplimiento documentado',
      body: 'Fichas técnicas, HDS, COFEPRIS y normativas NOM. La regulación es piso, no techo.',
    },
    {
      n: '03',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12c5-2 13-2 18 0M12 3c2 3 3 6 3 9s-1 6-3 9c-2-3-3-6-3-9s1-6 3-9Z"/></svg>,
      title: 'Biotecnología real',
      body: 'Enzimas y bioaumentación con resultados medibles. Sin "verde" como adjetivo decorativo.',
    },
    {
      n: '04',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="m9 7 6 0M7 8l4 8M17 8l-4 8"/></svg>,
      title: 'Red de colaboradores',
      body: 'Obra civil, hidráulica, eléctrica e instrumentación. Proyectos integrales, no entregas sueltas.',
    },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Por qué Neugreen</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Cuatro diferenciadores. Cero adjetivos vacíos.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 580 }}>
            Lo que un distribuidor genérico no puede igualar — y por qué un comprador industrial paga la diferencia.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid var(--ng-line)',
              borderRadius: 'var(--r-lg)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = 'var(--ng-line)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 12,
                  background: 'var(--ng-blue-50)',
                  color: 'var(--ng-blue)',
                  display: 'grid', placeItems: 'center',
                }}>
                  {it.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--ng-steel)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}>{it.n}</div>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                fontWeight: 700,
                margin: 0,
                color: 'var(--ng-ink)',
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
              }}>{it.title}</h3>
              <p style={{
                fontSize: 14,
                color: 'var(--ng-steel)',
                margin: 0,
                lineHeight: 1.55,
              }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Diferenciadores = Diferenciadores;
