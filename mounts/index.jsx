const { useState } = React;

function App() {
  const [activeRoute, setActiveRoute] = useState('home');

  const handleNav = (id) => {
    setActiveRoute(id);
    // External pages
    const externalRoutes = { productos: 'productos.html', manufactura: 'manufactura.html', industrial: 'industrial.html', contacto: 'contacto.html', proyectos: 'proyectos.html', nosotros: 'nosotros.html', blog: 'blog.html' };
    if (externalRoutes[id]) {
      window.location.href = externalRoutes[id];
      return;
    }
    const map = {
      home: 'top',
      manufactura: 'manufactura-section',
      industrial: 'industrial-section',
      proyectos: 'capacidades-section',
      nosotros: 'capacidades-section',
      contacto: 'cta-section',
      cotizar: 'cta-section',
      asesor: 'cta-section',
      selector: 'selector',
    };
    const target = document.getElementById(map[id] || id);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div data-screen-label="Marketing site · home">
      <div id="top"></div>
      <Header onNavClick={handleNav} activeRoute={activeRoute} />

      <Hero
        eyebrow="Biotecnología B2B · San Luis Potosí"
        title={<>Soluciones químicas y biotecnológicas para limpieza, industria y tratamiento de agua.</>}
        lead="Fabricamos, formulamos y acompañamos a empresas que necesitan resultados medibles — no solo productos."
        ctaPrimary="Habla con un asesor técnico"
        ctaSecondary="Conoce nuestras líneas"
        onCtaClick={(t) => handleNav(t === 'primary' ? 'asesor' : 'selector')}
      />

      <Selector onPick={(line) => handleNav(line)} />

      <div id="productos-section"></div>
      <ProductLines />

      <div id="manufactura-section"></div>
      <MaquilaBand />

      <div id="industrial-section"></div>
      <TechnicalSolutions />

      <Sectores />

      <Diferenciadores />

      <ProcessSteps />

      <div id="capacidades-section"></div>
      <CapacidadesPlanta />

      <div id="cta-section"></div>
      <CTAStrip />

      <WhatsAppFloat />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
