// NosotrosHero.jsx
function NosotrosHero() {
  return (
    <section style={{
      padding: 'clamp(80px, 9vw, 120px) var(--section-pad-x) 56px',
      background: 'var(--ng-cloud)',
      borderBottom: '1px solid var(--ng-line)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,85,184,.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ng-steel)', marginBottom: 28, letterSpacing: '0.04em',
        }}>
          <a href="index.html" style={{ color: 'var(--ng-steel)', textDecoration: 'none' }}>Inicio</a>
          <span style={{ opacity: .4 }}>/</span>
          <span style={{ color: 'var(--ng-ink)', fontWeight: 600 }}>Nosotros</span>
        </div>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Sobre Neugreen</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05,
          margin: '0 0 18px', color: 'var(--ng-ink)', maxWidth: 960,
        }}>
          No vendemos químicos. <span style={{ color: 'var(--ng-blue)' }}>Integramos operaciones críticas.</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ng-steel)', maxWidth: 680, margin: 0 }}>
          Biotecnología B2B con planta propia en San Luis Potosí. Nuestro trabajo se mide en continuidad, ahorro y cumplimiento — no en eslóganes.
        </p>
      </div>
    </section>
  );
}
window.NosotrosHero = NosotrosHero;
