// AdminImagen.jsx — geometría, dibujo y exportación del encuadre de portada.
//
// Módulo de utilidades: no pinta interfaz. La interfaz vive en
// AdminEditorImagen.jsx y consume estas funciones.
//
// DECISIÓN CENTRAL (documento 10, punto 3.2): existe UNA sola función de
// dibujo, dibujarEncuadre(). La previsualización la llama a 720x405 y la
// exportación a la resolución final. No hay dos implementaciones que puedan
// divergir, así que lo que se ve encuadrado es literalmente lo que se sube.

const RELACION = 16 / 9;
const ANCHO_MAX = 1600;
const ALTO_MAX = 900;
const CALIDAD = 0.9;
const TOLERANCIA = 0.01;

// Estado neutro. Con esto, dibujarEncuadre produce el mismo resultado que el
// recorte automático anterior: encuadre 16:9 máximo, centrado, sin filtros.
const ESTADO_INICIAL = {
  rotacion: 0,      // 0 | 90 | 180 | 270
  zoom: 1,          // 1 = encuadre máximo posible
  panX: 0,          // -1 .. 1 (normalizado; 0 = centrado)
  panY: 0,
  brillo: 100,      // porcentajes, 100 = sin cambio
  contraste: 100,
  saturacion: 100,
};

function cargarImagen(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('El archivo no es una imagen legible')); };
    img.src = url;
  });
}

// canvas.toBlob con un tipo no soportado cae en silencio a PNG, así que hay
// que preguntar antes en vez de asumir.
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
  const nombre = String((file && file.name) || '').toLowerCase();
  if (nombre.endsWith('.png')) return { tipo: 'image/png', ext: 'png' };
  if (nombre.endsWith('.webp')) {
    return exportaWebp() ? { tipo: 'image/webp', ext: 'webp' } : { tipo: 'image/jpeg', ext: 'jpg' };
  }
  return { tipo: 'image/jpeg', ext: 'jpg' };
}

function conExtension(nombre, ext) {
  return `${String(nombre || 'portada').replace(/\.[a-z0-9]+$/i, '')}.${ext}`;
}

// ctx.filter existe en todos los navegadores actuales, pero si faltara hay
// que deshabilitar los sliders en vez de dibujar sin avisar.
function soportaFiltro() {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx || !('filter' in ctx)) return false;
    ctx.filter = 'brightness(1.5)';
    return ctx.filter !== 'none' && ctx.filter !== '';
  } catch {
    return false;
  }
}

function filtroCss(estado) {
  const { brillo = 100, contraste = 100, saturacion = 100 } = estado || {};
  // Neutro devuelve 'none' a propósito: así el estado inicial no pasa por el
  // pipeline de filtros y el resultado es idéntico al del recorte automático.
  if (brillo === 100 && contraste === 100 && saturacion === 100) return 'none';
  return `brightness(${brillo}%) contrast(${contraste}%) saturate(${saturacion}%)`;
}

function normalizarRotacion(r) {
  return ((Math.round((r || 0) / 90) * 90) % 360 + 360) % 360;
}

/**
 * Geometría del encuadre sobre la imagen YA ROTADA.
 *
 * Se razona con una "ventana" 16:9 dentro de la imagen:
 *   zoom = 1  -> el rectángulo 16:9 más grande que cabe, centrado
 *   zoom > 1  -> la ventana se encoge (acercar)
 *   pan       -> mueve su centro, con tope para no salirse de la imagen
 */
function geometriaEncuadre(img, estado) {
  const e = { ...ESTADO_INICIAL, ...(estado || {}) };
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const rot = normalizarRotacion(e.rotacion);
  const gira = rot === 90 || rot === 270;
  const rw = gira ? h : w;
  const rh = gira ? w : h;

  // Ventana base: el 16:9 más grande que cabe en la imagen rotada.
  let bw;
  let bh;
  if (rw / rh > RELACION) { bh = rh; bw = rh * RELACION; }
  else { bw = rw; bh = rw / RELACION; }

  const zoom = Math.max(1, e.zoom || 1);
  const vw = bw / zoom;
  const vh = bh / zoom;

  // Con panX/panY en [-1,1] el recorte nunca puede salirse de la imagen.
  const maxX = (rw - vw) / 2;
  const maxY = (rh - vh) / 2;
  const panX = Math.max(-1, Math.min(1, e.panX || 0));
  const panY = Math.max(-1, Math.min(1, e.panY || 0));
  const cx = rw / 2 + panX * maxX;
  const cy = rh / 2 + panY * maxY;

  return {
    w, h, rot, rw, rh, maxX, maxY,
    ventana: { x: cx - vw / 2, y: cy - vh / 2, w: vw, h: vh },
  };
}

