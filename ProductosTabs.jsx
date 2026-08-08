// ProductosTabs.jsx — 10 líneas de producto agrupadas por función (no por SKU)
const { useState: useStateTabs } = React;

// Ids obsoletos que siguen circulando en enlaces publicados. Se traducen al
// id vigente ANTES de validar, para no romper URLs que ya están en el Footer
// de todas las páginas y en material enviado a cliente.
const ALIAS_TABS = {
  jarciera: 'jarcieria',
};

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
      { name: 'Limpiadores multiusos concentrados', desc: 'Fórmulas diluibles para limpieza general de superficies lavables.', sector: 'Oficinas, comercios y operación cotidiana.' },
      { name: 'Desengrasantes industriales', desc: 'Remoción de grasa y residuo aceitoso en piso, maquinaria y área de proceso.', sector: 'Talleres, plantas y áreas de producción.' },
      { name: 'Blanqueadores y cloros', desc: 'Soluciones cloradas para blanqueo y limpieza de superficies resistentes.', sector: 'Sanitarios, pisos y áreas de alta rotación.' },
      { name: 'Cuidado de superficies (pisos, vidrios y madera)', desc: 'Limpiadores y abrillantadores formulados según el tipo de acabado.', sector: 'Recepciones, oficinas y áreas de exhibición.' },
      { name: 'Control de plagas', desc: 'Insecticidas y repelentes de uso profesional para mantenimiento preventivo.', sector: 'Almacenes, exteriores y áreas de servicio.' },
    ],
  },
  {
    id: 'enzimatica',
    label: 'Limpieza enzimática',
    short: '02',
    accent: 'green',
    eyebrow: '02 · Limpieza enzimática especializada',
    title: 'Tecnología que limpia en profundidad, no enmascara.',
    body: 'Formulaciones a base de enzimas y microorganismos seleccionados. Actúan sobre la materia orgánica sin químicos agresivos ni residuos en agua residual.',
    sub: [
      { name: 'Desengrasantes enzimáticos', desc: 'Enzimas que degradan grasa y materia orgánica sin químico agresivo.', sector: 'Cocinas industriales y líneas de proceso alimenticio.' },
      { name: 'Biodigestores para trampas de grasa y fosas sépticas', desc: 'Consorcios bacterianos para mantenimiento de trampas, fosas y cárcamos.', sector: 'PTAR, trampas de grasa y drenaje institucional.' },
      { name: 'Limpiadores multiusos enzimáticos', desc: 'Limpieza general con acción enzimática sobre residuo orgánico.', sector: 'Superficies con biocarga alta y uso frecuente.' },
      { name: 'Detergentes enzimáticos para ropa', desc: 'Detergentes con enzimas para manchas proteicas y grasas en textil.', sector: 'Hospitales, hotelería y lavandería industrial.' },
      { name: 'Control enzimático de olores', desc: 'Neutralización de las moléculas orgánicas que originan el olor, sin enmascararlo.', sector: 'Sanitarios, drenajes y áreas de residuos.' },
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
      { name: 'Desinfectantes de alto nivel a base de cuaternarios de amonio', desc: 'Amonio cuaternario en distintas generaciones y concentraciones.', sector: 'Superficies de contacto y áreas de uso general.' },
      { name: 'Desinfectantes a base de glutaraldehído', desc: 'Formulaciones para desinfección de instrumental y superficies críticas.', sector: 'Clínicas, laboratorios y áreas críticas.' },
      { name: 'Antisépticos a base de alcohol', desc: 'Soluciones alcohólicas para antisepsia de manos y superficies.', sector: 'Puntos de higiene, consultorios y accesos.' },
      { name: 'Jabones antibacteriales para manos', desc: 'Jabones con agente antibacterial para lavado frecuente.', sector: 'Sanitarios, cocinas y áreas de proceso.' },
      { name: 'Limpiadores desinfectantes multiusos', desc: 'Producto de un paso que limpia y desinfecta en la misma aplicación.', sector: 'Operación diaria en comercios e instituciones.' },
    ],
  },
  {
    id: 'banos-cocina',
    label: 'Baños y cocina',
    short: '04',
    accent: 'green',
    eyebrow: '04 · Baños y cocina',
    title: 'Producto específico para las dos áreas de mayor exigencia sanitaria.',
    body: 'Formulaciones diferenciadas por tipo de residuo y material: incrustación mineral en sanitarios, grasa carbonizada en cocina y acabados que exigen producto no abrasivo.',
    sub: [
      { name: 'Removedores de sarro y depósitos minerales', desc: 'Ácidos formulados para incrustación calcárea en sanitarios y tuberías.', sector: 'Baños de alta rotación, regaderas y mingitorios.' },
      { name: 'Limpiadores de hornos y estufas', desc: 'Alcalinos para grasa carbonizada y residuo horneado.', sector: 'Cocinas industriales y equipo de cocción.' },
      { name: 'Lavatrastes y utensilios', desc: 'Detergentes para lavado manual y automático de loza y utensilio.', sector: 'Cocinas, comedores y áreas de lavado.' },
      { name: 'Lavado de frutas y verduras', desc: 'Producto para desinfección de vegetal crudo previo a preparación.', sector: 'Cocinas de proceso alimenticio y comedores.' },
      { name: 'Limpiadores de acero inoxidable', desc: 'Limpieza y abrillantado sin dejar película ni marcar el acabado.', sector: 'Mobiliario y equipo de cocina en acero.' },
      { name: 'Limpiadores en polvo abrasivos', desc: 'Acción mecánica para residuo adherido en superficies resistentes.', sector: 'Tarjas, pisos y superficies no delicadas.' },
    ],
  },
  {
    id: 'lavanderia',
    label: 'Lavandería',
    short: '05',
    accent: 'blue',
    eyebrow: '05 · Lavandería',
    title: 'Ciclo completo de lavado para textil de alto volumen.',
    body: 'Producto por etapa del proceso: lavado, suavizado, tratamiento puntual de mancha y aromatización final. Para dosificación manual o automatizada.',
    sub: [
      { name: 'Detergentes líquidos para ropa', desc: 'Formulación líquida para dosificación automática o manual.', sector: 'Lavandería industrial, hotelería y hospitales.' },
      { name: 'Detergentes en polvo', desc: 'Detergente sólido para lavado de alto volumen.', sector: 'Lavanderías y operación de textil institucional.' },
      { name: 'Suavizantes y acondicionadores de telas', desc: 'Acondicionamiento de la fibra en el ciclo de enjuague.', sector: 'Blancos de hotelería y uniformes.' },
      { name: 'Quitamanchas', desc: 'Tratamiento puntual previo al lavado según el tipo de mancha.', sector: 'Textil con mancha proteica, grasa o pigmento.' },
      { name: 'Aromatizantes para ropa', desc: 'Fragancia residual aplicada en el ciclo final.', sector: 'Blancos, uniformes y textil de servicio.' },
    ],
  },
  {
    id: 'automotriz',
    label: 'Automotriz',
    short: '06',
    accent: 'green',
    eyebrow: '06 · Automotriz',
    title: 'Línea para lavado y detallado de vehículo.',
    body: 'Producto para operación de autolavado y mantenimiento de flota: lavado de carrocería, tratamiento de llanta y protección de superficies interiores.',
    sub: [
      { name: 'Detergentes concentrados para lavado de vehículos', desc: 'Shampoo concentrado con formulación a base de cera de carnauba.', sector: 'Autolavados, agencias y flotas.' },
      { name: 'Abrillantadores y protectores de llantas', desc: 'Acabado y protección del hule frente a resequedad y decoloración.', sector: 'Detallado vehicular y mantenimiento de flota.' },
      { name: 'Protectores de vinil y superficies plásticas', desc: 'Tratamiento de tablero, molduras y plástico interior.', sector: 'Interiores de vehículo y detallado.' },
    ],
  },
  {
    id: 'aroma',
    label: 'Aroma Experience',
    short: '07',
    accent: 'blue',
    eyebrow: '07 · Aroma Experience',
    title: 'Aromatización profesional de espacios comerciales e institucionales.',
    body: 'No solo perfumamos: combinamos enzimas neutralizadoras con fragancias profesionales. Equipo + aroma + mantenimiento, en venta o modalidad mensual.',
    sub: [
      { name: 'Aromatizantes concentrados de ambiente', desc: 'Fragancia en concentración técnica para dilución o equipo de difusión.', sector: 'Lobbies, retail y espacios comerciales.' },
      { name: 'Equipos de difusión de aceites esenciales', desc: 'Nebulizadores y difusores para aromatización continua del espacio.', sector: 'Áreas comunes, recepciones y baños de alto tráfico.' },
      { name: 'Aromatizantes en aerosol y repuestos', desc: 'Presentación en aerosol y cartuchos de reposición para dispensador.', sector: 'Sanitarios y áreas de servicio.' },
    ],
  },
  {
    id: 'bodycare',
    label: 'Body Care',
    short: '08',
    accent: 'green',
    eyebrow: '08 · Body Care',
    title: 'Línea de cuidado personal para marca privada y hotelería.',
    body: 'Formulaciones balanceadas (pH 5.5) con fragancia premium. Disponibles como amenidad hotelera o producto consumer bajo marca privada.',
    sub: [
      { name: 'Shampoo capilar', desc: 'Formulación para cabello, disponible como amenidad o marca privada.', sector: 'Hotelería, gimnasios y marca privada.' },
      { name: 'Acondicionadores y enjuagues', desc: 'Acondicionamiento posterior al lavado, con fragancia coordinada.', sector: 'Línea completa hotelera o consumer.' },
      { name: 'Jabón corporal', desc: 'Surfactantes suaves para uso corporal frecuente.', sector: 'Amenidad hotelera, gimnasios y consumer.' },
    ],
  },
  {
    id: 'mascotas',
    label: 'Mascotas',
    short: '09',
    accent: 'blue',
    eyebrow: '09 · Mascotas',
    title: 'Cuidado especializado para tus animales.',
    body: 'Formulaciones específicas para piel animal, sin tensoactivos agresivos. Disponible como marca propia o privada.',
    sub: [
      { name: 'Shampoo para baño de mascotas', desc: 'Formulación con pH adecuado para piel animal.', sector: 'Estéticas caninas, criaderos y consumer.' },
      { name: 'Control enzimático de olores', desc: 'Neutralización de olor de origen orgánico en áreas de estancia animal.', sector: 'Criaderos, veterinarias y hogares con mascota.' },
      { name: 'Limpieza de alfombras y tapicería', desc: 'Remoción de residuo orgánico en textil de piso y mueble.', sector: 'Interiores con mascota y áreas de estancia.' },
    ],
  },
  {
    id: 'jarcieria',
    label: 'Jarciería e institucional',
    short: '10',
    accent: 'green',
    eyebrow: '10 · Jarciería e institucional',
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
      { name: 'Dispensadores y dosificadores', desc: 'Equipo para suministro controlado de producto e insumos en el punto de uso.', sector: 'Sanitarios, cocinas y áreas de limpieza.' },
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
      <div className="ng-tab-cta-row" style={{
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
          className="ng-tab-cta-btn"
          style={{
            background: isGreen ? 'var(--ng-green)' : 'var(--ng-blue)',
            color: '#fff',
            fontWeight: 700, fontSize: 14,
            padding: '14px 24px',
            borderRadius: 'var(--r)',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
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
    // El alias se aplica ANTES de validar: así un enlace viejo con
    // ?tab=jarciera#jarciera sigue abriendo la pestaña de Jarciería en vez de
    // caer al default. Esos enlaces están publicados en el Footer del sitio.
    const alias = (v) => ALIAS_TABS[v] || v;
    const hash = alias((window.location.hash || '').replace('#', ''));
    const params = new URLSearchParams(window.location.search);
    const q = alias(params.get('tab') || params.get('linea'));
    return ids.includes(hash) ? hash : (ids.includes(q) ? q : 'convencional');
  })();
  const [active, setActive] = useStateTabs(initial);
  const tab = TAB_DATA.find(t => t.id === active);

  return (
    <section style={{
      padding: '64px var(--section-pad-x) clamp(80px, 8vw, 120px)',
      background: 'var(--ng-cloud)',
      overflowX: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Tab strip — píldoras que se ajustan al contenido y fluyen a varias
            filas. Con 10 pestañas el subrayado de pestaña clásico deja de
            funcionar: al partirse en dos filas, el indicador de la primera
            queda flotando a media barra, desconectado del borde inferior.
            La píldora es autocontenida y no depende de esa línea común. */}
        <div role="tablist" className="ng-tablist" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          rowGap: 8,
          marginBottom: 48,
          justifyContent: 'flex-start',
        }}>
          {TAB_DATA.map(t => {
            const isActive = t.id === active;
            const isGreen = t.accent === 'green';
            const acento = isGreen ? 'var(--ng-green)' : 'var(--ng-blue)';
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                style={{
                  padding: '11px 18px',
                  background: isActive ? acento : 'var(--ng-white)',
                  border: `1px solid ${isActive ? acento : 'var(--ng-line)'}`,
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: isActive ? '#fff' : 'var(--ng-ink)',
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'background .12s ease, border-color .12s ease, color .12s ease',
                  display: 'flex', alignItems: 'center', gap: 8,
                  whiteSpace: 'nowrap',
                  minHeight: 44,
                }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11, fontWeight: 500,
                  color: isActive ? 'rgba(255,255,255,.75)' : 'var(--ng-steel)',
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
    /* productos.html trae sus propias reglas para .ng-tablist con flex-grow
       (33% en <=1024 y 50% en <=768). Con 7 pestañas cortas pasaba
       desapercibido; con 10 estiraba cada píldora hasta ocupar la fila entera
       —"Mascotas" llegaba a 676 px— y la barra crecía a 475 px de alto en
       móvil. Aquí se anula: las píldoras se miden por su contenido.
       Esta hoja se inyecta después que la de la página, así que entre dos
       !important de la misma especificidad gana esta por orden. */
    .ng-tablist > button { flex: 0 0 auto !important; }

    @media (max-width: 768px) {
      .ng-tab-heading { grid-template-columns: 1fr !important; gap: 16px !important; }
      .ng-tab-heading > div:last-child { text-align: left !important; }
      .ng-subfam-grid { grid-template-columns: 1fr !important; }
      .ng-tablist > button { padding: 10px 14px !important; font-size: 13px !important; min-height: 40px !important; }
      .ng-tab-cta-row { flex-direction: column !important; padding: 20px 16px !important; }
      .ng-tab-cta-btn { width: 100% !important; padding-left: 16px !important; padding-right: 16px !important; box-sizing: border-box !important; }
    }
  `;
  document.head.appendChild(s);
}

window.ProductosTabs = ProductosTabs;
