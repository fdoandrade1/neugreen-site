// ProyectosGaleria.jsx — 16 casos reales · filtros centrados · logos grandes
const { useState: useStateP } = React;

const CATS = {
  LINEA: 'Productos de Línea',
  MANUFACTURA: 'Manufactura',
  INDUSTRIAL: 'Industrial',
};

const ALL_CASES = [
  // ─────────────────────── PRODUCTOS DE LÍNEA (5) ───────────────────────
  {
    cat: CATS.LINEA,
    logo: 'assets/logos/clients/johnny-rockets.svg',
    cliente: 'Johnny Rockets',
    sector: 'Restaurantero',
    tipo: 'Optimización de consumo',
    impacto: '1 proveedor',
    impactoLabel: 'reducción de proveedores en químicos y jarciería',
    body: 'Estandarización de químicos y jarciería para cocina, salón, baños y áreas de alto tráfico.',
    tags: ['Línea profesional', 'Restaurantero', 'Capacitación'],
    accent: 'blue',
  },
  {
    cat: CATS.LINEA,
    logo: 'assets/logos/clients/sands.svg',
    cliente: 'Hotel Sands',
    sector: 'Hotelero',
    tipo: 'Control operativo',
    impacto: 'Abasto mensual',
    impactoLabel: 'estandarizado · habitaciones · áreas comunes',
    body: 'Suministro base para habitaciones, baños, lobby, restaurante y áreas comunes.',
    tags: ['Hotelería', 'Housekeeping', 'Jarciería'],
    accent: 'blue',
  },
  {
    cat: CATS.LINEA,
    logo: 'assets/logos/clients/emet.svg',
    cliente: 'EMETH Administraciones',
    sector: 'Administración residencial',
    tipo: 'Control de consumo',
    impacto: 'Kit mensual',
    impactoLabel: 'por condominio · canasta estándar',
    body: 'Canasta estándar de químicos, papel, jarciería e insumos para privadas y amenidades.',
    tags: ['Privadas', 'Control de consumo', 'Jarciería'],
    accent: 'blue',
  },
  {
    cat: CATS.LINEA,
    logo: 'assets/logos/clients/codere.svg',
    cliente: 'Casino Codere',
    sector: 'Entretenimiento',
    tipo: 'Continuidad operativa',
    impacto: 'Reposición',
    impactoLabel: 'programada · limpieza rápida 24/7',
    body: 'Suministro para sanitarios, pisos, cocina, superficies, oficinas y áreas de alto flujo.',
    tags: ['Casino', 'Alto tráfico', 'Línea profesional'],
    accent: 'blue',
    darkLogo: true,
  },
  {
    cat: CATS.LINEA,
    placeholder: 'MI',
    cliente: 'Integradores MIDA',
    sector: 'Industrial',
    tipo: 'Limpieza técnica',
    impacto: 'Portafolio',
    impactoLabel: 'industrial · jarciería técnica',
    body: 'Abasto de desengrasantes, limpiadores, jabones industriales y jarciería para operación técnica.',
    tags: ['Industrial', 'Desengrasantes', 'Jarciería'],
    accent: 'blue',
  },

  // ─────────────────────── MANUFACTURA (7) ───────────────────────
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/anemve.svg',
    cliente: 'ANEMVE',
    sector: 'Cosmético · Repelentes',
    tipo: 'Desarrollo de línea nacional',
    impacto: '8 SKU',
    impactoLabel: 'marca propia · distribución nacional',
    body: 'Desarrollo de repelentes en crema y líquido para adultos y niños, con distribución nacional.',
    tags: ['Manufactura', 'Cosmética', 'Marca propia'],
    accent: 'green',
  },
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/anemve.svg',
    cliente: 'ANEMVE',
    sector: 'Cuidado personal',
    tipo: 'Jabón corporal premium',
    impacto: '3 SKU',
    impactoLabel: 'producto terminado · fragancia premium',
    body: 'Desarrollo de jabones corporales con fragancia premium, entregados como producto terminado.',
    tags: ['Cuidado personal', 'Fragancia', 'PT'],
    accent: 'green',
  },
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/varde-hogar.svg',
    cliente: 'Verde Hogar',
    sector: 'Hogar ecológico',
    tipo: 'Línea biodegradable residencial',
    impacto: '3 SKU',
    impactoLabel: 'ecofriendly · listos para uso',
    body: 'Desarrollo de químicos biodegradables y jabones para limpieza residencial, listos para uso.',
    tags: ['Biodegradable', 'Residencial', 'LPU'],
    accent: 'green',
  },
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/equilux.svg',
    cliente: 'Equilux',
    sector: 'Cuidado animal',
    tipo: 'Tratamiento capilar especializado',
    impacto: '2 SKU',
    impactoLabel: 'equinos premium · crin y cola',
    body: 'Desarrollo de shampoo y tratamiento especializado para crin y cola de caballo.',
    tags: ['Equinos', 'Premium', 'Manufactura'],
    accent: 'green',
    darkLogo: true,
  },
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/enovira.svg',
    cliente: 'ENOVYRA',
    sector: 'Limpieza institucional',
    tipo: 'Portafolio completo marca propia',
    impacto: '+45 SKU',
    impactoLabel: 'limpieza y desinfección · distribución',
    body: 'Desarrollo de portafolio amplio para cubrir demanda local de limpieza y desinfección.',
    tags: ['Marca propia', 'Limpieza', 'Distribución'],
    accent: 'green',
  },
  {
    cat: CATS.MANUFACTURA,
    logo: 'assets/logos/clients/bioneutral.svg',
    cliente: 'BioNeutral',
    sector: 'Hogar ecológico',
    tipo: 'Eliminador de olores enzimático',
    impacto: '1 SKU',
    impactoLabel: 'enzimático · mascotas',
    body: 'Limpiador y eliminador de olores enzimático para mascotas, con formulación biodegradable lista para uso.',
    tags: ['Biodegradable', 'Enzimático', 'Mascotas'],
    accent: 'green',
  },
  {
    cat: CATS.MANUFACTURA,
    confidential: true,
    cliente: 'Hotel boutique SLP',
    sector: 'Hotelero · Body Care',
    tipo: 'Body Care con aroma insignia exclusivo',
    impacto: '4 SKU',
    impactoLabel: 'Body Care premium · NDA activo',
    body: 'Manufactura de jabón corporal, shampoo, acondicionador y crema corporal con aroma insignia exclusivo.',
    tags: ['Body Care', 'Hotelería', 'NDA'],
    accent: 'green',
  },

  // ─────────────────────── INDUSTRIAL (4) ───────────────────────
  {
    cat: CATS.INDUSTRIAL,
    logo: 'assets/logos/clients/chemtreat.svg',
    cliente: 'Chemtreat',
    sector: 'Industrial · Químico',
    tipo: 'Gestión de suministro',
    impacto: 'Bajío + Pacífico',
    impactoLabel: 'cobertura logística',
    body: 'Suministro, distribución e ingeniería de apoyo para plantas industriales en Bajío y Pacífico.',
    tags: ['Industrial', 'Logística', 'Ingeniería'],
    accent: 'blue',
  },
  {
    cat: CATS.INDUSTRIAL,
    logo: 'assets/logos/clients/gemtron.svg',
    cliente: 'GEMTRON',
    sector: 'Industrial · Proceso',
    tipo: 'Tratamiento de agua de proceso',
    impacto: 'Sistema interno',
    impactoLabel: 'agua residual de entintado',
    body: 'Diseño e instalación de sistema para tratar agua residual del proceso de entintado de pantallas.',
    tags: ['Tratamiento', 'Proceso', 'Ingeniería'],
    accent: 'blue',
  },
  {
    cat: CATS.INDUSTRIAL,
    logo: 'assets/logos/clients/daikin.svg',
    cliente: 'DAIKIN',
    sector: 'Industrial · Servicios a planta',
    tipo: 'Agua potable operativa',
    impacto: '+120 dispensadores',
    impactoLabel: '5 naves industriales',
    body: 'Instalación de purificadoras para abastecer más de 120 dispensadores en 5 naves industriales.',
    tags: ['Agua potable', 'Planta', 'Instalación'],
    accent: 'blue',
  },
  {
    cat: CATS.INDUSTRIAL,
    nda: true,
    cliente: 'Cliente bajo NDA',
    sector: 'Industrial · Agua residual',
    tipo: 'Reúso de agua tratada',
    impacto: '~15 m³',
    impactoLabel: 'PTAR ampliada · reúso en riego',
    body: 'Ampliación de PTAR para afluente de ~15 m³, con lecho de lodos, triple filtración y reúso en riego.',
    tags: ['PTAR', 'Reúso', 'Filtración'],
    accent: 'blue',
  },
];

