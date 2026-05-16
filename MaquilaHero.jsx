// MaquilaHero.jsx — breadcrumb hero
function MaquilaHero() {
  return (
    <section style={{
      padding: 'clamp(80px, 9vw, 120px) var(--section-pad-x) 56px',
      background: 'var(--ng-cloud)',
      borderBottom: '1px solid var(--ng-line)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-180px', right: '-180px',
        width: 560, height: 560,
        background: 'radial-gradient(circle, rgba(65,190,67,.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ng-steel)', marginBottom: 28,
          letterSpacing: '0.04em',
        }}>
          <a href="index.html" style={{ color: 'var(--ng-steel)', textDecoration: 'none' }}>Inicio</a>
          <span style={{ opacity: .4 }}>/</span>
          <span style={{ color: 'var(--ng-ink)', fontWeight: 600 }}>Manufactura y marca privada</span>
        </div>

        <div className="eyebrow" style={{ color: 'var(--ng-green-700)', marginBottom: 14 }}>Línea 02 · Manufactura</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          margin: '0 0 18px',
          color: 'var(--ng-ink)',
          maxWidth: 960,
        }}>
          Tu marca. Nuestra planta. <span style={{ color: 'var(--ng-green-700)' }}>Cumplimiento documentado.</span>
        </h1>
        <p style={{
          fontSize: 18, lineHeight: 1.55,
          color: 'var(--ng-steel)',
          maxWidth: 680, margin: 0,
        }}>
          Formulación, laboratorio, envasado y entrega bajo tu marca. Seis pasos auditables — desde el brief inicial hasta el embarque FOB SLP.
        </p>
      </div>
    </section>
  );
}

window.MaquilaHero = MaquilaHero;