/** Tamaño del archivo exportado: la ventana, limitada a 1600x900. Nunca amplía. */
function dimensionesSalida(img, estado) {
  const g = geometriaEncuadre(img, estado);
  let dw = Math.round(g.ventana.w);
  let dh = Math.round(dw / RELACION);
  if (dw > ANCHO_MAX) { dw = ANCHO_MAX; dh = Math.round(ANCHO_MAX / RELACION); }
  if (dh > ALTO_MAX) { dh = ALTO_MAX; dw = Math.round(ALTO_MAX * RELACION); }
  return { dw: Math.max(1, dw), dh: Math.max(1, dh) };
}

/**
 * LA función de dibujo. La usan tanto la previsualización como la
 * exportación, solo que con distinto tamaño de destino.
 */
function dibujarEncuadre(ctx, img, estado, dw, dh) {
  const g = geometriaEncuadre(img, estado);
  const v = g.ventana;
  const escala = dw / v.w;

  ctx.save();
  ctx.clearRect(0, 0, dw, dh);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  try { ctx.filter = filtroCss(estado); } catch { /* sin filtros, se dibuja igual */ }

  // Centro del destino -> centro de la ventana -> espacio rotado -> imagen.
  ctx.translate(dw / 2, dh / 2);
  ctx.scale(escala, escala);
  ctx.translate(-(v.x + v.w / 2), -(v.y + v.h / 2));
  ctx.translate(g.rw / 2, g.rh / 2);
  ctx.rotate((g.rot * Math.PI) / 180);
  ctx.drawImage(img, -g.w / 2, -g.h / 2);

  ctx.restore();
}

/** Genera el File final a partir de la imagen y el estado del encuadre. */
async function exportarEncuadre(file, img, estado) {
  const { dw, dh } = dimensionesSalida(img, estado);
  const canvas = document.createElement('canvas');
  canvas.width = dw;
  canvas.height = dh;

  const ctx = canvas.getContext('2d');
  if (!ctx || typeof canvas.toBlob !== 'function') {
    throw new Error('Este navegador no permite procesar imágenes en canvas');
  }

  dibujarEncuadre(ctx, img, estado, dw, dh);

  const { tipo, ext } = formatoSalida(file);
  const blob = await new Promise((r) => canvas.toBlob(r, tipo, CALIDAD));
  if (!blob || !blob.size) throw new Error('El navegador no pudo generar la imagen recortada');

  return new File([blob], conExtension(file.name, ext), { type: tipo });
}

/**
 * Recorte automático 16:9 centrado, SIN interfaz.
 *
 * Se conserva como camino de respaldo: es lo que se ofrece cuando el editor
 * visual no puede abrir la imagen. Va sobre exportarEncuadre con el estado
 * inicial, así que por construcción da lo mismo que pulsar "Aplicar" sin
 * tocar ningún control.
 */
async function recortar16x9(file) {
  try {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) return file;
    const img = await cargarImagen(file);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return file;

    // Ya está en 16:9 y dentro del tope: se devuelve intacta. Recodificarla
    // solo perdería calidad a cambio de nada.
    if (Math.abs(w / h - RELACION) < TOLERANCIA && w <= ANCHO_MAX && h <= ALTO_MAX) return file;

    return await exportarEncuadre(file, img, ESTADO_INICIAL);
  } catch {
    // Respaldo del respaldo: subir el original antes que bloquear.
    return file;
  }
}

window.NG_IMG = {
  RELACION, ANCHO_MAX, ALTO_MAX, CALIDAD, ESTADO_INICIAL,
  cargarImagen, formatoSalida, conExtension, soportaFiltro, filtroCss,
  normalizarRotacion, geometriaEncuadre, dimensionesSalida,
  dibujarEncuadre, exportarEncuadre,
};
window.recortar16x9 = recortar16x9;
