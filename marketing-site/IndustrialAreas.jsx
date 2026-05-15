// IndustrialAreas.jsx — 8-card grid (4×2) of technical areas, each expandable
const { useState: useStateAreas } = React;

const AREAS = [
  {
    id: 'agua',
    title: 'Tratamiento de agua',
    summary: 'Caracterización, monitoreo y programas de acondicionamiento.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/><path d="M8 14a4 4 0 0 0 4 4"/></svg>,
    detail: [
      'Análisis fisicoquímico y microbiológico de fuente',
      'Programas dosificación para potabilización y procesos',
      'Monitoreo continuo + ajuste de receta por cliente',
    ],
  },
  {
    id: 'ptar',
    title: 'PTAR y biología',
    summary: 'Tratamientos biológicos, bioaumentación y control de olores.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12c5-2 13-2 18 0M12 3c2 3 3 6 3 9s-1 6-3 9c-2-3-3-6-3-9s1-6 3-9Z"/></svg>,
    detail: [
      'Bioaumentación para reducción DBO/DQO',
      'Cumplimiento NOM-001-SEMARNAT-2021',
      'Control de olores en líneas de tratamiento',
    ],
  },
  {
    id: 'torres',
    title: 'Torres de enfriamiento',
    summary: 'Control de incrustación, corrosión y microbiología.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-6h6v6"/><path d="M9 11h6M9 14h6"/></svg>,
    detail: [
      'Inhibidores corrosión + dispersantes + biocidas',
      'Auditoría inicial sin costo',
      'Programa anti-Legionella documentado',
    ],
  },
  {
    id: 'calderas',
    title: 'Calderas',
    summary: 'Inhibidores, antiincrustantes y eficiencia térmica.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h6"/><path d="M5 7h14"/></svg>,
    detail: [
      'Acondicionamiento de agua de alimentación',
      'Pasivación y limpieza química inicial',
      'Mejora eficiencia térmica 5–15 % primer año',
    ],
  },
  {
    id: 'olores',
    title: 'Control de olores',
    summary: 'Soluciones enzimáticas y químicas para H₂S, mercaptanos, VOCs.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h7l4-6 4 6h3"/><path d="M3 14h18M5 17h14M8 20h8"/></svg>,
    detail: [
      'Neutralización molecular (no enmascaramiento)',
      'Sistemas de dispersión para áreas críticas',
      'Aplica en cárnicos, PTAR, gestión de residuos',
    ],
  },
  {
    id: 'dosificacion',
    title: 'Dosificación',
    summary: 'Equipos, sistemas y soporte técnico de campo.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>,
    detail: [
      'Bombas dosificadoras + sensores de campo',
      'Telemetría para procesos críticos',
      'Calibración, refacciones y SLA de mantenimiento',
    ],
  },
  {
    id: 'analisis',
    title: 'Análisis técnico',
    summary: 'Diagnóstico de agua, muestreo y recomendaciones de ajuste.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v6L9 9zM7 21l-3-9h16l-3 9z"/><path d="M9 3v6M15 3v6"/></svg>,
    detail: [
      'Muestreo de campo + análisis en laboratorio',
      'Reporte ejecutivo con plan de acción',
      'Entregable: parámetros, riesgos, dosis sugerida',
    ],
  },
  {
    id: 'ingenieria',
    title: 'Ingeniería de proyecto',
    summary: 'Diseño, construcción y puesta en marcha a medida.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M14 17.5h-4"/></svg>,
    detail: [
      'Diagnóstico integral del proceso',
      'Diseño + obra civil + instrumentación + arranque',
      'Soporte post-arranque mes 1 – 6 incluido',
    ],
  },
];

function IndustrialAreas() {
  const [expanded, setExpanded] = useStateAreas(null);

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 780, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Ocho áreas técnicas</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Donde el químico ya no alcanza, llega la ingeniería.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 620 }}>
            Cada área con asesor técnico asignado, no con un comercial genérico. Click en cualquier card para ver el alcance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {AREAS.map((a, i) => {
            const isOpen = expanded === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setExpanded(isOpen ? null : a.id)}
                data-lead-source={`industrial-area-${a.id}`}
                style={{
                  background: '#fff',
                  border: isOpen ? '1px solid var(--ng-blue)' : '1px solid var(--ng-line)',
                  borderRadius: 'var(--r-lg)',
                  padding: '24px 22px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
                  font: 'inherit',
                  color: 'inherit',
                  gridColumn: isOpen ? 'span 4' : 'span 1',
                  display: isOpen ? 'grid' : 'block',
                  gridTemplateColumns: isOpen ? '1fr 2fr' : '1fr',
                  gap: isOpen ? 32 : 0,
                  alignItems: 'start',
                  boxShadow: isOpen ? 'var(--shadow)' : 'none',
                }}>
                <div>
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    background: 'var(--ng-blue-50)',
                    color: 'var(--ng-blue)',
                    display: 'grid', placeItems: 'center',
                    marginBottom: 16,
                  }}>
                    {a.icon}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11, fontWeight: 600,
                    color: 'var(--ng-steel)',
                    letterSpacing: '0.06em',
                    marginBottom: 6,
                  }}>0{i + 1}</div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18, fontWeight: 700,
                    margin: '0 0 8px',
                    color: 'var(--ng-ink)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                  }}>{a.title}</h4>
                  <p style={{
                    fontSize: 13,
                    color: 'var(--ng-steel)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}>{a.summary}</p>

                  {!isOpen && (
                    <div style={{
                      marginTop: 14,
                      fontSize: 12,
                      color: 'var(--ng-blue)',
                      fontWeight: 600,
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}>
                      Ver alcance
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  )}
                </div>

                {isOpen && (
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 14 }}>Alcance del área</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {a.detail.map((d, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--ng-ink)', lineHeight: 1.5 }}>
                          <span style={{
                            width: 24, height: 24, flexShrink: 0,
                            background: 'var(--ng-green-50)', color: 'var(--ng-green-700)',
                            borderRadius: 6, display: 'grid', placeItems: 'center',
                            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                            marginTop: 1,
                          }}>0{j + 1}</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div style={{
                      marginTop: 22, display: 'flex', gap: 10,
                    }}>
                      <a href="#diagnostico" onClick={(e) => { e.preventDefault(); document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                         style={{
                           background: 'var(--ng-blue)', color: '#fff',
                           fontWeight: 700, fontSize: 13,
                           padding: '10px 18px', borderRadius: 'var(--r)',
                           textDecoration: 'none',
                         }}>
                        Solicitar diagnóstico
                      </a>
                      <button onClick={(e) => { e.stopPropagation(); setExpanded(null); }} style={{
                        background: 'transparent',
                        border: '1px solid var(--ng-line)',
                        color: 'var(--ng-ink)',
                        fontWeight: 700, fontSize: 13,
                        padding: '10px 18px', borderRadius: 'var(--r)',
                        cursor: 'pointer',
                      }}>Cerrar</button>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.IndustrialAreas = IndustrialAreas;
