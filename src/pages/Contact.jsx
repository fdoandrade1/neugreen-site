import Button from '../components/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { whatsappUrl } from '../utils/navigation.js';

const contactOptions = [
  { icon: 'wa',      label: 'WhatsApp', value: '444 847 3705', href: whatsappUrl,               note: 'Respuesta en minutos en horario hábil' },
  { icon: 'mail',    label: 'Correo',   value: 'ventas@neugreen.mx', href: 'mailto:ventas@neugreen.mx', note: 'Respondemos en máx. 24 horas' },
  { icon: 'phone',   label: 'Teléfono', value: '444 847 3705', href: 'tel:+524448473705',       note: 'Lun–Vie 9:00–18:00, Sáb 9:00–13:00' },
];

export default function Contact() {
  return (
    <>
      <section className="section-pad bg-ng-mist">
        <div className="container-wide grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Contacto"
              title="Cotiza productos, maquila o soluciones industriales"
              description="Cuéntanos qué necesitas resolver. Un asesor técnico-comercial da seguimiento y prepara cotización en 24 horas."
            />
            <div className="mt-8 grid gap-3">
              {contactOptions.map(({ icon, label, value, href, note }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-ng-line bg-white p-4 shadow-card transition hover:border-ng-blue/40 hover:shadow-lift">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ng-navy text-white">
                    <Icon name={icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ng-steel">{label}</p>
                    <p className="mt-0.5 text-base font-bold text-ng-ink">{value}</p>
                    <p className="mt-0.5 text-xs text-ng-steel">{note}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-ng-line bg-white p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-ng-steel mb-2">Dirección</p>
              <p className="text-sm leading-7 text-ng-ink">
                Prol. Pánfilo Natera 501A<br />
                La Angostura, Mexquitic de Carmona<br />
                C.P. 78483, San Luis Potosí, S.L.P., México
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="mb-4 text-sm font-semibold text-ng-steel">O usa el formulario — te respondemos en 24 h hábiles:</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <SectionHeader eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { q: '¿Cuál es el pedido mínimo?', a: 'Para Línea 1, desde 1 garrafa. Para maquila, desde 200 L o según el producto. Para industrial, cotización por proyecto.' },
              { q: '¿Hacen entregas fuera de SLP?', a: 'Sí. Tenemos logística para distribución nacional. El tiempo depende de la zona y el volumen.' },
              { q: '¿Tienen fichas técnicas y hojas de seguridad?', a: 'Sí. Todos los productos tienen ficha técnica y HDS disponible. Las enviamos con cada cotización.' },
              { q: '¿En cuánto tiempo llega una cotización?', a: 'Línea 1: máximo 24 horas. Maquila o proyectos industriales: 2–5 días hábiles según complejidad.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-ng-line bg-ng-mist p-5">
                <h3 className="display text-base font-bold text-ng-ink">{q}</h3>
                <p className="mt-2 text-sm leading-6 text-ng-steel">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
