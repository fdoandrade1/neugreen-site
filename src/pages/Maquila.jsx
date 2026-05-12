import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import { processSteps } from '../data/siteData.js';

const brands = ['Verde Hogar', 'Bio Neutral', 'Equilux', 'Anemve'];

export default function Maquila() {
  return (
    <>
      <section className="section-pad bg-ng-mist">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Maquila y marca privada"
              title="Desarrolla tu propia marca de productos químicos"
              description="Acompañamos a empresas que quieren lanzar, mejorar o escalar productos de limpieza, enzimáticos o especializados. Nosotros ponemos la planta, el laboratorio y la expertise; tú pones la marca."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Formulación exclusiva', 'Escalamiento industrial', 'Envasado y etiquetado', 'Regulatorio COFEPRIS', 'Private Label completo', 'Muestras de validación'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 rounded-lg border border-ng-line bg-white p-3.5 shadow-card">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-ng-green" />
                  <span className="text-sm font-medium text-ng-ink">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contacto" variant="dark">
                <Icon name="arrow" className="h-4 w-4" />
                Iniciar desarrollo de mi marca
              </Button>
            </div>
          </div>

          <div>
            <h3 className="display mb-5 text-lg font-bold text-ng-ink">Proceso paso a paso</h3>
            <div className="space-y-3">
              {processSteps.map((step) => (
                <div key={step.num} className="grid grid-cols-[auto_1fr] gap-4 rounded-xl border border-ng-line bg-white p-5 shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-ng-navy text-sm font-bold text-white">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="display text-base font-bold text-ng-ink">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-ng-steel">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ng-navy">
        <div className="container-wide">
          <SectionHeader eyebrow="Marcas activas" title="Ya maquilamos estas marcas" dark
            description="Neugreen opera hoy como fabricante para marcas privadas en múltiples categorías de limpieza y cuidado." />
          <div className="mt-8 flex flex-wrap gap-4">
            {brands.map((b) => (
              <span key={b} className="rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-base font-semibold text-white">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader eyebrow="¿Para quién es la maquila?" title="Si encajes aquí, podemos trabajar juntos"
            description="No necesitas planta ni experiencia química. Solo necesitas una idea de negocio y un mercado." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'tools',  t: 'Distribuidores', d: 'Quieres tener tu propia marca para mejorar margen y diferenciarte.' },
              { icon: 'spark',  t: 'Cadenas',         d: 'Estandarizas productos con tu marca en toda la red.' },
              { icon: 'enzyme', t: 'Emprendedores',   d: 'Tienes marca y mercado, pero no planta ni fórmula.' },
              { icon: 'leaf',   t: 'Líneas verdes',   d: 'Quieres lanzar productos enzimáticos o biotecnológicos.' },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-ng-line bg-ng-mist p-5">
                <Icon name={c.icon} className="h-6 w-6 text-ng-blue" />
                <h3 className="display mt-3 text-lg font-bold text-ng-ink">{c.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="¿Tienes una marca o quieres crear una?" description="Platícanos el producto que tienes en mente. Te asesoramos desde el concepto." />
    </>
  );
}
