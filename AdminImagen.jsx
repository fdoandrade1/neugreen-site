// AdminImagen.jsx — recorte automático centrado a 16:9 antes de subir.
//
// El editor solo elige el archivo; el encuadre no se le pide a nadie. Las
// portadas se muestran siempre en 16:9 (tarjetas y cabecera del artículo), así
// que recortar aquí evita que el navegador deforme o corte de forma arbitraria
// y reduce el peso que viaja a R2.
//
// Regla de oro: si CUALQUIER paso falla, se devuelve el archivo original. Una
// portada con proporción imperfecta es mejor que un error que bloquea.

const RELACION = 16 / 9;
const ANCHO_MAX = 1600;
const ALTO_MAX = 900;
const CALIDAD = 0.9;
// Margen para no re-comprimir una imagen que ya viene en 16:9 exacto.
const TOLERANCIA = 0.01;

function cargarImagen(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo leer la imagen')); };
    img.src = url;
  });
}

// canvas.toBlob con un tipo no soportado cae silenciosamente a PNG, así que
// hay que preguntar antes en vez de asumir.
function exportaWebp() {
  try {
    const c = document.createElement('canvas');
    c.width = 1; c.height = 1;
    return c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
}

function formatoSalida(file) {
  const nombre = String(file.name || '').toLowerCase();
  if (nombre.endsWith('.png')) return { tipo: 'image/png', ext: 'png' };
  if (nombre.endsWith('.webp')) {
    return exportaWebp() ? { tipo: 'image/webp', ext: 'webp' } : { tipo: 'image/jpeg', ext: 'jpg' };
  }
  return { tipo: 'image/jpeg', ext: 'jpg' };
}

function conExtension(nombre, ext) {
  return `${String(nombre || 'portada').replace(/\.[a-z0-9]+$/i, '')}.${ext}`;
}

/**
 * Recorta a 16:9 tomando el centro y limita la resolución a 1600x900.
 * Nunca escala hacia arriba. Devuelve un File listo para subir, o el
 * original si algo no se puede hacer.
 *
 * @param {File} file
 * @returns {Promise<File>}
 */
async function recortar16x9(file) {
  try {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) return file;
    if (typeof document === 'undefined' || !document.createElement) return file;

    const img = await cargarImagen(file);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return file;

    const relacion = w / h;
    const yaEs169 = Math.abs(relacion - RELACION) < TOLERANCIA;

    // Ya viene en 16:9 y dentro del tope: se devuelve intacta. Volver a
    // codificarla solo perdería calidad sin ganar nada.
    if (yaEs169 && w <= ANCHO_MAX && h <= ALTO_MAX) return file;

    // --- región de origen: 16:9 centrada ---
    let sx, sy, sw, sh;
    if (relacion > RELACION) {
      // Más ancha que 16:9 -> se recortan los lados por igual, alto completo.
      sh = h;
      sw = Math.round(h * RELACION);
      sx = Math.round((w - sw) / 2);
      sy = 0;
    } else {
      // Más alta o cuadrada -> se recorta arriba y abajo, ancho completo.
      sw = w;
      sh = Math.round(w / RELACION);
      sx = 0;
      sy = Math.round((h - sh) / 2);
    }

    // --- destino: mismo tamaño salvo que exceda el tope ---
    let dw = sw;
    let dh = sh;
    if (dw > ANCHO_MAX) { dw = ANCHO_MAX; dh = Math.round(ANCHO_MAX / RELACION); }
    if (dh > ALTO_MAX) { dh = ALTO_MAX; dw = Math.round(ALTO_MAX * RELACION); }

    const canvas = document.createElement('canvas');
    canvas.width = dw;
    canvas.height = dh;
    const ctx = canvas.getContext('2d');
    if (!ctx || typeof ctx.drawImage !== 'function' || typeof canvas.toBlob !== 'function') return file;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);

    const { tipo, ext } = formatoSalida(file);
    const blob = await new Promise((r) => canvas.toBlob(r, tipo, CALIDAD));
    if (!blob || !blob.size) return file;

    return new File([blob], conExtension(file.name, ext), { type: tipo });
  } catch {
    // Cualquier fallo (imagen corrupta, canvas contaminado, memoria) se
    // traga a propósito: se sube el original y el usuario no se entera.
    return file;
  }
}

window.recortar16x9 = recortar16x9;
