// POST /api/admin/media   multipart/form-data: archivo, slug
//
// Sube una imagen al bucket R2 (binding MEDIA) y devuelve su URL pública.

import { json, error, conErrores } from './_lib/http.js';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// extensión -> content-type que se guardará en R2
//
// SVG queda FUERA a propósito: es un documento activo (puede llevar <script>
// o manejadores de evento) y, servido desde el mismo origen que el sitio,
// los ejecutaría — XSS almacenado con las cookies de Access a la mano.
// Si algún día hace falta readmitirlo: servir R2 desde un origen aparte
// (media.neugreen.mx) y sanear el SVG, no solo confiar en la extensión.
const TIPOS = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

// Firma binaria esperada. Evita que un archivo renombrado (un .html llamado
// "foto.png") entre solo por llevar la extensión correcta.
function firmaValida(ext, bytes) {
  const b = new Uint8Array(bytes);
  if (ext === 'jpg' || ext === 'jpeg') return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (ext === 'png') return b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
  if (ext === 'webp') {
    const txt = String.fromCharCode(...b.slice(0, 12));
    return txt.startsWith('RIFF') && txt.slice(8, 12) === 'WEBP';
  }
  // Falla cerrado: si mañana se agrega un tipo a TIPOS sin su firma aquí,
  // se rechaza en vez de aceptarlo a ciegas.
  return false;
}

function extensionDe(nombre) {
  const m = String(nombre || '').toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : '';
}

function slugSeguro(valor) {
  const s = String(valor || 'imagen').toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // fuera acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return s || 'imagen';
}

export const onRequestPost = conErrores(async ({ request, env }) => {
  if (!env.MEDIA) return error(500, 'Falta el binding R2 "MEDIA"');
  if (!env.R2_PUBLIC_URL) return error(500, 'Falta la variable R2_PUBLIC_URL');

  const tipo = request.headers.get('Content-Type') || '';
  if (!tipo.includes('multipart/form-data')) {
    return error(415, 'Se espera multipart/form-data con el campo "archivo"');
  }

  const form = await request.formData();
  const archivo = form.get('archivo');
  if (!archivo || typeof archivo.arrayBuffer !== 'function') {
    return error(400, 'Falta el campo "archivo"');
  }

  const ext = extensionDe(archivo.name);
  if (!TIPOS[ext]) {
    return error(400, `Tipo de archivo no permitido: .${ext || '(sin extensión)'}`, {
      permitidos: Object.keys(TIPOS),
    });
  }

  if (archivo.size > MAX_BYTES) {
    return error(400, 'El archivo supera 5 MB', {
      tamano_bytes: archivo.size,
      maximo_bytes: MAX_BYTES,
    });
  }

  const datos = await archivo.arrayBuffer();

  if (!firmaValida(ext, datos)) {
    return error(400, `El contenido no corresponde a un .${ext} válido`);
  }

  const nombre = `${slugSeguro(form.get('slug'))}-${Date.now()}.${ext}`;

  await env.MEDIA.put(nombre, datos, {
    httpMetadata: {
      contentType: TIPOS[ext],
      cacheControl: 'public, max-age=31536000, immutable',
    },
  });

  const base = String(env.R2_PUBLIC_URL).replace(/\/+$/, '');
  return json({ nombre, url: `${base}/${nombre}`, bytes: archivo.size, tipo: TIPOS[ext] }, 201);
});
