// ProductLines.jsx — 10 tarjetas de línea para el home, en correspondencia
// 1:1 con las pestañas de ProductosTabs.jsx (mismo orden, mismo label).
const PL_I = {
  // Lucide line icons (1.75 stroke)
  sprayCan: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h4v4H3z"/>
      <path d="M9 3h1M9 6h1M9 9h1"/>
      <path d="M5 7v3"/>
      <path d="M3 21h12v-9H3z"/>
      <path d="M5 12V9"/>
    </svg>
  ),
  shirt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.4 6.4 16 4l-4 3-4-3-4.4 2.4L6 11l2-1v11h8V10l2 1 2.4-4.6Z"/>
    </svg>
  ),
  chefHat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" y1="17" x2="18" y2="17"/>
    </svg>
  ),
  microscope: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8"/>
      <path d="M3 22h18"/>
      <path d="M14 22a7 7 0 1 0 0-14h-1"/>
      <path d="M9 14h2"/>
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
    </svg>
  ),
  shieldCheck: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  package2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
      <path d="M3 9 5 4h14l2 5"/>
      <path d="M12 4v17"/>
    </svg>
  ),
  wind: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  ),
  car: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2"/>
      <path d="M9 17h6"/>
      <circle cx="7.5" cy="17" r="1.6"/>
      <circle cx="16.5" cy="17" r="1.6"/>
    </svg>
  ),
  bottle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4v3l2 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-3z"/>
      <path d="M8 13h8"/>
    </svg>
  ),
  paw: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7.5" r="1.8"/>
      <circle cx="16" cy="7.5" r="1.8"/>
      <circle cx="5" cy="12.5" r="1.6"/>
      <circle cx="19" cy="12.5" r="1.6"/>
      <path d="M12 13c2.8 0 5 2 5 4.2 0 1.7-1.3 2.8-3 2.8h-4c-1.7 0-3-1.1-3-2.8C7 15 9.2 13 12 13z"/>
    </svg>
  ),
};

// Una tarjeta por pestaña de ProductosTabs.jsx: mismo orden, mismo label y
// mismo accent, para que el home y /productos se lean como la misma cosa.
const PL_CARDS = [
  {
    icon: PL_I.sprayCan, accent: 'blue',
    n: '01', title: 'Limpieza convencional',
    sub: ['Multiusos concentrados', 'Desengrasantes industriales', 'Blanqueadores y cloros', 'Cuidado de superficies'],
    desc: 'Línea base para la limpieza cotidiana de superficies y espacios.',
    tab: 'convencional',
  },
  {
    icon: PL_I.microscope, accent: 'green',
    n: '02', title: 'Limpieza enzimática',
    sub: ['Desengrasantes enzimáticos', 'Biodigestores', 'Detergentes para ropa', 'Control de olores'],
    desc: 'Enzimas y microorganismos que actúan sobre la materia orgánica.',
    tab: 'enzimatica',
  },
  {
    icon: PL_I.shieldCheck, accent: 'blue',
    n: '03', title: 'Desinfección',
    sub: ['Cuaternarios de amonio', 'Glutaraldehído', 'Antisépticos de alcohol', 'Jabones antibacteriales'],
    desc: 'Desde uso convencional hasta desinfección de alto nivel.',
    tab: 'desinfeccion',
  },
  {
    icon: PL_I.chefHat, accent: 'green',
    n: '04', title: 'Baños y cocina',
    sub: ['Removedores de sarro', 'Limpiadores de hornos', 'Lavatrastes', 'Acero inoxidable'],
    desc: 'Producto específico para las áreas de mayor exigencia sanitaria.',
    tab: 'banos-cocina',
  },
  {
    icon: PL_I.shirt, accent: 'blue',
    n: '05', title: 'Lavandería',
    sub: ['Detergentes líquidos y en polvo', 'Suavizantes', 'Quitamanchas', 'Aromatizantes para ropa'],
    desc: 'Ciclo completo de lavado para textil de alto volumen.',
    tab: 'lavanderia',
  },
  {
    icon: PL_I.car, accent: 'green',
    n: '06', title: 'Automotriz',
    sub: ['Detergentes para lavado', 'Protectores de llantas', 'Protectores de vinil'],
    desc: 'Lavado de carrocería, tratamiento de llanta y protección de interiores.',
    tab: 'automotriz',
  },
  {
    icon: PL_I.wind, accent: 'blue',
    n: '07', title: 'Aroma Experience',
    sub: ['Aromatizantes concentrados', 'Equipos de difusión', 'Aerosol y repuestos'],
    desc: 'Aromatización profesional de espacios: venta de equipo o servicio mensual.',
    tab: 'aroma',
  },
  {
    icon: PL_I.bottle, accent: 'green',
    n: '08', title: 'Body Care',
    sub: ['Shampoo capilar', 'Acondicionadores', 'Jabón corporal'],
    desc: 'Cuidado personal para amenidad hotelera y marca privada.',
    tab: 'bodycare',
  },
  {
    icon: PL_I.paw, accent: 'blue',
    n: '09', title: 'Mascotas',
    sub: ['Shampoo para baño', 'Control de olores', 'Alfombras y tapicería'],
    desc: 'Formulaciones para piel animal y control de olor en su entorno.',
    tab: 'mascotas',
  },
  {
    icon: PL_I.package2, accent: 'green',
    n: '10', title: 'Jarciería e institucional',
    sub: ['Papel y desechables', 'Plásticos y accesorios', 'Limpieza de pisos', 'Dispensadores y dosificadores'],
    desc: 'Insumos y herramientas para operación de limpieza profesional.',
    tab: 'jarcieria',
  },
];

