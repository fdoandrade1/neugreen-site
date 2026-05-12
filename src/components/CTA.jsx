import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/navigation.js';

export default function CTA({
  title = '¿Necesitas resolver limpieza, manufactura o tratamiento industrial?',
  description = 'Un asesor técnico-comercial revisa tu operación y te prepara una cotización en 24 horas.',
}) {
  return (
    <section className="relative overflow-hidden bg-ng-navy px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute inset-0 bg-grid-white bg-[length:36px_36px] opacity-30" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ng-blue/20 blur-3xl" />
      <div className="container-wide relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow text-ng-lime">Cotización B2B</p>
          <h2 className="display mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button href={whatsappUrl} variant="primary" icon={<Icon name="wa" className="h-4 w-4" />}>
            WhatsApp
          </Button>
          <Button href="/contacto" variant="light">
            Solicitar cotización
          </Button>
        </div>
      </div>
    </section>
  );
}
