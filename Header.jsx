// Header.jsx — sticky top nav for Neugreen marketing site
const { useState, useEffect } = React;

function Header({ onNavClick, activeRoute }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { id: 'productos',   label: 'Productos' },
    { id: 'manufactura', label: 'Manufactura' },
    { id: 'industrial',  label: 'Industrial' },
    { id: 'proyectos',   label: 'Proyectos' },
    { id: 'nosotros',    label: 'Nosotros' },
    { id: 'contacto',    label: 'Contacto' },
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,.94)' : 'var(--ng-white)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--ng-line)',
        transition: 'background .15s ease',
      }}>
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '0 var(--section-pad-x)', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
             style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="assets/logos/neugreen-logo-extended.svg" alt="Neugreen" style={{ height: 32 }} />
          </a>

          {/* Desktop nav */}
          <nav className="ng-nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {navItems.map(n => (
              <a key={n.id} href={`#${n.id}`}
                 onClick={(e) => { e.preventDefault(); handleNavClick(n.id); }}
                 style={{
                   fontSize: 14, fontWeight: 600,
                   color: activeRoute === n.id ? 'var(--ng-blue)' : 'var(--ng-ink)',
                   textDecoration: 'none',
                 }}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* Desktop action buttons */}
          <div className="ng-nav-actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a className="btn btn-ghost" href="tel:+524442565697"
               style={{
                 fontSize: 13, fontWeight: 700, padding: '10px 16px',
                 border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
                 color: 'var(--ng-ink)', textDecoration: 'none',
               }}>
              +52 444 256 5697
            </a>
            <a className="btn btn-primary"
               onClick={(e) => { e.preventDefault(); handleNavClick('asesor'); }}
               style={{
                 background: 'var(--ng-blue)', color: '#fff',
                 fontSize: 13, fontWeight: 700, padding: '10px 18px',
                 borderRadius: 'var(--r)', textDecoration: 'none', cursor: 'pointer',
               }}>
              Hablar con asesor
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="ng-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8, color: 'var(--ng-ink)', flexShrink: 0,
            }}>
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: 72, left: 0, right: 0,
            background: '#fff', borderBottom: '1px solid var(--ng-line)',
            padding: '12px 16px 24px',
            boxShadow: '0 8px 24px -8px rgba(0,63,197,.12)',
            zIndex: 49,
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
              {navItems.map(n => (
                <a key={n.id} href={`#${n.id}`}
                   onClick={(e) => { e.preventDefault(); handleNavClick(n.id); }}
                   style={{
                     fontSize: 16, fontWeight: 600, padding: '14px 0',
                     color: activeRoute === n.id ? 'var(--ng-blue)' : 'var(--ng-ink)',
                     textDecoration: 'none', borderBottom: '1px solid var(--ng-line)',
                   }}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:+524442565697"
                 style={{
                   textAlign: 'center', padding: '14px 16px',
                   border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
                   color: 'var(--ng-ink)', textDecoration: 'none',
                   fontWeight: 700, fontSize: 15,
                 }}>
                +52 444 256 5697
              </a>
              <a onClick={(e) => { e.preventDefault(); handleNavClick('asesor'); }}
                 style={{
                   textAlign: 'center', padding: '14px 16px',
                   background: 'var(--ng-blue)', borderRadius: 'var(--r)',
                   color: '#fff', textDecoration: 'none',
                   fontWeight: 700, fontSize: 15, cursor: 'pointer',
                 }}>
                Hablar con asesor
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .ng-nav-desktop { display: none !important; }
          .ng-nav-actions  { display: none !important; }
          .ng-hamburger    { display: flex !important; }
        }
      `}</style>
    </>
  );
}

window.Header = Header;
