import { useState } from 'react';
import { navItems } from '../data/siteData.js';
import { navigateTo, normalizePath } from '../utils/navigation.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function Navbar({ currentPath }) {
  const [open, setOpen] = useState(false);

  const handleNav = (href) => (event) => {
    event.preventDefault();
    setOpen(false);
    navigateTo(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neugreen-line bg-white/95 backdrop-blur">
      <nav className="container-wide flex min-h-20 items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="/" onClick={handleNav('/')} className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-neugreen-blue text-lg font-black text-white">
            N
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-normal text-neugreen-ink">Neugreen</span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.22em] text-neugreen-steel">
              México
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = normalizePath(currentPath) === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNav(item.href)}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active ? 'bg-neugreen-mist text-neugreen-blue' : 'text-neugreen-steel hover:text-neugreen-blue'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Button href="/contacto" variant="dark">
            Solicitar cotización
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-md border border-neugreen-line text-neugreen-blue lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-neugreen-line bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNav(item.href)}
                className="focus-ring rounded-md px-3 py-3 text-sm font-bold text-neugreen-ink hover:bg-neugreen-mist"
              >
                {item.label}
              </a>
            ))}
            <Button href="/contacto" variant="dark" className="mt-2 w-full">
              Solicitar cotización
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
