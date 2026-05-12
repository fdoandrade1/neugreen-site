import bodegaImage from '../assets/bodega-neugreen.jpg';
import BusinessLineCard from '../components/BusinessLineCard.jsx';
import Button from '../components/Button.jsx';
import CTA from '../components/CTA.jsx';
import Hero from '../components/Hero.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { businessLines, clients, differentiators, industries } from '../data/siteData.js';
import { navigateTo } from '../utils/navigation.js';

export default function Home() {
  return (
    <>
      <Hero
        title="Biotecnología aplicada a limpieza, desinfección y tratamiento de agua"
        subtitle="Fabricamos, suministramos y desarrollamos soluciones químicas y enzimáticas para empresas que requieren eficiencia, inocuidad, cumplimiento y respuesta técnica."
        primaryLabel="Solicitar cotización"
        primaryHref="/contacto"
        secondaryLabel="Ver líneas de negocio"
        secondaryHref="/productos"
      />

      {/* Clients strip */}
      <div className="border-y border-ng-line bg-ng-mist px-5 py-5 sm:px-6 lg:px-8">
        <div className="container-wide">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.20em] text-ng-steel/60">
            Empresas que confían en Neugreen
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {clients.map((c) => (
              <span key={c} className="text-sm font-semibold text-ng-steel/70">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Business lines */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Líneas de negocio"
            title="Soluciones B2B para operaciones que no pueden detenerse"
            description="Integramos producto, desarrollo, fabricación y soporte técnico para necesidades comerciales, institucionales e industriales."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {businessLines.map((line) => (
              <BusinessLineCard key={line.title} {...line} />
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-pad bg-ng-mist">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Por qué Neugreen"
            title="Base técnica, operación propia y acompañamiento real"
            description="No somos un distribuidor. Formulamos, fabricamos y soportamos cada solución con criterio técnico y compromiso operativo."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <div key={item.title}
                className={`anim-up rounded-xl border border-ng-line bg-white p-5 shadow-card delay-${i * 100}`}>
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-ng-navy text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="display text-base font-bold text-ng-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure teaser */}
      <section className="section-pad bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-xl border border-ng-line shadow-card">
            <img src={bodegaImage} alt="Planta y bodega Neugreen en San Luis Potosí"
              className="h-full min-h-[360px] w-full object-cover" />
          </div>
          <div className="anim-up">
            <p className="eyebrow">Infraestructura</p>
            <h2 className="display mt-3 text-3xl font-extrabold leading-tight text-ng-ink sm:text-4xl">
              Planta propia en San Luis Potosí. Inventario disponible. Respuesta en 24 h.
            </h2>
            <p className="mt-5 text-base leading-8 text-ng-steel">
              Operamos desde Mexquitic de Carmona con planta de producción, laboratorio de I+D e inventario activo para abastecer con velocidad y control. Sin depender de importaciones ni intermediarios.
            </p>
            <div className="mt-7 flex gap-3">
              <Button href="/infraestructura" variant="outline">Ver infraestructura</Button>
              <Button href="/nosotros" variant="dark">Nosotros</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-pad bg-ng-navy">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Sectores"
            title="Atendemos industrias donde la inocuidad y la continuidad no son negociables"
            description="Cada solución se aterriza al contexto del cliente: normativas, volúmenes, personal y condiciones de aplicación."
            dark
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map((ind) => (
              <div key={ind.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 px-5 py-4 transition hover:bg-white/10">
                <Icon name={ind.icon} className="h-5 w-5 shrink-0 text-ng-lime" />
                <span className="text-sm font-semibold text-white">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-ng-mist">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Proceso comercial"
            title="Empezar con Neugreen es simple"
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', t: 'Contáctanos',          d: 'Cuéntanos tu operación por WhatsApp, correo o formulario.' },
              { n: '02', t: 'Diagnóstico rápido',   d: 'Entendemos tu necesidad, volúmenes y condiciones de aplicación.' },
              { n: '03', t: 'Cotización en 24 h',   d: 'Recibes propuesta técnica con precio, condiciones y lead time.' },
              { n: '04', t: 'Entrega y seguimiento',d: 'Despacho desde SLP. Soporte técnico y seguimiento post-entrega.' },
            ].map((step) => (
              <div key={step.n} className="rounded-xl border border-ng-line bg-white p-5 shadow-card">
                <span className="display text-4xl font-extrabold text-ng-line">{step.n}</span>
                <h3 className="display mt-3 text-lg font-bold text-ng-ink">{step.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{step.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/contacto" variant="dark" icon={<Icon name="arrow" className="h-4 w-4" />}>
              Solicitar cotización ahora
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
