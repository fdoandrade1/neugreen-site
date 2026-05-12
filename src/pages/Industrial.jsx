import CTA from '../components/CTA.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import { industrialSolutions } from '../data/siteData.js';

const sectors = [
  'Manufactura automotriz', 'Industria alimentaria', 'Termoeléctricas', 'Agroindustria',
  'Petroquímica', 'Minería', 'Gobierno y organismos', 'Hospitales',
];

export default function Industrial() {
  return (
    <>
      <section className="relative overflow-hidden bg-ng-navy section-pad">
        <div className="absolute inset-0 bg-grid-white bg-[length:40px_40px] opacity-25" />
        <div className="container-wide relative">
          <SectionHeader
            eyebrow="Soluciones industriales y tratamiento de agua"
            title="Tratamiento de agua, procesos críticos y soporte técnico en campo"
            description="Soluciones donde el desempeño químico, la dosificación, el análisis y el seguimiento técnico impactan directamente en continuidad y costo."
            dark
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industrialSolutions.map((s) => (
              <div key={s.title} className="rounded-xl border border-white/10 bg-white/6 p-5 transition hover:bg-white/10">
                <Icon name="drop" className="mb-3 h-6 w-6 text-ng-lime" />
                <h3 className="display text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-3">
          {[
            { icon: 'drop',    t: 'Agua industrial',    d: 'Caracterización, monitoreo, acondicionamiento y cumplimiento de parámetros normativos (NOM-001, NOM-002, NOM-003, NOM-004-SEMARNAT).' },
            { icon: 'enzyme',  t: 'PTAR y biología',    d: 'Tratamientos biológicos, bioaumentación, control de olores y apoyo técnico para estabilización de proceso y cumplimiento de descarga.' },
            { icon: 'beaker',  t: 'Dosificación',       d: 'Equipos, sistemas de inyección y soporte técnico para dosificación precisa en tiempo real. Análisis de parámetros y ajuste continuo.' },
          ].map((c) => (
            <article key={c.t} className="rounded-xl border border-ng-line bg-ng-mist p-7">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-ng-navy text-white">
                <Icon name={c.icon} className="h-5 w-5" />
              </div>
              <h2 className="display text-2xl font-extrabold text-ng-ink">{c.t}</h2>
              <p className="mt-3 text-sm leading-7 text-ng-steel">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad bg-ng-mist">
        <div className="container-wide">
          <SectionHeader eyebrow="Sectores atendidos" title="Experiencia en industrias de alta exigencia"
            description="Operamos en sectores donde el incumplimiento tiene consecuencias técnicas, legales y operativas." />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sectors.map((s) => (
              <div key={s} className="rounded-lg border border-ng-line bg-white px-4 py-3 text-sm font-semibold text-ng-ink shadow-card">
                {s}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/contacto" variant="dark">
              <Icon name="arrow" className="h-4 w-4" />Solicitar diagnóstico técnico
            </Button>
          </div>
        </div>
      </section>

      <CTA title="¿Tu proceso requiere diagnóstico o tratamiento técnico?"
        description="Enviamos a un especialista técnico. Sin costo de diagnóstico inicial para nuevos proyectos." />
    </>
  );
}
