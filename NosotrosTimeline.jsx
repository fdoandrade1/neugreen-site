// NosotrosTimeline.jsx — milestones reales con badges interactivos y tooltips hover

function NosotrosTimeline() {
  const milestones = [
    {
      year: '2010',
      title: 'Nacimiento del laboratorio Neugreen®',
      body: 'Inicio del desarrollo de formulaciones especializadas para limpieza industrial y aplicaciones enzimáticas en San Luis Potosí. Desde sus primeros años, Neugreen® orientó su operación hacia desempeño técnico, validación práctica y mejora continua.',
      badges: [
        { label: 'Laboratorio técnico',   tip: 'Instalación del primer laboratorio de formulación propia en SLP. Base del desarrollo de todas las líneas actuales.' },
        { label: 'Formulación propia',    tip: 'Desarrollo interno de fórmulas especializadas — sin depender de concentrados genéricos o formulaciones de terceros.' },
        { label: 'Desarrollo enzimático', tip: 'Desde el inicio, Neugreen® apostó por tecnología enzimática: productos que limpian en profundidad sin enmascarar contaminación.' },
      ],
    },
    {
      year: '2013',
      title: 'Primera infraestructura de manufactura',
      body: 'Migración de laboratorio a planta de manufactura propia. Estandarización de procesos, fortalecimiento operativo y consolidación de los primeros clientes industriales recurrentes.',
      badges: [
        { label: 'Planta propia',            tip: 'Instalación de la primera planta de manufactura en SLP — inicio de operación a escala industrial con control total del proceso.' },
        { label: 'Manufactura',              tip: 'Capacidad para producir lotes estandarizados, con trazabilidad y control de calidad interno en cada ciclo de producción.' },
        { label: 'Procesos estandarizados',  tip: 'Implementación de protocolos de producción reproducibles, base para la posterior manufactura de marca privada para terceros.' },
      ],
    },
    {
      year: '2017',
      title: 'Expansión hacia operaciones agrícolas tecnificadas',
      body: 'Inicio del desarrollo y suministro de soluciones de limpieza y desinfección para invernaderos y agricultura protegida, incorporando protocolos sanitarios especializados para entornos de alta sensibilidad microbiológica.',
      badges: [
        { label: 'Invernaderos',           tip: 'Entrada al sector de agricultura protegida con protocolos específicos de limpieza y desinfección para estructuras y sistemas de riego.' },
        { label: 'Agricultura protegida',  tip: 'Desarrollo de soluciones adaptadas a cultivos en condiciones controladas — inocuidad, compatibilidad con sistemas y seguridad operativa.' },
        { label: 'Protocolos sanitarios',  tip: 'Diseño de secuencias de sanitización para entornos de alta sensibilidad microbiológica donde un error tiene impacto directo en el cultivo.' },
        { label: 'Desinfección técnica',   tip: 'Aplicación de química especializada en ambientes de producción alimentaria — norma, dosis y frecuencia validadas en campo.' },
      ],
    },
    {
      year: '2020',
      title: 'Desarrollo de la línea BEIZUM®',
      body: 'Durante la contingencia sanitaria, Neugreen® desarrolló y escaló soluciones desinfectantes para aplicaciones institucionales e industriales. Nace BEIZUM®, línea especializada de sanitización y desinfección, posteriormente consolidada como marca registrada ante el IMPI.',
      badges: [
        { label: 'BEIZUM®',               tip: 'Marca registrada ante el IMPI. Línea especializada de sanitización desarrollada en respuesta a la emergencia sanitaria — hoy parte permanente del portafolio.' },
        { label: 'IMPI',                  tip: 'Registro formal de BEIZUM® como marca propia de Neugreen® ante el Instituto Mexicano de la Propiedad Industrial.' },
        { label: 'Sanitización técnica',  tip: 'Soluciones formuladas para reducción de carga microbiana en superficies de alto contacto — validadas para aplicación institucional e industrial.' },
        { label: 'Desinfección industrial', tip: 'Escala de producción y distribución para clientes industriales con especificaciones técnicas precisas.' },
      ],
    },
    {
      year: '2023',
      title: 'Consolidación operativa y expansión regional',
      body: 'Fortalecimiento de capacidades de manufactura flexible, expansión logística regional y crecimiento del portafolio especializado para sectores industriales, institucionales y comerciales.',
      badges: [
        { label: '+120 SKUs',           tip: 'Portafolio activo de más de 120 referencias en planta — limpieza, desinfección, enzimáticos, body care, aromatización y jarciería.' },
        { label: 'Cobertura regional',  tip: 'Expansión de logística y distribución para atender clientes en Bajío, Pacífico y norte del país desde la planta en SLP.' },
        { label: 'Manufactura flexible', tip: 'Capacidad para producir desde lotes pequeños de marca privada hasta corridas industriales de gran volumen — misma planta, mismos estándares.' },
        { label: 'Operación industrial', tip: 'Consolidación de clientes industriales recurrentes con contratos de suministro, servicio técnico y seguimiento operativo en campo.' },
      ],
    },
    {
      year: '2026',
      green: true,
      title: 'Bioaumentación y operación técnica especializada',
      body: 'Consolidación de soluciones enzimáticas y operación técnica aplicada a sistemas industriales, incluyendo tratamiento de agua y plataformas de bioaumentación para clientes industriales y comerciales.',
      badges: [
        { label: 'Bioaumentación',         tip: 'Aplicación de microorganismos y enzimas para tratar agua residual, controlar olores y estabilizar procesos biológicos — resultado medible, no solo producto.' },
        { label: 'PTAR',                   tip: 'Diseño, operación y soporte técnico de plantas de tratamiento de aguas residuales — desde diagnóstico hasta puesta en marcha y seguimiento.' },
        { label: 'Operación técnica',      tip: 'Equipos en campo que acompañan la operación del cliente — dosificación, análisis, ajuste de parámetros y respuesta ante desviaciones.' },
        { label: 'Soluciones industriales', tip: 'Integración de química, biología, ingeniería y equipamiento para resolver problemas complejos en planta.' },
      ],
    },
  ];

  return (
    <section style={{ padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)', background: 'var(--ng-mist)' }}>

      <style>{`
        /* ── Year ── */
        .ng-tl-year {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #B8C9D8;
          transition: color .2s ease;
          padding-top: 3px;
        }
        .ng-timeline-item:hover .ng-tl-year    { color: var(--ng-blue); }
        .ng-timeline-item.ng-tl-green:hover .ng-tl-year { color: #41BE43; }

        /* ── Dot ── */
        .ng-tl-dot {
          position: absolute;
          left: -22px;
          top: 8px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #CBD8E4;
          border: 3px solid var(--ng-mist);
          box-shadow: 0 0 0 2px #CBD8E4;
          transition: background .2s ease, box-shadow .2s ease;
        }
        .ng-timeline-item:hover .ng-tl-dot {
          background: var(--ng-blue);
          box-shadow: 0 0 0 3px var(--ng-blue-100);
        }
        .ng-timeline-item.ng-tl-green:hover .ng-tl-dot {
          background: #41BE43;
          box-shadow: 0 0 0 3px #ECFAEC;
        }

        /* ── Badge ── */
        .ng-tl-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: #fff;
          border: 1px solid var(--ng-line);
          color: var(--ng-steel);
          position: relative;
          cursor: default;
          user-select: none;
          white-space: nowrap;
          transition: background .15s ease, border-color .15s ease, color .15s ease;
        }
        .ng-tl-badge:hover {
          background: var(--ng-blue-50);
          border-color: var(--ng-blue-100);
          color: var(--ng-blue);
        }

        /* ── Tooltip ── */
        .ng-tl-tip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--ng-navy);
          color: rgba(255,255,255,.92);
          font-family: var(--font-text);
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
          padding: 10px 14px;
          border-radius: 8px;
          width: 240px;
          white-space: normal;
          text-align: left;
          pointer-events: none;
          opacity: 0;
          transition: opacity .15s ease;
          z-index: 30;
          box-shadow: 0 8px 24px rgba(0,0,0,.2);
        }
        .ng-tl-tip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: var(--ng-navy);
        }
        .ng-tl-badge:hover .ng-tl-tip { opacity: 1; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ng-tl-row { grid-template-columns: 72px 1fr !important; gap: 16px !important; }
          .ng-tl-year { font-size: 22px !important; }
          .ng-tl-dot { left: -18px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Historia · 16 años</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            De un laboratorio en SLP a operación técnica especializada.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 580 }}>
            Sin rondas de inversión externas. Crecimiento orgánico financiado por la operación del cliente.
          </p>
        </div>

        {/* Timeline body */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 8,
            width: 2,
            background: 'linear-gradient(180deg, var(--ng-blue-100) 0%, #ECFAEC 100%)',
          }}></div>

          {milestones.map((m, i) => (
            <div
              key={i}
              className={`ng-timeline-item${m.green ? ' ng-tl-green' : ''}`}
              style={{ position: 'relative', paddingBottom: i < milestones.length - 1 ? 52 : 0 }}
            >
              {/* Dot */}
              <div className="ng-tl-dot"></div>

              {/* Row: year | content */}
              <div className="ng-tl-row" style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                gap: 28,
                alignItems: 'flex-start',
              }}>
                {/* Year */}
                <div className="ng-tl-year">{m.year}</div>

                {/* Content */}
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20, fontWeight: 700,
                    margin: '0 0 10px', color: 'var(--ng-ink)',
                    letterSpacing: '-0.015em', lineHeight: 1.25,
                  }}>
                    {m.title}
                  </h4>
                  <p style={{
                    fontSize: 14, color: 'var(--ng-steel)',
                    margin: '0 0 18px', lineHeight: 1.6, maxWidth: 580,
                  }}>
                    {m.body}
                  </p>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {m.badges.map((b, j) => (
                      <span key={j} className="ng-tl-badge">
                        {b.label}
                        <span className="ng-tl-tip">{b.tip}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Cierre */}
          <div style={{
            marginTop: 52,
            borderLeft: '3px solid #41BE43',
            background: '#F4F7FB',
            padding: '18px 24px',
            borderRadius: '0 var(--r) var(--r) 0',
          }}>
            <p style={{
              fontSize: 14, color: 'var(--ng-steel)',
              margin: 0, lineHeight: 1.7,
            }}>
              Seguimos construyendo. Neugreen® continúa expandiendo su capacidad técnica en manufactura química, sanitización especializada, bioaumentación y soluciones industriales integradas — con enfoque en desarrollo propio, eficiencia operativa y relaciones de largo plazo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.NosotrosTimeline = NosotrosTimeline;
