// ArticuloCard.jsx — tarjeta de artículo reutilizable (índice del blog,
// artículos relacionados y bloques de contenido en otras páginas).
//
// Anatomía fija (handoff Claude Design): radius 14px · borde 1px · portada
// 16:9 · eyebrow mono 11/.16em · extracto a 2 líneas con line-clamp · meta
// siempre al fondo. Cambia el contenido, nunca la estructura.

const NG_CARD_CSS = `
.ng-art-card {
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.ng-art-card:hover {
  transform: translateY(-2px);
  border-color: var(--ng-blue-100);
  box-shadow: var(--shadow);
}
.ng-art-card--dark:hover {
  border-color: var(--ng-green);
  box-shadow: 0 20px 50px -20px rgba(0,63,197,.5);
}
`;

// Iconos de portada (fallback oficial cuando no hay fotografía).
const ICONOS = {
  agua: <><path d="M2 7c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/><path d="M2 13c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/><path d="M2 19c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/></>,
  matraz: <><path d="M10 2v7.31L4.7 18.6A1 1 0 0 0 5.57 20h12.86a1 1 0 0 0 .87-1.4L14 9.3V2"/><path d="M8.5 2h7M7 16h10"/></>,
  etiqueta: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.2"/></>,
  medidor: <><path d="M3.5 18a9 9 0 1 1 17 0"/><path d="M12 14l4-4"/></>,
  trampa: <><path d="M3 4h18l-7 8.5V21l-4-2.2v-6.3z"/><path d="M9 8h6"/></>,
  planta: <><path d="M2 20h20M5 20V11l5 3V11l5 3V11l4 2.5V20"/><path d="M9 20v-3h3v3"/></>,
  escudo: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
  gota: <path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z"/>,
};

// Color del eyebrow y fondo de portada según la línea de negocio.
function tonoLinea(linea, dark) {
  if (dark) return { eyebrow: 'var(--ng-green)', portada: 'rgba(255,255,255,.04)', icono: '#fff' };
  if (linea === 'Manufactura') return { eyebrow: 'var(--ng-green-700)', portada: 'var(--ng-mist)', icono: 'var(--ng-blue)' };
  if (linea === 'Productos de Línea') return { eyebrow: 'var(--ng-blue)', portada: 'var(--ng-green-50)', icono: 'var(--ng-green-700)' };
  return { eyebrow: 'var(--ng-blue)', portada: 'var(--ng-blue-50)', icono: 'var(--ng-blue)' };
}

// Inyecta el CSS de hover una sola vez, sin duplicar <style> por tarjeta.
function useCardStyles() {
  React.useEffect(() => {
    if (document.getElementById('ng-art-card-css')) return;
    const el = document.createElement('style');
    el.id = 'ng-art-card-css';
    el.textContent = NG_CARD_CSS;
    document.head.appendChild(el);
  }, []);
}

function ArticuloCard({ articulo, dark = false }) {
  useCardStyles();
  if (!articulo) return null;

  const tono = tonoLinea(articulo.linea, dark);
  const bordeColor = dark ? '#1f3d5e' : 'var(--ng-line)';

  return (
    <a
      className={`ng-art-card${dark ? ' ng-art-card--dark' : ''}`}
      href={`/blog/${articulo.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: dark ? 'var(--bg-tech-dark)' : 'var(--ng-white)',
        border: `1px solid ${bordeColor}`,
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}>

      {/* Portada 16:9 — foto real si existe, si no icono line + etiqueta de tema */}
      {articulo.portada ? (
        <div style={{
          aspectRatio: '16 / 9', position: 'relative',
          borderBottom: `1px solid ${bordeColor}`, background: 'var(--ng-navy)',
        }}>
          <img src={`/${articulo.portada}`} alt={articulo.portadaAlt || articulo.titulo}
               loading="lazy"
               style={{
                 position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', filter: 'saturate(.85) contrast(1.05)',
               }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(11,27,43,0) 40%, rgba(11,27,43,.7) 100%)',
          }} />
          {articulo.portadaTag && (
            <span style={{
              position: 'absolute', bottom: 12, left: 14,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,.9)',
            }}>{articulo.portadaTag}</span>
          )}
        </div>
      ) : (
        <div style={{
          aspectRatio: '16 / 9', background: tono.portada,
          borderBottom: `1px solid ${bordeColor}`,
          display: 'grid', placeItems: 'center', position: 'relative',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={tono.icono}
               strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
            {ICONOS[articulo.portadaIcono] || ICONOS.gota}
          </svg>
          {articulo.portadaTag && (
            <span style={{
              position: 'absolute', bottom: 12, left: 14,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: dark ? 'rgba(255,255,255,.6)' : 'var(--ng-steel)',
            }}>{articulo.portadaTag}</span>
          )}
        </div>
      )}

      {/* Cuerpo — meta anclada al fondo con margin-top auto */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: tono.eyebrow,
        }}>{articulo.linea}</div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
          letterSpacing: '-0.01em', lineHeight: 1.3, margin: 0,
          color: dark ? '#fff' : 'var(--ng-ink)',
        }}>{articulo.titulo}</h3>

        <p style={{
          fontSize: 14, lineHeight: 1.55, margin: 0,
          color: dark ? 'rgba(255,255,255,.7)' : 'var(--ng-steel)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{articulo.extracto}</p>

        <div style={{
          marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${bordeColor}`,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
          color: dark ? 'rgba(255,255,255,.55)' : 'var(--ng-steel)',
        }}>
          <span>{articulo.lectura}</span><span>{articulo.fechaTexto}</span>
        </div>
      </div>
    </a>
  );
}

window.ArticuloCard = ArticuloCard;
window.NG_ICONOS_ARTICULO = ICONOS;
