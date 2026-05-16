// ProductosHero.jsx — compact inner-page hero with breadcrumb
function ProductosHero() {
  return (
    <section style={{
      padding: 'clamp(80px, 9vw, 120px) var(--section-pad-x) 56px',
      background: 'var(--ng-cloud)',
      borderBottom: '1px solid var(--ng-line)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-160px', right: '-160px',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,85,184,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        {/* breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ng-steel)', marginBottom: 28,
          letterSpacing: '0.04em',
        }}>
          <a href="index.html" style={{ color: 'var(--ng-steel)', textDecoration: 'none' }}>Inicio</a>
          <span style={{ opacity: .4 }}>/</span>
          <span style={{ color: 'var(--ng-ink)', fontWeight: 600 }}>Productos de limpieza y desinfección</span>
        </div>

        <div className="eyebrow" style={{ marginBottom: 14 }}>Catálogo · 7 categorías · 19 sub-familias</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 4.8vw, 60px)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          margin: '0 0 18px',
          color: 'var(--ng-ink)',
          maxWidth: 920,
        }}>
          Limpieza y desinfección con cumplimiento documentado.
        </h1>
        <p style={{
          fontSize: 18, lineHeight: 1.55,
          color: 'var(--ng-steel)',
          maxWidth: 640, margin: 0,
        }}>
          Siete categorías formuladas en planta SLP — desde limpieza convencional y enzimática hasta desinfección industrial, body care, aroma experience y jarciería institucional. Stock activo, fichas técnicas, HDS y respaldo COFEPRIS.
        </p>
      </div>
    </section>
  );
}

window.ProductosHero = ProductosHero;
