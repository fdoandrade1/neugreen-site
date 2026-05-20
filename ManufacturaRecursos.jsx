// ManufacturaRecursos.jsx — sección de recurso descargable en manufactura.html
function ManufacturaRecursos() {
  const hasPdf = false; // cambiar a true cuando el PDF esté en assets/docs/

  const htmlUrl = 'assets/docs/onepager-manufactura.html';
  const pdfUrl  = 'assets/docs/onepager-manufactura.pdf';

  const IcoFileText = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0055b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );

  const IcoExternal = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  const IcoDownload = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const tags = ['Private Label', '6 pasos', 'SLP'];

  return (
    <section style={{ background: '#F4F8FB', padding: '64px 0', width: '100%' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#0055b8',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
          }}>RECURSO COMERCIAL</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28, fontWeight: 700, color: '#0B1B2B',
            margin: '0 0 8px', letterSpacing: '-0.015em', lineHeight: 1.2,
          }}>Descarga la propuesta de manufactura</h2>
          <p style={{ fontSize: 15, color: '#5A6B82', margin: 0, lineHeight: 1.6 }}>
            Una página con todo lo que necesitas saber antes de iniciar tu proyecto.
          </p>
        </div>

        {/* Single centered card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            borderTop: '3px solid #0055b8',
            padding: 28,
            boxShadow: '0 2px 12px rgba(0,85,184,0.08)',
            display: 'flex', flexDirection: 'column', gap: 16,
            width: '100%', maxWidth: 480,
          }}>

            {/* Icon + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#EEF3FF',
                display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <IcoFileText />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17, fontWeight: 700, color: '#0B1B2B',
                margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em',
              }}>Manufactura y Marca Privada</h3>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: '#5A6B82', lineHeight: 1.65, margin: 0 }}>
              Proceso de 6 pasos, líneas disponibles, para quién aplica y marcas activas. Listo para compartir con tu equipo o socios.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {tags.map((t, i) => (
                <span key={i} style={{
                  background: '#ECFAEC', color: '#2F9831',
                  borderRadius: 20, padding: '3px 10px',
                  fontSize: 11, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => window.open(htmlUrl, '_blank')}
                data-track="onepager-view"
                data-sector="manufactura"
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
                onMouseLeave={e => e.currentTarget.style.filter = ''}
                style={{
                  background: '#0055b8', color: '#fff',
                  border: 'none', borderRadius: 8,
                  padding: '10px 16px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                Ver One Pager
                <IcoExternal />
              </button>

              {hasPdf && (
                <a
                  href={pdfUrl}
                  download
                  data-track="onepager-download"
                  data-sector="manufactura"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0055b8'; e.currentTarget.style.color = '#0055b8'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F2'; e.currentTarget.style.color = '#0B1B2B'; }}
                  style={{
                    border: '1.5px solid #E2E8F2', background: '#fff', color: '#0B1B2B',
                    borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                >
                  Descargar PDF
                  <IcoDownload />
                </a>
              )}
            </div>

            {/* Foot note */}
            <div style={{ fontSize: 11, color: '#5A6B82' }}>1 página · Imprimible · Compartible</div>
          </div>
        </div>

      </div>
    </section>
  );
}

window.ManufacturaRecursos = ManufacturaRecursos;
