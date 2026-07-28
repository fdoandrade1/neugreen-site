// POST /api/admin/revertir   { slug, revision_id }
//
// Restaura el contenido de una revisión. La versión vigente se guarda como
// revisión nueva antes de sobrescribir, así que revertir también es reversible.

import { json, error, conErrores, leerJson, comoRespuesta } from './_lib/http.js';
import { filaAObjeto, buscarPorSlug, guardarRevision, CAMPOS_JSON } from './_lib/articulos.js';

// Lo que se restaura. Fuera quedan a propósito:
//   id, slug, creado_en  -> identidad del artículo, no contenido
//   estado               -> revertir texto no debe publicar ni despublicar
const CAMPOS_RESTAURABLES = [
  'titulo', 'seo_title', 'meta_description', 'linea', 'categoria',
  'fecha', 'fecha_texto', 'lectura', 'autor',
  'portada', 'portada_alt', 'portada_pie', 'portada_icono', 'portada_tag',
  'extracto', 'cuerpo', 'destacado',
  ...CAMPOS_JSON,
];

export const onRequestPost = conErrores(async (context) => {
  const { request, env, data } = context;

  try {
    const body = await leerJson(request);
    const slug = String(body.slug || '').trim();
    const revisionId = Number(body.revision_id);

    if (!slug) return error(400, 'Falta el slug');
    if (!Number.isInteger(revisionId) || revisionId <= 0) {
      return error(400, 'revision_id debe ser un entero positivo');
    }

    const actual = await buscarPorSlug(env.DB, slug);
    if (!actual) return error(404, 'Artículo no encontrado');

    const revision = await env.DB
      .prepare('SELECT * FROM revisiones WHERE id = ?')
      .bind(revisionId)
      .first();

    if (!revision) return error(404, 'Revisión no encontrada');
    // Sin esta comprobación se podría restaurar el contenido de otro artículo.
    if (revision.articulo_id !== actual.id) {
      return error(400, 'La revisión no pertenece a este artículo', {
        revision_articulo_id: revision.articulo_id,
        articulo_id: actual.id,
      });
    }

    let snapshot;
    try {
      snapshot = JSON.parse(revision.snapshot);
    } catch {
      return error(500, 'El snapshot de esa revisión no es JSON válido');
    }

    // La versión vigente se archiva antes de sobrescribirla.
    await guardarRevision(env.DB, actual, data.usuario.email);

    const campos = {};
    for (const c of CAMPOS_RESTAURABLES) {
      if (!(c in snapshot)) continue;
      const v = snapshot[c];
      if (c === 'destacado') campos[c] = v ? 1 : 0;
      else if (CAMPOS_JSON.includes(c)) campos[c] = v === null || v === undefined ? null : JSON.stringify(v);
      else campos[c] = v === undefined ? null : v;
    }

    if (Object.keys(campos).length === 0) {
      return error(400, 'La revisión no contiene campos restaurables');
    }

    campos.actualizado_en = new Date().toISOString();
    campos.actualizado_por = data.usuario.email;

    const nombres = Object.keys(campos);
    await env.DB
      .prepare(`UPDATE articulos SET ${nombres.map((n) => `${n} = ?`).join(', ')} WHERE id = ?`)
      .bind(...nombres.map((n) => campos[n]), actual.id)
      .run();

    const restaurado = await buscarPorSlug(env.DB, slug);
    return json({
      articulo: filaAObjeto(restaurado),
      revertido_a: revisionId,
      nota: 'El estado de publicación no se modificó',
    });
  } catch (e) {
    const r = comoRespuesta(e);
    if (r) return r;
    throw e;
  }
});
