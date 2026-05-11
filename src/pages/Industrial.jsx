import CTA from '../components/CTA.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { industrialSolutions } from '../data/siteData.js';

export default function Industrial() {
  return (
    <>
      <section className="section-pad bg-neugreen-navy text-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Soluciones industriales"
            title="Tratamiento de agua, procesos críticos y soporte técnico en campo"
            description="Soluciones para operación industrial donde el desempeño químico, la dosificación, el análisis y el seguimiento técnico impactan directamente en continuidad y costo."
            className="[&_*]:text-white"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industrialSolutions.map((solution) => (
              <div key={solution} className="rounded-md border border-white/12 bg-white/8 p-5">
                <Icon name="drop" className="h-6 w-6 text-neugreen-green" />
                <h2 className="mt-4 text-lg font-black">{solution}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {[
            ['Agua industrial', 'Programas para tratamiento, acondicionamiento, control de incrustación, corrosión y desempeño operativo.'],
            ['PTAR y biología', 'Tratamientos biológicos, bioaumentación, control de olores y apoyo técnico para estabilidad de proceso.'],
            ['Dosificación y análisis', 'Soporte para sistemas de dosificación, revisión de parámetros, diagnóstico y mejora continua.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-md border border-neugreen-line bg-neugreen-mist p-7">
              <h2 className="text-2xl font-black text-neugreen-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-neugreen-steel">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTA title="¿Tu proceso requiere diagnóstico o tratamiento técnico?" />
    </>
  );
}
