// build.js — precompilación JSX → JS con esbuild, SIN migrar a ESM.
//
// Cada componente conserva su patrón `window.X = X`. Para poder concatenar los
// componentes en un solo archivo sin que choquen sus declaraciones de nivel
// superior (varios hacen `const { useState } = React;`), cada componente se
// transpila individualmente y se envuelve en un IIFE. La asignación
// `window.X = X` escapa el IIFE (window es global), así que el registro global
// sigue funcionando idéntico; los const/let/function internos quedan aislados.
//
// Salida:
//   dist/assets/js/app.min.js            ← componentes (IIFE) concatenados + minify
//   dist/assets/js/mount-<pagina>.js     ← montaje de cada página
//   dist/assets/js/mount-articulo-<slug>.js ← montaje de cada artículo del blog
//   dist/blog/<slug>.html                ← una página por artículo, con SEO propio
//   dist/sitemap.xml                     ← generado desde las páginas + ARTICULOS
//   dist/<estáticos>                     ← HTML + assets/ + fonts/ + css + etc.
//
// functions/ NO se copia ni se toca: Cloudflare Pages lo lee de la raíz del repo.

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const JS_OUT = path.join(DIST, 'assets', 'js');
const SITE = 'https://www.neugreen.mx';

const TODOS_JSX = fs.readdirSync(ROOT).filter((f) => f.endsWith('.jsx')).sort();

// Componentes del sitio público: todos menos los del panel. El panel no se
// mezcla en app.min.js — es código que solo usan dos páginas tras Access, y
// cargarlo en cada visita pública sería peso muerto.
const COMPONENT_FILES = TODOS_JSX.filter((f) => !f.startsWith('Admin'));

// Bundle del panel: sus componentes + los del artículo, que se comparten
// porque la previsualización usa ArticuloLayout, el mismo del sitio público.
const ADMIN_FILES = [
  ...TODOS_JSX.filter((f) => f.startsWith('Admin')),
  'ArticuloCard.jsx',
  'ArticuloLayout.jsx',
];

// Páginas con montaje React (cada una tiene mounts/<pagina>.jsx).
const PAGES = ['index', 'productos', 'manufactura', 'industrial', 'proyectos', 'nosotros', 'contacto', 'blog'];

// Páginas del panel: mounts/admin-<x>.jsx -> mount-admin-<x>.js
const PAGES_ADMIN = ['index', 'editar'];

// Estáticos a copiar tal cual. functions/ ausente a propósito.
// sitemap.xml no se copia: se genera más abajo desde los datos.
const STATIC_FILES = [
  'index.html', 'productos.html', 'manufactura.html', 'industrial.html',
  'proyectos.html', 'nosotros.html', 'contacto.html', 'blog.html',
  'whatsapp.html', 'index-print.html',
  'colors_and_type.css', 'robots.txt', 'llms.txt',
];
const STATIC_DIRS = ['assets', 'fonts', 'gracias-productos', 'admin'];

// Páginas estáticas del sitemap: [ruta limpia, prioridad].
const SITEMAP_PAGES = [
  ['/', '1.0'], ['/productos', '0.9'], ['/manufactura', '0.9'], ['/industrial', '0.9'],
  ['/contacto', '0.8'], ['/blog', '0.8'], ['/proyectos', '0.7'], ['/nosotros', '0.7'],
];
const SITEMAP_LASTMOD = '2026-07-28';

function transformJsx(code, sourcefile) {
  // Loader jsx con factory por defecto: React.createElement / React.Fragment.
  return esbuild.transformSync(code, { loader: 'jsx', sourcefile }).code;
}

function minify(code, sourcefile) {
  return esbuild.transformSync(code, { minify: true, sourcefile }).code;
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Lee assets/js/articulos-data.js en Node con un `window` de utilería.
// El archivo es la única fuente de verdad del blog: alimenta el índice,
// las páginas de artículo, los mounts y el sitemap.
function loadArticulos() {
  const file = path.join(ROOT, 'assets', 'js', 'articulos-data.js');
  if (!fs.existsSync(file)) {
    console.warn('  · aviso: no existe articulos-data.js — blog omitido');
    return [];
  }
  const win = {};
  new Function('window', fs.readFileSync(file, 'utf8'))(win);
  return win.ARTICULOS || [];
}

function copyStatic() {
  for (const f of STATIC_FILES) {
    const from = path.join(ROOT, f);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(DIST, f));
    else console.warn(`  · aviso: no existe ${f}, omitido`);
  }
  for (const d of STATIC_DIRS) {
    const from = path.join(ROOT, d);
    if (fs.existsSync(from)) fs.cpSync(from, path.join(DIST, d), { recursive: true });
  }
  console.log('✓ estáticos copiados (functions/ intacto en la raíz, no copiado)');
}

