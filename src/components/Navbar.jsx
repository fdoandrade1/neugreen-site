import { useState } from 'react';
import logoImg from '../assets/logo-neugreen.jpg';
import { navItems } from '../data/siteData.js';
import { navigateTo, normalizePath, whatsappUrl } from '../utils/navigation.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Navbar({ currentPath }) {
  const [open, setOpen] = useState(false);
  const go = (href) => (e) => { e.preventDefault(); setOpen(false); navigateTo(href); };

  return (
    <header className="sticky top-0 z-50 border-b border-ng-line bg-white/97 shadow-sm backdrop-blur">
      <nav className="container-wide flex min-h-[72px] items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" onClick={go('/')} className="focus-ring flex items-center rounded-lg">
          <img src={logoImg} alt="Neugreen México" className="h-9 w-auto" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = normalizePath(currentPath) === item.href;
            return (
              <a key={item.href} href={item.href} onClick={go(item.href)}
                className={`focus-ring rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-ng-mist font-semibold text-ng-navy'
                    : 'text-ng-steel hover:text-ng-navy'
                }`}>
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappUrl} target="_blank" rel="noreferrer"
            className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ng-steel transition hover:text-ng-navy">
            <Icon name="phone" className="h-4 w-4" />
            444 847 3705
          </a>
          <Button href="/contacto" variant="dark">
            Solicitar cotización
          </Button>
        </div>

        {/* Hamburger */}
        <button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? 'Cerrar' : 'Menú'}
          className="focus-ring grid h-11 w-11 place-items-center rounded-lg border border-ng-line text-ng-navy hover:bg-ng-mist lg:hidden">
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ng-line bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={go(item.href)}
                className="focus-ring rounded-lg px-4 py-3 text-sm font-medium text-ng-ink hover:bg-ng-mist">
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <Button href={whatsappUrl} variant="outline" className="flex-1">
                <Icon name="phone" className="h-4 w-4" />WhatsApp
              </Button>
              <Button href="/contacto" variant="dark" className="flex-1">
                Cotizar
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
