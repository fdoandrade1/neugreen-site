import logoImg from '../assets/logo-neugreen.png';
import { navItems } from '../data/siteData.js';
import { navigateTo, whatsappUrl } from '../utils/navigation.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (href) => (e) => { e.preventDefault(); navigateTo(href); };

  return (
    <footer className="bg-ng-navy text-white">
      <div className="container-wide px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <img src={logoImg} alt="Neugreen México" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Biotecnología aplicada a limpieza, desinfección, manufactura química y tratamiento de agua para industrias, comercios e instituciones en México.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={whatsappUrl} variant="primary" icon={<Icon name="wa" className="h-4 w-4" />}>
                WhatsApp
              </Button>
              <Button href="mailto:ventas@neugreen.mx" variant="ghost" icon={<Icon name="mail" className="h-4 w-4" />}>
                ventas@neugreen.mx
              </Button>
            </div>
            <div className="mt-6 space-y-1 text-sm text-white/50">
              <p className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 shrink-0" />
                <a href="tel:+524448473705" className="hover:text-white transition">444 847 3705</a>
              </p>
              <p className="flex items-start gap-2 text-xs leading-5">
                Prol. Pánfilo Natera 501A, La Angostura, Mexquitic de Carmona, 78483 SLP, México
              </p>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Sitio</h3>
            <nav className="mt-5 grid gap-2.5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={go(item.href)}
                  className="text-sm text-white/65 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Lines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Líneas</h3>
            <div className="mt-5 grid gap-2.5 text-sm text-white/65">
              {['Productos de línea', 'Maquila y marca privada', 'Soluciones industriales', 'Tratamiento de agua'].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['COFEPRIS', 'FDA', 'EPA', 'B2B'].map((tag) => (
                <span key={tag} className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {year} Neugreen México. Sitio corporativo B2B.</span>
          <a href="https://www.neugreen.mx" className="hover:text-white/70 transition">www.neugreen.mx</a>
        </div>
      </div>
    </footer>
  );
}
