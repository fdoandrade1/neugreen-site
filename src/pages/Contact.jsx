import Button from '../components/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { whatsappUrl } from '../utils/navigation.js';

export default function Contact() {
  return (
    <section className="section-pad bg-neugreen-mist">
      <div className="container-wide grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="Contacto"
            title="Cotiza productos, maquila o soluciones industriales"
            description="Cuéntanos qué operación necesitas resolver y un asesor técnico-comercial dará seguimiento."
          />
          <div className="mt-8 grid gap-3">
            <Button href={whatsappUrl} variant="dark" icon={<Icon name="phone" className="h-4 w-4" />}>
              WhatsApp: 4448483705
            </Button>
            <Button href="mailto:ventas@neugreen.mx" variant="outline" icon={<Icon name="mail" className="h-4 w-4" />}>
              ventas@neugreen.mx
            </Button>
            <Button href="https://www.neugreen.mx" variant="outline">
              www.neugreen.mx
            </Button>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