// ────────────────────────────────────────────────────────────
function LogoPlate({ p }) {
  // Min 120px tall, white, soft border, padded
  const isDark = !!p.darkLogo;
  return (
    <div style={{
      background: isDark ? 'var(--ng-cloud)' : '#FFFFFF',
      borderBottom: '1px solid var(--ng-line)',
      minHeight: 120,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      padding: 16,
    }}>
      {p.nda || p.confidential ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'var(--ng-steel)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/>
            <rect x="9" y="11" width="6" height="6" rx="1"/>
            <path d="M11 11V9a1 1 0 0 1 2 0v2"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
          }}>{p.confidential ? 'Bajo NDA' : 'NDA'}</span>
        </div>
      ) : p.placeholder ? (
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'var(--ng-blue)', color: '#fff',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
          letterSpacing: '0.02em',
        }}>{p.placeholder}</div>
      ) : (
        <img src={p.logo} alt={p.cliente}
             style={{
               height: 'auto',
               maxHeight: 80, minHeight: 64,
               maxWidth: '88%',
               objectFit: 'contain',
               display: 'block',
             }} />
      )}
      <span style={{
        position: 'absolute', top: 12, right: 12,
        fontSize: 10, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        background: '#fff', border: '1px solid var(--ng-line)',
        color: 'var(--ng-steel)',
        padding: '4px 9px', borderRadius: 999,
      }}>{p.sector}</span>
    </div>
  );
}

