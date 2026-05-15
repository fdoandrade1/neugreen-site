// ProductosTabs.jsx — horizontal tabs with rich panel per family
const { useState: useStateTabs } = React;

const TAB_DATA = [
  {
    id: 'convencional',
    label: 'Convencional',
    accent: 'blue',
    eyebrow: '01 · Línea convencional',
    title: 'Químicos de limpieza y sanitización para uso cotidiano.',
    body: [
      'Detergentes, desinfectantes cuaternarios, multiusos, sarricidas y desengrasantes para limpieza profesional cotidiana.',
      'Línea base de inventario activo en planta. Cumplimiento COFEPRIS, NOM-016 y FDA/EPA cuando aplica. Disponible en presentaciones de 1L a 200L y a granel para clientes con dosificación propia.',
    ],
    paraQuien: [
      'Edificios corporativos y centros comerciales',
      'Hoteles, restaurantes y cocinas industriales',
      'Hospitales, clínicas y consultorios',
      'Mantenimiento de flota industrial y oficinas',
    ],
    incluye: [
      'Desinfectantes cuaternarios y peracéticos',
      'Multiusos concentrados y diluidos',
      'Limpiadores de pisos, vidrios y baños',
      'Desengrasantes alcalinos',
      'Sarricidas y removedores de óxido',
    ],
    diferenciador: {
      title: 'Concentración real, no diluida',
      body: 'Nuestra línea convencional viene a concentración técnica, no comercial. El cliente diluye según ficha y reduce costo por dosis 30–40 % frente a un producto retail.',
    },
  },
  {
    id: 'especializada',
    label: 'Especializada',
    accent: 'blue',
    eyebrow: '02 · Línea especializada',
    title: 'Soluciones técnicas para procesos que no perdonan errores.',
    body: [
      'Productos formulados para retos específicos: superficies sanitarias, equipos de proceso alimenticio, áreas críticas, control microbiológico y ambientes regulados.',
      'Cada SKU acompañado de protocolo de aplicación, ficha técnica firmada y, cuando se requiere, validación microbiológica en sitio. Soporte técnico incluido el primer mes.',
    ],
    paraQuien: [
      'Procesos alimenticios y bebidas',
      'Laboratorios farmacéuticos y biotecnológicos',
      'Áreas grado farmacéutico y quirófanos',
      'Procesos de envasado y manufactura grado alimenticio',
    ],
    incluye: [
      'Sanitizantes grado alimenticio',
      'Desinfectantes de alto nivel (DAN)',
      'Detergentes ácidos / alcalinos CIP',
      'Removedores de biopelícula y biofilm',
      'Productos para áreas grado farmacéutico',
    ],
    diferenciador: {
      title: 'Protocolo de aplicación auditable',
      body: 'Entregamos cada producto con SOP firmado por nuestro QA, validable en auditorías ISO 22000, HACCP, NMX-F-605 o GMP. El comprador no improvisa la dosificación.',
    },
  },
  {
    id: 'enzimatica',
    label: 'Enzimática',
    accent: 'green',
    eyebrow: '03 · Línea enzimática',
    title: 'Biotecnología real para grasas, olores y materia orgánica.',
    body: [
      'Formulaciones a base de enzimas y microorganismos seleccionados para degradar materia orgánica: grasas, olores, residuos proteicos y depósitos en drenajes y trampas.',
      'No es marketing verde — es química con resultados medibles. Reducción DBO/DQO documentada en cliente, sin químicos agresivos ni residuos en agua residual.',
    ],
    paraQuien: [
      'Cocinas industriales con trampas de grasa',
      'PTARs municipales e industriales',
      'Lavanderías con manchas orgánicas complejas',
      'Cárnicos, lácteos y procesadores alimenticios',
    ],
    incluye: [
      'Desengrasante enzimático trampas de grasa',
      'Bioactivador para PTAR y drenajes',
      'Eliminador enzimático de olores',
      'Prelavado enzimático para lavandería',
      'Bioaumentación para procesos biológicos',
    ],
    diferenciador: {
      title: 'Reduce químico residual + cumple NOM-001',
      body: 'Cliente promedio reduce 35 % uso de sosa cáustica y 100 % de removedor cuaternario. Cumplimiento NOM-001-SEMARNAT-2021 sin aditivos adicionales.',
    },
  },
  {
    id: 'aromatizacion',
    label: 'Aromatización',
    accent: 'blue',
    eyebrow: '04 · Línea de aromatización',
    title: 'Aromatización profesional para espacios de alto tráfico.',
    body: [
      'Aromatizantes, neutralizadores de olor y sistemas de dispersión para baños, lobbies, áreas comunes y espacios con alta rotación de personas.',
      'No solo perfumamos — combinamos enzimas neutralizadoras con fragancias profesionales (no consumer). Disponible en líquido, gel y aerosol con sistemas de dispersión continua.',
    ],
    paraQuien: [
      'Hoteles, lobbies corporativos y centros comerciales',
      'Centros educativos y hospitalarios',
      'Gimnasios y áreas deportivas',
      'Baños públicos de alto tráfico',
    ],
    incluye: [
      'Aromatizantes profesionales (lavanda, cítrico, neutro)',
      'Neutralizadores enzimáticos de olor',
      'Geles aromatizantes continuos',
      'Sistemas de dispersión y dosificación',
      'Fragancias personalizadas para marca privada',
    ],
    diferenciador: {
      title: 'Neutraliza, no enmascara',
      body: 'Tecnología enzimática que degrada moléculas de olor (H₂S, mercaptanos, amoníaco) en lugar de cubrirlas. El espacio huele neutro o a la fragancia elegida, no a un coctel.',
    },
  },
];

