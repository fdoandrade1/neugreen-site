import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/navigation.js';

export default function WhatsAppButton() {
  return (
    <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-110 hover:shadow-hero active:scale-95">
      <Icon name="wa" className="h-7 w-7" strokeWidth={1.5} />
    </a>
  );
}
