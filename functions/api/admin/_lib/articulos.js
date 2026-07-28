// _lib/articulos.js — mapeo de filas, validación y reglas de negocio.
//
// La API habla snake_case, igual que la tabla. La traducción a camelCase para
// los componentes del sitio ocurre al generar articulos-data.js, no aquí.

import { RespuestaError } from './http.js';
import { sanearHtml } from './sanitizar.js';

export const ESTADOS = ['borrador', 'revision', 'publicado'];

// Campos JSON: se parsean al leer y se serializan al escribir.
export const CAMPOS_JSON = ['respuesta_rapida', 'productos_relacionados', 'articulos_relacionados'];

const CAMPOS_TEXTO = [
  'titulo', 'seo_title', 'meta_description', 'linea', 'categoria',
  'fecha', 'fecha_texto', 'lectura', 'autor',
  'portada', 'portada_alt', 'portada_pie', 'portada_icono', 'portada_tag',
  'extracto', 'cuerpo',
];

// Requisitos para poder pasar a 'publicado'.
const REQUERIDOS_PUBLICAR = ['titulo', 'slug', 'extracto', 'meta_description', 'cuerpo'];

const RE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RE_FECHA = /^\d{4}-\d{2}-\d{2}$/;

export function validarSlug(slug) {
  const s = String(slug || '').trim();
  if (!s) throw new RespuestaError(400, 'El slug es obligatorio');
  if (s.length > 120) throw new RespuestaError(400, 'El slug excede 120 caracteres');
  if (!RE_SLUG.test(s)) {
    throw new RespuestaError(
      400,
      'Slug inválido: solo minúsculas, números y guiones simples, sin acentos ni espacios',
      { recibido: s },
    );
  }
  return s;
}

// Fila de D1 -> objeto de API (JSON parseado, destacado booleano).
export function filaAObjeto(fila) {
  if (!fila) return null;
  const obj = { ...fila };
  for (const campo of CAMPOS_JSON) {
    if (typeof obj[campo] === 'string' && obj[campo] !== '') {
      try {
        obj[campo] = JSON.parse(obj[campo]);
      } catch {
        // Un JSON corrupto en base no debe tumbar la lectura del artículo.
        obj[campo] = null;
      }
    } else if (obj[campo] === undefined) {
      obj[campo] = null;
    }
  }
  obj.destacado = obj.destacado === 1 || obj.destacado === true;
  return obj;
}

/**
 * Toma el body de un POST/PUT y devuelve solo los campos escribibles,
 * ya validados y con el cuerpo saneado. Ignora cualquier cosa que el
 * cliente intente colar (id, creado_en, actualizado_por, slug en PUT…).
 */
export async function camposEscribibles(body, { urlPublicaR2, permitirEstado = true } = {}) {
  if (!body || typeof body !== 'object') throw new RespuestaError(400, 'Body vacío o inválido');

  const campos = {};

  for (const c of CAMPOS_TEXTO) {
    if (!(c in body)) continue;
    const v = body[c];
    if (v === null || v === '') { campos[c] = null; continue; }
    if (typeof v !== 'string') throw new RespuestaError(400, `El campo ${c} debe ser texto`);
    campos[c] = v;
  }

  if (campos.fecha && !RE_FECHA.test(campos.fecha)) {
    throw new RespuestaError(400, 'La fecha debe tener formato YYYY-MM-DD');
  }
  if ('linea' in campos && !campos.linea) {
    throw new RespuestaError(400, 'La línea no puede quedar vacía');
  }

  // El cuerpo pasa por la lista blanca antes de tocar la base.
  if (typeof campos.cuerpo === 'string') {
    campos.cuerpo = await sanearHtml(campos.cuerpo, urlPublicaR2);
  }

  for (const c of CAMPOS_JSON) {
    if (!(c in body)) continue;
    const v = body[c];
    campos[c] = v === null || v === undefined ? null : JSON.stringify(v);
  }

  if ('destacado' in body) campos.destacado = body.destacado ? 1 : 0;

  if (permitirEstado && 'estado' in body) {
    const e = String(body.estado);
    if (!ESTADOS.includes(e)) throw new RespuestaError(400, `Estado inválido: ${e}`);
    // Publicar exige validación de completitud: pasa por /api/admin/publicar.
    if (e === 'publicado') {
      throw new RespuestaError(400, "Para publicar usa POST /api/admin/publicar, no el campo estado");
    }
    campos.estado = e;
  }

  return campos;
}

/** Lista de campos vacíos que impiden publicar. */
export function faltantesParaPublicar(articulo) {
  const faltan = REQUERIDOS_PUBLICAR.filter((c) => {
    const v = articulo[c];
    return v === null || v === undefined || String(v).trim() === '';
  });
  const sinPortada = !articulo.portada && !articulo.portada_icono;
  if (sinPortada) faltan.push('portada o portada_icono');
  return faltan;
}

/**
 * Guarda el estado ACTUAL del artículo en revisiones. Se llama SIEMPRE
 * antes de modificar, para que el historial refleje el "antes".
 */
export async function guardarRevision(db, articulo, email) {
  await db
    .prepare('INSERT INTO revisiones (articulo_id, snapshot, editado_por, fecha) VALUES (?, ?, ?, ?)')
    .bind(articulo.id, JSON.stringify(filaAObjeto(articulo)), email, new Date().toISOString())
    .run();
}

export async function buscarPorSlug(db, slug) {
  return await db.prepare('SELECT * FROM articulos WHERE slug = ?').bind(slug).first();
}

/**
 * Solo un artículo puede ir en el hero del índice: BlogIndex usa
 * find(a => a.destacado), así que dos destacados dejarían uno invisible
 * sin aviso. Al marcar uno, se desmarcan los demás.
 */
export async function asegurarUnicoDestacado(db, slug) {
  await db.prepare('UPDATE articulos SET destacado = 0 WHERE slug != ?').bind(slug).run();
}
