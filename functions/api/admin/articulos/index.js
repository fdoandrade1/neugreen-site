// GET  /api/admin/articulos        lista (filtro opcional ?estado=)
// POST /api/admin/articulos        crear

import { json, error, conErrores, leerJson, comoRespuesta, RespuestaError } from '../_lib/http.js';
import {
  ESTADOS, validarSlug, filaAObjeto, camposEscribibles,
  buscarPorSlug, asegurarUnicoDestacado,
} from '../_lib/articulos.js';

// El listado omite `cuerpo`: son ~2 KB de HTML por artículo que la vista de
// lista no usa. Para el contenido completo está GET /articulos/<slug>.
const COLUMNAS_LISTA = `
  id, slug, titulo, seo_title, meta_description, linea, categoria,
  fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie,
  portada_icono, portada_tag, extracto, respuesta_rapida,
  productos_relacionados, articulos_relacionados,
  destacado, estado, creado_en, actualizado_en, actualizado_por
`;

export const onRequestGet = conErrores(async ({ request, env }) => {
  const estado = new URL(request.url).searchParams.get('estado');

  let consulta;
  if (estado) {
    if (!ESTADOS.includes(estado)) {
      return error(400, `Estado inválido: ${estado}`, { validos: ESTADOS });
    }
    consulta = env.DB
      .prepare(`SELECT ${COLUMNAS_LISTA} FROM articulos WHERE estado = ? ORDER BY fecha DESC, id DESC`)
      .bind(estado);
  } else {
    consulta = env.DB
      .prepare(`SELECT ${COLUMNAS_LISTA} FROM articulos ORDER BY fecha DESC, id DESC`);
  }

  const { results } = await consulta.all();
  return json({ articulos: (results || []).map(filaAObjeto), total: (results || []).length });
});

export const onRequestPost = conErrores(async (context) => {
  const { request, env, data } = context;

  try {
    const body = await leerJson(request);
    const slug = validarSlug(body.slug);

    if (await buscarPorSlug(env.DB, slug)) {
      throw new RespuestaError(409, `Ya existe un artículo con el slug "${slug}"`);
    }
    if (!body.titulo || !String(body.titulo).trim()) {
      throw new RespuestaError(400, 'El título es obligatorio');
    }
    if (!body.linea || !String(body.linea).trim()) {
      throw new RespuestaError(400, 'La línea es obligatoria');
    }

    const campos = await camposEscribibles(body, { urlPublicaR2: env.R2_PUBLIC_URL });
    const ahora = new Date().toISOString();

    // Se crea siempre como borrador; publicar es una acción aparte.
    const fijos = {
      slug,
      estado: 'borrador',
      creado_en: ahora,
      actualizado_en: ahora,
      actualizado_por: data.usuario.email,
    };
    delete campos.estado;

    const todos = { ...campos, ...fijos };
    const nombres = Object.keys(todos);
    const marcas = nombres.map(() => '?').join(', ');

    await env.DB
      .prepare(`INSERT INTO articulos (${nombres.join(', ')}) VALUES (${marcas})`)
      .bind(...nombres.map((n) => todos[n]))
      .run();

    if (todos.destacado === 1) await asegurarUnicoDestacado(env.DB, slug);

    const creado = await buscarPorSlug(env.DB, slug);
    return json({ articulo: filaAObjeto(creado) }, 201);
  } catch (e) {
    const r = comoRespuesta(e);
    if (r) return r;
    throw e;
  }
});
