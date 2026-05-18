// ProductosTabs.jsx — 7 tabs × 19 sub-familias (estructura real Neugreen)
const { useState: useStateTabs } = React;

const TAB_DATA = [
  {
    id: 'convencional',
    label: 'Limpieza convencional',
    short: '01',
    accent: 'blue',
    eyebrow: '01 · Limpieza convencional',
    title: 'Soluciones profesionales para espacios y operaciones.',
    body: 'Línea base de químicos para limpieza cotidiana. Cumplimiento COFEPRIS, NOM-016 y FDA/EPA cuando aplica. Disponible de 1L a 200L y a granel.',
    sub: [
      { name: 'Limpieza general', desc: 'Multiusos, desengrasantes y limpiadores para superficies, pisos, vidrios y baños.', sector: 'Oficinas, comercios y operación cotidiana.' },
      { name: 'Lavandería',       desc: 'Detergentes, blanqueadores y suavizantes para textil de alto volumen.', sector: 'Hotelería, hospitales y lavanderías industriales.' },
      { name: 'Cocina',           desc: 'Desengrasantes, desincrustantes y limpiadores compatibles con grado alimenticio.', sector: 'Cocinas industriales y procesos alimenticios.' },
      { name: 'Autos',            desc: 'Shampoo, ceras y limpiadores para detallado vehicular y flota.', sector: 'Autolavados, agencias y flotas.' },
    ],
  },
  {
    id: 'enzimatica',
    label: 'Limpieza enzimática',
    short: '02',
    accent: 'green',
    eyebrow: '02 · Limpieza enzimática especializada',
    title: 'Tecnología que limpia en profundidad, no enmascara.',
    body: 'Formulaciones a base de enzimas y microorganismos seleccionados. Reduce DBO/DQO documentada en cliente, sin químicos agresivos ni residuos en agua residual.',
    sub: [
      { name: 'Limpieza general enzimática',                     desc: 'Limpiadores con enzimas que degradan materia orgánica residual.', sector: 'Superficies con biocarga alta y proceso alimenticio.' },
      { name: 'Detergentes enzimáticos para lavandería',         desc: 'Quita manchas proteicas, grasas y sangre en una sola dosis.', sector: 'Hospitales, restaurantes y procesos industriales.' },
      { name: 'Eliminadores de olores',                          desc: 'Neutralización enzimática de moléculas orgánicas (H₂S, mercaptanos, amoníaco).', sector: 'Baños públicos, drenajes y áreas de proceso.' },
      { name: 'Bacterias para trampas de grasa',                 desc: 'Bioaumentación dirigida. Mantiene PTARs y trampas operando sin químico agresivo.', sector: 'PTARs municipales, industriales y cocinas con trampa.' },
    ],
  },
  {
    id: 'desinfeccion',
    label: 'Desinfección',
    short: '03',
    accent: 'blue',
    eyebrow: '03 · Desinfección',
    title: 'Desde uso convencional hasta aplicación industrial.',
    body: 'Familia completa de desinfectantes con cobertura regulatoria. Selección por concentración, ingrediente activo y nivel de criticidad.',
    note: 'Disponibles en altas concentraciones y listos para usar (LPU).',
    sub: [
      { name: 'Desinfectantes convencionales',  desc: 'Cuaternarios, peroxídicos y clorados con cumplimiento COFEPRIS.', sector: 'Uso diario en comercios, oficinas y operación general.' },
      { name: 'Desinfectantes especializados',  desc: 'Sanitizantes grado alimenticio y áreas críticas con respaldo FDA/EPA.', sector: 'Procesos regulados, áreas críticas y grado farmacéutico.' },
      { name: 'Desinfectantes industriales',    desc: 'Alta concentración para dosificación automatizada en procesos.', sector: 'PTAR, torres de enfriamiento y procesos industriales.' },
    ],
  },
  {
    id: 'bodycare',
    label: 'Body Care',
    short: '04',
    accent: 'green',
    eyebrow: '04 · Body Care',
    title: 'Línea de cuidado personal para marca privada y hotelería.',
    body: 'Formulaciones balanceadas (pH 5.5) con fragancia premium. Disponibles como amenidad hotelera o producto consumer bajo marca privada.',
    sub: [
      { name: 'Jabones corporales',  desc: 'Surfactantes suaves con fragancia premium y respaldo dermatológico.',  sector: 'Hotelería, gimnasios y marca privada residencial.' },
      { name: 'Shampoo corporal',    desc: 'Formulación pH 5.5 sin sulfatos agresivos. Amenidad o consumer.',     sector: 'Amenidad hotelera o marca privada premium.' },
      { name: 'Acondicionador',      desc: 'Misma fragancia que el shampoo, con perfil de cabello variable.',     sector: 'Línea completa hotelera o consumer.' },
      { name: 'Cremas corporales',   desc: 'Hidratación con activos naturales y fragancia coordinada.',           sector: 'Amenidad premium y marca privada.' },
    ],
  },
  {
    id: 'mascotas',
    label: 'Mascotas',
    short: '05',
    accent: 'green',
    eyebrow: '05 · Mascotas',
    title: 'Cuidado especializado para tus animales.',
    body: 'Formulaciones específicas para piel animal, sin tensoactivos agresivos. Disponible como marca propia o privada.',
    sub: [
      { name: 'Shampoo para mascotas', desc: 'Formulación específica para piel canina y equina, pH neutro.', sector: 'Estéticas caninas, criaderos y consumer.' },
    ],
  },
  {
    id: 'aroma',
    label: 'Aroma Experience',
    short: '06',
    accent: 'blue',
    eyebrow: '06 · Aroma Experience',
    title: 'Aromatización profesional de espacios comerciales e institucionales.',
    body: 'No solo perfumamos: combinamos enzimas neutralizadoras con fragancias profesionales. Equipo + aroma + mantenimiento, en venta o modalidad mensual.',
    sub: [
      { name: 'Fragancias',                                    desc: 'Aromas profesionales en concentración técnica: cítricos, florales, amaderados, marca propia exclusiva.', sector: 'Hoteles, lobbies, retail y espacios comerciales.' },
      { name: 'Difusores de aroma',                            desc: 'Equipos de aromatización continua: nebulizadores, dispersores eléctricos, sistemas centralizados.',     sector: 'Lobbies, áreas comunes y baños de alto tráfico.' },
      { name: 'Servicio de aromatización de espacios',         desc: 'Venta de equipo o modalidad mensual con servicio incluido (equipo + aroma + mantenimiento).',          sector: 'Cadenas, hoteles boutique y operación institucional.' },
    ],
  },
  {
    id: 'jarciera',
    label: 'Jarciería e institucional',
    short: '07',
    accent: 'blue',
    eyebrow: '07 · Jarciería e institucional',
    title: 'Todo el material de limpieza para operación profesional.',
    body: 'Inventario activo en planta SLP. Cubre 100 % de la canasta operativa: químicos, accesorios, consumibles, protección y desechables.',
    sub: [
      { name: 'Cepillos y fibras',           desc: 'Cepillos industriales, fibras verdes/azules/blancas, esponjas técnicas.',          sector: 'Cocina, baños, mantenimiento general.' },
      { name: 'Cestos y contenedores',       desc: 'Cestos de basura, contenedores especializados y separadores de residuos.',          sector: 'Oficinas, comercios y operación institucional.' },
      { name: 'Envases y atomizadores',      desc: 'Garrafas, botellas, atomizadores y dispensadores para operación y marca privada.',  sector: 'Re-envase y dosificación manual.' },
      { name: 'General',                     desc: 'Trapeadores, mopas, jaladores, hojas y consumibles de uso diario.',                  sector: 'Limpieza general y mantenimiento.' },
      { name: 'Limpieza de pisos',           desc: 'Cubetas, exprimidores y sistemas de mopa con presión.',                             sector: 'Operación de housekeeping y limpieza profesional.' },
      { name: 'Papel y desechables',         desc: 'Papel sanitario, toalla en rollo, servilleta y jabón en hojas.',                     sector: 'Sanitarios, comedores y áreas comunes.' },
      { name: 'Plásticos y accesorios',      desc: 'Bolsas, fundas, contenedores plásticos y conos de seguridad.',                       sector: 'Operación general y seguridad.' },
      { name: 'Protección y uso personal',   desc: 'Guantes, cubrebocas, lentes, mandiles y botas industriales.',                        sector: 'Operación con normativa de seguridad.' },
      { name: 'Textiles de limpieza',        desc: 'Microfibras, paños técnicos y toallas industriales.',                                sector: 'Housekeeping y limpieza fina.' },
      { name: 'WC y sanitarios',             desc: 'Desinfectantes específicos para WC, escobillas y dispensadores sanitarios.',         sector: 'Baños públicos y de alta rotación.' },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Subfamilia accordion card
// ────────────────────────────────────────────────────────────
function SubCard({ s, accent, isOpen, onToggle }) {
  const isGreen = accent === 'green';
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: isOpen ? '#fff' : 'var(--ng-mist)',
        border: '1px solid',
        borderColor: isOpen ? (isGreen ? 'var(--ng-green)' : 'var(--ng-blue)') : 'var(--ng-line)',
        borderRadius: 'var(--r-lg)',
        padding: '18px 20px',
        cursor: 'pointer',
        transition: 'background .15s ease, border-color .15s ease, box-shadow .15s ease',
        boxShadow: isOpen ? (isGreen ? '0 8px 24px -10px rgba(65,190,67,.25)' : '0 8px 24px -10px rgba(0,63,197,.2)') : 'none',
        fontFamily: 'inherit',
      }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 700,
          color: 'var(--ng-ink)',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
        }}>{s.name}</div>
        <div style={{
          width: 24, height: 24,
          borderRadius: 999,
          background: isOpen ? (isGreen ? 'var(--ng-green)' : 'var(--ng-blue)') : '#fff',
          color: isOpen ? '#fff' : 'var(--ng-steel)',
          border: isOpen ? 'none' : '1px solid var(--ng-line)',
          display: 'grid', placeItems: 'center',
          flexShrink: 0,
          transition: 'transform .15s ease, background .15s ease, color .15s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--ng-line)' }}>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--ng-ink)', lineHeight: 1.55 }}>{s.desc}</p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Aplica en · <span style={{ color: 'var(--ng-steel)', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>{s.sector}</span>
          </div>
        </div>
      )}
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// Tab panel
// ────────────────────────────────────────────────────────────
function TabPanel({ tab }) {
  const isGreen = tab.accent === 'green';
  const [open, setOpen] = useStateTabs(null);
  // Reset open state when tab changes
  React.useEffect(() => setOpen(null), [tab.id]);

  const colCount = tab.sub.length <= 1 ? 1 : (tab.sub.length <= 4 ? 2 : 3);

  return (
    <div>
      {/* Heading row */}
      <div className="ng-tab-heading" style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 56,
        alignItems: 'end',
        marginBottom: 36,
      }}>
        <div>
          <div className="eyebrow" style={{ color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)', marginBottom: 12 }}>{tab.eyebrow}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 38px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>{tab.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', lineHeight: 1.55, margin: 0, maxWidth: 640 }}>
            {tab.body}
          </p>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ng-steel)',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          textAlign: 'right',
        }}>
          {tab.sub.length} sub-familia{tab.sub.length === 1 ? '' : 's'} · clic para ver alcance
        </div>
      </div>

      {tab.note && (
        <div style={{
          background: isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
          border: `1px solid ${isGreen ? '#C8EDC8' : 'var(--ng-blue-100)'}`,
          borderRadius: 'var(--r)',
          padding: '12px 18px',
          fontSize: 14, color: 'var(--ng-ink)',
          marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong style={{ color: 'var(--ng-ink)', fontWeight: 700 }}>Nota:</strong>
          <span style={{ color: 'var(--ng-steel)' }}>{tab.note}</span>
        </div>
      )}

      {/* Sub-family accordion grid */}
      <div className={`ng-subfam-grid ng-subfam-col-${colCount}`} style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        gap: 14,
        alignItems: 'start',
      }}>
        {tab.sub.map((s, i) => (
          <SubCard
            key={i}
            s={s}
            accent={tab.accent}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>

      {/* CTA row */}
      <div style={{
        marginTop: 48,
        padding: '28px 32px',
        background: isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
        border: `1px solid ${isGreen ? '#C8EDC8' : 'var(--ng-blue-100)'}`,
        borderRadius: 'var(--r-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
            color: 'var(--ng-ink)', letterSpacing: '-0.01em', marginBottom: 4,
          }}>¿Te interesa esta línea?</div>
          <div style={{ fontSize: 14, color: 'var(--ng-steel)' }}>
            Te enviamos cotización con SKU, MOQ y ficha técnica en menos de 24 h hábiles.
          </div>
        </div>
        <a
          href={`contacto.html?linea=${tab.id}`}
          style={{
            background: isGreen ? 'var(--ng-green)' : 'var(--ng-blue)',
            color: '#fff',
            fontWeight: 700, fontSize: 14,
            padding: '14px 24px',
            borderRadius: 'var(--r)',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
            boxShadow: isGreen
              ? '0 10px 24px -10px rgba(65,190,67,.45)'
              : '0 10px 24px -10px rgba(0,63,197,.45)',
          }}>
          Solicitar cotización de {tab.label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Root
// ────────────────────────────────────────────────────────────
function ProductosTabs() {
  const initial = (() => {
    if (typeof window === 'undefined') return 'convencional';
    const ids = TAB_DATA.map(t => t.id);
    const hash = (window.location.hash || '').replace('#', '');
    const params = new URLSearchParams(window.location.search);
    const q = params.get('tab') || params.get('linea');
    return ids.includes(hash) ? hash : (ids.includes(q) ? q : 'convencional');
  })();
  const [active, setActive] = useStateTabs(initial);
  const tab = TAB_DATA.find(t => t.id === active);

  return (
    <section style={{
      padding: '64px var(--section-pad-x) clamp(80px, 8vw, 120px)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Tab strip — wraps to multiple rows when narrow (never scroll) */}
        <div role="tablist" className="ng-tablist" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          rowGap: 0,
          borderBottom: '1px solid var(--ng-line)',
          marginBottom: 56,
          justifyContent: 'flex-start',
        }}>
          {TAB_DATA.map(t => {
            const isActive = t.id === active;
            const isGreen = t.accent === 'green';
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                style={{
                  padding: '18px 22px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? (isGreen ? 'var(--ng-green)' : 'var(--ng-blue)') : 'transparent'}`,
                  marginBottom: -1,
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: isActive ? 'var(--ng-ink)' : 'var(--ng-steel)',
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'color .12s ease, border-color .12s ease',
                  display: 'flex', alignItems: 'center', gap: 10,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11, fontWeight: 500,
                  color: isActive ? (isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)') : 'var(--ng-steel)',
                  letterSpacing: '0.06em',
                }}>{t.short}</span>
                {t.label}
              </button>
            );
          })}
        </div>

        <TabPanel tab={tab} />
      </div>
    </section>
  );
}

// Responsive styles injected once via a global style tag
if (typeof document !== 'undefined' && !document.getElementById('ng-tabs-responsive')) {
  const s = document.createElement('style');
  s.id = 'ng-tabs-responsive';
  s.textContent = `
    @media (max-width: 768px) {
      .ng-tab-heading { grid-template-columns: 1fr !important; gap: 16px !important; }
      .ng-tab-heading > div:last-child { text-align: left !important; }
      .ng-subfam-grid { grid-template-columns: 1fr !important; }
      .ng-tablist button { padding: 14px 16px !important; font-size: 13px !important; }
    }
  `;
  document.head.appendChild(s);
}

window.ProductosTabs = ProductosTabs;
