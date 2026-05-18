// Selector.jsx — "¿Qué necesitas resolver?" — three equivalent business-line entry cards
function SelectorCard({ icon, prompt, line, body, accent, onClick }) {
  const isGreen = accent === 'green';
  return (
    <button
      onClick={onClick}
      data-lead-source={`selector-${line.toLowerCase()}`}
      className="ng-selector-card"
      style={{
        background: '#fff',
        border: '1px solid var(--ng-line)',
        borderRadius: 'var(--r-xl)',
        padding: '36px 32px 32px',
        textAlign: 'left',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        font: 'inherit',
        color: 'inherit',
      }}>
      <div style={{
        width: 56, height: 56,
        background: isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
        color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)',
        borderRadius: 14,
        display: 'grid', placeItems: 'center',
      }}>
        {icon}
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
          color: 'var(--ng-ink)',
          margin: '0 0 8px',
        }}>
          {prompt}
        </p>
        <p style={{
          fontSize: 14,
          color: 'var(--ng-steel)',
          margin: 0,
          lineHeight: 1.55,
        }}>
          {body}
        </p>
      </div>

      <div style={{
        marginTop: 'auto',
        paddingTop: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid var(--ng-line)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ng-steel)',
          fontWeight: 600,
        }}>
          → {line}
        </span>
        <span className="ng-arrow" style={{
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'var(--ng-mist)',
          display: 'grid', placeItems: 'center',
          color: 'var(--ng-blue)',
          transition: 'background .15s ease, transform .15s ease',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </span>
      </div>
    </button>
  );
}

function Selector({ onPick }) {
  const cards = [
    {
      line: 'Productos',
      accent: 'blue',
      // Lucide · spray-can
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18"/><path d="M7 3v3"/><path d="M11 3v3"/><path d="M9 6h6a2 2 0 0 1 2 2v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2Z"/><circle cx="12" cy="14" r="2"/></svg>,
      prompt: 'Quiero productos para mantener limpio mi espacio.',
      body: 'Línea completa de químicos, enzimáticos, desinfectantes, multiusos y lavandería. Cumplimiento normativo documentado.',
    },
    {
      line: 'Manufactura',
      accent: 'green',
      // Lucide · factory
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>,
      prompt: 'Quiero fabricar mi propia marca de químicos.',
      body: 'Formulación, escalamiento, envasado, etiquetado y soporte regulatorio. Tu marca, nuestra planta.',
    },
    {
      line: 'Industrial',
      accent: 'blue',
      // Lucide · gauge
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>,
      prompt: 'Tengo un proceso industrial que mejorar.',
      body: 'Tratamiento de agua, PTAR, torres, calderas, dosificación y bioaumentación. Ingeniería + suministro + soporte.',
    },
  ];

  return (
    <section id="selector" style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>¿Qué necesitas resolver?</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Tres caminos. Una sola planta detrás.
          </h2>
          <p style={{
            fontSize: 17, color: 'var(--ng-steel)',
            margin: 0, lineHeight: 1.55, maxWidth: 620,
          }}>
            Identifica tu necesidad en menos de 15 segundos y te conectamos con el asesor técnico correcto — no con un call center.
          </p>
        </div>

        <div className="ng-selector-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}>
          {cards.map((c, i) => (
            <SelectorCard key={i} {...c} onClick={() => onPick && onPick(c.line.toLowerCase())} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .ng-selector-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ng-selector-grid { grid-template-columns: 1fr !important; }
          .ng-selector-grid button { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

window.Selector = Selector;
