// _lib/http.js — respuestas JSON y manejo uniforme de errores.

export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // El panel es same-origin detrás de Access; nada de esto debe cachearse.
      'Cache-Control': 'no-store',
      ...extra,
    },
  });
}

export function error(status, mensaje, detalle) {
  const cuerpo = { error: mensaje };
  if (detalle !== undefined) cuerpo.detalle = detalle;
  return json(cuerpo, status);
}

// Envuelve un handler para que ninguna excepción se escape como 500 opaco.
export function conErrores(handler) {
  return async (context) => {
    try {
      return await handler(context);
    } catch (e) {
      console.error('admin api:', e && e.stack ? e.stack : String(e));
      return error(500, 'Error interno', String(e && e.message ? e.message : e));
    }
  };
}

// Lee y valida que el body sea JSON.
export async function leerJson(request) {
  const tipo = request.headers.get('Content-Type') || '';
  if (!tipo.includes('application/json')) {
    throw new RespuestaError(415, 'Se espera Content-Type: application/json');
  }
  try {
    return await request.json();
  } catch {
    throw new RespuestaError(400, 'JSON inválido en el cuerpo de la petición');
  }
}

export class RespuestaError extends Error {
  constructor(status, mensaje, detalle) {
    super(mensaje);
    this.status = status;
    this.detalle = detalle;
  }
}

// Traduce RespuestaError a Response; el resto se re-lanza.
export function comoRespuesta(e) {
  if (e instanceof RespuestaError) return error(e.status, e.message, e.detalle);
  return null;
}
