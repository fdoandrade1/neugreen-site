import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/navigation.js';

export default function CTA({
  title = '¿Necesitas resolver limpieza, manufactura o tratamiento industrial?',
  description = 'Hablemos de tu operación, tus volúmenes, tus restricciones y la respuesta técnica que necesitas.',
}) {
  return (
    <section className="section-pad bg-neugreen-blue text-white">
      <div className="container-wide">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neugreen-green">Cotización B2B</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={whatsappUrl} variant="primary" icon={<Icon name="phone" className="h-4 w-4" />}>
              Hablar por WhatsApp
            </Button>
            <Button href="/contacto" variant="secondary">
              Solicitar cotización
            </Button>
            <Button href="/contacto" variant="secondary">
              Descargar catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