function ProductLineCard({ card }) {
  const isGreen = card.accent === 'green';
  const accentColor = isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)';
  const accentBg    = isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)';
  return (
    <a
      href={`productos.html?tab=${card.tab}#${card.tab}`}
      className="ng-card-light"
      style={{
        background: 'var(--ng-white)',
        border: '1px solid var(--ng-line)',
        borderRadius: 'var(--r-lg)',
        padding: 24,
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex', flexDirection: 'column',
        gap: 16,
        minHeight: 280,
      }}>
      {/* Top row: icon + number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44,
          background: accentBg, color: accentColor,
          borderRadius: 'var(--r)',
          display: 'grid', placeItems: 'center',
        }}>{card.icon}</div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          color: 'var(--ng-steel)', letterSpacing: '0.12em',
        }}>{card.n}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20, fontWeight: 700,
        margin: 0, color: 'var(--ng-ink)',
        letterSpacing: '-0.015em', lineHeight: 1.2,
      }}>{card.title}</h3>

      <ul style={{
        margin: 0, padding: 0, listStyle: 'none',
        display: 'flex', flexDirection: 'column', gap: 4,
        flex: 1,
      }}>
        {card.sub.map((it, i) => (
          <li key={i} style={{
            fontSize: 13,
            color: 'var(--ng-ink)',
            lineHeight: 1.45,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <span style={{
              flexShrink: 0, marginTop: 8,
              width: 3, height: 3, borderRadius: '50%',
              background: accentColor,
            }}></span>
            {it}
          </li>
        ))}
      </ul>

      <div style={{
        paddingTop: 14, borderTop: '1px solid var(--ng-line)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 10,
      }}>
        <p style={{
          fontSize: 12, color: 'var(--ng-steel)',
          margin: 0, lineHeight: 1.45, flex: 1,
        }}>{card.desc}</p>
        <span style={{
          flexShrink: 0,
          width: 28, height: 28, borderRadius: 999,
          background: accentBg, color: accentColor,
          display: 'grid', placeItems: 'center',
          marginTop: -2,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </span>
      </div>
    </a>
  );
}

function ProductLines() {
  return (
    <section style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="ng-pl-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>01 · Productos de línea</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', color: 'var(--ng-ink)' }}>
              120+ SKUs activos.<br/>Inventario + Entregas.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--ng-steel)', maxWidth: 560, margin: 0, lineHeight: 1.55 }}>
              Ocho familias para limpieza profesional, lavandería, cocina, desinfección y especialidades. Stock activo en planta SLP — entrega 48 h FOB.
            </p>
          </div>
          <a href="productos.html" style={{
            background: 'transparent', color: 'var(--ng-blue)',
            border: '1px solid var(--ng-blue)',
            fontWeight: 700, fontSize: 14, padding: '12px 22px',
            borderRadius: 'var(--r)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Ver catálogo completo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="ng-pl-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {PL_CARDS.map((c, i) => <ProductLineCard key={i} card={c} />)}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .ng-pl-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 768px) {
            .ng-pl-header { flex-direction: column !important; align-items: flex-start !important; }
            .ng-pl-header a { width: 100% !important; justify-content: center !important; }
          }
          @media (max-width: 560px) {
            .ng-pl-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.ProductLines = ProductLines;
