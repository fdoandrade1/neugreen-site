// Sectores.jsx — 3×3 grid of industries served + drawer lateral con one pagers
const { useState: useSectoresState, useEffect: useSectoresEffect } = React;

/* ── Inline SVG icons ──────────────────────────────────────── */
const IcoX        = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoExternal = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IcoDownload = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoArrow    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
const IcoMsg      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;

/* ── Sector drawer config ──────────────────────────────────── */
const SECTOR_DATA = {
  Alimenticio: {
    drawerTitle: 'Food Service',
    desc: 'Químicos, dosificación automática SEKO y jarciería para restaurantes, comedores y cadenas de comida rápida. Un solo proveedor para toda la operación.',
    acciones: [
      { type: 'primary',  label: 'Ver One Pager',          onClick: () => window.open('assets/docs/onepager-alimenticio.html', '_blank'), 'data-track': 'onepager-view',     'data-sector': 'alimenticio' },
      { type: 'download', label: 'Descargar PDF',           href: 'assets/docs/onepager-alimenticio.pdf',   hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'alimenticio' },
      { type: 'link',     label: 'Ver todos los productos', href: 'productos.html' },
    ],
  },
  Hospitalidad: {
    drawerTitle: 'Hotelería',
    desc: 'Lavandería institucional, cocina, habitaciones, body care y aromatización de espacios. Todo lo que necesita una operación hotelera en un solo proveedor.',
    acciones: [
      { type: 'primary',  label: 'Ver One Pager',          onClick: () => window.open('assets/docs/onepager-hospitalidad.html', '_blank'), 'data-track': 'onepager-view',     'data-sector': 'hospitalidad' },
      { type: 'download', label: 'Descargar PDF',           href: 'assets/docs/onepager-hospitalidad.pdf',  hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'hospitalidad' },
      { type: 'link',     label: 'Ver todos los productos', href: 'productos.html' },
    ],
  },
  Industrial: {
    drawerTitle: 'Industrial',
    desc: 'Dos propuestas según tu necesidad: limpieza y desinfección en naves industriales, o tratamiento de agua y procesos industriales avanzados.',
    acciones: [
      { type: 'primary-alt-row', items: [
        { label: 'Limpieza en planta',  onClick: () => window.open('assets/docs/onepager-industrial-limpieza.html', '_blank'), 'data-track': 'onepager-view', 'data-sector': 'industrial-limpieza' },
        { label: 'Tratamiento de agua', onClick: () => window.open('assets/docs/onepager-industrial-agua.html',    '_blank'), 'data-track': 'onepager-view', 'data-sector': 'industrial-agua' },
      ]},
      { type: 'download', label: 'Descargar — Limpieza en planta',  href: 'assets/docs/onepager-industrial-limpieza.pdf', hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'industrial-limpieza' },
      { type: 'download', label: 'Descargar — Tratamiento de agua', href: 'assets/docs/onepager-industrial-agua.pdf',     hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'industrial-agua' },
      { type: 'link',     label: 'Ver soluciones industriales',     href: 'industrial.html' },
    ],
  },
  Manufactura: {
    drawerTitle: 'Manufactura y marca privada',
    desc: 'Formulación, envasado y etiquetado para tu marca. Planta propia en San Luis Potosí. Desde lotes pequeños hasta producción industrial.',
    acciones: [
      { type: 'primary', label: 'Conocer el proceso',   href: 'manufactura.html' },
      { type: 'link',    label: 'Solicitar información', href: 'contacto.html' },
    ],
  },
  Educativo: {
    drawerTitle: 'Sector Educativo',
    desc: 'Productos de limpieza, jarciería, papel y desechables para escuelas, colegios y universidades. Surtido completo, entrega puntual y pedido recurrente mensual sin complicaciones.',
    acciones: [
      { type: 'primary',  label: 'Ver One Pager',          onClick: () => window.open('assets/docs/onepager-educativo.html', '_blank'), 'data-track': 'onepager-view',     'data-sector': 'educativo' },
      { type: 'download', label: 'Descargar PDF',           href: 'assets/docs/onepager-educativo.pdf', hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'educativo' },
      { type: 'link',     label: 'Ver todos los productos', href: 'productos.html' },
    ],
  },
  Salud: {
    drawerTitle: 'Sector Salud',
    desc: 'Desinfectantes de alto nivel, protocolos de inocuidad y productos certificados para clínicas, hospitales y consultorios.',
    acciones: [
      { type: 'primary', label: 'Ver portafolio',       href: 'productos.html' },
      { type: 'link',    label: 'Solicitar cotización', href: 'contacto.html' },
    ],
  },
  Comercial: {
    drawerTitle: 'Comercial',
    desc: 'Limpieza, desinfección y aromatización profesional para plazas comerciales, edificios de oficinas y espacios de alto tráfico. Imagen impecable en cada área del espacio.',
    acciones: [
      { type: 'primary',  label: 'Ver One Pager',          onClick: () => window.open('assets/docs/onepager-comercial.html', '_blank'), 'data-track': 'onepager-view',     'data-sector': 'comercial' },
      { type: 'download', label: 'Descargar PDF',           href: 'assets/docs/onepager-comercial.pdf', hasPdf: false, 'data-track': 'onepager-download', 'data-sector': 'comercial' },
      { type: 'link',     label: 'Ver todos los productos', href: 'productos.html' },
    ],
  },
  Gobierno: {
    drawerTitle: 'Gobierno',
    desc: 'Suministro de insumos de limpieza, desinfección y jarciería para dependencias, instalaciones públicas y licitaciones.',
    acciones: [
      { type: 'primary', label: 'Ver portafolio', href: 'productos.html' },
      { type: 'link',    label: 'Contactar',      href: 'contacto.html' },
    ],
  },
  Distribuidores: {
    drawerTitle: 'Distribuidores',
    desc: 'Programa de distribución con margen comercial, soporte técnico, material de ventas y manufactura de marca privada disponible.',
    acciones: [
      { type: 'primary', label: 'Conocer el programa',  href: 'manufactura.html' },
      { type: 'link',    label: 'Hablar con un asesor', href: 'contacto.html' },
    ],
  },
};