function CotizacionForm({ tabId, accent }) {
  const [form, setForm] = useStateTabs({ empresa: '', sector: '', volumen: '', espacio: '' });
  const [sent, setSent] = useStateTabs(false);

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  if (sent) {
    return (
      <div style={{
        background: '#fff', border: '1px solid var(--ng-line)',
        borderLeft: `4px solid var(--ng-green)`,
        borderRadius: 'var(--r-lg)', padding: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ng-green-50)', display: 'grid', placeItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--ng-ink)' }}>Solicitud recibida</h4>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
          Te respondemos en menos de <strong style={{ color: 'var(--ng-ink)' }}>24 h hábiles</strong> con cotización y ficha técnica.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          data-lead-source={`productos-${tabId}-form`}
          style={{
            background: '#fff',
            border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r-lg)',
            padding: 28,
          }}>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow" style={{ color: accent === 'green' ? 'var(--ng-green-700)' : 'var(--ng-blue)', marginBottom: 8, fontSize: 10 }}>Cotización contextual</div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--ng-ink)', letterSpacing: '-0.015em' }}>
          Cotiza esta línea
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={labelStyle}>Empresa</label>
          <input style={inputStyle} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Razón social" />
        </div>
        <div>
          <label style={labelStyle}>Sector</label>
          <select style={inputStyle} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option>Alimenticio</option>
            <option>Manufactura</option>
            <option>Hospitalidad</option>
            <option>Educativo</option>
            <option>Salud</option>
            <option>Comercial</option>
            <option>Industrial</option>
            <option>Gobierno</option>
            <option>Distribuidor</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={labelStyle}>Volumen estimado / mes</label>
            <input style={inputStyle} value={form.volumen} onChange={(e) => setForm({ ...form, volumen: e.target.value })} placeholder="ej. 200 L" />
          </div>
          <div>
            <label style={labelStyle}>Tipo de espacio</label>
            <input style={inputStyle} value={form.espacio} onChange={(e) => setForm({ ...form, espacio: e.target.value })} placeholder="ej. Cocina 1200 m²" />
          </div>
        </div>
      </div>

      <button type="submit" style={{
        width: '100%', marginTop: 22,
        background: accent === 'green' ? 'var(--ng-green)' : 'var(--ng-blue)',
        color: '#fff', fontWeight: 700, fontSize: 14,
        padding: '14px 22px', borderRadius: 'var(--r)',
        border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        Solicitar cotización
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>

      <p style={{ fontSize: 11, color: 'var(--ng-steel)', margin: '12px 0 0', textAlign: 'center', letterSpacing: '0.04em' }}>
        Respuesta &lt; 24 h hábiles
      </p>
    </form>
  );
}

function TabPanel({ tab }) {
  const isGreen = tab.accent === 'green';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 56,
      alignItems: 'start',
    }}>
      <div>
        <div className="eyebrow" style={{ color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)', marginBottom: 12 }}>{tab.eyebrow}</div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3vw, 38px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          margin: '0 0 22px',
          color: 'var(--ng-ink)',
          lineHeight: 1.1,
        }}>
          {tab.title}
        </h2>

        {tab.body.map((p, i) => (
          <p key={i} style={{ fontSize: 16, color: 'var(--ng-steel)', lineHeight: 1.6, margin: '0 0 14px', maxWidth: 600 }}>
            {p}
          </p>
        ))}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
          marginTop: 36,
        }}>
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--ng-steel)', margin: '0 0 14px',
            }}>Para quién es esto</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tab.paraQuien.map((p, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--ng-ink)', lineHeight: 1.45 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isGreen ? 'var(--ng-green)' : 'var(--ng-blue)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--ng-steel)', margin: '0 0 14px',
            }}>Qué incluye nuestra línea</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tab.incluye.map((it, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--ng-ink)', lineHeight: 1.45, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 9, width: 6, height: 6, background: isGreen ? 'var(--ng-green)' : 'var(--ng-blue)', borderRadius: '50%' }}></span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Diferenciador técnico clave */}
        <div style={{
          marginTop: 40,
          background: isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
          border: `1px solid ${isGreen ? '#C8EDC8' : 'var(--ng-blue-100)'}`,
          borderRadius: 'var(--r-lg)',
          padding: '24px 28px',
          display: 'flex', gap: 18, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 40, height: 40,
            borderRadius: 10,
            background: isGreen ? 'var(--ng-green)' : 'var(--ng-blue)',
            color: '#fff',
            display: 'grid', placeItems: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div>
            <div className="eyebrow" style={{ color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue-700)', marginBottom: 8, fontSize: 10 }}>Diferenciador técnico clave</div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18, fontWeight: 700,
              margin: '0 0 8px',
              color: 'var(--ng-ink)',
              letterSpacing: '-0.01em',
            }}>{tab.diferenciador.title}</h4>
            <p style={{ fontSize: 14, color: 'var(--ng-ink)', margin: 0, lineHeight: 1.55 }}>
              {tab.diferenciador.body}
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: 'sticky', top: 96 }}>
        <CotizacionForm tabId={tab.id} accent={tab.accent} />
      </div>
    </div>
  );
}

function ProductosTabs() {
  const [active, setActive] = useStateTabs('convencional');
  const tab = TAB_DATA.find(t => t.id === active);

  return (
    <section style={{
      padding: '64px var(--section-pad-x) clamp(80px, 8vw, 120px)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Tab strip */}
        <div role="tablist" style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--ng-line)',
          marginBottom: 56,
          overflowX: 'auto',
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
                  padding: '18px 28px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? (isGreen ? 'var(--ng-green)' : 'var(--ng-blue)') : 'transparent'}`,
                  marginBottom: -1,
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: isActive ? 'var(--ng-ink)' : 'var(--ng-steel)',
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'color .12s ease, border-color .12s ease',
                  display: 'flex', alignItems: 'center', gap: 10,
                  flexShrink: 0,
                }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11, fontWeight: 500,
                  color: isActive ? (isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)') : 'var(--ng-steel)',
                  letterSpacing: '0.06em',
                }}>0{TAB_DATA.indexOf(t) + 1}</span>
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

window.ProductosTabs = ProductosTabs;
