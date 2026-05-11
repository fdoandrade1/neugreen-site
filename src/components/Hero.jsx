import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Hero({ eyebrow, title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="relative overflow-hidden bg-neugreen-navy text-white">
      <div className="absolute inset-0 bg-grid-blue bg-[length:44px_44px] opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neugreen-navy to-transparent" />
      <div className="container-wide relative grid min-h-[650px] items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-neugreen-green">{eyebrow}</p>}
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">{subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} variant="primary" icon={<Icon name="arrow" className="h-4 w-4" />}>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-full border border-white/10" />
          <div className="relative overflow-hidden rounded-md border border-white/12 bg-white/8 p-8 shadow-2xl backdrop-blur">
            <div className="grid gap-4">
              {['Limpieza técnica', 'Desinfección', 'Tratamiento de agua', 'Maquila química'].map((label, index) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md border border-white/12 bg-white/8 p-5"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <span className="font-bold">{label}</span>
                  <span className="h-2.5 w-20 rounded-full bg-neugreen-green" />
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {['BIO', 'QA', 'B2B'].map((label) => (
                <div key={label} className="rounded-md bg-white p-4 text-center text-sm font-black text-neugreen-blue">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
