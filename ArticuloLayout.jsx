// ArticuloLayout.jsx — /blog/<slug> · plantilla de artículo, ancho de lectura 720 px
//
// Recibe `slug`, busca la entrada en window.ARTICULOS y arma la página:
// breadcrumb · encabezado · portada · respuesta rápida · cuerpo · CTA
// intermedio · productos relacionados · CTA final · artículos relacionados.

const NG_WA = 'https://www.neugreen.mx/whatsapp';
const NG_TEL_TEXTO = '+52 444 256 5697';

function IconoWhatsApp({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.2 5.2 4.5 1.9.8 2.7.9 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 .5C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.7L.4 23.5l5.9-1.6c1.7.9 3.7 1.4 5.7 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5" />
    </svg>
  );
}

function ArticuloLayout({ slug }) {
  const todos = (typeof window !== 'undefined' && window.ARTICULOS) || [];
  const a = todos.find(x => x.slug === slug);

  if (!a) {
    return (
      <div style={{ padding: 'clamp(80px, 10vw, 140px) var(--section-pad-x)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--ng-ink)', margin: '0 0 12px' }}>
          Artículo no encontrado
        </h1>
        <p style={{ color: 'var(--ng-steel)', margin: '0 0 24px' }}>Es posible que el enlace haya cambiado.</p>
        <a href="/blog.html" style={{ color: 'var(--ng-blue)', fontWeight: 700 }}>Volver al blog</a>
      </div>
    );
  }

  const relacionados = (a.articulosRelacionados || [])
    .map(s => todos.find(x => x.slug === s))
    .filter(Boolean);

  const productos = a.productosRelacionados || [];
  const ICONOS = (typeof window !== 'undefined' && window.NG_ICONOS_ARTICULO) || {};

  return (
    <article style={{ padding: '48px var(--section-pad-x) 0' }}>

      {/* Encabezado */}
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <nav aria-label="Ruta" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
          color: 'var(--ng-steel)', marginBottom: 28, flexWrap: 'wrap',
        }}>
          <a href="/index.html" style={{ color: 'var(--ng-steel)' }}>Inicio</a><span style={{ opacity: .4 }}>/</span>
          <a href="/blog.html" style={{ color: 'var(--ng-steel)' }}>Blog</a><span style={{ opacity: .4 }}>/</span>
          <span style={{ color: 'var(--ng-ink)', fontWeight: 600 }}>{a.categoria}</span>
        </nav>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--ng-blue)', marginBottom: 16,
        }}>{a.linea} · {a.categoria}</div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 46px)',
          fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.08,
          margin: '0 0 20px', color: 'var(--ng-ink)',
        }}>{a.titulo}</h1>

        <div className="ng-meta-row" style={{
          display: 'flex', alignItems: 'center', gap: 14,
          paddingBottom: 24, borderBottom: '1px solid var(--ng-line)',
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
          color: 'var(--ng-steel)', flexWrap: 'wrap',
        }}>
          <span>{a.fechaTexto}</span><span style={{ opacity: .4 }}>·</span>
          <span>{a.lectura}</span><span style={{ opacity: .4 }}>·</span>
          <span style={{ color: 'var(--ng-ink)', fontWeight: 500 }}>{a.autor}</span>
        </div>
      </div>

      {/* Portada */}
      {a.portada && (
        <div style={{ maxWidth: 720, margin: '32px auto 0' }}>
          <div style={{
            position: 'relative', aspectRatio: '16 / 9',
            borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--ng-navy)',
          }}>
            <img src={`/${a.portada}`} alt={a.portadaAlt || a.titulo}
                 style={{
                   position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', filter: 'saturate(.85) contrast(1.05)',
                 }} />
          </div>
          {a.portadaPie && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
              color: 'var(--ng-steel)', marginTop: 10,
            }}>{a.portadaPie}</div>
          )}
        </div>
      )}

      {/* Respuesta rápida */}
      {a.respuestaRapida && (
        <div style={{ maxWidth: 720, margin: '40px auto 0' }}>
          <div style={{
            background: 'var(--ng-mist)', border: '1px solid var(--ng-line)',
            borderLeft: '3px solid var(--ng-blue)', borderRadius: 'var(--r-lg)',
            padding: '26px 28px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ng-blue)', marginBottom: 14,
            }}>Respuesta rápida</div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ng-ink)', margin: '0 0 18px', fontWeight: 500 }}>
              {a.respuestaRapida.parrafo}
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(a.respuestaRapida.puntos || []).map((p, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: 15, lineHeight: 1.5, color: 'var(--ng-ink)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)"
                       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                       style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                  <span dangerouslySetInnerHTML={{ __html: p }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Cuerpo — HTML editorial de articulos-data.js (contenido de confianza, del repo) */}
      <div className="ng-articulo-cuerpo" style={{ maxWidth: 720, margin: '0 auto', paddingTop: 48 }}
           dangerouslySetInnerHTML={{ __html: a.cuerpo || '' }} />

      {/* CTA intermedio */}
      <div style={{ maxWidth: 720, margin: '0 auto 44px' }}>
        <div className="ng-midcta" style={{
          background: 'var(--ng-blue-50)', border: '1px solid var(--ng-blue-100)',
          borderRadius: 'var(--r)', padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ng-blue)', marginBottom: 6,
            }}>Diagnóstico sin costo</div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ng-ink)' }}>
              Cuéntanos tu caso y te decimos si esto aplica en tu operación.
            </div>
          </div>
          <a href={NG_WA} target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 700, color: 'var(--ng-blue)', whiteSpace: 'nowrap',
          }}>
            <IconoWhatsApp size={16} /> WhatsApp {NG_TEL_TEXTO}
          </a>
        </div>
      </div>

      {/* Productos relacionados */}
      {productos.length > 0 && (
        <div style={{ maxWidth: 720, margin: '0 auto 48px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ng-steel)', marginBottom: 18,
          }}>Productos relacionados</div>
          <div className="ng-rel-prod" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(productos.length, 3)}, 1fr)`,
            gap: 14,
          }}>
            {productos.map((p, i) => (
              <a key={i} className="ng-prod-card" href={p.href} style={{
                display: 'flex', flexDirection: 'column', gap: 12,
                background: 'var(--ng-mist)', border: '1px solid var(--ng-line)',
                borderRadius: 'var(--r-lg)', padding: 20, textDecoration: 'none',
                transition: 'background .15s ease, border-color .15s ease',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-pill)',
                  background: 'var(--ng-blue-50)', display: 'grid', placeItems: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)"
                       strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {ICONOS[p.icono] || ICONOS.gota}
                  </svg>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                  letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--ng-ink)',
                }}>{p.nombre}</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ng-steel)' }}>{p.desc}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 700, color: 'var(--ng-blue)', marginTop: 'auto',
                }}>Ver familia
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* CTA final */}
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="ng-final-cta" style={{
          background: 'var(--ng-ink)', borderRadius: 'var(--r-xl)', padding: '44px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 28, flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -40, top: -40, width: 200, height: 200,
            borderRadius: '50%', background: 'rgba(65,190,67,.16)', filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', maxWidth: 420 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
              letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 10px', color: '#fff',
            }}>¿Necesitas resolver esto en tu operación?</h3>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,.75)', margin: '0 0 14px' }}>
              Revisamos tu caso y te decimos qué aplica y qué no. Respuesta en menos de 24 h hábiles.
            </p>
            <div style={{
              display: 'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'rgba(255,255,255,.6)', flexWrap: 'wrap',
            }}>
              <span>ventas@neugreen.mx</span><span>{NG_TEL_TEXTO}</span>
            </div>
          </div>
          <a href={NG_WA} target="_blank" rel="noopener" style={{
            position: 'relative', background: 'var(--ng-green)', color: '#fff',
            fontWeight: 700, fontSize: 15, padding: '18px 28px',
            borderRadius: 'var(--r-lg)', display: 'inline-flex', alignItems: 'center',
            gap: 10, boxShadow: '0 12px 30px -10px rgba(65,190,67,.55)',
            flexShrink: 0, textDecoration: 'none',
          }}>
            <IconoWhatsApp size={18} /> Hablar con un experto
          </a>
        </div>
      </div>

      {/* Artículos relacionados */}
      {relacionados.length > 0 && (
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: 'clamp(64px, 7vw, 96px) 0 clamp(80px, 8vw, 112px)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            gap: 20, paddingBottom: 24, borderBottom: '1px solid var(--ng-line)',
            marginBottom: 28, flexWrap: 'wrap',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
              letterSpacing: '-0.02em', margin: 0, color: 'var(--ng-ink)',
            }}>Artículos relacionados</h2>
            <a href="/blog.html" style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--ng-blue)',
            }}>Ver todo el blog</a>
          </div>
          <div className="ng-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {relacionados.map(r => <ArticuloCard key={r.slug} articulo={r} />)}
          </div>
        </div>
      )}

      <style>{`
        .ng-prod-card:hover { background: var(--ng-white); border-color: var(--ng-blue-100); }

        /* Prosa del cuerpo — el HTML viene de articulos-data.js */
        .ng-articulo-cuerpo h2 {
          font-family: var(--font-display); font-size: 30px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.15; margin: 44px 0 16px; color: var(--ng-ink);
        }
        .ng-articulo-cuerpo > h2:first-child { margin-top: 0; }
        .ng-articulo-cuerpo h3 {
          font-family: var(--font-display); font-size: 22px; font-weight: 700;
          letter-spacing: -0.015em; line-height: 1.25; margin: 36px 0 14px; color: var(--ng-ink);
        }
        .ng-articulo-cuerpo p { font-size: 17px; line-height: 1.7; color: var(--ng-ink); margin: 0 0 20px; }
        .ng-articulo-cuerpo strong { font-weight: 700; }
        .ng-articulo-cuerpo a { color: var(--ng-blue); text-decoration: underline; }
        .ng-articulo-cuerpo ul {
          list-style: none; margin: 0 0 24px; padding: 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ng-articulo-cuerpo ul li {
          position: relative; padding-left: 18px;
          font-size: 17px; line-height: 1.6; color: var(--ng-ink);
        }
        .ng-articulo-cuerpo ul li::before {
          content: ''; position: absolute; left: 0; top: 11px;
          width: 6px; height: 6px; border-radius: 999px; background: var(--ng-blue);
        }
        .ng-articulo-cuerpo table {
          width: 100%; border-collapse: collapse; margin: 0 0 12px; font-size: 15px;
        }
        .ng-articulo-cuerpo th {
          text-align: left; font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ng-steel);
          background: var(--ng-mist); border: 1px solid var(--ng-line); padding: 12px 14px;
        }
        .ng-articulo-cuerpo td {
          border: 1px solid var(--ng-line); padding: 12px 14px; color: var(--ng-ink);
        }
        .ng-articulo-cuerpo tbody tr:nth-child(even) td { background: var(--ng-cloud); }
        .ng-articulo-cuerpo .ng-tabla-nota {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--ng-steel); margin-bottom: 36px; line-height: 1.5;
        }
        .ng-articulo-cuerpo blockquote {
          margin: 0 0 36px; padding: 4px 0 4px 24px; border-left: 3px solid var(--ng-blue);
        }
        .ng-articulo-cuerpo blockquote p {
          font-family: var(--font-display); font-size: 22px; font-weight: 700;
          line-height: 1.4; letter-spacing: -0.015em; color: var(--ng-ink); margin: 0 0 10px;
        }
        .ng-articulo-cuerpo blockquote footer {
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--ng-steel);
        }

        @media (max-width: 1024px) {
          .ng-rel-prod { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .ng-meta-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .ng-midcta { flex-direction: column !important; align-items: flex-start !important; }
          .ng-final-cta { flex-direction: column !important; align-items: flex-start !important; padding: 32px 24px !important; }
        }
        @media (max-width: 640px) {
          .ng-articulo-cuerpo table { display: block; overflow-x: auto; white-space: nowrap; }
        }
        @media (max-width: 560px) {
          .ng-related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </article>
  );
}

window.ArticuloLayout = ArticuloLayout;
