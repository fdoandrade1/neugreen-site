import bodegaImage from '../assets/bodega-neugreen.jpg';
import laboratorioImage from '../assets/laboratorio-neugreen.jpg';
import productosImage from '../assets/productos-neugreen.jpg';
import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { infrastructureAreas } from '../data/siteData.js';

const images = {
  bodega: bodegaImage,
  laboratorio: laboratorioImage,
  productos: productosImage,
};

export default function Infrastructure() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Infraestructura"
            title="Planta, laboratorio, inventario, producción y logística"
            description="Una base operativa preparada para fabricar, resguardar, validar y entregar soluciones químicas y enzimáticas con control."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {infrastructureAreas.map((area) => (
              <article key={area.title} className="overflow-hidden rounded-md border border-neugreen-line bg-white shadow-sm">
                <img src={images[area.image]} alt={`${area.title} Neugreen`} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-black text-neugreen-ink">{area.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-neugreen-steel">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Infraestructura para responder con velocidad y control" />
    </>
  );
}
