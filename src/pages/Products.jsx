import CTA from '../components/CTA.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Icon from '../components/Icon.jsx';
import Button from '../components/Button.jsx';
import { productFamilies } from '../data/siteData.js';

const highlights = [
  { sku: 'Beizum® Antiseptik', cat: 'Desinfectante', price: 'Desde $80/L', note: '1 L · 5 L · 20 L', desc: 'Etanol + QUAT 5ª generación. Amplio espectro microbiano, no deja residuos.' },
  { sku: 'Limpia Max Desinfectante', cat: 'Multiusos', price: 'Desde $25/L', note: '1 L · 5 L · 20 L', desc: 'Elimina 99% bacterias. 8 aromas. Multiusos para institucional y comercial.' },
  { sku: 'Enzygrax', cat: 'Enzimático', price: 'Desde $140/L', note: '1 L · 5 L · 20 L', desc: 'Desengrasante enzimático. Degrada grasas orgánicas. Ideal para trampas y cocinas.' },
  { sku: 'Cloroxcel 13%', cat: 'Desinfectante', price: 'Desde $65/5L', note: '5 L · 20 L', desc: 'Hipoclorito estabilizado al 13%. Mayor concentración y vida útil que el cloro comercial.' },
  { sku: 'Desengrax Súper', cat: 'Multiusos', price: 'Desde $50/L', note: '1 L · 5 L · 20 L', desc: 'Desengrasante industrial. Remueve grasas animales, vegetales y sintéticas.' },
  { sku: 'Deter Max Enzimas Activas', cat: 'Lavandería', price: 'Desde $125/L', note: '1 L · 5 L · 20 L', desc: 'Detergente enzimático para lavandería industrial. ECOLÓGICO, ultra concentrado.' },
];

export default function Products() {
  return (
    <>
      <section className="section-pad bg-ng-mist">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Productos de línea"
            title="Insumos de limpieza, desinfección y operación continua"
            description="Más de 120 SKUs en 8 familias. Presentaciones desde 1 L hasta 1,000 L. Con aviso COFEPRIS, alineados FDA y EPA."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productFamilies.map((p) => <ProductCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* Product highlights */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader eyebrow="Productos destacados" title="Los más solicitados por clientes B2B" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => (
              <article key={h.sku} className="card-hover rounded-xl border border-ng-line bg-ng-mist p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md bg-ng-navy px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">{h.cat}</span>
                  <span className="text-sm font-bold text-ng-green">{h.price}</span>
                </div>
                <h3 className="display mt-3 text-lg font-bold text-ng-ink">{h.sku}</h3>
                <p className="mt-1 text-xs font-medium text-ng-blue">{h.note}</p>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{h.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Presentations + ordering */}
      <section className="section-pad bg-ng-navy">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-ng-lime">Presentaciones disponibles</p>
            <h2 className="display mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Del litro a la tonelada. Siempre con producto disponible.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              Manejamos desde atomizadores de 1 L para uso inmediato hasta garrafas de 1,000 L para clientes industriales con alto volumen de consumo. Entrega local SLP en 24 h.
            </p>
            <Button href="/contacto" variant="primary" className="mt-7">
              <Icon name="arrow" className="h-4 w-4" />
              Solicitar cotización
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['1 L', '5 L', '20 L', '200 L', '1,000 L', 'Granel'].map((v) => (
              <div key={v} className="flex flex-col items-center justify-center rounded-xl border border-white/12 bg-white/8 py-6 text-center">
                <span className="display text-2xl font-extrabold text-white">{v}</span>
                <span className="mt-1 text-xs text-white/50">presentación</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="¿Buscas productos de limpieza para tu operación?" />
    </>
  );
}
