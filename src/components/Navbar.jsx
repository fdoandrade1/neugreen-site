import { useEffect, useState } from 'react';
import logoImg from '../assets/logo-neugreen.png';
import { navItems } from '../data/siteData.js';
import { navigateTo, normalizePath, whatsappUrl } from '../utils/navigation.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Navbar({ currentPath }) {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => (e) => { e.preventDefault(); setOpen(false); navigateTo(href); };

  const isHome = currentPath === '/';
  const transparent = isHome && !scrolled && !open;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      transparent
        ? 'bg-transparent border-b border-white/10'
        : 'bg-white/97 border-b border-ng-line shadow-sm backdrop-blur'
    }`}>
      <nav className="container-wide flex min-h-[72px] items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" onClick={go('/')} className="focus-ring flex items-center gap-2 rounded-lg">
          <img
            src={logoImg}
            alt="Neugreen México"
            className={`h-9 w-auto transition-all duration-300 ${transparent ? 'brightness-0 invert' : ''}`}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = normalizePath(currentPath) === item.href;
            return (
              <a key={item.href} href={item.href} onClick={go(item.href)}
                className={`focus-ring rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  transparent
                    ? active ? 'text-ng-lime' : 'text-white/80 hover:text-white'
                    : active ? 'text-ng-navy font-semibold bg-ng-mist' : 'text-ng-steel hover:text-ng-navy'
                }`}>
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappUrl} target="_blank" rel="noreferrer"
            className={`focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              transparent ? 'text-white/80 hover:text-white' : 'text-ng-steel hover:text-ng-navy'
            }`}>
            <Icon name="phone" className="h-4 w-4" />
            <span>444 847 3705</span>
          </a>
          <Button href="/contacto" variant={transparent ? 'ghost' : 'dark'}>
            Solicitar cotización
          </Button>
        </div>

        {/* Hamburger */}
        <button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? 'Cerrar' : 'Menú'}
          className={`focus-ring grid h-11 w-11 place-items-center rounded-lg border transition lg:hidden ${
            transparent
              ? 'border-white/20 text-white hover:bg-white/10'
              : 'border-ng-line text-ng-navy hover:bg-ng-mist'
          }`}>
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
