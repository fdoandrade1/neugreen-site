import CTA from '../components/CTA.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { productFamilies } from '../data/siteData.js';

export default function Products() {
  return (
    <>
      <section className="section-pad bg-neugreen-mist">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Productos de línea"
            title="Insumos de limpieza, desinfección y operación continua"
            description="Familias de producto para abastecimiento institucional, comercial e industrial, con enfoque técnico y soporte de selección."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productFamilies.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide grid gap-8 lg:grid-cols-3">
          {['Selección técnica', 'Abastecimiento recurrente', 'Soporte comercial'].map((title) => (
            <div key={title} className="rounded-md border border-neugreen-line p-6">
              <h2 className="text-xl font-black text-neugreen-ink">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-neugreen-steel">
                Trabajamos con empresas que necesitan continuidad, consistencia de producto y una respuesta ágil a sus
                requerimientos de operación.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA title="¿Buscas una línea de productos para tu operación?" />
    </>
  );
}
