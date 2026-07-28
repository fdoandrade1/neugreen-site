// POST /api/admin/publicar   { slug }
//
// Valida completitud, cambia estado a 'publicado' y dispara el deploy hook.

import { json, error, conErrores, leerJson, comoRespuesta } from './_lib/http.js';
import { filaAObjeto, buscarPorSlug, guardarRevision, faltantesParaPublicar } from './_lib/articulos.js';

export const onRequestPost = conErrores(async (context) => {
  const { request, env, data } = context;

  try {
    const body = await leerJson(request);
    const slug = String(body.slug || '').trim();
    if (!slug) return error(400, 'Falta el slug');

    const actual = await buscarPorSlug(env.DB, slug);
    if (!actual) return error(404, 'Artículo no encontrado');

    // Nada se publica a medias: si falta un campo, se dice cuál y se aborta.
    const faltan = faltantesParaPublicar(actual);
    if (faltan.length) {
      return error(400, 'El artículo está incompleto y no puede publicarse', { faltan });
    }

    if (actual.estado === 'publicado') {
      return json({ articulo: filaAObjeto(actual), sin_cambios: true, deploy: 'no disparado' });
    }

    await guardarRevision(env.DB, actual, data.usuario.email);

    await env.DB
      .prepare('UPDATE articulos SET estado = ?, actualizado_en = ?, actualizado_por = ? WHERE slug = ?')
      .bind('publicado', new Date().toISOString(), data.usuario.email, slug)
      .run();

    // El deploy es un efecto posterior: si el hook falla, el artículo ya
    // quedó publicado en base y se puede reintentar el build. No revertimos.
    let deploy = 'no configurado';
    if (env.DEPLOY_HOOK_URL) {
      try {
        const res = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
        deploy = res.ok ? 'disparado' : `falló (${res.status})`;
        if (!res.ok) console.warn('Deploy hook devolvió', res.status);
      } catch (e) {
        deploy = 'falló (error de red)';
        console.warn('Deploy hook inalcanzable:', e && e.message);
      }
    }

    const publicado = await buscarPorSlug(env.DB, slug);
    return json({ articulo: filaAObjeto(publicado), deploy });
  } catch (e) {
    const r = comoRespuesta(e);
    if (r) return r;
    throw e;
  }
});
