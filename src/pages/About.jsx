import bodegaImage from '../assets/bodega-neugreen.jpg';
import CTA from '../components/CTA.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Icon from '../components/Icon.jsx';
import Button from '../components/Button.jsx';
import { clients } from '../data/siteData.js';

const values = [
  { icon: 'enzyme',  t: 'Innovación con criterio',   d: 'La tecnología debe resolver problemas reales y reducir costos, no impresionar.' },
  { icon: 'leaf',    t: 'Sustentabilidad real',       d: 'Conectada con desempeño, ahorro y cumplimiento. Nunca solo marketing verde.' },
  { icon: 'beaker',  t: 'Precisión técnica',          d: 'Formulamos, dosificamos y entregamos con base en datos, no en supuestos.' },
  { icon: 'shield',  t: 'Cumplimiento normativo',     d: 'COFEPRIS, NOM y estándares sectoriales son piso, no techo.' },
  { icon: 'support', t: 'Rentabilidad compartida',    d: 'Si el cliente gana eficiencia y reduce costos, la relación dura.' },
  { icon: 'factory', t: 'Profesionalismo B2B',        d: 'Trato directo, técnico, con compromisos claros y cumplimiento de entrega.' },
];

export default function About() {
  return (
    <>
      <section className="section-pad bg-ng-mist">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Nosotros"
              title="Empresa mexicana de biotecnología aplicada"
              description="Neugreen México diseña, formula y fabrica productos químicos y enzimáticos de alto rendimiento para sectores que requieren eficiencia, inocuidad, cumplimiento y soporte técnico."
            />
            <div className="mt-8 space-y-4 text-base leading-8 text-ng-steel">
              <p>Operamos desde San Luis Potosí con más de 20 años de experiencia acumulada en formulación química, manufactura, distribución y soporte técnico para clientes B2B en México.</p>
              <p>Atendemos tres líneas de negocio: productos de línea para limpieza y desinfección, maquila y marca privada, y soluciones industriales con tratamiento de agua.</p>
            </div>
            <div className="mt-7 flex gap-3">
              <Button href="/contacto" variant="dark">Contactar al equipo</Button>
              <Button href="/infraestructura" variant="outline">Ver infraestructura</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-ng-line shadow-lift">
            <img src={bodegaImage} alt="Planta Neugreen en San Luis Potosí" className="h-96 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader eyebrow="Valores" title="Lo que guía cómo operamos" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="rounded-xl border border-ng-line bg-ng-mist p-5">
                <Icon name={v.icon} className="h-6 w-6 text-ng-blue mb-3" />
                <h3 className="display text-base font-bold text-ng-ink">{v.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-pad bg-ng-navy">
        <div className="container-wide">
          <SectionHeader eyebrow="Clientes" title="Empresas que ya confían en Neugreen" dark />
          <div className="mt-8 flex flex-wrap gap-3">
            {clients.map((c) => (
              <span key={c} className="rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
