// build.js — precompilación JSX → JS con esbuild, SIN migrar a ESM.
//
// Cada componente conserva su patrón `window.X = X`. Para poder concatenar los
// 41 componentes en un solo archivo sin que choquen sus declaraciones de nivel
// superior (varios hacen `const { useState } = React;`), cada componente se
// transpila individualmente y se envuelve en un IIFE. La asignación
// `window.X = X` escapa el IIFE (window es global), así que el registro global
// sigue funcionando idéntico; los const/let/function internos quedan aislados.
//
// Salida:
//   dist/assets/js/app.min.js       ← 41 componentes (IIFE) concatenados + minify
//   dist/assets/js/mount-<pagina>.js ← bloque de montaje de cada página, transpilado
//   dist/<estáticos>                ← 7 HTML + assets/ + fonts/ + css + etc.
//
// functions/ NO se copia ni se toca: Cloudflare Pages lo lee de la raíz del repo.

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const JS_OUT = path.join(DIST, 'assets', 'js');

// Componentes: todos los .jsx de la raíz (los montajes viven en mounts/).
const COMPONENT_FILES = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.jsx'))
  .sort();

// Páginas con montaje React (cada una tiene mounts/<pagina>.jsx).
const PAGES = ['index', 'productos', 'manufactura', 'industrial', 'proyectos', 'nosotros', 'contacto'];

// Estáticos a copiar tal cual. functions/ ausente a propósito.
const STATIC_FILES = [
  'index.html', 'productos.html', 'manufactura.html', 'industrial.html',
  'proyectos.html', 'nosotros.html', 'contacto.html',
  'whatsapp.html', 'index-print.html',
  'colors_and_type.css', 'robots.txt', 'sitemap.xml',
];
const STATIC_DIRS = ['assets', 'fonts', 'gracias-productos'];

function transformJsx(code, sourcefile) {
  // Loader jsx con factory por defecto: React.createElement / React.Fragment.
  return esbuild.transformSync(code, { loader: 'jsx', sourcefile }).code;
}

function minify(code, sourcefile) {
  return esbuild.transformSync(code, { minify: true, sourcefile }).code;
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

function buildComponents() {
  const chunks = [];
  for (const file of COMPONENT_FILES) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const js = transformJsx(src, file);
    chunks.push(`;(function(){\n${js}\n})();\n`);
  }
  const bundled = minify(chunks.join('\n'), 'app.min.js');
  fs.mkdirSync(JS_OUT, { recursive: true });
  fs.writeFileSync(path.join(JS_OUT, 'app.min.js'), bundled);
  console.log(`✓ app.min.js — ${COMPONENT_FILES.length} componentes (IIFE + minify)`);
}

function buildMounts() {
  for (const page of PAGES) {
    const src = fs.readFileSync(path.join(ROOT, 'mounts', `${page}.jsx`), 'utf8');
    const js = minify(transformJsx(src, `mounts/${page}.jsx`), `mount-${page}.js`);
    fs.writeFileSync(path.join(JS_OUT, `mount-${page}.js`), js);
  }
  console.log(`✓ ${PAGES.length} mount-*.js`);
}

// --- run ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copyStatic();
buildComponents();
buildMounts();
console.log('Build completo → dist/');
