// IndustrialAreas.jsx — 10 áreas técnicas (orden: diagnóstico → validación → tratamiento → ingeniería → suministro)
const { useState: useStateAreas } = React;

// ────────────────────────────────────────────────────────────
// Lucide-style line icons (1.75 stroke, 24×24)
// ────────────────────────────────────────────────────────────
const IA_I = {
  clipboardList: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>
    </svg>
  ),
  flaskConical: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31"/>
      <path d="M14 9.3V2"/>
      <path d="M8.5 2h7"/>
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>
      <path d="M5.52 16h12.96"/>
    </svg>
  ),
  droplets: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z"/>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  activity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L9.68 3.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 4.44 13H2"/>
    </svg>
  ),
  refreshCw: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-15.5-6.36L3 8"/>
      <path d="M3 4v4h4"/>
      <path d="M3 12a9 9 0 0 0 15.5 6.36L21 16"/>
      <path d="M21 20v-4h-4"/>
    </svg>
  ),
  wind: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  ),
  flame: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  sliders: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  building2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>
    </svg>
  ),
  package: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4 7.55 4.24"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <path d="M3.27 6.96 12 12.01l8.73-5.05"/>
      <path d="M12 22.08V12"/>
    </svg>
  ),
};

// ────────────────────────────────────────────────────────────
// AREAS — orden lógico: diagnóstico → validación → tratamiento → ingeniería → suministro
// ────────────────────────────────────────────────────────────
const AREAS = [
  {
    id: 'analisis',
    title: 'Análisis técnico',
    icon: IA_I.clipboardList,
    summary: 'Diagnóstico en campo para identificar causas, riesgos y oportunidades de mejora en sistemas de agua.',
    detail: [
      { t: 'Levantamiento en sitio',
        d: 'Revisión de operación, equipos, caudales, químicos actuales y puntos críticos del sistema.' },
      { t: 'Muestreo y diagnóstico',
        d: 'Toma de muestras, análisis de parámetros clave y detección de desviaciones operativas.' },
      { t: 'Plan de acción técnico',
        d: 'Reporte con hallazgos, riesgos, recomendaciones, dosis sugeridas y prioridades de intervención.' },
    ],
  },
  {
    id: 'laboratorio',
    title: 'Laboratorio y normatividad',
    icon: IA_I.flaskConical,
    summary: 'Análisis fisicoquímicos, microbiológicos y soporte técnico para operación, cumplimiento y mejora continua.',
    detail: [
      { t: 'Análisis de agua y lodos',
        d: 'Pruebas fisicoquímicas, microbiológicas y caracterización de afluentes, efluentes y lodos biológicos.' },
      { t: 'Interpretación normativa',
        d: 'Revisión de parámetros conforme a NOM aplicables, disposiciones locales y requerimientos del proceso.' },
      { t: 'Soporte analítico',
        d: 'Resultados claros para diagnóstico, operación de PTAR, seguimiento conforme a norma aplicable y toma de decisiones.' },
      { t: 'Seguimiento regulatorio',
        d: 'Acompañamiento para documentar resultados, verificar parámetros y sostener evidencia técnica de operación.' },
    ],
  },
  {
    id: 'agua',
    title: 'Tratamiento de agua',
    icon: IA_I.droplets,
    summary: 'Programas de acondicionamiento para mejorar la calidad del agua en procesos industriales y servicios.',
    detail: [
      { t: 'Caracterización del agua',
        d: 'Evaluación de dureza, sólidos, pH, conductividad, carga microbiológica y condiciones de operación.' },
      { t: 'Programa de acondicionamiento',
        d: 'Selección de químicos, filtración o ajustes operativos según el uso del agua y objetivo del cliente.' },
      { t: 'Monitoreo y ajustes',
        d: 'Seguimiento de parámetros, consumo químico, desempeño del sistema y corrección de desviaciones.' },
    ],
  },
  {
    id: 'ptar',
    title: 'PTAR, biología y descarga',
    icon: IA_I.activity,
    summary: 'Tratamiento de aguas residuales para reducir carga contaminante, estabilizar operación y orientar la descarga hacia el cumplimiento aplicable.',
    detail: [
      { t: 'Diagnóstico de agua residual',
        d: 'Revisión de caudal, carga orgánica, grasas, sólidos, olores, lodos, aireación y condiciones reales de operación.' },
      { t: 'Tratamiento biológico y fisicoquímico',
        d: 'Bioaumentación, enzimas, coagulación, floculación, aireación, sedimentación o ajustes según contaminante y objetivo.' },
      { t: 'Control de olores y lodos',
        d: 'Corrección de causas asociadas a materia orgánica, sulfuros, grasas, anaerobiosis, cárcamos y exceso de lodos. Soluciones enzimáticas y químicas para reducción de H₂S, mercaptanos y VOCs.' },
      { t: 'Descarga y soporte a cumplimiento',
        d: 'Seguimiento de parámetros críticos para orientar la operación hacia la norma o requisito aplicable. Soporte para cumplimiento, no garantía de resultado fuera de control operativo del cliente.' },
    ],
  },
  {
    id: 'reuso',
    title: 'Reúso y pulimiento avanzado',
    icon: IA_I.refreshCw,
    summary: 'Procesos para elevar la calidad del agua tratada y reutilizarla en servicios, riego o procesos industriales.',
    detail: [
      { t: 'Definición de calidad objetivo',
        d: 'Determinamos si el agua será para descarga, riego, sanitarios, servicios, proceso industrial o tratamiento avanzado.' },
      { t: 'Filtración y desinfección',
        d: 'Integración de filtros, carbón activado, suavización, membranas, UV, ozono, cloración u otros sistemas según objetivo.' },
      { t: 'Ósmosis y desmineralización',
        d: 'Pulimiento avanzado con ósmosis inversa, desionización o desmineralización cuando el proceso requiere mayor pureza.' },
      { t: 'Reúso seguro y controlado',
        d: 'Monitoreo de calidad, operación, mantenimiento y ajustes para sostener el desempeño del sistema de reúso.' },
    ],
  },
  {
    id: 'torres',
    title: 'Torres de enfriamiento',
    icon: IA_I.wind,
    summary: 'Programas para controlar incrustación, corrosión y crecimiento microbiológico en sistemas de enfriamiento.',
    detail: [
      { t: 'Diagnóstico del circuito',
        d: 'Revisión de agua de reposición, ciclos de concentración, purgas, corrosión, incrustación y biopelícula.' },
      { t: 'Programa químico integral',
        d: 'Inhibidores de corrosión, antiincrustantes, dispersantes y biocidas según las condiciones del sistema.' },
      { t: 'Control microbiológico',
        d: 'Monitoreo y acciones preventivas para reducir riesgos asociados a biopelícula y contaminación del sistema.' },
      { t: 'Seguimiento operativo',
        d: 'Medición de parámetros, ajuste de purgas, control de consumo químico y reportes de desempeño.' },
    ],
  },
  {
    id: 'calderas',
    title: 'Calderas',
    icon: IA_I.flame,
    summary: 'Tratamiento químico y control de agua para proteger calderas, reducir incrustación y mejorar eficiencia térmica.',
    detail: [
      { t: 'Revisión del agua de alimentación',
        d: 'Análisis de dureza, alcalinidad, sólidos, oxígeno, condensados y condiciones del sistema.' },
      { t: 'Programa químico para caldera',
        d: 'Antiincrustantes, secuestrantes de oxígeno, alcalinizantes, dispersantes o tratamientos según operación.' },
      { t: 'Control de purgas y depósitos',
        d: 'Ajuste de purgas, prevención de sarro, control de corrosión y revisión de arrastres.' },
      { t: 'Seguimiento de eficiencia',
        d: 'Monitoreo de parámetros, consumo químico, condiciones térmicas y recomendaciones de operación.' },
    ],
  },
  {
    id: 'dosificacion',
    title: 'Dosificación y control',
    icon: IA_I.sliders,
    summary: 'Equipos, sensores y sistemas de dosificación para aplicar químicos con precisión y estabilidad operativa.',
    detail: [
      { t: 'Selección del sistema',
        d: 'Bombas dosificadoras, sensores, tanques, tableros y accesorios según caudal, químico y punto de aplicación.' },
      { t: 'Instalación y calibración',
        d: 'Montaje, ajuste de dosis, pruebas de operación y validación del sistema en campo.' },
      { t: 'Automatización y monitoreo',
        d: 'Control por pH, ORP, conductividad, flujo, temporizador o señales de proceso.' },
      { t: 'Mantenimiento y refacciones',
        d: 'Soporte técnico, calibraciones, refacciones, bitácoras y continuidad operativa.' },
    ],
  },
  {
    id: 'ingenieria',
    title: 'Ingeniería de proyecto',
    icon: IA_I.building2,
    summary: 'Diseño, construcción, integración y arranque de soluciones para tratamiento de agua y procesos industriales.',
    detail: [
      { t: 'Diseño técnico del sistema',
        d: 'Definición de proceso, capacidad, tren de tratamiento, equipos, layout y criterios de operación.' },
      { t: 'Integración y construcción',
        d: 'Instalación hidráulica, eléctrica, obra civil, instrumentación, equipos y sistemas auxiliares.' },
      { t: 'Puesta en marcha',
        d: 'Arranque, pruebas, ajustes, capacitación operativa y validación de desempeño inicial.' },
      { t: 'Soporte post-arranque',
        d: 'Acompañamiento técnico para estabilizar operación, corregir desviaciones y documentar resultados.' },
    ],
  },
  {
    id: 'equipo',
    title: 'Suministro de equipo',
    icon: IA_I.package,
    summary: 'Equipos, componentes e instrumentación para construir, operar o escalar sistemas de tratamiento de agua.',
    detail: [
      { t: 'Equipos de proceso',
        d: 'Bombas, filtros, suavizadores, tanques, cisternas, membranas, centrífugas y sistemas de tratamiento.' },
      { t: 'Instrumentación y control',
        d: 'Sensores, medidores, tableros, válvulas, accesorios hidráulicos y sistemas de automatización.' },
      { t: 'Consumibles y refacciones',
        d: 'Medios filtrantes, cartuchos, membranas, kits, repuestos y componentes críticos de operación.' },
      { t: 'Selección técnica',
        d: 'Dimensionamiento, compatibilidad, especificación y soporte para compra correcta del equipo.' },
    ],
  },
];

