import bodegaImage from '../assets/bodega-neugreen.jpg';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { stats } from '../data/siteData.js';
import { whatsappUrl } from '../utils/navigation.js';

export default function Hero({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="relative -mt-[72px] min-h-[680px] flex flex-col overflow-hidden">

      {/* Background image with overlays */}
      <div className="absolute inset-0">
        <img src={bodegaImage} alt="" aria-hidden="true"
          className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ng-navy/92 via-ng-navy/75 to-ng-navy/40" />
        <div className="absolute inset-0 bg-grid-white bg-[length:36px_36px] opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ng-navy/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-wide relative flex flex-1 flex-col justify-center px-5 pb-12 pt-36 sm:px-6 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow anim-right text-ng-lime">Neugreen México — Biotecnología Aplicada</p>

          <h1 className="display anim-up delay-100 mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="anim-up delay-200 mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            {subtitle}
          </p>

          <div className="anim-up delay-300 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} variant="primary" icon={<Icon name="arrow" className="h-4 w-4" />}>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15">
              <Icon name="wa" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative bg-ng-navy/80 backdrop-blur-sm border-t border-white/10">
        <div className="container-wide grid grid-cols-2 gap-px bg-white/10 px-5 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`anim-up bg-ng-navy/60 px-6 py-6 delay-${i * 100 + 400}`}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