// Transpila cada componente por separado y lo envuelve en un IIFE, para que
// sus declaraciones de nivel superior no choquen al concatenarse.
function bundle(archivos, salida) {
  const chunks = archivos.map((file) => {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return `;(function(){\n${transformJsx(src, file)}\n})();\n`;
  });
  fs.mkdirSync(JS_OUT, { recursive: true });
  fs.writeFileSync(path.join(JS_OUT, salida), minify(chunks.join('\n'), salida));
  console.log(`✓ ${salida} — ${archivos.length} componentes (IIFE + minify)`);
}

function buildComponents() {
  bundle(COMPONENT_FILES, 'app.min.js');
  bundle(ADMIN_FILES, 'admin.min.js');
}

function buildMounts() {
  for (const page of PAGES) {
    const src = fs.readFileSync(path.join(ROOT, 'mounts', `${page}.jsx`), 'utf8');
    const js = minify(transformJsx(src, `mounts/${page}.jsx`), `mount-${page}.js`);
    fs.writeFileSync(path.join(JS_OUT, `mount-${page}.js`), js);
  }
  for (const page of PAGES_ADMIN) {
    const src = fs.readFileSync(path.join(ROOT, 'mounts', `admin-${page}.jsx`), 'utf8');
    const js = minify(transformJsx(src, `mounts/admin-${page}.jsx`), `mount-admin-${page}.js`);
    fs.writeFileSync(path.join(JS_OUT, `mount-admin-${page}.js`), js);
  }
  console.log(`✓ ${PAGES.length} mount-*.js + ${PAGES_ADMIN.length} mount-admin-*.js`);
}

// HTML de una página de artículo, con su propio <head> de SEO.
function articuloHtml(a) {
  const url = `${SITE}/blog/${a.slug}`;
  const img = a.portada
    ? `${SITE}/${a.portada}`
    : `${SITE}/assets/images/BODEGA_NEUGREEN_COMPLETA_FINAL.webp`;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(a.seoTitle || a.titulo)}</title>
<meta name="description" content="${esc(a.metaDescription)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(a.seoTitle || a.titulo)}" />
<meta property="og:description" content="${esc(a.metaDescription)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${img}" />
<meta property="article:published_time" content="${esc(a.fecha)}" />
<meta property="article:section" content="${esc(a.linea)}" />
<link rel="stylesheet" href="/colors_and_type.css" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { background: var(--ng-cloud); color: var(--ng-ink); font-family: var(--font-text); }
  ::selection { background: var(--ng-blue-100); color: var(--ng-blue-700); }
  button { font: inherit; }
  a { color: var(--ng-blue); text-decoration: none; }
</style>
</head>
<body>

<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>

<script src="/assets/js/app.min.js"></script>
<script src="/assets/js/articulos-data.js"></script>
<script src="/assets/js/mount-articulo-${a.slug}.js"></script>
</body>
</html>
`;
}

// Una página + un mount por artículo, desde la plantilla mounts/articulo.jsx.
function buildBlog(articulos) {
  if (!articulos.length) return;
  const blogDir = path.join(DIST, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  // Espejo del índice en /blog/index.html: con el directorio /blog/ presente,
  // no queremos depender de cómo Cloudflare resuelva la URL limpia /blog.
  // Ambos archivos declaran el mismo canonical, así que no compiten en SEO.
  const indice = path.join(ROOT, 'blog.html');
  if (fs.existsSync(indice)) fs.copyFileSync(indice, path.join(blogDir, 'index.html'));

  const plantilla = fs.readFileSync(path.join(ROOT, 'mounts', 'articulo.jsx'), 'utf8');

  for (const a of articulos) {
    fs.writeFileSync(path.join(blogDir, `${a.slug}.html`), articuloHtml(a));
    const src = plantilla.replace(/__SLUG__/g, a.slug);
    const js = minify(transformJsx(src, `mounts/articulo.jsx#${a.slug}`), `mount-articulo-${a.slug}.js`);
    fs.writeFileSync(path.join(JS_OUT, `mount-articulo-${a.slug}.js`), js);
  }
  console.log(`✓ blog — ${articulos.length} páginas en dist/blog/ + sus mounts`);
}

function buildSitemap(articulos) {
  const url = (loc, lastmod, priority) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const entradas = [
    ...SITEMAP_PAGES.map(([loc, p]) => url(loc, SITEMAP_LASTMOD, p)),
    ...articulos.map((a) => url(`/blog/${a.slug}`, a.fecha || SITEMAP_LASTMOD, '0.7')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- Generado por build.js — no editar a mano. Fuente: SITEMAP_PAGES + articulos-data.js -->\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n` +
    entradas.join('\n\n') + `\n\n</urlset>\n`;

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  console.log(`✓ sitemap.xml — ${entradas.length} URLs (${articulos.length} artículos)`);
}

// --- run ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
const articulos = loadArticulos();
copyStatic();
buildComponents();
buildMounts();
buildBlog(articulos);
buildSitemap(articulos);
console.log('Build completo → dist/');
