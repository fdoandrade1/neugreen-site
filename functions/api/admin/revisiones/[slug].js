// GET /api/admin/revisiones/<slug>   historial de un artículo
//
// Devuelve las revisiones de más reciente a más antigua. Cada snapshot es el
// estado que tenía el artículo ANTES de la edición que creó esa revisión.

import { json, error, conErrores } from '../_lib/http.js';
import { buscarPorSlug } from '../_lib/articulos.js';

export const onRequestGet = conErrores(async ({ env, params, request }) => {
  const articulo = await buscarPorSlug(env.DB, params.slug);
  if (!articulo) return error(404, 'Artículo no encontrado');

  const url = new URL(request.url);
  const completo = url.searchParams.get('completo') === '1';

  const { results } = await env.DB
    .prepare('SELECT id, articulo_id, snapshot, editado_por, fecha FROM revisiones WHERE articulo_id = ? ORDER BY id DESC')
    .bind(articulo.id)
    .all();

  const revisiones = (results || []).map((r) => {
    let snapshot = null;
    try {
      snapshot = JSON.parse(r.snapshot);
    } catch {
      snapshot = null; // un snapshot corrupto no debe romper el historial
    }

    const base = {
      id: r.id,
      articulo_id: r.articulo_id,
      editado_por: r.editado_por,
      fecha: r.fecha,
      titulo: snapshot ? snapshot.titulo : null,
      estado: snapshot ? snapshot.estado : null,
    };

    // Por defecto solo los metadatos: el historial completo de un artículo
    // con cuerpo largo pesa de más para pintar una lista. ?completo=1 lo trae.
    return completo ? { ...base, snapshot } : base;
  });

  return json({ slug: params.slug, articulo_id: articulo.id, total: revisiones.length, revisiones });
});
