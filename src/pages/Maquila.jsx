import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { processSteps } from '../data/siteData.js';

export default function Maquila() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Maquila y marca privada"
            title="Desarrolla tu marca con Neugreen"
            description="Acompañamos a empresas que buscan lanzar, mejorar o escalar productos químicos y enzimáticos con formulación, producción, envasado y etiquetado."
          />
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step} className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-neugreen-line bg-neugreen-mist p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-neugreen-blue text-sm font-black text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-lg font-black text-neugreen-ink">{step}</h2>
                  <p className="mt-2 text-sm leading-7 text-neugreen-steel">
                    Convertimos el requerimiento comercial en una solución producible, validada y lista para entregar.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-neugreen-navy text-white">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          {['Formulación exclusiva', 'Escalamiento de producto', 'Private Label'].map((item) => (
            <div key={item} className="rounded-md border border-white/12 bg-white/8 p-6">
              <h2 className="text-xl font-black">{item}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Desarrollo alineado a mercado, costos, desempeño, presentación y operación logística.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA title="Desarrolla tu marca con Neugreen" />
    </>
  );
}
