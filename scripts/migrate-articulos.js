// scripts/migrate-articulos.js — genera el seed SQL de migración inicial.
//
// Lee window.ARTICULOS de assets/js/articulos-data.js y escribe
// schema/seed-migracion.sql con un INSERT por artículo.
//
// NO ejecuta nada contra D1: solo produce el archivo. Aplicarlo es un paso
// aparte y manual (ver README del reporte / comandos wrangler).
//
// Uso:  node scripts/migrate-articulos.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORIGEN = path.join(ROOT, 'assets', 'js', 'articulos-data.js');
const DESTINO = path.join(ROOT, 'schema', 'seed-migracion.sql');

// Mismo truco que build.js: el archivo de datos asigna a `window`, así que
// lo evaluamos con un window de utilería en lugar de importarlo.
function cargarArticulos() {
  if (!fs.existsSync(ORIGEN)) {
    console.error(`No se encontró ${ORIGEN}`);
    process.exit(1);
  }
  const win = {};
  new Function('window', fs.readFileSync(ORIGEN, 'utf8'))(win);
  const arts = win.ARTICULOS;
  if (!Array.isArray(arts) || arts.length === 0) {
    console.error('articulos-data.js no expone window.ARTICULOS con contenido');
    process.exit(1);
  }
  return arts;
}

// Literal SQL: NULL, o texto con las comillas simples duplicadas.
function txt(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  return `'${String(v).replace(/'/g, "''")}'`;
}

// Campos anidados: JSON.stringify y luego el mismo escape de SQL.
function json(v) {
  if (v === null || v === undefined) return 'NULL';
  return txt(JSON.stringify(v));
}

const COLUMNAS = [
  'slug', 'titulo', 'seo_title', 'meta_description', 'linea', 'categoria',
  'fecha', 'fecha_texto', 'lectura', 'autor',
  'portada', 'portada_alt', 'portada_pie', 'portada_icono', 'portada_tag',
  'extracto', 'respuesta_rapida', 'cuerpo',
  'productos_relacionados', 'articulos_relacionados',
  'destacado', 'estado', 'creado_en', 'actualizado_en', 'actualizado_por',
];

function insert(a, ahora) {
  const valores = [
    txt(a.slug),
    txt(a.titulo),
    txt(a.seoTitle),
    txt(a.metaDescription),
    txt(a.linea),
    txt(a.categoria),
    txt(a.fecha),
    txt(a.fechaTexto),
    txt(a.lectura),
    txt(a.autor),
    txt(a.portada),
    txt(a.portadaAlt),
    txt(a.portadaPie),
    txt(a.portadaIcono),
    txt(a.portadaTag),
    txt(a.extracto),
    json(a.respuestaRapida),
    txt(a.cuerpo),
    json(a.productosRelacionados),
    json(a.articulosRelacionados),
    a.destacado ? '1' : '0',
    // La migración no publica nada: todo entra como borrador.
    `'borrador'`,
    txt(ahora),
    txt(ahora),
    `'migración-inicial'`,
  ];

  return `-- ${a.slug}\nINSERT INTO articulos (\n  ${COLUMNAS.join(', ')}\n) VALUES (\n  ${valores.join(',\n  ')}\n);`;
}

function main() {
  const articulos = cargarArticulos();
  const ahora = new Date().toISOString();

  const cabecera = [
    '-- schema/seed-migracion.sql',
    '-- GENERADO por scripts/migrate-articulos.js — no editar a mano.',
    `-- Origen: assets/js/articulos-data.js (${articulos.length} artículos)`,
    `-- Generado: ${ahora}`,
    '--',
    '-- Todos los artículos entran con estado = borrador. La migración no',
    '-- publica nada; publicar es una acción explícita desde el panel.',
    '--',
    '-- Los slugs son UNIQUE: aplicar este archivo dos veces falla en el',
    '-- segundo INSERT. Para reaplicar, vaciar antes la tabla articulos.',
    '',
  ].join('\n');

  const cuerpo = articulos.map((a) => insert(a, ahora)).join('\n\n');

  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, `${cabecera}\n${cuerpo}\n`);

  console.log(`✓ ${articulos.length} artículos → schema/seed-migracion.sql`);
  console.log('  (archivo generado; no se ejecutó nada contra D1)');
}

main();
