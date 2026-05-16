// NosotrosOrganigrama.jsx — Organigrama institucional Neugreen
// 4 niveles · sin nombres de personas · responsive (apila en mobile)

function OrgNode({ label, role = 'support', sub }) {
  // role: 'top' | 'committee' | 'unit' | 'support'
  const styles = {
    top: {
      background: 'var(--ng-blue)',
      color: '#fff',
      border: '1px solid var(--ng-blue)',
      fontSize: 18,
      fontWeight: 800,
      padding: '20px 28px',
      minWidth: 260,
      boxShadow: '0 12px 30px -12px rgba(0,85,184,.5)',
    },
    committee: {
      background: '#DCE6FF',
      color: 'var(--ng-blue-700)',
      border: '1px solid var(--ng-blue-100)',
      fontSize: 15,
      fontWeight: 700,
      padding: '14px 22px',
      minWidth: 280,
    },
    unit: {
      background: '#ECFAEC',
      color: 'var(--ng-green-700)',
      border: '1.5px solid var(--ng-green)',
      fontSize: 15,
      fontWeight: 700,
      padding: '16px 18px',
      minWidth: 200,
    },
    support: {
      background: '#FAFBFD',
      color: 'var(--ng-ink)',
      border: '1px solid var(--ng-line)',
      fontSize: 13,
      fontWeight: 500,
      padding: '12px 14px',
      minWidth: 160,
    },
  };
  const s = styles[role];
  return (
    <div style={{
      ...s,
      fontFamily: 'var(--font-text)',
      borderRadius: 'var(--r)',
      letterSpacing: '-0.005em',
      textAlign: 'center',
      lineHeight: 1.35,
      transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      if (role === 'support') { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--ng-blue-100)'; }
      if (role === 'unit')    { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px -12px rgba(65,190,67,.45)'; }
    }}
    onMouseLeave={(e) => {
      if (role === 'support') { e.currentTarget.style.background = '#FAFBFD'; e.currentTarget.style.borderColor = 'var(--ng-line)'; }
      if (role === 'unit')    { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }
    }}>
      {label}
      {sub && (
        <div style={{
          fontSize: 10.5,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: 6,
          opacity: 0.7,
          fontWeight: 600,
        }}>{sub}</div>
      )}
    </div>
  );
}

// Vertical line connector
function VLine({ h = 24 }) {
  return (
    <div style={{
      width: 1, height: h,
      background: 'var(--ng-line)',
      margin: '0 auto',
    }}></div>
  );
}

// Dot at junction
function Dot() {
  return (
    <div style={{
      width: 8, height: 8, borderRadius: '50%',
      background: '#fff',
      border: '1.5px solid var(--ng-line)',
      margin: '-4px auto',
      position: 'relative', zIndex: 1,
    }}></div>
  );
}

function NosotrosOrganigrama() {
  const unidades = [
    { label: 'Productos de Línea', sub: 'Unidad 01' },
    { label: 'Manufactura',         sub: 'Unidad 02' },
    { label: 'Industrial',          sub: 'Unidad 03' },
  ];
  const soporte = [
    'Comercial y Desarrollo de Negocios',
    'Administración, Finanzas y Control',
    'Operaciones, Planta y Producción',
    'I+D, Calidad y Normatividad',
    'Abastecimiento, Inventarios y Bodega',
    'Logística y Distribución',
    'Tecnología, Datos y Sistemas',
    'Talento, Cultura y Accountability',
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Estructura organizacional</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            Cómo opera Neugreen.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55, maxWidth: 580 }}>
            Tres unidades de negocio coordinadas por un equipo central. Áreas de soporte transversales que sostienen planta, ingeniería y comercial.
          </p>
        </div>

        {/* ─────────────────────── ORG CHART ─────────────────────── */}
        <div className="ng-org" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>

          {/* L1 — Dirección General */}
          <OrgNode label="Dirección General" role="top" />

          <VLine />

          {/* L2 — Comité Estratégico */}
          <OrgNode label="Comité Estratégico" sub="Dirección Ejecutiva" role="committee" />

          <VLine />
          <Dot />

          {/* Horizontal bus → 3 unidades */}
          <div className="ng-bus-3" style={{
            width: '80%', maxWidth: 800,
            height: 1, background: 'var(--ng-line)',
            position: 'relative',
            marginTop: -4,
          }}>
            {/* end caps */}
            <span style={{ position: 'absolute', left: 0, top: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--ng-line)' }}></span>
            <span style={{ position: 'absolute', right: 0, top: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--ng-line)' }}></span>
          </div>

          <div className="ng-units" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            width: '80%', maxWidth: 800,
            marginTop: 0,
          }}>
            {unidades.map((u, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <VLine h={24} />
                <OrgNode label={u.label} sub={u.sub} role="unit" />
              </div>
            ))}
          </div>

          {/* Divider between unidades y áreas */}
          <div style={{
            marginTop: 56, marginBottom: 32,
            width: '100%', maxWidth: 720,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ng-line)' }}></div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--ng-steel)',
              letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
            }}>Áreas de soporte transversal</div>
            <div style={{ flex: 1, height: 1, background: 'var(--ng-line)' }}></div>
          </div>

          {/* L4 — Áreas de soporte: 4 cols × 2 rows desktop */}
          <div className="ng-support-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            width: '100%',
          }}>
            {soporte.map((s, i) => (
              <OrgNode key={i} label={s} role="support" />
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .ng-org .ng-support-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .ng-org .ng-units        { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
          }
          @media (max-width: 720px) {
            .ng-org .ng-units {
              grid-template-columns: 1fr !important;
              width: 100% !important;
              gap: 18px !important;
            }
            .ng-org .ng-bus-3 { display: none !important; }
            .ng-org .ng-support-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.NosotrosOrganigrama = NosotrosOrganigrama;
