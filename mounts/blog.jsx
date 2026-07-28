const { useState } = React;
function App() {
  const [active, setActive] = useState('blog');
  const handleNav = (id) => {
    setActive(id);
    if (id === 'home') { window.location.href = '/index.html'; return; }
    if (id === 'productos') { window.location.href = '/productos.html'; return; }
    if (id === 'manufactura') { window.location.href = '/manufactura.html'; return; }
    if (id === 'industrial') { window.location.href = '/industrial.html'; return; }
    if (id === 'proyectos') { window.location.href = '/proyectos.html'; return; }
    if (id === 'nosotros') { window.location.href = '/nosotros.html'; return; }
    if (id === 'blog') { window.location.href = '/blog.html'; return; }
    if (id === 'contacto' || id === 'asesor' || id === 'cotizar') { window.location.href = '/contacto.html'; return; }
  };
  return (
    <div data-screen-label="Marketing site · blog">
      <Header onNavClick={handleNav} activeRoute={active} />
      <BlogIndex />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
