// IndustrialRecursos.jsx — sección de recursos descargables (one pagers) en industrial
function IndustrialRecursos() {

  // hasPdf: true cuando los PDFs existan en assets/docs/
  const cards = [
    {
      title: 'Limpieza y desinfección en planta',
      desc: 'Portafolio completo de productos, sistemas de dosificación automática SEKO y propuesta de servicio para naves industriales, manufactura y operaciones de alto tráfico.',
      tags: ['Productos', 'Dosificación SEKO', 'Jarciería'],
      htmlUrl: 'assets/docs/onepager-industrial-limpieza.html',
      pdfUrl:  'assets/docs/onepager-industrial-limpieza.pdf',
      hasPdf:  false,
      dataSector: 'industrial-limpieza',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0055b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2h6v4H9z"/><rect x="7" y="6" width="10" height="14" rx="1"/>
          <path d="M3 8h4M3 12h4"/><circle cx="12" cy="13" r="2"/>
        </svg>
      ),
    },
    {
      title: 'Tratamiento de agua e industrial avanzado',
      desc: '10 áreas de servicio: análisis técnico, laboratorio y normatividad, PTAR, torres de enfriamiento, calderas, dosificación, ingeniería de proyecto y suministro de equipo.',
      tags: ['PTAR', 'Ingeniería', 'Equipamiento'],
      htmlUrl: 'assets/docs/onepager-industrial-agua.html',
      pdfUrl:  'assets/docs/onepager-industrial-agua.pdf',
      hasPdf:  false,
      dataSector: 'industrial-agua',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0055b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 7 7 10 7 13a5 5 0 0010 0c0-3-1.5-6-5-11z"/>
          <path d="M7 18c-2 .7-4-.3-4-2.5S5 12 7 12"/>
          <path d="M17 18c2 .7 4-.3 4-2.5S19 12 17 12"/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: '#F4F8FB', padding: '72px 0', width: '100%' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#0055b8',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
          }}>RECURSOS TÉCNICOS</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28, fontWeight: 700, color: '#0B1B2B',
            margin: '0 0 8px', letterSpacing: '-0.015em', lineHeight: 1.2,
          }}>Descarga la propuesta para tu operación</h2>
          <p style={{ fontSize: 15, color: '#5A6B82', margin: 0, lineHeight: 1.6 }}>
            Documentos técnicos de una página, listos para compartir con tu equipo o dirección.
          </p>
        </div>

        {/* Grid */}
        <div className="ng-rec-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 12,
              borderTop: '3px solid #0055b8',
              padding: 28,
              boxShadow: '0 2px 12px rgba(0,85,184,0.08)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: '#EEF3FF',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17, fontWeight: 700, color: '#0B1B2B',
                  margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em',
                }}>{c.title}</h3>
              </div>

              {/* Description */}
              <p style={{ fontSize: 14, color: '#5A6B82', lineHeight: 1.65, margin: 0, flex: 1 }}>
                {c.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {c.tags.map((t, j) => (
                  <span key={j} style={{
                    background: '#ECFAEC', color: '#2F9831',
                    borderRadius: 20, padding: '3px 10px',
                    fontSize: 11, fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
                <button
                  onClick={() => window.open(c.htmlUrl, '_blank')}
                  data-track="onepager-view"
                  data-sector={c.dataSector}
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
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>

                {c.hasPdf && (
                  <a
                    href={c.pdfUrl}
                    download
                    data-track="onepager-download"
                    data-sector={c.dataSector}
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
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </a>
                )}
              </div>

              {/* Foot note */}
              <div style={{ fontSize: 11, color: '#5A6B82' }}>1 página · Imprimible · Compartible</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ng-rec-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.IndustrialRecursos = IndustrialRecursos;
