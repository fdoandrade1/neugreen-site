import Button from './Button.jsx';

export default function BusinessLineCard({ num, title, tagline, description, href, badge }) {
  return (
    <article className="card-hover group flex h-full flex-col rounded-xl border border-ng-line bg-white p-7 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <span className="display text-5xl font-extrabold text-ng-line group-hover:text-ng-green transition-colors duration-300">
          {num}
        </span>
        <span className="rounded-full bg-ng-green/10 px-3 py-1 text-xs font-semibold text-ng-green border border-ng-green/20">
          {badge}
        </span>
      </div>
      <h3 className="display mt-5 text-2xl font-extrabold text-ng-ink">{title}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-ng-blue">{tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-ng-steel">{description}</p>
      <Button href={href} variant="outline" className="mt-6 w-full">
        Ver línea →
      </Button>
    </article>
  );
}
