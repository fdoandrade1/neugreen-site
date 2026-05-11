import bodegaImage from '../assets/bodega-neugreen.jpg';
import BusinessLineCard from '../components/BusinessLineCard.jsx';
import Button from '../components/Button.jsx';
import CTA from '../components/CTA.jsx';
import Hero from '../components/Hero.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { businessLines, differentiators, industries } from '../data/siteData.js';

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Neugreen México"
        title="Biotecnología aplicada a limpieza, desinfección y tratamiento de agua"
        subtitle="Fabricamos, suministramos y desarrollamos soluciones químicas y enzimáticas para empresas que requieren eficiencia, inocuidad, cumplimiento y respuesta técnica."
        primaryLabel="Solicitar cotización"
        primaryHref="/contacto"
        secondaryLabel="Ver líneas de negocio"
        secondaryHref="/productos"
      />

      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Líneas de negocio"
            title="Soluciones B2B para operaciones que no pueden detenerse"
            description="Integramos producto, desarrollo, fabricación y soporte técnico para necesidades comerciales, institucionales e industriales."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {businessLines.map((line) => (
              <BusinessLineCard key={line.title} {...line} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-neugreen-mist">
        <div className="container-wide grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <SectionHeader
            eyebrow="Por qué Neugreen"
            title="Base técnica, operación local y acompañamiento comercial"
            description="Diseñamos soluciones pensando en rendimiento, inocuidad, abastecimiento y uso real en campo."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item} className="rounded-md border border-neugreen-line bg-white p-5">
                <Icon name="check" className="h-5 w-5 text-neugreen-green" />
                <h3 className="mt-4 text-lg font-black text-neugreen-ink">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-md border border-neugreen-line bg-neugreen-mist">
            <img
              src={bodegaImage}
              alt="Bodega industrial de Neugreen México"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Infraestructura</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-neugreen-ink sm:text-4xl">
              Infraestructura para responder con velocidad y control
            </h2>
            <p className="mt-5 text-base leading-8 text-neugreen-steel">
              Nuestra operación en San Luis Potosí permite abastecer productos, desarrollar formulaciones y atender
              requerimientos técnicos con tiempos de respuesta adecuados para clientes B2B.
            </p>
            <Button href="/infraestructura" variant="outline" className="mt-7">
              Ver infraestructura
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-neugreen-navy text-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Industrias"
            title="Atendemos sectores con necesidades de limpieza, inocuidad y continuidad operativa"
            description="Cada solución se aterriza al contexto del cliente: frecuencia de uso, normativas, volúmenes, personal operativo y condiciones de aplicación."
            className="[&_*]:text-white"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry} className="rounded-md border border-white/12 bg-white/8 p-5 text-lg font-black">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
