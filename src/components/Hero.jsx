import bodegaImage from '../assets/bodega-neugreen.jpg';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { stats } from '../data/siteData.js';
import { whatsappUrl } from '../utils/navigation.js';

export default function Hero({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="relative flex flex-col overflow-hidden">

      {/* Background via CSS — más confiable que <img> absoluto */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bodegaImage})` }}
        aria-hidden="true"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ng-navy/94 via-ng-navy/78 to-ng-navy/50" />
      <div className="absolute inset-0 bg-grid-white bg-[length:40px_40px] opacity-20" />

      {/* Contenido */}
      <div className="container-wide relative flex min-h-[600px] flex-col justify-center px-5 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow anim-right text-ng-lime">
            Neugreen México — Biotecnología Aplicada
          </p>
          <h1 className="display anim-up delay-100 mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="anim-up delay-200 mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            {subtitle}
          </p>
          <div className="anim-up delay-300 mt-9 flex flex-wrap gap-3">
            <Button href={primaryHref} variant="primary" icon={<Icon name="arrow" className="h-4 w-4" />}>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/18">
              <Icon name="wa" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/10 bg-ng-navy/70 backdrop-blur-sm">
        <div className="container-wide grid grid-cols-2 divide-x divide-white/10 px-5 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`anim-up px-6 py-5 delay-${i * 100 + 400}`}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
