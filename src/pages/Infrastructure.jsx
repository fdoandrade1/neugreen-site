import bodegaImage    from '../assets/bodega-neugreen.jpg';
import laboratorioImage from '../assets/laboratorio-neugreen.jpg';
import productosImage from '../assets/productos-neugreen.jpg';
import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Icon from '../components/Icon.jsx';
import { infrastructureAreas } from '../data/siteData.js';

const images = { bodega: bodegaImage, laboratorio: laboratorioImage, productos: productosImage };

const capabilities = [
  { icon: 'factory', t: 'Planta escalable',   d: 'Capacidad para lotes desde litros hasta toneladas. Escalamiento controlado.' },
  { icon: 'beaker',  t: 'Laboratorio I+D',    d: 'Formulación, pruebas de eficacia, control de calidad y validación.' },
  { icon: 'tools',   t: '+120 SKUs en stock', d: 'Disponibilidad inmediata de producto terminado para entrega en 24 h.' },
  { icon: 'support', t: 'Soporte técnico',    d: 'Asesoría en selección, dosificación y protocolo de aplicación.' },
];

export default function Infrastructure() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Infraestructura"
            title="Planta, laboratorio, inventario y logística en San Luis Potosí"
            description="Una base operativa en Mexquitic de Carmona preparada para fabricar, resguardar, validar y entregar soluciones con control total de la cadena."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {infrastructureAreas.map((area) => (
              <article key={area.title} className="overflow-hidden rounded-xl border border-ng-line bg-white shadow-card card-hover">
                <div className="relative h-56 overflow-hidden">
                  <img src={images[area.image]} alt={`${area.title} — Neugreen México`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="display text-xl font-bold text-ng-ink">{area.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ng-steel">{area.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ng-mist">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div key={c.t} className="rounded-xl border border-ng-line bg-white p-5 shadow-card">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-ng-navy text-white">
                <Icon name={c.icon} className="h-5 w-5" />
              </div>
              <h3 className="display text-base font-bold text-ng-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-6 text-ng-steel">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="section-pad bg-ng-navy">
        <div className="container-wide grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-ng-lime">Ubicación</p>
            <h2 className="display mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Operamos desde San Luis Potosí. Entregamos a todo México.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              Nuestras instalaciones en Mexquitic de Carmona nos permiten responder en 24 horas para clientes en SLP y sus municipios, y en 2–5 días para el resto del país mediante logística propia y alianzas con transportistas especializados.
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/8 p-6">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Dirección</p>
            <p className="text-white font-medium leading-7">Prol. Pánfilo Natera No. 501A<br />La Angostura, Mexquitic de Carmona<br />C.P. 78483, San Luis Potosí, SLP, México</p>
            <div className="mt-4 space-y-2 text-sm text-white/65">
              <p className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4" />444 847 3705</p>
              <p className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4" />contacto@neugreen.mx</p>
            </div>
          </div>
        </div>
      </section>

      <CTA title="Infraestructura para responder con velocidad y control" />
    </>
  );
}
