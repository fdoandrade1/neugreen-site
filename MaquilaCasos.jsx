// MaquilaCasos.jsx — 7 casos reales de manufactura · marca privada y desarrollo
function MaquilaCasos() {
  const cases = [
    {
      logo: 'assets/logos/clients/anemve.svg',
      cliente: 'ANEMVE',
      sector: 'Cosmético · Repelentes',
      tipo: 'Desarrollo de línea nacional',
      stat: '8 SKU',
      statLabel: 'marca propia · distribución nacional',
      resumen: 'Desarrollo de repelentes en crema y líquido para adultos y niños, con distribución nacional.',
      tags: ['Manufactura', 'Cosmética', 'Marca propia'],
    },
    {
      logo: 'assets/logos/clients/varde-hogar.svg',
      cliente: 'Verde Hogar',
      sector: 'Hogar ecológico',
      tipo: 'Línea biodegradable residencial',
      stat: '3 SKU',
      statLabel: 'ecofriendly · listos para uso',
      resumen: 'Desarrollo de químicos biodegradables y jabones para limpieza residencial, listos para uso.',
      tags: ['Biodegradable', 'Residencial', 'LPU'],
    },
    {
      logo: 'assets/logos/clients/anemve.svg',
      cliente: 'ANEMVE',
      sector: 'Cuidado personal',
      tipo: 'Jabón corporal premium',
      stat: '3 SKU',
      statLabel: 'producto terminado · fragancia premium',
      resumen: 'Desarrollo de jabones corporales con fragancia premium, entregados como producto terminado.',
      tags: ['Cuidado personal', 'Fragancia', 'PT'],
    },
    {
      logo: 'assets/logos/clients/equilux.svg',
      cliente: 'Equilux',
      sector: 'Cuidado animal',
      tipo: 'Tratamiento capilar especializado',
      stat: '2 SKU',
      statLabel: 'equinos premium · crin y cola',
      resumen: 'Desarrollo de shampoo y tratamiento especializado para crin y cola de caballo.',
      tags: ['Equinos', 'Premium', 'Manufactura'],
    },
    {
      logo: 'assets/logos/clients/enovira.svg',
      cliente: 'ENOVYRA',
      sector: 'Limpieza institucional',
      tipo: 'Portafolio completo marca propia',
      stat: '+45 SKU',
      statLabel: 'limpieza y desinfección · distribución',
      resumen: 'Desarrollo de portafolio amplio para cubrir demanda local de limpieza y desinfección.',
      tags: ['Marca propia', 'Limpieza', 'Distribución'],
    },
    {
      logo: 'assets/logos/clients/bioneutral.svg',
      cliente: 'BioNeutral',
      sector: 'Hogar ecológico',
      tipo: 'Eliminador de olores orgánicos',
      stat: '1 SKU',
      statLabel: 'enzimático · mascotas',
      resumen: 'Limpiador y eliminador de olores enzimático para mascotas, con formulación biodegradable lista para uso.',
      tags: ['Biodegradable', 'Enzimático', 'Mascotas'],
    },
  ];

  // Card content shared style
  const navyCard = {
    background: '#102942',
    border: '1px solid #1f3d5e',
    borderRadius: 'var(--r-lg)',
    padding: 24,
    transition: 'border-color .15s ease, box-shadow .15s ease, transform .15s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  };
  const hoverIn = (e) => {
    e.currentTarget.style.borderColor = 'var(--ng-green)';
    e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(0,63,197,.5)';
  };
  const hoverOut = (e) => {
    e.currentTarget.style.borderColor = '#1f3d5e';
    e.currentTarget.style.boxShadow = '';
  };

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-navy)',
      color: '#fff',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 32,
          marginBottom: 48, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#A6C8FF', marginBottom: 12,
            }}>Casos reales · clientes verificables</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
              color: '#fff',
              lineHeight: 1.1,
            }}>
              Lo que hemos manufacturado para otras marcas.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', margin: 0, lineHeight: 1.55, maxWidth: 600 }}>
              Producto terminado completo: formulación, escalamiento, envasado, etiquetado y entrega. Estos clientes nos dejaron mostrar su marca — el resto opera bajo NDA.
            </p>
          </div>
          <a
            href="contacto.html"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,.22)',
              fontWeight: 700, fontSize: 14,
              padding: '12px 22px',
              borderRadius: 'var(--r)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            Solicitar referencia bajo NDA
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* Grid 3 cols × 2 rows · 7th card spans full width */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}>
          {cases.map((c, i) => (
            <div key={i} style={navyCard} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {/* Logo tile — white, 120px min height, generous padding */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F2',
                borderRadius: 8,
                padding: 16,
                minHeight: 120,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={c.logo} alt={c.cliente}
                     style={{
                       height: 'auto',
                       maxHeight: 80, minHeight: 64,
                       maxWidth: '88%',
                       objectFit: 'contain',
                       display: 'block',
                     }} />
              </div>

              {/* Sector + cliente */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'rgba(255,255,255,.55)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: 6,
                }}>{c.sector}</div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
                  color: '#fff', letterSpacing: '-0.015em', lineHeight: 1.25,
                }}>{c.tipo}</div>
              </div>

              {/* Stat + summary */}
              <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.10)' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800, fontSize: 32,
                  lineHeight: 1, color: 'var(--ng-green)',
                  letterSpacing: '-0.02em', marginBottom: 6,
                }}>{c.stat}</div>
                <div style={{
                  fontSize: 13, color: 'rgba(255,255,255,.72)',
                  marginBottom: 14, lineHeight: 1.4,
                }}>{c.statLabel}</div>
                <p style={{
                  fontSize: 13, color: 'rgba(255,255,255,.85)',
                  margin: '0 0 16px', lineHeight: 1.55,
                }}>{c.resumen}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t, j) => (
                    <span key={j} style={{
                      fontSize: 10.5, fontWeight: 600,
                      padding: '4px 9px', borderRadius: 999,
                      background: 'rgba(255,255,255,.06)',
                      color: 'rgba(255,255,255,.85)',
                      border: '1px solid rgba(255,255,255,.10)',
                      letterSpacing: '0.04em',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 7th card — confidential, full row, distinct treatment */}
          <div style={{
            gridColumn: '1 / -1',
            background: 'linear-gradient(135deg, #0e2237 0%, #102942 100%)',
            border: '1px solid #1f3d5e',
            borderRadius: 'var(--r-lg)',
            padding: 32,
            display: 'grid',
            gridTemplateColumns: '180px 1fr auto',
            gap: 32,
            alignItems: 'center',
          }}
          onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            {/* Lock icon tile */}
            <div style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.10)',
              borderRadius: 'var(--r)',
              height: 96,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10,
            }}>
              {/* Hotel + lock icon */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21V8l9-5 9 5v13"/>
                <path d="M3 21h18"/>
                <rect x="9" y="13" width="6" height="8" rx="1"/>
              </svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: '#A6C8FF',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: 8,
              }}>Hotelero · Body Care · bajo confidencialidad</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
                color: '#fff', letterSpacing: '-0.015em', lineHeight: 1.2,
                marginBottom: 10,
              }}>Hotel boutique SLP · 4 SKU Body Care con aroma insignia exclusivo</div>
              <p style={{
                fontSize: 14, color: 'rgba(255,255,255,.78)',
                margin: 0, lineHeight: 1.55, maxWidth: 720,
              }}>
                Manufactura de jabón corporal, shampoo, acondicionador y crema corporal con aroma insignia exclusivo para hotel boutique en San Luis Potosí.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                {['Body Care', 'Hotelería', 'Aroma exclusivo', 'NDA activo'].map((t, j) => (
                  <span key={j} style={{
                    fontSize: 10.5, fontWeight: 600,
                    padding: '4px 9px', borderRadius: 999,
                    background: 'rgba(255,255,255,.06)',
                    color: 'rgba(255,255,255,.85)',
                    border: '1px solid rgba(255,255,255,.10)',
                    letterSpacing: '0.04em',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 42, lineHeight: 1, color: 'var(--ng-green)',
                letterSpacing: '-0.02em',
              }}>4 SKU</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', marginTop: 6 }}>
                Body Care premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MaquilaCasos = MaquilaCasos;