function ProjectCard({ p }) {
  const accent = p.accent || 'blue';
  const accentColor = accent === 'green' ? 'var(--ng-green-700)' : 'var(--ng-blue)';
  const accentBg    = accent === 'green' ? 'var(--ng-green-50)' : 'var(--ng-blue-50)';

  return (
    <article style={{
      background: '#fff',
      border: '1px solid var(--ng-line)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
      e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--ng-line)';
    }}>
      <LogoPlate p={p} />

      {/* Body */}
      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, lineHeight: 1, color: accentColor, letterSpacing: '-0.02em', marginBottom: 6 }}>
            {p.impacto}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ng-steel)', letterSpacing: '0.02em' }}>
            {p.impactoLabel}
          </div>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17, fontWeight: 700, margin: 0,
          color: 'var(--ng-ink)', letterSpacing: '-0.015em', lineHeight: 1.25,
        }}>{p.tipo}</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', letterSpacing: '0.04em' }}>{p.cliente}</div>
        <p style={{ fontSize: 13, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>{p.body}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--ng-line)' }}>
          {p.tags.map((t, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 600,
              padding: '4px 10px', borderRadius: 999,
              background: accentBg, color: accentColor,
              letterSpacing: '0.02em',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────
function FilterBar({ active, onChange, counts }) {
  const opts = [
    { id: 'TODOS', label: 'Todos', n: counts.TODOS },
    { id: CATS.LINEA, label: 'Productos de Línea', n: counts[CATS.LINEA] },
    { id: CATS.MANUFACTURA, label: 'Manufactura', n: counts[CATS.MANUFACTURA] },
    { id: CATS.INDUSTRIAL, label: 'Industrial', n: counts[CATS.INDUSTRIAL] },
  ];
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      gap: 10, justifyContent: 'center',
      marginBottom: 40,
    }}>
      {opts.map(o => {
        const isActive = active === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            style={{
              background: isActive ? 'var(--ng-blue)' : '#FAFBFD',
              color: isActive ? '#fff' : 'var(--ng-ink)',
              border: '1px solid',
              borderColor: isActive ? 'var(--ng-blue)' : 'var(--ng-line)',
              fontFamily: 'var(--font-text)',
              fontWeight: 700, fontSize: 14,
              letterSpacing: '-0.005em',
              padding: '12px 22px',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'background .15s ease, color .15s ease, border-color .15s ease, transform .15s ease',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: isActive ? '0 8px 22px -10px rgba(0,85,184,.45)' : 'none',
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'var(--ng-blue-100)'; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'var(--ng-line)'; }}>
            {o.label}
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              background: isActive ? 'rgba(255,255,255,.18)' : '#fff',
              color: isActive ? '#fff' : 'var(--ng-steel)',
              border: isActive ? 'none' : '1px solid var(--ng-line)',
              padding: '2px 8px', borderRadius: 999,
              letterSpacing: '0.04em',
            }}>{o.n}</span>
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
function ProyectosGaleria() {
  const [filter, setFilter] = useStateP('TODOS');

  const counts = {
    TODOS: ALL_CASES.length,
    [CATS.LINEA]: ALL_CASES.filter(c => c.cat === CATS.LINEA).length,
    [CATS.MANUFACTURA]: ALL_CASES.filter(c => c.cat === CATS.MANUFACTURA).length,
    [CATS.INDUSTRIAL]: ALL_CASES.filter(c => c.cat === CATS.INDUSTRIAL).length,
  };

  const visible = filter === 'TODOS'
    ? ALL_CASES
    : ALL_CASES.filter(c => c.cat === filter);

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Casos · clientes verificables</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 12px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            Operaciones reales en planta, ingeniería y desarrollo.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
            16 casos visibles entre productos de línea, manufactura para terceros e ingeniería industrial. El resto opera bajo NDA.
          </p>
        </div>

        {/* Filtros centrados */}
        <FilterBar active={filter} onChange={setFilter} counts={counts} />

        {/* Grid (3 columnas) — fade on filter change */}
        <div
          key={filter}
          className="ng-proj-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
            animation: 'ng-fade-in .35s ease both',
          }}>
          {visible.map((p, i) => <ProjectCard key={`${filter}-${i}`} p={p} />)}
        </div>

        <style>{`
          @keyframes ng-fade-in {
            0% { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 1024px) {
            .ng-proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .ng-proj-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.ProyectosGaleria = ProyectosGaleria;
