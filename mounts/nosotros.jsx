const { useState } = React;
function App() {
  const [active, setActive] = useState('nosotros');
  const handleNav = (id) => {
    setActive(id);
    if (id === 'home') { window.location.href = 'index.html'; return; }
    if (id === 'productos') { window.location.href = 'productos.html'; return; }
    if (id === 'manufactura') { window.location.href = 'manufactura.html'; return; }
    if (id === 'industrial') { window.location.href = 'industrial.html'; return; }
    if (id === 'proyectos') { window.location.href = 'proyectos.html'; return; }
    if (id === 'contacto') { window.location.href = 'contacto.html'; return; }
    if (id === 'asesor' || id === 'cotizar') { window.location.href = 'contacto.html'; return; }
  };
  return (
    <div data-screen-label="Marketing site · nosotros">
      <Header onNavClick={handleNav} activeRoute={active} />
      <NosotrosHero />
      <NosotrosTimeline />
      <NosotrosValores />
      <CapacidadesPlanta />
      <NosotrosOrganigrama />
      <CTAStrip />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
