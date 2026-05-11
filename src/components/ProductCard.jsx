import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function ProductCard({ icon, title, description }) {
  return (
    <article className="card-hover flex h-full flex-col rounded-md border border-neugreen-line bg-white p-6">
      <div className="grid h-12 w-12 place-items-center rounded-md bg-neugreen-blue text-white">
        <Icon name={icon} />
      </div>
      <h3 className="mt-5 text-xl font-black text-neugreen-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-neugreen-steel">{description}</p>
      <Button href={`/contacto?linea=${encodeURIComponent(title)}`} variant="outline" className="mt-6 w-full">
        Cotizar esta línea
      </Button>
    </article>
  );
}
