import { navItems } from '../data/siteData.js';
import { navigateTo, whatsappUrl } from '../utils/navigation.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neugreen-navy text-white">
      <div className="container-wide px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-white text-xl font-black text-neugreen-blue">
                N
              </span>
              <div>
                <p className="text-2xl font-black">Neugreen</p>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">México</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/72">
              Biotecnología aplicada a limpieza, desinfección, manufactura química y tratamiento de agua para
              empresas industriales, comerciales e institucionales.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={whatsappUrl} variant="primary" icon={<Icon name="phone" className="h-4 w-4" />}>
                WhatsApp
              </Button>
              <Button href="mailto:ventas@neugreen.mx" variant="secondary" icon={<Icon name="mail" className="h-4 w-4" />}>
                ventas@neugreen.mx
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/55">Sitio</h2>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(item.href);
                  }}
                  className="text-sm font-semibold text-white/72 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/55">Contacto</h2>
            <div className="mt-5 grid gap-3 text-sm text-white/72">
              <a className="transition hover:text-white" href="tel:+524448483705">
                444 848 3705
              </a>
              <a className="transition hover:text-white" href="mailto:ventas@neugreen.mx">
                ventas@neugreen.mx
              </a>
              <a className="transition hover:text-white" href="https://www.neugreen.mx" target="_blank" rel="noreferrer">
                www.neugreen.mx
              </a>
              <p>San Luis Potosí, México</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/12 pt-6 text-xs text-white/50">
          © {year} Neugreen México. Sitio corporativo B2B.
        </div>
      </div>
    </footer>
  );
}
