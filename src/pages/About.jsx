import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const pillars = [
  'Experiencia acumulada',
  'Innovación biotecnológica',
  'Calidad y estandarización',
  'Soluciones técnicas integrales',
  'Compromiso con sostenibilidad y eficiencia',
];

export default function About() {
  return (
    <>
      <section className="section-pad bg-neugreen-mist">
        <div className="container-wide grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Nosotros"
            title="Empresa mexicana de biotecnología aplicada a soluciones B2B"
            description="Neugreen México diseña, formula y fabrica productos químicos y enzimáticos de alto rendimiento para sectores que requieren eficiencia, inocuidad, cumplimiento y soporte técnico."
          />
          <div className="rounded-md border border-neugreen-line bg-white p-7 shadow-industrial">
            <p className="text-base leading-8 text-neugreen-steel">
              Trabajamos con clientes industriales, comerciales e institucionales que necesitan soluciones confiables:
              desde productos de línea para limpieza y desinfección, hasta maquila, marca privada y tratamiento de agua.
              Nuestra propuesta combina manufactura química, criterio técnico, abastecimiento y cercanía comercial.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar) => (
            <div key={pillar} className="rounded-md border border-neugreen-line p-5">
              <h2 className="text-lg font-black text-neugreen-ink">{pillar}</h2>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
