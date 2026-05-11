import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function BusinessLineCard({ title, description, href, metric }) {
  return (
    <article className="card-hover flex h-full flex-col rounded-md border border-neugreen-line bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-neugreen-mist text-neugreen-blue">
          <Icon name="spark" />
        </div>
        <span className="rounded-md bg-neugreen-green/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-neugreen-green">
          {metric}
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-black text-neugreen-ink">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-neugreen-steel">{description}</p>
      <Button href={href} variant="outline" className="mt-6 w-full">
        Ver línea
      </Button>
    </article>
  );
}
