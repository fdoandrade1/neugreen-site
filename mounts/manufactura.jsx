const { useState } = React;
function App() {
  const [active, setActive] = useState('manufactura');
  const handleNav = (id) => {
    setActive(id);
    if (id === 'home') { window.location.href = 'index.html'; return; }
    if (id === 'productos') { window.location.href = 'productos.html'; return; }
    if (id === 'industrial') { window.location.href = 'industrial.html'; return; }
    if (id === 'proyectos') { window.location.href = 'proyectos.html'; return; }
    if (id === 'nosotros')  { window.location.href = 'nosotros.html';  return; }
    if (id === 'blog') { window.location.href = 'blog.html'; return; }
    if (id === 'contacto' || id === 'asesor' || id === 'cotizar') {
      const target = document.getElementById('form');
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };
  return (
    <div data-screen-label="Marketing site · manufactura">
      <Header onNavClick={handleNav} activeRoute={active} />
      <MaquilaHero />
      <ManufacturaProceso />
      <MaquilaParaQuien />
      <CapacidadesPlanta />
      <MaquilaCasos />
      <ManufacturaRecursos />
      <MaquilaForm />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
