// Footer.jsx — navy footer with logo, columns, fine print
function Footer() {
  const cols = [
    {
      title: 'Productos',
      items: [
        { label: 'Enzimáticos',      href: 'https://neugreen.mx/productos.html?tab=enzimatica#enzimatica' },
        { label: 'Desinfectantes',   href: 'https://neugreen.mx/productos.html?tab=desinfeccion#desinfeccion' },
        { label: 'Multiusos',        href: 'https://neugreen.mx/productos.html?tab=convencional#convencional' },
        { label: 'Lavandería',       href: 'https://neugreen.mx/productos.html?tab=convencional#convencional' },
        { label: 'Jarciería',        href: 'https://neugreen.mx/productos.html?tab=jarciera#jarciera' },
        { label: 'Aroma Experience', href: 'https://neugreen.mx/productos.html?tab=aroma#aroma' },
      ],
    },
    {
      title: 'Servicios',
      items: [
        { label: 'Manufactura',          href: 'https://neugreen.mx/manufactura.html' },
        { label: 'Marca privada',        href: 'https://neugreen.mx/manufactura.html' },
        { label: 'Tratamiento de agua',  href: 'https://neugreen.mx/industrial.html' },
        { label: 'Torres y calderas',    href: 'https://neugreen.mx/industrial.html' },
        { label: 'Suministro de equipo', href: 'https://neugreen.mx/industrial.html' },
        { label: 'Proyectos integrales', href: 'https://neugreen.mx/industrial.html' },
      ],
    },
    {
      title: 'Empresa',
      items: [
        { label: 'Sobre Neugreen',   href: 'https://neugreen.mx/nosotros.html' },
        { label: 'Planta SLP',       href: 'https://neugreen.mx/nosotros.html' },
        { label: 'Casos de cliente', href: 'https://neugreen.mx/proyectos.html' },
        { label: 'Cumplimiento',     href: '#' },
        { label: 'Blog técnico',     href: '/blog.html' },
        { label: 'Contacto',         href: 'https://neugreen.mx/contacto.html' },
      ],
    },
  ];

  return (
    <footer style={{
      background: 'var(--ng-navy)',
      color: '#fff',
      padding: '64px var(--section-pad-x) 32px',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="ng-footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr repeat(3, 1fr)',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,.10)',
        }}>
          <div>
            <img src="/assets/logos/neugreen-logo-extended-white.svg" alt="Neugreen" style={{ height: 36, marginBottom: 20 }} />
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,.7)', margin: '0 0 20px', maxWidth: 340 }}>
              Biotecnología en limpieza y desinfección. Planta propia en San Luis Potosí. Soporte técnico-comercial B2B.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['COFEPRIS', 'NOM-001', 'FDA / EPA'].map(b => (
                <span key={b} style={{
                  fontSize: 11, fontWeight: 600,
                  padding: '4px 10px', borderRadius: 'var(--r-pill)',
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.12)',
                  color: 'rgba(255,255,255,.85)',
                  letterSpacing: '0.04em',
                }}>{b}</span>
              ))}
            </div>
          </div>

          {cols.map((c, i) => (
            <div key={i}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,.55)',
                marginBottom: 16,
              }}>{c.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map((it, j) => (
                  <li key={j}>
                    <a href={it.href} style={{ color: '#fff', fontSize: 14, textDecoration: 'none', opacity: .85 }}>{it.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ng-footer-bottom" style={{
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 24, flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'rgba(255,255,255,.5)',
        }}>
          <div>© 2026 Neugreen México · Todos los derechos reservados</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Aviso de privacidad</a>
            <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Términos</a>
            <a href="mailto:ventas@neugreen.mx" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>ventas@neugreen.mx</a>
          </div>
        </div>
      </div>
    <style>{`
      @media (max-width: 1024px) {
        .ng-footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
      }
      @media (max-width: 640px) {
        .ng-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        .ng-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        .ng-footer-bottom > div { flex-direction: column !important; gap: 10px !important; }
      }
    `}</style>
    </footer>
  );
}

window.Footer = Footer;
