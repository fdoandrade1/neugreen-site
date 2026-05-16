// Header.jsx — sticky top nav for Neugreen marketing site
const { useState, useEffect } = React;

function Header({ onNavClick, activeRoute }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { id: 'productos', label: 'Productos' },
    { id: 'manufactura',   label: 'Manufactura' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'nosotros',  label: 'Nosotros' },
    { id: 'contacto',  label: 'Contacto' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,.94)' : 'var(--ng-white)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid var(--ng-line)',
      transition: 'background .15s ease',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--section-pad-x)',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/logos/neugreen-logo-extended.svg" alt="Neugreen" style={{ height: 32 }} />
        </a>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navItems.map(n => (
            <a key={n.id}
               href={`#${n.id}`}
               onClick={(e) => { e.preventDefault(); onNavClick(n.id); }}
               style={{
                 fontSize: 14,
                 fontWeight: 600,
                 color: activeRoute === n.id ? 'var(--ng-blue)' : 'var(--ng-ink)',
                 textDecoration: 'none',
               }}>
              {n.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a className="btn btn-ghost"
             href="tel:+524442565697"
             style={{
               fontSize: 13, fontWeight: 700, padding: '10px 16px',
               border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
               color: 'var(--ng-ink)', textDecoration: 'none', cursor: 'pointer',
             }}>
            +52 444 256 5697
          </a>
          <a className="btn btn-primary"
             onClick={(e) => { e.preventDefault(); onNavClick('asesor'); }}
             style={{
               background: 'var(--ng-blue)', color: '#fff',
               fontSize: 13, fontWeight: 700, padding: '10px 18px',
               borderRadius: 'var(--r)', textDecoration: 'none', cursor: 'pointer',
             }}>
            Hablar con asesor
          </a>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