/* ── Drawer action renderer ─────────────────────────────────── */
function DrawerAccion({ a }) {
  const baseBtn = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 8, width: '100%', borderRadius: 8,
    padding: '11px 16px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
    boxSizing: 'border-box', textDecoration: 'none',
  };

  if (a.type === 'primary-alt-row') {
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {a.items.map((it, i) => (
          <button
            key={i}
            onClick={it.onClick}
            data-track={it['data-track']}
            data-sector={it['data-sector']}
            style={{ ...baseBtn, flex: '1 1 120px', background: '#DCE6FF', color: '#0055b8', border: 'none', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = '#C8D8F8'}
            onMouseLeave={e => e.currentTarget.style.background = '#DCE6FF'}
          >{it.label}</button>
        ))}
      </div>
    );
  }

  if (a.type === 'primary') {
    if (a.onClick) {
      return (
        <button
          onClick={a.onClick}
          data-track={a['data-track']}
          data-sector={a['data-sector']}
          style={{ ...baseBtn, background: '#0055b8', color: '#fff', border: 'none' }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
          onMouseLeave={e => e.currentTarget.style.filter = ''}
        ><span>{a.label}</span><IcoExternal /></button>
      );
    }
    return (
      <a href={a.href} style={{ ...baseBtn, background: '#0055b8', color: '#fff', border: 'none', display: 'flex' }}>
        <span>{a.label}</span><IcoExternal />
      </a>
    );
  }

  if (a.type === 'download') {
    if (!a.hasPdf) return null;
    return (
      <a
        href={a.href}
        download
        data-track={a['data-track']}
        data-sector={a['data-sector']}
        style={{ ...baseBtn, background: '#fff', color: '#0B1B2B', border: '1.5px solid #E2E8F2', display: 'flex' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#0055b8'; e.currentTarget.style.color = '#0055b8'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F2'; e.currentTarget.style.color = '#0B1B2B'; }}
      ><span>{a.label}</span><IcoDownload /></a>
    );
  }

  if (a.type === 'link') {
    return (
      <a
        href={a.href}
        style={{ color: '#0055b8', fontSize: 13, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
      >{a.label} <IcoArrow /></a>
    );
  }

  return null;
}

/* ── Main component ─────────────────────────────────────────── */
function Sectores() {
  const [activeSector, setActiveSector] = useSectoresState(null);

  // Escape key
  useSectoresEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setActiveSector(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Body scroll lock
  useSectoresEffect(() => {
    document.body.style.overflow = activeSector ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeSector]);

  const sectores = [
    { name: 'Alimenticio',    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18l-1.5 9h-15zM6 11V7a6 6 0 0 1 12 0v4M12 4v3"/></svg> },
    { name: 'Manufactura',    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="12" rx="2"/><path d="M6 9V5h12v4M2 13h20"/></svg> },
    { name: 'Hospitalidad',   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-7h6v7"/><path d="M11 11h2"/></svg> },
    { name: 'Educativo',      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg> },
    { name: 'Salud',          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M12 11v6M9 14h6"/></svg> },
    { name: 'Comercial',      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 5 4h14l2 5"/><path d="M3 9v11h18V9"/><path d="M9 13h6"/></svg> },
    { name: 'Industrial',     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20"/><path d="M3 21V11l5 3V11l5 3V11l8 3v7"/></svg> },
    { name: 'Gobierno',       icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10h14v11M3 10l9-6 9 6M9 14v5M15 14v5"/></svg> },
    { name: 'Distribuidores', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h13v8H3z"/><path d="M16 10h3l2 3v2h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg> },
  ];

  const activeData = activeSector ? SECTOR_DATA[activeSector] : null;
  const activeIcon = activeSector ? sectores.find(s => s.name === activeSector)?.icon : null;

  return (
    <>
      <section style={{
        padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
        background: 'var(--ng-cloud)',
      }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 32,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: 600 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Sectores que atendemos</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
                color: 'var(--ng-ink)',
                lineHeight: 1.1,
              }}>
                Donde la operación no puede parar.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
                Nueve verticales con dosis, normativa y soporte adaptados.
              </p>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ng-steel)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Cobertura nacional · base SLP
            </div>
          </div>

          {/* Grid */}
          <div className="ng-sectores-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'var(--ng-line)',
            border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
          }}>
            {sectores.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSector(s.name)}
                style={{
                  background: '#fff',
                  padding: '36px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  transition: 'background .15s ease',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--ng-blue-50)'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 12,
                  background: 'var(--ng-blue-50)',
                  color: 'var(--ng-blue)',
                  display: 'grid', placeItems: 'center',
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--ng-ink)',
                  letterSpacing: '-0.01em',
                }}>
                  {s.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Overlay ─────────────────────────────────────────── */}
      <div
        onClick={() => setActiveSector(null)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(11,27,43,0.55)',
          zIndex: 998,
          opacity: activeSector ? 1 : 0,
          pointerEvents: activeSector ? 'auto' : 'none',
          transition: 'opacity 280ms ease-out',
        }}
      />

      {/* ── Drawer ──────────────────────────────────────────── */}
      <div
        className={'ng-sector-drawer' + (activeSector ? ' ng-sector-drawer--open' : '')}
        style={{
          position: 'fixed',
          top: 0, right: 0,
          width: 360,
          height: '100vh',
          background: '#fff',
          boxShadow: '-4px 0 24px rgba(0,85,184,0.12)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          transform: activeSector ? 'translateX(0)' : 'translateX(110%)',
          transition: 'transform 280ms ease-out',
          overflowY: 'hidden',
          visibility: activeSector ? 'visible' : 'hidden',
        }}
      >
        {activeData && (
          <>
            {/* Header */}
            <div style={{
              background: '#0055b8',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {activeIcon && (
                  <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(activeIcon, { width: 20, height: 20, stroke: '#fff' })}
                  </div>
                )}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16, fontWeight: 700, color: '#fff',
                  lineHeight: 1.2,
                }}>{activeData.drawerTitle}</span>
              </div>
              <button
                onClick={() => setActiveSector(null)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none', borderRadius: 6,
                  padding: 6, cursor: 'pointer',
                  color: '#fff', display: 'flex', alignItems: 'center',
                  flexShrink: 0,
                  transition: 'background .15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              >
                <IcoX />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <p style={{ fontSize: 14, color: '#5A6B82', lineHeight: 1.65, margin: '0 0 20px' }}>
                {activeData.desc}
              </p>
              <div style={{ borderBottom: '1px solid #E2E8F2', marginBottom: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activeData.acciones.map((a, i) => (
                  <DrawerAccion key={i} a={a} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              borderTop: '1px solid #E2E8F2',
              background: '#F4F8FB',
              padding: '16px 24px',
              flexShrink: 0,
            }}>
              <a
                href="https://wa.me/524442565697"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: '#41be43', fontSize: 13, fontWeight: 500,
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                <IcoMsg />
                ¿Preguntas? Escríbenos por WhatsApp →
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ng-sectores-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ng-sectores-grid { grid-template-columns: 1fr !important; }
        }
        /* Mobile: bottom sheet */
        @media (max-width: 768px) {
          .ng-sector-drawer {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: auto !important;
            max-height: 85vh !important;
            border-radius: 16px 16px 0 0 !important;
            box-shadow: 0 -4px 24px rgba(0,85,184,0.14) !important;
            transform: translateY(110%) !important;
            overflow-y: auto !important;
          }
          .ng-sector-drawer.ng-sector-drawer--open {
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </>
  );
}

window.Sectores = Sectores;
