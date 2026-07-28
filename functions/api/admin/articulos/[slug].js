// GET    /api/admin/articulos/<slug>   uno completo
// PUT    /api/admin/articulos/<slug>   actualizar (guarda revisión antes)
// DELETE /api/admin/articulos/<slug>   borrar (solo si estado='borrador')

import { json, error, conErrores, leerJson, comoRespuesta, RespuestaError } from '../_lib/http.js';
import {
  filaAObjeto, camposEscribibles, buscarPorSlug,
  guardarRevision, asegurarUnicoDestacado,
} from '../_lib/articulos.js';

export const onRequestGet = conErrores(async ({ env, params }) => {
  const fila = await buscarPorSlug(env.DB, params.slug);
  if (!fila) return error(404, 'Artículo no encontrado');
  return json({ articulo: filaAObjeto(fila) });
});

export const onRequestPut = conErrores(async (context) => {
  const { request, env, params, data } = context;

  try {
    const actual = await buscarPorSlug(env.DB, params.slug);
    if (!actual) return error(404, 'Artículo no encontrado');

    const body = await leerJson(request);

    // El slug es la URL pública: cambiarlo al vuelo rompería enlaces
    // existentes, así que se ignora si viene en el body. Renombrar es una
    // operación deliberada, no un efecto secundario de editar el título.
    if (body.slug && body.slug !== params.slug) {
      throw new RespuestaError(
        400,
        'El slug no se cambia desde aquí: rompería la URL publicada y los enlaces entrantes',
        { slug_actual: params.slug, slug_recibido: body.slug },
      );
    }

    const campos = await camposEscribibles(body, { urlPublicaR2: env.R2_PUBLIC_URL });
    if (Object.keys(campos).length === 0) {
      throw new RespuestaError(400, 'No se recibió ningún campo modificable');
    }

    // El historial guarda el ANTES, siempre, antes de tocar la fila.
    await guardarRevision(env.DB, actual, data.usuario.email);

    campos.actualizado_en = new Date().toISOString();
    campos.actualizado_por = data.usuario.email;

    const nombres = Object.keys(campos);
    const asignaciones = nombres.map((n) => `${n} = ?`).join(', ');

    await env.DB
      .prepare(`UPDATE articulos SET ${asignaciones} WHERE slug = ?`)
      .bind(...nombres.map((n) => campos[n]), params.slug)
      .run();

    if (campos.destacado === 1) await asegurarUnicoDestacado(env.DB, params.slug);

    const actualizado = await buscarPorSlug(env.DB, params.slug);
    return json({ articulo: filaAObjeto(actualizado) });
  } catch (e) {
    const r = comoRespuesta(e);
    if (r) return r;
    throw e;
  }
});

export const onRequestDelete = conErrores(async ({ env, params }) => {
  const actual = await buscarPorSlug(env.DB, params.slug);
  if (!actual) return error(404, 'Artículo no encontrado');

  // Nunca se borra algo publicado: la URL ya está indexada y puede tener
  // enlaces entrantes. Para retirarlo, primero pasarlo a borrador.
  if (actual.estado !== 'borrador') {
    return error(409, 'Solo se pueden borrar artículos en borrador', {
      estado_actual: actual.estado,
      sugerencia: 'Pasa el artículo a borrador antes de borrarlo',
    });
  }

  // Las revisiones huérfanas no sirven a nadie; se van con el artículo.
  await env.DB.prepare('DELETE FROM revisiones WHERE articulo_id = ?').bind(actual.id).run();
  await env.DB.prepare('DELETE FROM articulos WHERE id = ?').bind(actual.id).run();

  return json({ borrado: params.slug });
});
