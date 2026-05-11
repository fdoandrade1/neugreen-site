import { useEffect, useMemo, useState } from 'react';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import { seoByPath } from './data/siteData.js';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Industrial from './pages/Industrial.jsx';
import Infrastructure from './pages/Infrastructure.jsx';
import Maquila from './pages/Maquila.jsx';
import Products from './pages/Products.jsx';
import { normalizePath } from './utils/navigation.js';

const routes = {
  '/': Home,
  '/productos': Products,
  '/maquila': Maquila,
  '/industrial': Industrial,
  '/infraestructura': Infrastructure,
  '/nosotros': About,
  '/contacto': Contact,
};

function useCurrentPath() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
}

export default function App() {
  const path = useCurrentPath();
  const Page = routes[path] || Home;
  const seo = useMemo(() => seoByPath[path] || seoByPath['/'], [path]);

  useEffect(() => {
    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', seo.description);
  }, [seo]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPath={path} />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  );
}
