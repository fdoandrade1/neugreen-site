// BlogIndex.jsx — /blog · hero + filtro por línea + destacado + grid de tarjetas
const { useState: useStateBlog } = React;

const LINEAS_FILTRO = [
  { id: 'todos', label: 'Todos' },
  { id: 'productos', label: 'Productos de línea', linea: 'Productos de Línea' },
  { id: 'manufactura', label: 'Manufactura', linea: 'Manufactura' },
  { id: 'industrial', label: 'Industrial', linea: 'Industrial' },
];

function BlogIndex() {
  // Filtro inicial desde ?linea= (misma convención que ?tab= / ?area= / ?filtro=)
  const [filtro, setFiltro] = useStateBlog(() => {
    if (typeof window === 'undefined') return 'todos';
    const p = new URLSearchParams(window.location.search).get('linea');
    return LINEAS_FILTRO.some(f => f.id === p) ? p : 'todos';
  });

  const articulos = (typeof window !== 'undefined' && window.ARTICULOS) || [];
  const activo = LINEAS_FILTRO.find(f => f.id === filtro) || LINEAS_FILTRO[0];
  const coincide = (a) => filtro === 'todos' || a.linea === activo.linea;

  const visibles = articulos.filter(coincide);
  const destacado = visibles.find(a => a.destacado) || null;
  const enGrid = visibles.filter(a => a !== destacado);

  const countLabel = visibles.length === 1 ? '1 artículo' : `${visibles.length} artículos`;

  return (
    <div>
      {/* Hero */}
      <div style={{
        padding: 'clamp(64px, 8vw, 96px) var(--section-pad-x) 48px',
        borderBottom: '1px solid var(--ng-line)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -160, right: -160, width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0,85,184,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ng-blue)', marginBottom: 16,
          }}>Blog técnico</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.8vw, 60px)',
            fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05,
            margin: '0 0 18px', color: 'var(--ng-ink)', maxWidth: 900,
          }}>Notas técnicas de formulación, dosificación y tratamiento de agua.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ng-steel)', maxWidth: 660, margin: 0 }}>
            Lo que aprendemos en planta SLP y en operación de cliente, documentado con dosis, normativa y resultado medible. Sin humo comercial.
          </p>
        </div>
      </div>

      {/* Filtro por línea */}
      <div style={{ padding: '32px var(--section-pad-x) 0' }}>
        <div className="ng-filter-row" style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, paddingBottom: 28, borderBottom: '1px solid var(--ng-line)',
        }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {LINEAS_FILTRO.map(f => {
              const on = f.id === filtro;
              return (
                <button key={f.id} onClick={() => setFiltro(f.id)}
                  aria-pressed={on}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '11px 18px', minHeight: 44,
                    borderRadius: 'var(--r-pill)', cursor: 'pointer',
                    transition: 'background .12s ease, color .12s ease, border-color .12s ease',
                    border: `1px solid ${on ? 'var(--ng-blue)' : 'var(--ng-line)'}`,
                    background: on ? 'var(--ng-blue)' : 'var(--ng-white)',
                    color: on ? '#fff' : 'var(--ng-steel)',
                  }}>{f.label}</button>
              );
            })}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--ng-steel)', whiteSpace: 'nowrap',
          }}>{countLabel}</div>
        </div>
      </div>

      {/* Destacado */}
      {destacado && (
        <div style={{ padding: '48px var(--section-pad-x) 0' }}>
          <a className="ng-art-card ng-featured" href={`/blog/${destacado.slug}`} style={{
            display: 'grid', maxWidth: 'var(--container-max)', margin: '0 auto',
            gridTemplateColumns: '1.05fr 1fr',
            background: 'var(--ng-white)', border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r-lg)', overflow: 'hidden', textDecoration: 'none',
          }}>
            <div className="ng-featured-cover" style={{ position: 'relative', minHeight: 340, background: 'var(--ng-navy)' }}>
              {destacado.portada && (
                <img src={`/${destacado.portada}`} alt={destacado.portadaAlt || destacado.titulo}
                     style={{
                       position: 'absolute', inset: 0, width: '100%', height: '100%',
                       objectFit: 'cover', filter: 'saturate(.85) contrast(1.05)',
                     }} />
              )}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,85,184,.35) 0%, rgba(11,27,43,.65) 100%)',
              }} />
              <div style={{
                position: 'absolute', top: 18, left: 18,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 'var(--r-pill)',
                background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#fff',
              }}>Destacado</div>
            </div>

            <div style={{
              padding: 'clamp(28px, 3vw, 44px)', display: 'flex',
              flexDirection: 'column', gap: 16, justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ng-blue)',
              }}>{destacado.linea} · {destacado.categoria}</div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 2.6vw, 34px)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                margin: 0, color: 'var(--ng-ink)',
              }}>{destacado.titulo}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ng-steel)', margin: 0, maxWidth: 520 }}>
                {destacado.extracto}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
                color: 'var(--ng-steel)', flexWrap: 'wrap',
              }}>
                <span>{destacado.fechaTexto}</span><span style={{ opacity: .4 }}>·</span>
                <span>{destacado.lectura}</span><span style={{ opacity: .4 }}>·</span>
                <span>{destacado.autor}</span>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 700, color: 'var(--ng-blue)', marginTop: 4,
              }}>Leer artículo
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Grid */}
      <div style={{ padding: '32px var(--section-pad-x) clamp(80px, 8vw, 112px)' }}>
        <div className="ng-blog-grid" style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch',
        }}>
          {enGrid.map(a => <ArticuloCard key={a.slug} articulo={a} />)}
        </div>

        {visibles.length === 0 && (
          <div style={{
            maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 0',
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ng-steel)',
          }}>No hay artículos en esta línea todavía.</div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ng-blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ng-featured { grid-template-columns: 1fr !important; }
          .ng-featured-cover { min-height: 280px !important; }
        }
        @media (max-width: 560px) {
          .ng-blog-grid { grid-template-columns: 1fr !important; }
          .ng-filter-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}

window.BlogIndex = BlogIndex;