// ────────────────────────────────────────────────────────────
function pad2(n) { return n < 10 ? `0${n}` : `${n}`; }

function scrollToDiagnostico() {
  const el = document.getElementById('diagnostico');
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}

// ────────────────────────────────────────────────────────────
// Closed card
// ────────────────────────────────────────────────────────────
function AreaCardClosed({ a, n, onOpen }) {
  return (
    <button
      onClick={onOpen}
      data-lead-source={`industrial-area-${a.id}`}
      style={{
        background: '#fff',
        border: '1px solid var(--ng-line)',
        borderRadius: 'var(--r-lg)',
        padding: '24px 24px 22px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        font: 'inherit', color: 'inherit',
        display: 'flex', flexDirection: 'column',
        minHeight: 230,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
        e.currentTarget.style.boxShadow = '0 12px 28px -14px rgba(0,85,184,.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = 'var(--ng-line)';
        e.currentTarget.style.boxShadow = '';
      }}>
      {/* Top row: big number + icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 4.5vw, 56px)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: 'var(--ng-blue)',
        }}>{pad2(n)}</div>
        <div style={{
          width: 40, height: 40,
          background: 'var(--ng-blue-50)',
          color: 'var(--ng-blue)',
          borderRadius: 'var(--r)',
          display: 'grid', placeItems: 'center',
          flexShrink: 0,
        }}>{a.icon}</div>
      </div>

      <h4 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 18, fontWeight: 700,
        margin: '0 0 8px', color: 'var(--ng-ink)',
        letterSpacing: '-0.015em', lineHeight: 1.25,
      }}>{a.title}</h4>
      <p style={{
        fontSize: 14, color: 'var(--ng-steel)',
        margin: 0, lineHeight: 1.55,
      }}>{a.summary}</p>

      <div style={{
        marginTop: 'auto', paddingTop: 18,
        fontSize: 13, color: 'var(--ng-blue)',
        fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        Ver alcance
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </div>
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// Open card (spans grid)
// ────────────────────────────────────────────────────────────
function AreaCardOpen({ a, n, onClose }) {
  return (
    <div style={{
      gridColumn: '1 / -1',
      background: '#fff',
      border: '1px solid var(--ng-blue)',
      borderRadius: 'var(--r-lg)',
      boxShadow: '0 20px 50px -20px rgba(0,85,184,.28)',
      padding: 'clamp(28px, 3vw, 40px)',
      animation: 'ng-area-open .3s cubic-bezier(.16,1,.3,1) both',
    }}>
      <div className="ng-area-open-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        gap: 'clamp(28px, 4vw, 56px)',
        alignItems: 'start',
      }}>

        {/* LEFT — identity + CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'var(--ng-blue)',
            }}>{pad2(n)}</div>
            <div style={{
              width: 48, height: 48,
              background: 'var(--ng-blue-50)',
              color: 'var(--ng-blue)',
              borderRadius: 'var(--r)',
              display: 'grid', placeItems: 'center',
              flexShrink: 0,
            }}>{a.icon}</div>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 2.4vw, 30px)',
            fontWeight: 800,
            margin: 0, color: 'var(--ng-ink)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>{a.title}</h3>

          <p style={{
            fontSize: 15, color: 'var(--ng-steel)',
            margin: 0, lineHeight: 1.6, maxWidth: 460,
          }}>{a.summary}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <a
              href="#diagnostico"
              onClick={(e) => { e.preventDefault(); scrollToDiagnostico(); }}
              style={{
                background: 'var(--ng-blue)',
                color: '#fff',
                fontWeight: 700, fontSize: 14,
                padding: '14px 22px',
                borderRadius: 'var(--r)',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 10px 24px -10px rgba(0,85,184,.5)',
                transition: 'transform .15s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
              Solicitar diagnóstico
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <button onClick={onClose} style={{
              background: 'transparent', border: 'none',
              color: 'var(--ng-steel)',
              fontWeight: 600, fontSize: 13,
              padding: '6px 0', cursor: 'pointer',
              textAlign: 'left',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'inherit',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cerrar
            </button>
          </div>
        </div>

        {/* RIGHT — alcance */}
        <div className="ng-area-right" style={{
          borderLeft: '1px solid var(--ng-line)',
          paddingLeft: 'clamp(20px, 3vw, 40px)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11, fontWeight: 700,
            color: 'var(--ng-blue)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            marginBottom: 22,
          }}>Alcance del área</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {a.detail.map((b, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr',
                gap: 14,
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20, fontWeight: 800,
                  color: 'var(--ng-blue)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  paddingTop: 2,
                }}>{pad2(i + 1)}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15, fontWeight: 700,
                    color: 'var(--ng-ink)',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}>{b.t}</div>
                  <div style={{
                    fontSize: 13.5, color: 'var(--ng-steel)',
                    lineHeight: 1.55,
                  }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ng-area-open {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 880px) {
          .ng-area-open-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ng-area-right { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--ng-line); padding-top: 28px !important; }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Section
// ────────────────────────────────────────────────────────────
function IndustrialAreas() {
  const [expanded, setExpanded] = useStateAreas(null);
  const expandedIdx = expanded == null ? -1 : AREAS.findIndex(a => a.id === expanded);

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 780, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Diez áreas técnicas</div>
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
          <p style={{ fontSize: 17, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 640 }}>
            Diagnóstico, validación, tratamiento, ingeniería y suministro. Cada área con asesor técnico asignado. Click en cualquier tarjeta para ver el alcance.
          </p>
        </div>

        <div className="ng-areas-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          alignItems: 'start',
        }}>
          {AREAS.map((a, i) => {
            const isOpen = expanded === a.id;
            // When a card is open, render its open panel right after the row it belongs to.
            // Strategy: render all closed cards in order; when we reach the expanded one,
            // insert the open panel and skip rendering its closed twin.
            if (isOpen) {
              return (
                <React.Fragment key={a.id}>
                  <AreaCardOpen a={a} n={i + 1} onClose={() => setExpanded(null)} />
                </React.Fragment>
              );
            }
            return (
              <AreaCardClosed
                key={a.id}
                a={a}
                n={i + 1}
                onOpen={() => setExpanded(a.id)}
              />
            );
          })}
        </div>

        <style>{`
          @media (max-width: 1100px) {
            .ng-areas-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 820px) {
            .ng-areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 540px) {
            .ng-areas-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.IndustrialAreas = IndustrialAreas;
