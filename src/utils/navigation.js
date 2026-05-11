export const normalizePath = (path) => {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '');
};

export const navigateTo = (href) => {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    window.location.href = href;
    return;
  }

  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const whatsappUrl =
  'https://wa.me/524448483705?text=Hola%20Neugreen%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20sus%20soluciones.';
