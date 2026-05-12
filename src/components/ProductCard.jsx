import Icon from './Icon.jsx';

export default function ProductCard({ icon, title, badge, description }) {
  return (
    <article className="card-hover group flex flex-col rounded-xl border border-ng-line bg-white p-5 shadow-card hover:border-ng-blue/30">
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-ng-navy text-white group-hover:bg-ng-blue transition-colors">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <span className="rounded-md bg-ng-mist px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ng-blue">
          {badge}
        </span>
      </div>
      <h3 className="display mt-4 text-xl font-bold text-ng-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-ng-steel">{description}</p>
    </article>
  );
}
