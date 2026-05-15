// Footer.jsx — navy footer with logo, columns, fine print
function Footer() {
  const cols = [
    { title: 'Productos', items: ['Enzimáticos', 'Desinfectantes', 'Multiusos', 'Lavandería', 'Jarciería', 'Consumibles'] },
    { title: 'Servicios', items: ['Maquila', 'Marca privada', 'Tratamiento de agua', 'Torres y calderas', 'Dosificación', 'Capacitación'] },
    { title: 'Empresa', items: ['Sobre Neugreen', 'Planta SLP', 'Casos de cliente', 'Cumplimiento', 'Blog técnico', 'Trabaja con nosotros'] },
  ];

  return (
    <footer style={{
      background: 'var(--ng-navy)',
      color: '#fff',
      padding: '64px var(--section-pad-x) 32px',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr repeat(3, 1fr)',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,.10)',
        }}>
          <div>
            <img src="../../assets/logos/neugreen-logo-extended-white.svg" alt="Neugreen" style={{ height: 36, marginBottom: 20 }} />
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
                    <a href="#" style={{ color: '#fff', fontSize: 14, textDecoration: 'none', opacity: .85 }}>{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
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
            <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>ventas@neugreen.mx</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
