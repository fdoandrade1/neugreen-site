// TechnicalSolutions.jsx — dark premium section with 3 industrial cards
function SolutionCard({ icon, title, body, stat, statLabel }) {
  return (
    <div className="ng-card-dark" style={{
      background: '#102942',
      border: '1px solid #1f3d5e',
      borderRadius: 'var(--r-lg)',
      padding: 28,
      color: '#fff',
      transition: 'border-color .15s ease, box-shadow .15s ease',
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48,
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.10)',
          borderRadius: 'var(--r)',
          display: 'grid', placeItems: 'center',
          color: '#fff',
        }}>
          {icon}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 28, lineHeight: 1, color: 'var(--ng-green)',
            letterSpacing: '-0.02em',
          }}>{stat}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 4, letterSpacing: '0.04em' }}>{statLabel}</div>
        </div>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22, fontWeight: 700, margin: '0 0 10px',
        color: '#fff', letterSpacing: '-0.015em',
      }}>{title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.6,
        color: 'rgba(255,255,255,.70)', margin: '0 0 18px',
      }}>{body}</p>
      <div style={{
        color: 'var(--ng-green)', fontWeight: 700, fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        Conocer más
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
}

function TechnicalSolutions() {
  const icons = {
    water:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/><path d="M8 14a4 4 0 0 0 4 4"/></svg>,
    tower:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-6h6v6"/><path d="M9 11h6"/></svg>,
    gauge:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14a3 3 0 1 0-3-3"/><path d="M2 14a10 10 0 0 1 20 0"/><path d="m13 11 5-5"/></svg>,
  };

  const cards = [
    { icon: icons.water, stat: '8', statLabel: 'PTARs operando', title: 'Tratamiento de agua (PTAR)', body: 'Diseño, operación y bioaumentación. Reducción DBO/DQO sin químicos agresivos. Cumplimiento NOM-001 garantizado.' },
    { icon: icons.tower, stat: '24/7', statLabel: 'Soporte técnico', title: 'Torres y calderas', body: 'Control de incrustación, corrosión, biopelícula y consumo químico. Auditoría inicial sin costo.' },
    { icon: icons.gauge, stat: '18%', statLabel: 'Ahorro promedio', title: 'Dosificación inteligente', body: 'Bombas, sensores y telemetría para procesos críticos. Ahorro químico medible en 90 días.' },
  ];

  return (
    <section style={{
      background: 'var(--ng-navy)',
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      color: '#fff',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ color: '#A6C8FF', marginBottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              03 · Soluciones industriales
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', color: '#fff', maxWidth: 720, lineHeight: 1.1 }}>
              Procesos que no pueden detenerse.<br/>Soluciones técnicas que tampoco.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,.72)', maxWidth: 560, margin: 0, lineHeight: 1.55 }}>
              Para industria, agua y energía. Ingeniería de proyecto, suministro y soporte técnico en planta.
            </p>
          </div>
          <button style={{
            background: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,.22)',
            fontWeight: 700, fontSize: 14, padding: '12px 22px',
            borderRadius: 'var(--r)', cursor: 'pointer',
          }}>Hablar con un ingeniero</button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 18,
        }}>
          {cards.map((c, i) => <SolutionCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  );
}

window.TechnicalSolutions = TechnicalSolutions;
