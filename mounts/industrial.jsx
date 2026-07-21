const { useState } = React;
function App() {
  const [active, setActive] = useState('industrial');
  const handleNav = (id) => {
    setActive(id);
    if (id === 'home') { window.location.href = 'index.html'; return; }
    if (id === 'productos') { window.location.href = 'productos.html'; return; }
    if (id === 'manufactura')   { window.location.href = 'manufactura.html';   return; }
    if (id === 'proyectos') { window.location.href = 'proyectos.html'; return; }
    if (id === 'nosotros')  { window.location.href = 'nosotros.html';  return; }
    if (id === 'contacto' || id === 'asesor' || id === 'cotizar') {
      const target = document.getElementById('diagnostico');
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };
  return (
    <div data-screen-label="Marketing site · industrial">
      <Header onNavClick={handleNav} activeRoute={active} />
      <IndustrialHero />
      <IndustrialAreas />
      <IndustrialRecursos />
      <Colaboradores />
      <IndustrialForm />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
